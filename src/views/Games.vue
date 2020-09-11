<template>
	<div>
		<div v-bind:key="game.game" v-for="game in games">
			<h3>{{game}}</h3>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'Games',
	data() {
		return {
			games: []
		}
	},
	methods: {
		getNowSeconds() {
			return Math.floor(Date.now() / 1000)
		},
		getGames() {
			const getUrl = "https://api-v3.igdb.com/release_dates";
			const query = "fields *; where date >= " + this.getNowSeconds() + "; limit 50; sort date asc;";
			
			axios.get("http://localhost:3030/api/queryservice", {
				params: {
					"url": getUrl,
					"query": query
				}
			})
			.then(response => {
				this.games = response.data
			})
			.catch(error => (console.log(error)));
		},
		init() {
			this.getGames();
		}
	},
	created() {
		this.init()
	}
}
</script>