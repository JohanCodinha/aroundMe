<template>
  <div id="app">
    <md-whiteframe md-elevation="1" md-theme="light-blue" class="main-toolbar">
      <md-toolbar class="main-toolbar">
        <h1 class="md-title">Vic Bio scan</h1>
      </md-toolbar>
    </md-whiteframe>

    <main class="main-content">
      <speciesList></speciesList>
    </main>
  </div>
</template>

<script>
import speciesList from './components/speciesList';

export default {
  name: 'app',
  components: {
    speciesList,
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
}
</style>
