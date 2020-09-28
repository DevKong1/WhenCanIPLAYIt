import axios from 'axios'

const state = {
    loadingMenu: false,
    loadingGames: false,
    platforms: [],
    genres: [],
    games: []
};

const getters = {
    loadingMenu: state => state.loadingMenu,
    loadingGames: state => state.loadingGames,
    platforms: state => state.platforms,
    genres: state => state.genres,
    games: state => state.games
};

const actions = {
    async getMenuData({ commit }) {
        commit('setloadingMenu', true);

        let platforms = await axios.get("http://localhost:3030/api/platforms");   
        commit('setPlatforms', platforms.data);
        let genres = await axios.get("http://localhost:3030/api/genres");         
        commit('setGenres', genres.data);

        commit('setloadingMenu', false);
    },

    async getGames({ commit }, filters) {
        commit('setloadingGames', true);

        let games = await axios.get("http://localhost:3030/api/games", {
            params: {
                limit: 10
            }
        });      

        commit('setGames', games.data);
        commit('setloadingGames', false);
    }
};

const mutations = {
    setloadingMenu: (state, loadingMenu) => state.loadingMenu = loadingMenu,
    setloadingGames: (state, loadingGames) => state.loadingGames = loadingGames,
    setPlatforms: (state, platforms) => state.platforms = platforms,
    setGenres: (state, genres) => state.genres = genres,
    setGames: (state, games) => state.games = games
};

export default {
    state,
    getters,
    actions,
    mutations
};