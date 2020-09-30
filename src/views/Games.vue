<template>
	<div class="games container">
		<h5 class="text-left">Games ({{188}})</h5>
		<div class="divider"></div>
		<div v-if="loadingMenu || loadingGames">
			<Spinner />
		</div>

		<div v-else>
			<div class="filters-bar">
				<multiselect v-model="selectedRelease" open-direction="bottom" :options="releaseLabels" :searchable="false" placeholder="Release Status" :show-labels="true" :selectedLabel="'✔'" :deselectLabel="'✘'" :selectLabel="''" ></multiselect>
				<multiselect v-model="selectedGenres"  open-direction="bottom" :multiple="true" :options="genres.map(el => el._id)" :custom-label="opt => genres.find(x => x._id == opt).name" :searchable="false" :close-on-select="false" placeholder="Genres" :show-labels="true" :selectedLabel="'✔'" :deselectLabel="'✘'" :selectLabel="''" >
					<template slot="tag">{{ '' }}</template>
					<template slot="selection" slot-scope="{ values, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} genres selected</span></template>
				</multiselect>
				<multiselect v-model="selectedPlatforms"  open-direction="bottom" :multiple="true" :options="platforms.map(el => el._id)" :custom-label="opt => platforms.find(x => x._id == opt).name" :searchable="false" :close-on-select="false" placeholder="Platforms" :show-labels="true" :selectedLabel="'✔'" :deselectLabel="'✘'" :selectLabel="''" >
					<template slot="tag">{{ '' }}</template>
					<template slot="selection" slot-scope="{ values, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} platforms selected</span></template>
				</multiselect>
			</div>

			<div class="games-list container-fluid">
				<div class="game-row row" v-for="game in games" :key="game.id">   
					<div class="game-row-image">
						<img :class="game.cover == 'default_cover.jpg' ? 'game-image center-image' : 'game-image' " :src="game.cover">
					</div>
					<div class="game-row-bar purple-bar"></div>
					<div class="game-row-title col"> {{game.name}} </div>
					<ul v-if="game.release_dates.length > 1" class="game-row-multirelease col-sm">
						<li v-for="date in game.release_dates" :key="date._id" class="game-row-release-multi">
							<a v-if="game.release_dates.indexOf(date) < 2" >{{platforms.filter(el => el._id == date.platform)[0].name + ' : ' + date.human}}</a>
							<a v-else>...</a>
						</li>
					</ul>
					<ul v-else class="game-row-multirelease col-sm">
						<li class="game-row-release-multi"/>
						<li class="game-row-release-multi"><a>{{platforms.filter(el => el._id == game.release_dates[0].platform)[0].name + ' : ' + game.release_dates[0].human}}</a></li>				
						<li class="game-row-release-multi"/>
					</ul>

					<ul v-if="game.genres.length > 1" class="game-row-genres game-row-multirelease col-sm">
						<li v-for="genre in game.genres" :key="genre._id" class="game-row-release-multi">
							<a v-if="game.genres.indexOf(genre) < 2" >{{genres.filter(el => el._id == genre._id)[0].name}}</a>
							<a v-else>...</a>
						</li>
					</ul>
					<ul v-else-if="game.genres.length > 0" class="game-row-genres game-row-multirelease col-sm">
						<li class="game-row-release-multi"/>
						<li class="game-row-release-multi"><a>{{genres.filter(el => el._id == game.genres[0]._id)[0].name}}</a></li>				
						<li class="game-row-release-multi"/>
					</ul>
					<ul v-else class="game-row-genres game-row-multirelease col-sm">
						<li class="game-row-release-multi"/>
						<li class="game-row-release-multi"><a>N/A</a></li>				
						<li class="game-row-release-multi"/>
					</ul>
					<div class="game-row-rating" v-html="checkEmpty(game.aggregated_rating)"></div>
					<div class="game-row-ratingcount" v-html="checkEmpty(game.aggregated_rating_count)"></div>
					<div class="game-row-timetobeat" v-html="checkEmpty(game.time_to_beat)"></div>
					<div class="follow-box" role="button">
						<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
						</svg>
					</div>
				</div>

				<infinite-loading @infinite="infiniteHandler"></infinite-loading>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect';
import { mapGetters, mapActions } from 'vuex';
import Spinner from '../components/layout/Spinner';
import moment from 'moment';
import InfiniteLoading from 'vue-infinite-loading';

import '../components/layout/styles/games_style.scss';

export default {
	name: 'Games',
	components: { 
		Multiselect,
		Spinner,
		InfiniteLoading
	},
	data() {
		return {
			page: 1,
			selectedRelease: '',
			selectedGenres: [],
			selectedPlatforms: [],
			releaseLabels: ["Released","Not Released"]
		}
	},
	methods: {
		...mapActions(['getMenuData','getGames', 'loadMoreGames']),
		getReleaseBar(game) {
			return 'game';
		},
		checkEmpty(element) {
			if(element != null) {
				return element;
			} else {
				return 'N/A';
			}
		},
		infiniteHandler($state) {
			if(this.loadedAll == false) {
				this.loadMoreGames(++this.page)
					.then(loadState => {
						$state.loaded();
					})
					.catch(error => {
						console.log("Error downloading data: " + error);
						$state.error();
					});
			} else {
				$state.complete();
			}
		}
	},
	computed: mapGetters(['platforms', 'genres', 'loadingMenu', 'games', 'loadingGames', 'loadedAll']),
	mounted() {   
		this.getMenuData();
		this.getGames();
	} 
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>