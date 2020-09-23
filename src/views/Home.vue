<template>
  <div id="home">
    <div class="jumbotron text-center">
      <div class="container">
        <h1>When Can You PLAY It?</h1>
        <div class="md-form pt-4">
          <form>
            <input class="form-control" type="text" placeholder="Game title..." aria-label="Search">
          </form>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <a>Recent releases</a>
        <div v-for="date in recentDates" :key="date.id" class="game-box col-sm-2">
          <div class="image-box">
            <div class="background-image">
              <img :src="date.game.cover">
            </div>
            <div class="red-bar"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import '../components/layout/styles/home_style.scss';

export default {
  name: 'Home',
  methods: {
    ...mapActions(['getRecentDates'])
  },
  computed: mapGetters(['recentDates']),
  created() {
    this.getRecentDates();
  } 
}
</script>
