<template>
  <div id="app">
  <md-toolbar>
    <h1 class="md-title">Around me</h1>
  </md-toolbar>
  <md-layout md-align="center" md-gutter="16">
    <md-button @click.native="getRecordsByLoc()" class="md-fab md-fab-bottom-right">
      <md-icon >my_location</md-icon>
    </md-button>
  </md-layout>
  <md-list>
    <md-list-item v-for="record in records" :record="record" class="md-list-item">
      <md-avatar>
        <img :src="`https://placeimg.com/40/40/animals/${record.taxonId}`" alt="People">
      </md-avatar>

      <div class="md-list-text-container">
        <span>{{record.commonNme}}</span>
        <span>{{record.scientificDisplayNme}}</span>
        <p>{{record.siteLocationDesc}}</p>
      </div>

      <md-button class="md-icon-button md-list-action">
        <md-icon class="md-primary">info</md-icon>
      </md-button>

      <md-divider class="md-inset"></md-divider>
    </md-list-item>
  </md-list>
  <pre>{{$data}}</pre>
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
  methods: {
    getRecordsByLoc() {
      const token = this.token;
      const params = {
        lat: -37.788151,
        long: 144.982671,
        rad: 250,
        token,
      };
      console.log(token);
      this.$http.get('http://localhost:3000/search/point', { params })
        .then((res) => {
          console.log(res);
          this.records = res.body.species;
        });
    },

    getToken() {
      this.$http
      .get('http://localhost:3000/auth/guest')
      .then((res) => {
        this.token = res.body.jwt;
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
</style>
