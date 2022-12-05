<template>
	<div class="app">
		<header>
			<h1>Random Anime Picker</h1>
			<div class="header-menu">
				<History />
			</div>
		</header>
		<div class="app-container">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import History from "~/components/domain/history/History.vue";
</script>
