import axios from 'axios'
import moment from 'moment'

const state = {
    recentReleases: [],   
    upcomingReleases: []
};

const getters = {
    recentReleases: state => state.recentReleases,
    upcomingReleases: state => state.upcomingReleases
};

const actions = {
    async getRecentDates({ commit }) {
        let to = moment().add(28, 'days').unix();
        let from = moment().subtract(7, 'days').unix();
        let response = await axios.get("http://localhost:3030/api/releases", {
                params: {
                    "from": from,
                    "to": to,
                    "sort": "date",
                    "category": 0
                }
            });
            
        commit('setUpcomingReleases', response.data.filter(el => el.date > moment().unix()));
        commit('setRecentReleases', response.data.filter(el => el.date <= moment().unix()));
    }
};

const mutations = {
    setRecentReleases: (state, recentReleases) => state.recentReleases = recentReleases,
    setUpcomingReleases: (state, upcomingReleases) => state.upcomingReleases = upcomingReleases
};

export default {
    state,
    getters,
    actions,
    mutations
};