import axios from 'axios'
import moment from 'moment'

const state = {
    recentDates: [],   
};

const getters = {
    recentDates: state => state.recentDates
};

const actions = {
    async getRecentDates({ commit }) {
        let to = moment().add(14, 'days').unix();
        let from = moment().subtract(14, 'days').unix();
        let response = await axios.get("http://localhost:3030/api/releases", {
                params: {
                    "from": from,
                    "to": to,
                    "sort": "date",
                    "category": 0,
                    "limit": 10
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