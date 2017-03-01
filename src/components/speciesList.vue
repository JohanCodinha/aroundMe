<template>
<div id="speciesList">
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
  <pre>{{status}}</pre>
</div>
</template>

<script>
export default {
  name: 'speciesList',
  data() {
    const data = {
      records: [],
      token: 'blank',
      status: {
        token: 'waiting for token',
        error: '',
      },
    };
    return data;
  },
  computed: {
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
<style scoped>

.md-list-item {
  list-style-type: none;
}

</style>
