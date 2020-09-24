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
    <div class="container">
      <h5 class="text-left">Recent releases</h5>
      <div class="divider"></div>
      <div class="row game-gallery">
        <carousel :perPage="4" :navigationEnabled="true">
          <div class="game-box col-md-2" v-for="date in recentDates" :key="date.id">           
            <slide>
              <div class="image-box">
                <div class="background-image">
                  <img :src="date.game.cover">
                </div>
                <div :class="getReleaseBar(date.date)"></div>
              </div>
              <div class="title-box">
                <div class="main-title"> <a> {{ date.game.name }} </a> </div>
                <div class="sub-title"> <a> {{ date.human }} </a> </div>
              </div>            
            </slide>
          </div>          
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import '../components/layout/styles/home_style.scss';
import { Carousel, Slide } from 'vue-carousel';
import moment from 'moment';

Carousel.perpage = 2;

export default {
  name: 'Home',
  components: {
  	Carousel,
    Slide
  },
  methods: {
    ...mapActions(['getRecentDates']),
    getReleaseBar(date) {
        return date < moment().unix() ? 'green-bar' : 'red-bar'; 
    }
  },
  computed: mapGetters(['recentDates']),
  created() {
    this.getRecentDates();
  } 
}
</script>
