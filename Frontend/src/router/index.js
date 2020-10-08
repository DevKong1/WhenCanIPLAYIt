import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Games from '../views/Games.vue'
import Game from '../views/Game.vue'

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
  }
]

const router = new VueRouter({
	mode: 'history',
	routes: routes
})

export default router
