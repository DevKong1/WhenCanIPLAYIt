import axios from 'axios'

const state = {
    recentDates: [],   
};

const getters = {
    recentDates: state => state.recentDates
};

const actions = {
    async getRecentDates({ commit }) {
        let now = new Date(Date.now());
        let to = getSeconds(now.setDate(now.getDate() + 14));
        let from = getSeconds(now.setDate(now.getDate() - 7));
        let response = await axios.get("http://localhost:3030/api/releases", {
                params: {
                    "from": from,
                    "to": to,
                    "sort": "-date",
                    "limit": 6
                }
            });
        
        commit('setRecentDates', response.data);
    }
};

const mutations = {
    setRecentDates: (state, recentDates) => state.recentDates = recentDates
};

//utils 
function getSeconds(date) {
    return Math.floor(date / 1000)
};


export default {
    state,
    getters,
    actions,
    mutations
};