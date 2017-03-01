<template>
  <div id="app">
    <md-toolbar>
      <h1 class="md-title">Around me</h1>
    </md-toolbar>

    <speciesList></speciesList>
     <div>
      <md-button class="md-raised md-accent" @click.native="toggleRightSidenav">Toggle right</md-button>
      <p>Open console to see the events</p>
    </div>
    <md-sidenav class="md-bottom" ref="rightSidenav" @open="open('Right')" @close="close('Right')">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">Sidenav content</h3>
        </div>
      </md-toolbar>

      <md-button class="md-raised md-accent" @click.native="closeRightSidenav">Close</md-button>
    </md-sidenav>
  </div>
</template>

<script>
import speciesList from './components/speciesList';

export default {
  name: 'app',
  components: {
    speciesList,
  },
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
    toggleRightSidenav() {
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

<style>

</style>
