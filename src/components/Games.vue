<template>
	<div>
		<div v-bind:key="game.game" v-for="game in games">
			<h3>{{game}}</h3>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import apicalypse from 'apicalypse'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default {
	name: 'Games',
	data() {
		return {
			games: []
		}
	},
	created() {
		const now = new Date();
		apicalypse("fields *; where date > " + now.getTime() + "; limit 10")
			.request("http://localhost:3000/https://api-v3.igdb.com/release_dates")
			.then(res => this.games = res.data)
			.catch(err => console.log(err));
	}

}
</script>