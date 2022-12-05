<template>
  <div class="error">
    <div class="error__thumbnail">
      <img src="~/assets/images/oups.png" alt="error-thumbnail" />
    </div>
    <div class="error__message">
      <h2 class="text-9xl" v-if="statusCode">{{ statusCode }}</h2>
      <h3>{{ message ?? "Oups! An error ocurred" }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "#imports";

export default defineComponent({
  name: "Error",
	props: {
		statusCode: Number,
		message: String
	}
})
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  margin-bottom: 20px;
  width: 800px;

  div {
    width: 50%;

    @media (max-width: 900px) {
      width: 100%;
      padding: 0 30px;
    }
  }

  &__thumbnail {
    img {
      width: 100%;
    }
  }

  &__message {
    display: flex;
    align-items: center;
		flex-direction: column;
		justify-content: center;

    h2 {
      padding: 0 25px;
			text-align: center;

      @media (max-width: 900px) {
        padding: 40px 0;
      }
    }

    @media (max-width: 900px) {
      align-items: flex-start;
      justify-content: center;
    }
  }

  @media (max-width: 900px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
}
</style>
