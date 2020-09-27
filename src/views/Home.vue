<template>
  <div id="home">
    <div class="jumbotron text-center">
      <div class="container">
        <h1>When Can You PLAY It?</h1>
        <div class="md-form pt-4">
          <form>
            <input class="form-control" type="text" placeholder="Game title...">
          </form>
        </div>
      </div>
    </div>

  <GameSlider :title="'Recent releases'" :data="recentReleases" />
  <GameSlider :title="'Upcoming games'" :data="upcomingReleases" />

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import '../components/layout/styles/home_style.scss';
import GameSlider from '../components/layout/GameSlider';

export default {
  name: 'Home',
  components: {
  	GameSlider
  },
  methods: {
    ...mapActions(['getRecentDates'])
  },
  computed: mapGetters(['recentReleases','upcomingReleases']),
  mounted() {   
    this.getRecentDates();
  } 
}
</script>
