<template>
  <div id="app">
  <md-toolbar>
    <h1 class="md-title">Around me</h1>
  </md-toolbar>
  <md-layout md-align="center" md-gutter="16">
    <md-button @click.native="sayHi()" class="md-fab md-fab-bottom-right">
      <md-icon >my_location</md-icon>
    </md-button>
  </md-layout>
  <md-list-item class="md-list-item">
    <md-avatar>
      <img src="https://placeimg.com/40/40/people/1" alt="People">
    </md-avatar>

    <div class="md-list-text-container">
      <span>Common Bent-wing Bat</span>
      <span>Miniopterus schreibersii GROUPi</span>
      <p>Captured and released</p>
    </div>

    <md-button class="md-icon-button md-list-action">
      <md-icon class="md-primary">info</md-icon>
    </md-button>

    <md-divider class="md-inset"></md-divider>
  </md-list-item>
  <md-list-item>
    <md-divider class="md-inset"></md-divider>
  </md-list-item>

  <pre>{{$data}}</pre>
  </div>
</template>

<script>
/* eslint-disable */
/*global Vue */


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
    sayHi: function() {
      console.log('boooom');
    },

    getRecordsByLoc: () => {
      // const vm = this;
      debugger;
      const token = this.token;
      console.log('wait what');
      this.$http.get('http://localhost:3000/search/point', {
        lat: -37.788151,
        long: 144.982671,
        rad: 250,
        token,
      })
        .then((res) => {
          console.log(res);
          this.records = res;
        });
    },

    getToken: function() {
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
