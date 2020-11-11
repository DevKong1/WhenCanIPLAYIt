<template>
<div class="game container d-flex justify-content-center">
    <div class="game-spinner" v-if="this.isLoadingGame">      
        <Spinner />
    </div>
    <div class="info-page container-fluid" v-else-if="this.getGame != null">      
        <div class="container row game-infos-box ">
            <div class="game-cover">
                <img class="cover-img" :src="loadCover(this.getGame.cover)" />
                <div :class="getReleaseBar()"></div>
            </div>        
            <div class="game-infos-box-text">      
                <div class="game-title">{{this.getGame.name}}</div>
                <div class="game-summary">
                    <a v-if="this.getGame.summary != null">{{this.getGame.summary}}</a>
                    <a v-else>Summary N/A</a>
                </div> 
            </div>   
        </div>
        <div class="container row game-infos">
            <div class="col-6 info-box">
                <div class="row release-dates">
                    <span>Release Dates:</span>
                    <div class="container dates-list">
                        <div class="row date-item" v-for="date in this.getGame.release_dates" :key="date._id">
                            <a class="date-platform">{{getGame.platforms.filter(el => el._id == date.platform)[0].name + ": "}}</a>
                            <a class="date-name ">{{date.human}}</a>
                            <FollowDateButton :dateID="date._id" />
                        </div>
                    </div>
                </div>
                <div class="row game-genres" v-if="this.getGame.genres.length > 0">
                    <span>Genres:</span>
                    <a v-for="(genre, index) in this.getGame.genres" :key="genre._id">
                        {{genre.name + (index != getGame.genres.length - 1 ? ", " : "")}}
                    </a>
                </div>
                <div class="row game-rating" >
                    <span>Rating:</span>
                    <div class="rating-value">
                        <a v-if="this.getGame.aggregated_rating != null">{{this.getGame.aggregated_rating.length > 5 ? this.getGame.aggregated_rating.substring(0,5) : this.getGame.aggregated_rating}}</a>
                        <a v-else>N/A</a>
                    </div>
                    <span>Votes:</span>
                    <div class="rating-count">
                        <a v-if="this.getGame.aggregated_rating_count != null">{{this.getGame.aggregated_rating_count}}</a>
                        <a v-else>N/A</a>
                    </div>
                </div>
            </div>
            <div class="col-6 carousel-box">
                <carousel v-if="this.getGame.screenshots.length > 0" class="carousel" :perPage="1" :navigationEnabled="false" :autoplay="true" :loop="true">
                    <slide class="screenshot-box" v-for="ss in this.getGame.screenshots" :key="ss">   
                        <img :src="loadSS(ss)" />
                    </slide>
                </carousel>
            </div> 
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { Carousel, Slide } from 'vue-carousel';
import moment from 'moment';
import Spinner from '../components/Spinner';
import FollowDateButton from '../components/FollowDateButton';
import { getImg } from "../utils/imageUtils";

import '../styles/game_style.scss';
export default {
    name: "Game",
    components: {
        Carousel,
        Slide,
        Spinner,
        FollowDateButton
    },
    data() {
        return {
            gameID: ''
        }
    },
    methods: {
        ...mapActions(['loadGame']),
        getReleaseBar() {
            if(this.getGame.release_dates.filter(el => el.category == 0).length > 0) {
                if(this.getGame.release_dates.filter(el => el.date <= moment().unix()).length > 0) {
                    return 'game-row-bar green-bar';
                } else {
                    return 'game-row-bar red-bar';
                }
            } else {
                return 'game-row-bar purple-bar';
            }
        },
        loadCover(url) {
            return getImg(url, 'default_cover.jpg');
        },
        loadSS(url) {
            return getImg(url, 'default_ss.png');
        }
    },
    computed: mapGetters(['isLoadingGame', 'getGame']),
    mounted() {   
        this.gameID = this.$route.query.gameID;
        this.loadGame(this.gameID);
    } 
    
}
</script>