<template>
    <header class="header">
        <div id="rowheader" class="vertical-center">
            <div id="top-brand">
                <div class="logo">
                    <router-link to="/">
                        <img alt="When Can I Play It" src="../../assets/logo.png">
                    </router-link>
                </div>
            </div>
            <div class="content-header-bottom"></div>
            <div id="main-nav"> 
                <ul class="nav navbar-nav">
                    <li>
                        <router-link class="navbar-link" to="/games">GAMES</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
import './styles/header_style.scss'
export default {
    name: "Header"
}
</script>
