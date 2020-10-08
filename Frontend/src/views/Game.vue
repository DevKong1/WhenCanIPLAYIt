<template>
<div class="game">
    <div v-if="this.isLoadingGame">      
        <Spinner />
    </div>
    <div v-else>      
        <carousel v-if="this.getGame != null" class="carousel row" :paginationEnabled="false" :navigationEnabled="false" :autoplay="true" :loop="true" :adjustableHeight="true">
            <slide class="sreenshot-box" v-for="ss in this.getGame.screenshots" :key="ss">   
                <div class="image">
                    <img :src="ss" />
                </div>
            </slide>
        </carousel>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { Carousel, Slide } from 'vue-carousel';
import Spinner from '../components/Spinner';

import '../styles/game_style.scss';
export default {
    name: "Game",
    components: {
        Carousel,
        Slide,
        Spinner
    },
    data() {
        return {
            gameID: ''
        }
    },
    methods: {
    ...mapActions(['loadGame'])
    },
    computed: mapGetters(['isLoadingGame', 'getGame']),
    mounted() {   
        this.gameID = this.$route.query.gameID;
        this.loadGame(this.gameID);
    } 
    
}
</script>