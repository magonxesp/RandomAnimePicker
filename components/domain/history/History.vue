<template>
  <div class="history">
    <div class="history__icon">
      <a href="#" class="icon-btn" @click="openSidebar">
        <FontAwesomeIcon icon="history" />
      </a>
    </div>
    <div v-if="open" class="history__sidebar" ref="sidebar">
      <div class="history__sidebar__close">
        <h2>History</h2>
        <a href="#" class="icon-btn" @click="closeSidebar">
          <FontAwesomeIcon icon="times" />
        </a>
      </div>
      <div class="history__sidebar__entries">
        <HistoryEntry v-for="entry in entries" :anime="entry" :key="entry.id.value" @click:entry="showEntry"></HistoryEntry>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import HistoryEntry from "./HistoryItem.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { defineComponent, ref, useNuxtApp } from "#imports";
import { Anime } from "~/plugins/application-services/anime/domain/anime";
import { useAnimeStore } from "~/store/anime-store";
import { storeToRefs } from "pinia";

export default defineComponent({
	name: "History",
	setup() {
		const store = useAnimeStore()
		const { currentAnime } = storeToRefs(store)
		const entries = ref<Anime[]>([])
		const open = ref(false)

		return {
			store,
			entries,
			open,
			currentAnime
		}
	},
	methods: {
		fetchEntries() {
			const { $currentHistory, $animeFinder } = useNuxtApp()

			$currentHistory().current()
				.then(history => Promise.all(history.animeIds.map(id => $animeFinder("session").find(id.value))))
				.then(entries => this.entries = entries.reverse())
		},
		toggleScroll(condition: boolean) {
			if (!condition) {
				document.querySelector("body")?.classList.add('no-scroll')
				document.querySelector("html")?.classList.add('no-scroll')
			} else {
				document.querySelector("body")?.classList.remove('no-scroll')
				document.querySelector("html")?.classList.remove('no-scroll')
			}
		},
		closeSidebar() {
			this.open = false
			this.toggleScroll(true)
		},
		openSidebar() {
			this.open = true
			this.toggleScroll(false)
			this.fetchEntries()
		},
		showEntry(animeid: string) {
			this.store.fetchAnimeById(animeid)
			this.closeSidebar()
		}
	},
	watch: {
		currentAnime() {
			if (this.$refs.sidebar instanceof HTMLDivElement) {
				this.$refs.sidebar.scrollTop = 0
			}

			this.fetchEntries()
		}
	},
	components: {
		HistoryEntry,
		FontAwesomeIcon
	}
})
</script>

<style lang="scss" scoped>
.history {
	&__icon {
		a {
			color: #FFFFFF;
			font-size: 2em;
		}
	}

	&__sidebar {
		$sidebar-width: 30em;

		overflow-y: scroll;
		position: absolute;
		top: 0;
		right: 0;
		height: 100vh;
		width: $sidebar-width;
		background-color: var(--background-secondary);
		padding: 2em 0;
		animation-name: open-sidebar;
		animation-duration: 0.5s;

		@keyframes open-sidebar {
			from {
				right: -$sidebar-width;
			}
			to {
				right: 0;
			}
		}

		&__close {
			display: flex;
			justify-content: space-between;
			font-size: 2em;
			padding: 0 1em;

			h2 {
				font-size: 1em;
			}
		}

		@media (max-width: 480px) {
			width: 100%;
		}
	}
}
</style>
