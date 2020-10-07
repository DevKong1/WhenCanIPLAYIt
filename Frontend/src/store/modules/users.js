import axios from 'axios'

const state = {
    userProfile: null
};

const getters = {
    getUserProfile: state => state.userProfile,
};

const actions = {
    async fetchUserProfile({ commit }) {
        try {
            let promise = axios.get('http://localhost:3030/api/auth/user', { withCredentials: true });
            let { data } = await promise;
            console.log(data);
            commit("setUser", data);
        } catch (e) {
            commit("unsetUser");
            if (!e.response || e.response.status != 401) throw e;
        }
    },
  
      async logout({ commit }) {
        await axios.get('http://localhost:3030/api/auth/logout', { withCredentials: true });
        commit("unsetUser");
      }
};

const mutations = {
    setUser: (state, userProfile) => {
        state.userProfile = userProfile;
    },
    unsetUser: state => {
        state.userProfile = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};