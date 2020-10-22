import axios from 'axios'

const state = {
    game: null,
    loading: false
};

const getters = {
    getGame: state => state.game,
    isLoadingGame: state => state.loading
};

const actions = {
    async loadGame({ commit }, game) {
        commit('setLoadingGame', true);

        let { data } = await axios.get("http://localhost:3030/api/game/"+ game);

        commit('setGame', data);
        commit('setLoadingGame', false);
    }
};

const mutations = {
    setGame: (state, game) => state.game = game,
    setLoadingGame: (state, loading) => state.loading = loading
};

export default {
    state,
    getters,
    actions,
    mutations
};