<template>  
<div class="game-gallery">
<carousel class="row" :perPageCustom="perPages" :paginationEnabled="false" :navigationEnabled="true" :navigationClickTargetSize="20">
    <slide class="game-box col-md-2" v-for="date in data" :key="date.id">       
    <div class="image-box">
        <div class="background-image">
          <img :src="date.game.cover">
        </div>
        <div :class="getReleaseBar(date.date)"></div>
    </div>
    <div class="title-box">
        <div class="main-title"> <a> {{ date.game.name }} </a> </div>
        <div class="sub-title"> <a> {{ date.platform.name }} </a> </div>
        <div class="sub-title"> <a> {{ date.human }} </a> </div>
    </div>
    <div class="follow-box" role="button"><i class="far fa-heart"></i></div>
    </slide>      
</carousel>
</div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import moment from 'moment';

export default {
  name: 'GameSlider',
  components: {
  	Carousel,
    Slide
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
        return date < moment().unix() ? 'green-bar' : 'red-bar'; 
    }
  }
}
</script>