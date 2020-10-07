<template>
    <header class="header">    
        <Slide>
            <router-link class="sidebar-option" to="/"><i class="fas fa-home"></i><a class="router-text">HOME</a></router-link>
            <router-link class="sidebar-option" to="/games"><i class="fas fa-gamepad"></i><a class="router-text">GAMES</a></router-link>
            <a class="sidebar-login" @click="$emit('login-pressed')">Sign in</a>
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
import '../styles/header_style.scss'

export default {
    name: "Header",
    components: {
        Slide
    }
}
</script>
