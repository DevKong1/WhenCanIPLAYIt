<template>
	<div class="games container">
		<h5 class="text-left">Games ({{188}})</h5>
		<div class="divider"></div>
		<div v-if="loadingMenu">
			<Spinner />
		</div>

		<div v-else>
			<div class="filters-bar">
				<multiselect v-model="selectedRelease" open-direction="bottom" :options="releaseLabels" :searchable="false" placeholder="Release Status" :show-labels="true" :selectedLabel="'✔'" :deselectLabel="'✘'" :selectLabel="''" ></multiselect>
				<multiselect v-model="selectedGenres"  open-direction="bottom" :multiple="true" :options="genres.map(el => el._id)" :custom-label="opt => genres.find(x => x._id == opt).name" :searchable="false" :close-on-select="false" placeholder="Genres" :show-labels="true" :selectedLabel="'✔'" :deselectLabel="'✘'" :selectLabel="''" >
					<template slot="tag">{{ '' }}</template>
					<template slot="selection" slot-scope="{ values, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} genres selected</span></template>
				</multiselect>
				<multiselect v-model="selectedPlatforms"  open-direction="bottom" :multiple="true" :options="platforms.map(el => el._id)" :custom-label="opt => platforms.find(x => x._id == opt).name" :searchable="false" :close-on-select="false" placeholder="Platforms" :show-labels="true" :selectedLabel="'✔'" :deselectLabel="'✘'" :selectLabel="''">
					<template slot="tag">{{ '' }}</template>
					<template slot="selection" slot-scope="{ values, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} platforms selected</span></template>
				</multiselect>
			</div>
			
			<div v-if="loadingGames" class="gamesSpinner">
				<Spinner />
			</div>
			<div v-else class="games-list container-fluid">
				<div class="game-row row" v-for="game in games" :key="game.id">   
					<div class="game-row-image">
						<img :class="game.cover == 'default_cover.jpg' ? 'game-image center-image' : 'game-image' " :src="game.cover">
					</div>
					<div class="game-row-bar purple-bar"></div>
					<div class="game-row-title"> {{game.name}} </div>
					<div class="game-row-release"> 12 </div>
					<div class="game-row-genres"> aa </div>
					<div class="game-row-platforms"> aa </div>
					<div class="game-row-rating"> {{game.aggregated_rating}} </div>
					<div class="game-row-ratingcount"> {{game.aggregated_rating_count}} </div>
					<div class="game-row-timetobeat"> {{game.time_to_beat}} </div>
				</div>
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

import '../components/layout/styles/games_style.scss';

export default {
	name: 'Games',
	components: { 
		Multiselect,
		Spinner
	},
	data() {
		return {
			selectedRelease: '',
			selectedGenres: [],
			selectedPlatforms: [],
			releaseLabels: ["Released","Not Released"]
		}
	},
	methods: {
		...mapActions(['getMenuData','getGames']),
		getReleaseBar(game) {
			return 'game';
		}
	},
	computed: mapGetters(['platforms', 'genres', 'loadingMenu', 'games', 'loadingGames']),
	mounted() {   
		this.getMenuData();
		this.getGames();
	} 
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>