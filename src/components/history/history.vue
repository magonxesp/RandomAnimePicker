<template>
  <div class="History">
    <div class="History__icon">
      <a href="#" class="icon-btn" v-on:click="openSidebar">
        <FontAwesomeIcon icon="history" />
      </a>
    </div>
    <div v-if="open" class="History__sidebar">
      <div class="History__sidebar__close">
        <h2>History</h2>
        <a href="#" class="icon-btn" v-on:click="closeSidebar">
          <FontAwesomeIcon icon="times" />
        </a>
      </div>
      <div class="History__sidebar__entries">
        <HistoryEntry v-for="anime in animes" v-bind:anime="anime" v-bind:key="anime.id.value" v-on:click-entry="emitShowAnime"></HistoryEntry>
      </div>
    </div>
  </div>
</template>

<script>
  import CurrentHistory from "../../modules/history/application/current-history";
  import SessionStorageHistoryRepository from "../../modules/history/infraestructure/session-storage/session-storage-history-repository";
  import AnimeFinder from "../../modules/anime/application/anime-finder";
  import SessionStorageAnimeRepository from "../../modules/anime/infraestructure/session/session-storage-anime-repository";
  import HistoryEntry from "./history-entry.vue";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

  const currentHistory = new CurrentHistory(new SessionStorageHistoryRepository());
  const animeFinder = new AnimeFinder(new SessionStorageAnimeRepository());

  async function history() {
    const history = await currentHistory.current();
    const animes = [];

    if (history) {
      for (let id of history.animeIds.animeIds) {
        try {
          animes.push(await animeFinder.find(id));
        } catch (e) {
          console.log(e);
        }
      }
    }

    return animes.reverse();
  }

  export default {
    data() {
      return {
        animes: [],
        open: false
      }
    },
    components: {
      HistoryEntry,
      FontAwesomeIcon
    },
    mounted() {
      window.addEventListener('random-anime',() => {
        history().then(animes => this.animes = animes);
      });
    },
    methods: {
      async openSidebar() {
        this.animes = await history();
        this.open = true;

        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
      },
      closeSidebar() {
        this.open = false;

        document.getElementsByTagName('body')[0].style.overflowY = 'auto';
      },
      emitShowAnime(animeId) {
        console.log(animeId);
        this.closeSidebar();
        this.$emit('click-history-entry', animeId);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/variables";

  .History {
    &__icon {
      a {
        color: #FFFFFF;
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
      background-color: $background-secondary;
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
