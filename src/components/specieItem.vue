<template>
  <md-avatar>
    <img :src="`https://placeimg.com/40/40/animals/${specie.taxonId}`" alt="People">
  </md-avatar>

  <div class="md-list-text-container">
    <span>{{specie.commonNme}}</span>
    <span>{{specie.scientificDisplayNme}}</span>
    <p>Total count : {{specie.totalCountInt}}</p>
  </div>

  <md-button @click.native="toggleRightSidenav" :id="specie.taxonId" class="md-icon-button md-list-action">
    <md-icon class="md-primary">info</md-icon>
  </md-button>

  <md-divider class="md-inset"></md-divider>
</template>

<script>
export default {
  props: ['specie'],
};
</script>
