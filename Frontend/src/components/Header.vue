<template>
    <header class="header">    
        <Slide>
            <router-link class="sidebar-option" to="/"><i class="fas fa-home"></i><a class="router-text">HOME</a></router-link>
            <router-link class="sidebar-option" to="/games"><i class="fas fa-gamepad"></i><a class="router-text">GAMES</a></router-link>
            <div v-if="this.getUserProfile != null" class="welcome-msg">
                <img class="avatar" alt="Avatar" :src="this.getUserProfile.image">
                <a>Welcome, {{ this.getUserProfile.nickname }}!</a>
                <div class="settings-i" @click="routeOptions">
                    <i class="fas fa-cog"></i>
                </div>
            </div>
            <a v-if="this.getUserProfile != null" class="sidebar-logout" @click="logoutUser()">Sign Out</a>
            <a v-else class="sidebar-login" @click="$emit('login-pressed')">Sign in</a>
        </Slide>
        <div id="rowheader" class="vertical-center">
            <div id="top-brand">
                <div class="logo">
                    <router-link to="/">
                        <img alt="When Can I Play It" src="../assets/logo.png">
                    </router-link>
                </div>
            </div>
            <div class="content-header-bottom"></div>
        </div>
    </header>
</template>

<script>
import { Slide } from 'vue-burger-menu' 
import { mapGetters, mapActions } from 'vuex';
import '../styles/header_style.scss'

export default {
    name: "Header",
    components: {
        Slide
    },
    methods: {
        ...mapActions(['logout']),
        async logoutUser() {
            await this.logout();
            if(this.getUserProfile == null) {
                
                this.$notify({
                    group: 'notify',
                    type: 'error',
                    title: 'Signed-out succesfully!'
                });
            }
        },
        routeOptions() {
            this.$router.push({
                name: "Options"
            });
        }
    },
    computed: mapGetters(['getUserProfile'])
}
</script>
