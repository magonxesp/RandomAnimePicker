<template>
	<div class="buttons-container">
		<button class="btn btn-primary" @click.prevent="$emit('click:random')">Choose a random anime</button>
		<a class="btn btn-secondary" :href="anime.url.value" target="_blank">View on MyAnimeList</a>
		<button class="btn btn-secondary" @click.prevent="share">
			<FontAwesomeIcon icon="fa-solid fa-share-nodes" />
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "#imports";
import { PropType } from "@vue/runtime-core";
import { Anime } from "~/plugins/application-services/anime/domain/anime";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useToast } from "vue-toastification";
import toast from "~/plugins/toast";

export default defineComponent({
	name: "AnimeControls",
	emits: ["click:random"],
	props: {
		anime: {
			type: Object as PropType<Anime>,
			required: true
		}
	},
	setup() {
		const toast = useToast()

		return {
			toast
		}
	},
	methods: {
		async share() {
			const url = `${window.location.protocol}//${window.location.host}/anime/${this.anime.id.value}`

			if (typeof navigator.share !== "undefined") {
				await navigator.share({
					title: this.anime.titleEnglish.value,
					text: this.anime.titleJapanese.value,
					url,
				})
			} else {
				await navigator.clipboard.writeText(url)
				this.toast.success("Copied to clipboard!")
			}
		}
	},
	components: {
		FontAwesomeIcon
	},
})
</script>

<style scoped lang="scss">
.buttons-container {
	display: flex;
	justify-content: center;
	padding: 10px 0;

	.btn {
		margin-left: 10px;

		&:first-child {
			margin-left: 0;
		}

		@media (max-width: 900px) {
			margin-left: 0;
			margin-bottom: 1.5rem;
		}
	}

	@media (max-width: 900px) {
		flex-direction: column;
	}
}
</style>
