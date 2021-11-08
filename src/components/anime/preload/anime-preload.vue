<template>
  <div class="Loading">
    <img :src="loading" alt="loading_gif" />
  </div>
</template>

<script>
  import loading from './loading.gif';

  export default {
    data() {
      return {
        loading: loading
      }
    }
  };
</script>

<style lang="scss" scoped>
  .Loading {
    max-width: 500px;

    img {
      width: 100%;
    }
  }
</style>