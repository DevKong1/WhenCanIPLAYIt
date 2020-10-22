import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Games from '../views/Games.vue'
import Game from '../views/Game.vue'
import Options from '../views/Options.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
	path: '/games',
	name: 'Games',
	props: true,
	component: Games
  },
  {
	path: '/game',
	name: 'Game',
	props: true,
	component: Game
  },
  {
	path: '/options',
	name: 'Options',
	component: Options,
	beforeEnter: async (to, from, next) => {
		await store.dispatch("fetchUserProfile");     
    	if(store.getters["getUserProfile"] == null) {
			next({ name: 'Home' });
			Vue.notify({
				group: 'notify',
				type: 'error',
				title: 'You need to be signed-in in order to see this page!'
			});
		}
		next();
	}
  }
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: routes
})

export default router;
