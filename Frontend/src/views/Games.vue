<template>
<div>
	<Jumbotron :initialText="this.initialText" v-on:text-changed="setText"/>
	<div class="games container">
		<h5 class="text-left">Games({{this.totalGames}})</h5>
		<div class="divider"></div>

		<div v-if="loadingMenu">
			<Spinner />
		</div>
		<div v-else>
			<div class="filters-bar">
				<multiselect v-model="selectedRelease" @input="filterGames()" open-direction="bottom" :options="releaseLabels" :searchable="false" placeholder="Release Status" :show-labels="true" :selectedLabel="'✔'" :deselectLabel="'✘'" :selectLabel="''" :close-on-select="false" ></multiselect>
				<multiselect v-model="selectedGenres"  @close="filterGames()" open-direction="bottom" :multiple="true" :options="genres.map(el => el._id)" :custom-label="opt => genres.find(x => x._id == opt).name" :searchable="false" :close-on-select="false" placeholder="Genres" :show-labels="true" :selectedLabel="'✔'" :deselectLabel="'✘'" :selectLabel="''" >
					<template slot="tag">{{ '' }}</template>
					<template slot="selection" slot-scope="{ values, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} genres selected</span></template>
				</multiselect>
				<multiselect v-model="selectedPlatforms" @close="filterGames()" open-direction="bottom" :multiple="true" :options="platforms.map(el => el._id)" :custom-label="opt => platforms.find(x => x._id == opt).name" :searchable="false" :close-on-select="false" placeholder="Platforms" :show-labels="true" :selectedLabel="'✔'" :deselectLabel="'✘'" :selectLabel="''" >
					<template slot="tag">{{ '' }}</template>
					<template slot="selection" slot-scope="{ values, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} platforms selected</span></template>
				</multiselect>
			</div>

			<div v-if="this.games.length > 0" class="row games-caption">
				<div class="game-caption-image"><span>Cover</span></div>
				<div class="game-caption-title col"><span @click="setSort('name')">Title<a v-if="selectedSort == 'name'">▲</a><a v-else>▼</a></span></div>
				<div class="game-caption-multirelease col-sm"><span>Release Dates</span></div>
				<div class="game-caption-genres col-sm"><span>Genres</span></div>
				<div class="game-caption-rating col-sm"><span @click="setSort('aggregated_rating')">Rating (%)<a v-if="selectedSort == 'aggregated_rating'">▲</a><a v-else>▼</a></span></div>
				<div class="game-caption-ratingcount col-sm"><span @click="setSort('aggregated_rating_count')">N. Votes<a v-if="selectedSort == 'aggregated_rating_count'">▲</a><a v-else>▼</a></span></div>
				<div class="game-caption-timetobeat col-sm"><span @click="setSort('time_to_beat')">TTB<a v-if="selectedSort == 'time_to_beat'">▲</a><a v-else>▼</a></span></div>
			</div>

			<div class="games-list container-fluid">
				<div class="game-row row" v-for="game in games" :key="game.id" @click="getGamePage(game._id)">   
					<div class="game-row-image">
						<img :class="game.cover == 'default_cover.jpg' ? 'game-image center-image' : 'game-image' " :src="game.cover">
					</div>
					<div :class="getReleaseBar(game)"></div>
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
					<div class="game-row-rating" v-html="checkEmptyRating(game.aggregated_rating)"></div>
					<div class="game-row-ratingcount" v-html="checkEmpty(game.aggregated_rating_count)"></div>
					<div class="game-row-timetobeat" v-html="checkEmpty(game.time_to_beat)"></div>
				</div>

				<infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"></infinite-loading>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect';
import { mapGetters, mapActions } from 'vuex';
import Spinner from '../components/Spinner';
import Jumbotron from '../components/Jumbotron'
import moment from 'moment';
import InfiniteLoading from 'vue-infinite-loading';

import '../styles/games_style.scss';

export default {
	name: 'Games',
	components: { 
		Multiselect,
		Spinner,
		InfiniteLoading,
		Jumbotron
	},
	props: ['initialText'],
	data() {
		return {
			page: 1,
			first: true,
      		infiniteId: +new Date(),
			selectedRelease: '',
			selectedGenres: [],
			selectedPlatforms: [],
			releaseLabels: ["Released","Not Released","TBA"],
			searchTitle: "",
			selectedSort: ""
		}
	},
	methods: {
		...mapActions(['getMenuData','getGames', 'loadGames', 'reset']),
		setText(newText) {
			this.searchTitle = newText;		
			this.page = 1;
			this.first = true;
			this.reset();
      		this.infiniteId += 1;
		},
		getReleaseBar(game) {
			if(game.release_dates.filter(el => el.category == 0).length > 0) {
				if(game.release_dates.filter(el => el.date <= moment().unix()).length > 0) {
					return 'game-row-bar green-bar';
				} else {
					return 'game-row-bar red-bar';
				}
			} else {
				return 'game-row-bar purple-bar';
			}
		},
		checkEmpty(element) {
			if(element != null) {
				return element;
			} else {
				return 'N/A';
			}
		},
		checkEmptyRating(el) {
			if(el == null) {
				return `N/A <div class="rating-box grey"></div>`;
			} else {
				return el + `%<div class="rating-box r` +  el + `"></div>`;
			}
		},
		setSort(value) {
			if(this.selectedSort == value) {
				this.selectedSort = "-" + value;
			} else {		
				this.selectedSort = value;
			}
			this.page = 1;
			this.first = true;
			this.reset();
      		this.infiniteId += 1;
		},
		infiniteHandler($state) {
			if(this.loadedAll == false && this.loadingGames == false) {
				let released; 

				switch(this.selectedRelease) {
					case "Released": 
						released = true;
						break;
					case "Not Released":
						released = false;
						break;
					case "TBA":
						released = "TBA"
						break;
					default:
						released = null;
				}

				this.loadGames({
						params: {
							page: this.page,
							limit: 20,
							released: released,
							genres: this.selectedGenres.length > 0 ? this.selectedGenres : null,
							platforms: this.selectedPlatforms.length > 0 ? this.selectedPlatforms : null,
							name: this.searchTitle,
							sort: this.selectedSort == "" ? null : this.selectedSort
						}
					})
					.then(loadState => {
						if(this.loadedAll == false) {
							this.page++;
							$state.loaded();
						} else {
							if(this.page == 1 && this.games.length > 0) {
								$state.loaded();
								$state.complete();
							} else {
								$state.complete();
							}
							
						}
					})
					.catch(error => {
						console.log("Error downloading data: " + error);
						$state.error();
					});
			} else {
				$state.complete();
			}
		},
		filterGames () {
			this.page = 1;
			this.first = true;
			this.reset();
      		this.infiniteId += 1;
		},
		getGamePage(id) {
		this.$router.push({
			name: "Game",
			query: {
				gameID: id
			}
			});
		}
	},
	computed: mapGetters(['platforms', 'genres', 'loadingMenu', 'games', 'loadedAll', 'loadingGames', 'totalGames']),
	mounted() {   
		if(this.initialText != null) {
			this.searchTitle == this.initialText;
		}
		this.getMenuData();
		this.reset();
		this.infiniteId = +new Date();	
		  	
	} 
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>