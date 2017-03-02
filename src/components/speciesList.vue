<template>
<div id="speciesList">
  <md-sidenav class="md-sidenav md-right md-fixed" ref="rightSidenav" @open="open('Right')" @close="close('Right')">
    <md-toolbar>
      <div class="md-toolbar-container">
        <h3 class="md-title"><md-icon @click.native="closeRightSidenav" >arrow_back</md-icon> {{selectedTaxon.commonNme}}</h3>
      </div>
    </md-toolbar>
    <img src="http://collections.museumvictoria.com.au/content/media/27/728777-medium.jpg" alt="">
    <md-list>
      <md-subheader>Common name:</md-subheader>
      <md-list-item>{{selectedTaxon.commonNme}}</md-list-item>
      <md-subheader>Scientific name:</md-subheader>
      <md-list-item>{{selectedTaxon.scientificDisplayNme}}</md-list-item>
      <md-subheader>Count:</md-subheader>
      <md-list-item>{{selectedTaxon.totalCountInt}}</md-list-item>
      <md-subheader>Common name:</md-subheader>
      <md-list-item>{{selectedTaxon.commonNme}}</md-list-item>
      <md-subheader>Scientific name:</md-subheader>
      <md-list-item>{{selectedTaxon.scientificDisplayNme}}</md-list-item>
      <md-subheader>Count:</md-subheader>
      <md-list-item>{{selectedTaxon.totalCountInt}}</md-list-item>
    </md-list>
  </md-sidenav>

  <md-list>
    <specieItem @infoPanel="toggleRightSidenav" v-for="specie in species" :specie="specie" :key="specie.taxonId" ></specieItem>
  </md-list>
  <md-button @click.native="getRecordsByLoc()" style="position: fixed" class="md-button md-fab md-fab-bottom-right">
    <md-icon >my_location</md-icon>
  </md-button>

  <pre>{{status}}</pre>
  <pre>selected taxonId: {{selectedTaxonId}}</pre>
  <pre>{{selectedTaxon}}</pre>
</div>
</template>

<script>
import specieItem from './specieItem';

export default {
  name: 'speciesList',
  components: {
    specieItem,
  },

  data() {
    const data = {
      records: [],
      token: 'blank',
      selectedTaxonId: 0,
      status: {
        token: 'waiting for token',
        error: '',
      },
    };
    return data;
  },
  computed: {
    selectedTaxon(id) {
      console.log(id);
      this.$http
      .get('http://collections.museumvictoria.com.au/api/search', {
        params: {
          recordType: 'species',
          taxon: 'Tachyglossus aculeatus',
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
        } })
      .then((res) => {
        console.log(res.body);
      }).catch((e) => {
        this.status.error = e;
      });

      return this.records.filter(record => record.taxonId === this.selectedTaxonId)[0] || {};
    },
    species() {
      return this.records.reduce((accuSpecies, specie) => {
        const specieClone = Object.assign({}, {
          commonNme: specie.commonNme,
          scientificDisplayNme: specie.scientificDisplayNme,
          taxonId: specie.taxonId,
          totalCountInt: Object.prototype.hasOwnProperty.call(specie, 'totalCountInt')
            ? specie.totalCountInt
            : 1,
        });

        // specie already present in species ? increment count : add to species
        const specieIndex = accuSpecies
          .findIndex(accuspecie => accuspecie.taxonId === specieClone.taxonId);

        if (specieIndex > -1) {
          specieClone.totalCountInt += accuSpecies[specieIndex].totalCountInt;
          return [...accuSpecies.slice(0, specieIndex),
            specieClone,
            ...accuSpecies.slice(specieIndex + 1)];
        }
        return [...accuSpecies, specieClone];
      }, []);
    },
  },

  methods: {
    getToken() {
      return this.$http
      .get('https://vbapi.herokuapp.com/auth/guest')
      .then((res) => {
        this.token = res.body.jwt;
      });
    },

    getLocation() {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };

      return new Promise((resolve, reject) => {
        resolve({ accu: '12', lat: '-37.809610', long: '144.972052' });
        // /search/point?lat=-37.80812&long=144.97345&rad=250
        // -37.809610, 144.972052
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const accu = position.coords.accuracy;
              const lat = position.coords.latitude;
              const long = position.coords.longitude;
              console.log(`Position aquired, accuracy : ${position.coords.accuracy}`);

              resolve({ accu, lat, long });
            },
            (err) => {
              // console.log(err);
              reject(new Error(err.message));
            }, options);
        } else reject(new Error('no geolocation feature present on device'));
      });
    },

    getRecordsByLoc() {
      const token = this.token;

      this.getLocation()
        .then((position) => {
          console.log(position);
          const params = {
            // -37.815447, 144.958504
            lat: position.lat,
            long: position.long,
            rad: 250,
          };

          this.$http
            .get('https://vbapi.herokuapp.com/search/point', {
              headers: { 'x-access-token': token },
              params,
            })
            .then((res) => {
              this.records = res.body.species;
              console.log(`${this.records.length} Records found`);
            });
        }).catch((err) => {
          this.status.error = err.message;
        });
    },

    toggleRightSidenav(id) {
      this.selectedTaxonId = id;
      this.$refs.rightSidenav.toggle();
    },
    closeRightSidenav() {
      this.$refs.rightSidenav.close();
    },
    open(ref) {
      console.log(`Opened: + ${ref}`);
    },
    close(ref) {
      console.log(`Closed: + ${ref}`);
    },
  },

  mounted() {
    this.getToken()
      .then(() => {
        this.status.token = 'Ready';
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.md-right .md-sidenav-content{
  width: 100%;
}


.md-list-item {
  list-style-type: none;
}

</style>
