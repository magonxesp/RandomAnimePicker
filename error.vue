<template>
	<NuxtLayout name="error">
		<div>
			<Error :status-code="error.statusCode" :message="error.statusMessage" />
			<NuxtLink to="/" class="btn btn-primary">Go to home page</NuxtLink>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
import Error from "~/components/common/Error.vue"

const props = defineProps({
	error: Object
})

console.log(props.error)
</script>

<style scoped>
.btn {
	max-width: 14rem;
	margin: 5rem auto 0 auto;
}
</style>
