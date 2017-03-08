<template>
<div id="speciesList">
  <md-sidenav class="md-sidenav md-right md-fixed" ref="rightSidenav" @open="open('Right')" @close="close('Right')">
    <md-toolbar>
      <div class="md-toolbar-container">
        <h3 class="md-title"><md-icon @click.native="closeRightSidenav" >arrow_back</md-icon> {{selectedTaxon.commonNme}}</h3>
      </div>
    </md-toolbar>
    <img style="max-height: 75vh" :src="selectedTaxon.smallImageUrl" alt="">
    <md-list>
      <md-subheader>Common name:</md-subheader>
      <md-list-item>{{selectedTaxon.commonNme}}</md-list-item>
      <md-subheader>Scientific name:</md-subheader>
      <md-list-item>{{selectedTaxon.scientificDisplayNme}}</md-list-item>
      <md-subheader>Count:</md-subheader>
      <md-list-item>{{selectedTaxon.totalCountInt}}</md-list-item>
    </md-list>
  </md-sidenav>

  <md-list v-if="this.$parent.views">
    <specieListItem @infoPanel="toggleRightSidenav" v-for="specie in species" :specie="specie" :key="specie.taxonId"></specieListItem>
  </md-list>

  <md-layout v-else>
    <md-whiteframe md-elevation="1" class="card" v-for="specie in species" :specie="specie" :key="specie.taxonId">
      <div class="media">
        <img :src="specie.thumbnailUrl" v-if="specie.thumbnailUrl">
        <img src="https://emojione.com/wp-content/uploads/assets/emojis/1f43e.svg" alt="emoji" class="emoji" v-else>
      </div>
      <div class="content">
        <img src="https://emojione.com/wp-content/uploads/assets/emojis/1f43e.svg" alt="emoji" class="emoji">
        <p class="truncate">{{specie.commonNme}}</p>
        <md-icon class="md-primary" @click.native="toggleRightSidenavCard" :id="specie.taxonId">info</md-icon>
      </div>
    </md-whiteframe>
  </md-layout>

  <md-button v-if="this.$parent.token !== ''" @click.native="getRecordsByLoc()" style="position: fixed" class="md-button md-fab md-fab-bottom-right">
    <md-icon >my_location</md-icon>
  </md-button>
  
  <pre>{{species}}</pre>
  <div>token ready ? {{this.$parent.token !== ''}}</div>
  <pre>{{status}}</pre>
</div>
</template>

<script>
import specieListItem from '../components/specieListItem';

export default {
  name: 'speciesList',
  components: {
    specieListItem,
  },

  data() {
    const data = {
      records: [],
      species: [],
      selectedTaxonId: 0,
      status: {
        error: '',
      },
    };
    return data;
  },
  watch: {
    records: function onRecordFetch(records) {
      const species = records.reduce((accuSpecies, specie) => {
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

      const names = species.reduce((acc, specie) => [...acc, specie.scientificDisplayNme], []);

      this.$http
        .post('https://bie.ala.org.au/ws/species/lookup/bulk', { names })
        .then((res) => {
          console.log(res.body, this.species);
          try {
            this.species = species.map((specie, index) => {
              const resSmallImageUrl = res.body[index].smallImageUrl;
              const resThumbnailUrl = res.body[index].thumbnailUrl;
              return Object.assign({}, specie, {
                smallImageUrl: resSmallImageUrl ? resSmallImageUrl.replace(/https:\/\//, 'https://') : '',
                thumbnailUrl: resThumbnailUrl ? resThumbnailUrl.replace(/https:\/\//, 'https://') : '',
              });
            });
          } catch (e) {
            console.log(e);
          }
        }).catch((e) => {
          this.status.error = e;
        });
    },
  },
  computed: {
    selectedTaxon() {
      return this.species.filter(specie => specie.taxonId === this.selectedTaxonId)[0] || {};
    },
  },

  methods: {
    getLocation() {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };
      // return new Promise(res => res({ accu: '12', lat: '-37.809610', long: '144.972052' }));
      return new Promise((resolve, reject) => {
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
              console.log(err);
              reject(new Error(err.message));
            }, options);
        } else reject(new Error('no geolocation feature present on device'));
      });
    },

    getRecordsByLoc() {
      const token = this.$parent.token;
      this.getLocation()
        .then((position) => {
          console.log(position);
          const params = {
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
          console.log(err);
          this.status.error = err.message;
        });
    },

    toggleRightSidenavCard() {
      const taxonId = parseInt(event.currentTarget.id, 10);
      this.selectedTaxonId = taxonId;
      this.$refs.rightSidenav.toggle();
    },

    toggleRightSidenav(id) {
      console.log(this.selectedTaxonId, id);
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

/* card */

p{
  margin: auto;
}

.content {
  height: 44px;
  display: flex;
  font-size: 1em;
}

.emoji{
  margin: 8px;
  width: 24px;
  height: 24px;
}

.truncate {
  width: 34vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card {
  width: 48vw;
  margin: 0 0 4px 4px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.media {
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.media img {
  min-height: 50%;
  min-width: 50%;
  max-width: 100%;
  max-height: 100%;
}

</style>
