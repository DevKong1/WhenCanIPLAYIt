import Vue from 'vue'
import Vuex from 'vuex'
import dates from './modules/dates.js'
import games from './modules/games.js'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        dates,
        games
    }
});
