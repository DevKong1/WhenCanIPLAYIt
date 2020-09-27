import axios from 'axios'
import moment from 'moment'

const state = {
    recentReleases: [],   
    upcomingReleases: [],
    loadingStatus: false
};

const getters = {
    recentReleases: state => state.recentReleases,
    upcomingReleases: state => state.upcomingReleases,
    loadingStatus: state => state.loadingStatus
};

const actions = {
    async getRecentDates({ commit }) {
        commit('loadingStatus', true);

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
        commit('loadingStatus', false);
    }
};

const mutations = {
    setRecentReleases: (state, recentReleases) => state.recentReleases = recentReleases,
    setUpcomingReleases: (state, upcomingReleases) => state.upcomingReleases = upcomingReleases,
    loadingStatus: (state, newLoadingStatus) => state.loadingStatus = newLoadingStatus
};

export default {
    state,
    getters,
    actions,
    mutations
};