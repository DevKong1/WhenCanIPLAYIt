import axios from 'axios'

const state = {
    loadingMenu: false,
    loadedAll: false,
    loadingGames: false,
    totalGames: 0,
    platforms: [],
    genres: [],
    games: []
};

const getters = {
    loadingMenu: state => state.loadingMenu,
    loadingGames: state => state.loadingGames,
    loadedAll: state => state.loadedAll,
    platforms: state => state.platforms,
    genres: state => state.genres,
    games: state => state.games,
    totalGames: state => state.totalGames
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

    async reset({ commit }) {
        commit('resetGames');
        commit('setTotalGames', 0);
        commit('loadedAll', false);
    },
   
    async loadGames({ commit }, filters) {
        commit('setloadingGames', true);
        
        let games = await axios.get("http://localhost:3030/api/games", filters);

        //We are only interested in the most updated release date
        games.data.docs.forEach(game => {    
            if(game.aggregated_rating != null){
                game.aggregated_rating = Number(Number(game.aggregated_rating).toFixed(0));
            } 
            if(game.time_to_beat != null){
                game.time_to_beat = Number(Number(game.time_to_beat/60).toFixed(1));
            }
        });

        if(games.data.hasNextPage == false) {
            commit('loadedAll', true);
        }
        
        commit('setTotalGames', games.data.totalDocs);
        commit('addGames', games.data.docs);
        commit('setloadingGames', false);
    }
};

const mutations = {
    setloadingMenu: (state, loadingMenu) => state.loadingMenu = loadingMenu,
    setloadingGames: (state, loadingGames) => state.loadingGames = loadingGames,
    setPlatforms: (state, platforms) => state.platforms = platforms,
    setGenres: (state, genres) => state.genres = genres,
    addGames: (state, games) => state.games = state.games.concat(games),
    setTotalGames: (state, n) => state.totalGames = n,
    loadedAll: (state, loaded) => state.loadedAll = loaded,
    resetGames: (state) => state.games = []
};

export default {
    state,
    getters,
    actions,
    mutations
};

