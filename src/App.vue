<template>
  <div id="app">
    <md-whiteframe md-elevation="1" md-theme="light-blue" class="main-toolbar">
      <md-toolbar class="main-toolbar">
        <h1 class="md-title">Vic Bio scan</h1>
        <md-button class="md-icon-button" @click.native="viewChange()">
          <md-icon v-if="this.views">view_module</md-icon>
          <md-icon v-else>view_list</md-icon>
        </md-button>
      </md-toolbar>
    </md-whiteframe>

    <main class="main-content">
      <aroundView></aroundView>
    </main>
  </div>
</template>

<script>
import aroundView from './views/aroundView';


export default {
  name: 'app',
  components: {
    aroundView,
  },
  data() {
    const data = {
      token: '',
      views: true,
    };
    return data;
  },

  methods: {
    getToken() {
      return this.$http
      .get('https://vbapi.herokuapp.com/auth/guest')
      .then(res => res.body.jwt);
    },

    viewChange() {
      this.views = !this.views;
    },
  },

  mounted() {
    this.getToken()
      .then((token) => {
        this.token = token;
      });
  },
};
</script>

<style>
html,
body,
#app{
  height: 100%;
  overflow: hidden;
}

#app {
  display: flex;
  flex-flow: column;
}

.main-content {
  position: relative;
  /*z-index: 1;*/
  overflow: auto;
}
.main-toolbar {
  position: relative;
  z-index: 10;
  justify-content: space-between;

}
</style>
