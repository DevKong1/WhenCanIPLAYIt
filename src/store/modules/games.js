import axios from 'axios'
import moment from 'moment'

const state = {
    loadingMenu: false,
    platforms: [],
    genres: []
};

const getters = {
    loadingMenu: state => state.loadingMenu,
    platforms: state => state.platforms,
    genres: state => state.genres
};

const actions = {
    async getMenuData({ commit }) {
        commit('loadingMenu', true);

        let platforms = await axios.get("http://localhost:3030/api/platforms");   
        commit('setPlatforms', platforms.data);
        let genres = await axios.get("http://localhost:3030/api/genres");         
        commit('setGenres', genres.data);

        commit('loadingMenu', false);
    }
};

const mutations = {
    loadingMenu: (state, loadingMenu) => state.loadingMenu = loadingMenu,
    setPlatforms: (state, platforms) => state.platforms = platforms,
    setGenres: (state, genres) => state.genres = genres
};

export default {
    state,
    getters,
    actions,
    mutations
};