<template>
  <md-list-item class="md-list-item">
    <md-avatar>
      <img :src="specie.thumbnailUrl" alt="People">
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
  </md-list-item>
</template>

<script>
export default {
  props: ['specie'],
  methods: {
    toggleRightSidenav() {
      const taxonId = parseInt(event.currentTarget.id, 10);
      // this.$refs.rightSidenav.toggle();
      this.$emit('infoPanel', taxonId);
    },
  },
};
</script>
