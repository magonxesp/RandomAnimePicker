<template>
  <div class="app">
		<header>
			<h1>Random Anime Picker</h1>
			<div class="header-menu">
				<History />
			</div>
		</header>
		<div class="app-container">
			<NuxtPage />
		</div>
  </div>
</template>

<script setup lang="ts">
import History from "~/components/domain/history/History.vue"
</script>

<style lang="scss">
.app {
	width: 100%;
	font-family: 'Roboto', sans-serif;
	color: white;

	header {
		padding: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		h1 {
			margin: 0;
		}

		.header-menu {
			margin-left: 2em;
		}
	}

	.app-container {
		width: 100%;
		margin-top: 100px;
		display: flex;
		justify-content: center;

		@media (max-width: 900px) {
			margin-top: 50px;
		}
	}
}
</style>
