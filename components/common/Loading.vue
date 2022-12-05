<template>
  <div class="loading">
    <img src="~/assets/images/loading.gif" alt="loading_gif" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "#imports";

export default defineComponent({
	name: "Loading"
})
</script>

<style lang="scss" scoped>
  .loading {
    max-width: 500px;

    img {
      width: 100%;
    }
  }
</style>
