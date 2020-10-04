<template>
  <div id="home">
    <Jumbotron v-on:text-changed="goToGames" />
    <div class="game-slider container">
      <h5 class="text-left">Recent releases</h5>
      <div class="divider"></div>
      <div v-if="loadingStatus">
        <Spinner />
      </div>
      <div v-else>
        <GameSlider :data="recentReleases" />
      </div>
    </div>

    <div class="game-slider container">
      <h5 class="text-left">Upcoming games</h5>
      <div class="divider"></div>
      <div v-if="loadingStatus">
        <Spinner />
      </div>
      <div v-else>
        <GameSlider :data="upcomingReleases" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import GameSlider from '../components/layout/GameSlider';
import Spinner from '../components/layout/Spinner';
import Jumbotron from '../components/layout/Jumbotron'

import '../components/layout/styles/home_style.scss';

export default {
  name: 'Home',
  components: {
    GameSlider,
    Spinner,
    Jumbotron
  },
  methods: {
    ...mapActions(['getRecentDates']),
    goToGames(newText) {
      this.$router.push({
          name: "Games",
          params: {
            initialText: newText
          }
        });
    }
  },
  computed: mapGetters(['recentReleases','upcomingReleases', 'loadingStatus']),
  mounted() {   
    this.getRecentDates();
  } 
}
</script>
