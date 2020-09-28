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
    <div class="follow-box" role="button">
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
      </svg>
    </div>
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