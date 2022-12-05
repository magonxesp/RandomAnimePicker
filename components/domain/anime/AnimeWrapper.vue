<template>
	<div class="anime">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "#imports";

export default defineComponent({
	name: "AnimeWrapper"
})
</script>

<style scoped lang="scss">
.anime {
	margin-bottom: 20px;

	@media (max-width: 600px) {
		flex-direction: column;
		margin: 0 10px 10px 10px;

		.btn {
			margin-left: 0 !important;
			margin-bottom: 15px;
		}
	}
}
</style>
