<template>  
<div class="game-gallery">
<carousel class="row" :perPageCustom="perPages" :paginationEnabled="false" :navigationEnabled="true" :navigationClickTargetSize="20">
    <slide class="game-box col-md-2" v-for="date in data" :key="date._id">       
      <div class="image-box">
          <div class="background-image">
            <img :src="loadImage(date.game.cover)">
          </div>
          <div :class="getReleaseBar(date.date)"></div>
      </div>
      <div class="title-box" @click="getGamePage(date.game._id)">
          <div class="main-title"> <a> {{ date.game.name }} </a> </div>
          <div class="sub-title"> <a> {{ date.platform.name }} </a> </div>
          <div class="sub-title"> <a> {{ date.human }} </a> </div>
      </div>
      <FollowDateButton :dateID="date._id" />
    </slide>      
</carousel>
</div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import moment from 'moment';
import FollowDateButton from "./FollowDateButton";
import { getImg } from "../utils/imageUtils";

export default {
  name: 'GameSlider',
  components: {
  	Carousel,
    Slide,
    FollowDateButton
  },
  props: {
    data: Array
  },
  data () {
    return {
      perPages: [[0,1.655],[500,2.35],[525,2.4],[540,2.45],[768,4.5],[1200,5.4]]
    }
  },
  methods: {
    getReleaseBar(date) {
        return date < moment().unix() ? 'slider-bar green-bar' : 'slider-bar red-bar'; 
    },
    getGamePage(id) {
      this.$router.push({
          name: "Game",
          query: {
            gameID: id
          }
        });
    },
    loadImage(url) {
      return getImg(url, 'default_cover.jpg');
    }
  }
}
</script>