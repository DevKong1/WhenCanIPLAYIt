import axios from 'axios';
import Vue from 'vue';

const state = {
    userProfile: null
};

const getters = {
    getUserProfile: state => state.userProfile,
};

const actions = {
    async fetchUserProfile({ commit }) {
        try {
            let promise = axios.get("http://localhost:3030/api/auth/user", { withCredentials: true });
            let { data } = await promise;
            commit("setUser", data);
        } catch (e) {
            commit("unsetUser");
            
            if (!e.response || e.response.status != 401){
                throw e;
            }
        }
    },
  
    async logout({ commit }) {
        await axios.get("http://localhost:3030/api/auth/logout", { withCredentials: true });
        commit("unsetUser");
    },

    async followDate({ commit }, date) {
        let { data } = await axios.post("http://localhost:3030/api/follow/date", [date], { withCredentials: true });
        await commit("setUser", data);
    },

    async unfollowDate({ commit }, date) {
        let { data } = await axios.put("http://localhost:3030/api/follow/date", [date], { withCredentials: true });
        await commit("setUser", data);
    },

    async followGame({ commit }, game) {
        let { data } = await axios.post("http://localhost:3030/api/follow/game", [game], { withCredentials: true });
        await commit("setUser", data);
    },

    async unfollowGame({ commit }, game) {
        let { data } = await axios.put("http://localhost:3030/api/follow/game", [game], { withCredentials: true });
        await commit("setUser", data);
    },

    async setMailNotifications({ commit }, value) {
        let { data } = await axios.put("http://localhost:3030/api/notifications/mail", [value], { withCredentials: true });
        await commit("setUser", data);
    },
};

const mutations = {
    setUser: (state, userProfile) => {
        Vue.set(state, 'userProfile', userProfile);
    },
    unsetUser: state => {
        Vue.set(state, 'userProfile', null);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};