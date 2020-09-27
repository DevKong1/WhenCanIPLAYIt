<template>
	<div class="games container">
		<h5 class="text-left">Games ({{188}})</h5>
		<div class="divider"></div>
		<div v-if="loadingMenu">
			<Spinner />
		</div>
		<div v-else>
			<div class="filters-bar">
				<multiselect v-model="selectedRelease" open-direction="bottom" :options="releaseLabels" :searchable="false" placeholder="Release Status" :show-labels="false"></multiselect>
				<multiselect v-model="selectedGenres"  open-direction="bottom" :multiple="true" :options="genres.map(el => el.name)" :searchable="false" :close-on-select="false" placeholder="Genres" :show-labels="false"></multiselect>
				<multiselect v-model="selectedPlatforms"  open-direction="bottom" :multiple="true" :options="platforms.map(el => el.name)" :searchable="false" :close-on-select="false" placeholder="Platforms" :show-labels="false"></multiselect>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect';
import { mapGetters, mapActions } from 'vuex';
import Spinner from '../components/layout/Spinner';

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
		...mapActions(['getMenuData'])
	},
	computed: mapGetters(['platforms', 'genres', 'loadingMenu']),
	mounted() {   
		this.getMenuData();
	} 
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>