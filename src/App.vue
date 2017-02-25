<template>
  <div id="app" class="container">
  <md-toolbar>
    <h1 class="md-title">Around me</h1>
  </md-toolbar>
  <md-layout md-align="center" md-gutter="16">
  </md-layout>
  <md-list>
    <md-list-item v-for="specie in species" :specie="specie" class="md-list-item">
      <md-avatar>
        <img :src="`https://placeimg.com/40/40/animals/${specie.taxonId}`" alt="People">
      </md-avatar>

      <div class="md-list-text-container">
        <span>{{specie.commonNme}}</span>
        <span>{{specie.scientificDisplayNme}}</span>
        <p>Total count : {{specie.totalCountInt}}</p>
      </div>

      <md-button class="md-icon-button md-list-action">
        <md-icon class="md-primary">info</md-icon>
      </md-button>

      <md-divider class="md-inset"></md-divider>
    </md-list-item>
  </md-list>
  <md-button @click.native="getRecordsByLoc()" style="position: fixed" class="md-button md-fab md-fab-bottom-right">
    <md-icon >my_location</md-icon>
  </md-button>
  <!-- <pre>{{species}}</pre> -->
  </div>
</template>

<script>
// import Hello from './components/Hello';
export default {
  name: 'app',
  // props: ['records'],
  data() {
    const data = {
      records: [],
      token: 'blank',
    };
    return data;
  },
  computed: {
    species() {
      return this.records.reduce((accuSpecies, specie) => {
        // specie already present in species ? increment count : add to species
        if (accuSpecies.some(accuSpecie => accuSpecie.taxonId === specie.taxonId)) {
          accuSpecies.map((accuSpecie) => {
            if (accuSpecie.taxonId !== specie.taxonId) return accuSpecie;
            /* eslint-disable no-param-reassign */
            accuSpecie.totalCountInt += specie.totalCountInt;
            /* eslint-enable no-param-reassign */
            return accuSpecie;
          });
        } else {
          accuSpecies.push({
            commonNme: specie.commonNme,
            scientificDisplayNme: specie.scientificDisplayNme,
            taxonId: specie.taxonId,
            totalCountInt: specie.totalCountInt,
          });
        }
        console.log(accuSpecies);
        return accuSpecies;
      }, []);
    },
  },

  methods: {
    getToken() {
      this.$http
      .get('https://vbapi.herokuapp.com/auth/guest')
      .then((res) => {
        this.token = res.body.jwt;
      });
    },

    getLocation() {
      function error(e) {
        console.log(e);
      }

      return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            const accu = position.coords.accuracy;
            const lat = position.coords.latitude;
            const long = position.coords.longitude;

            console.log(`gps fixed at: ${position.coords} | ${position.coords.accuracy}`);

            resolve({ accu, lat, long });
          }, error,
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0 });
        } else reject('no geolocation feature present on device');
      });
    },

    getRecordsByLoc() {
      const token = this.token;

      this.getLocation()
        .then((location) => {
          const params = {
            lat: location.lat,
            long: location.long,
            rad: 250,
            token,
          };

          this.$http.get('https://vbapi.herokuapp.com/search/point', { params })
            .then((res) => {
              console.log(res);
              this.records = res.body.species;
              console.log(this.records);
            });
        });
    },
  },

  mounted() {
    this.getToken();
  },
};
</script>
<style>
.md-list-item {
  list-style-type: none;
}
.app-viewport {
  display: flex;
  flex-flow: column;
}


html,
body,
.app {
  height: 100%;
  overflow: hidden;
}

</style>
