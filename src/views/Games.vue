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
		getGames() {
			const getUrl = "https://api-v3.igdb.com/release_dates";
			const now = new Date(Date.now())
			const query = "fields *; where date >= " + this.getSeconds(now.setDate(now.getDate() - 7))+ "; limit 10; sort date asc;";
			
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