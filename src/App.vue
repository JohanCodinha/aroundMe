<template>
  <div id="app">
    <md-toolbar>
      <h1 class="md-title">Around me</h1>
    </md-toolbar>

    <speciesList></speciesList>
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
#app{
  overflow-x: hidden;
  position:relative;
  height:100vh;
}
</style>
