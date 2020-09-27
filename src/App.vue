<template>
  <div id="app">
    <Header />
    <Jumbotron />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Jumbotron from './components/layout/Jumbotron'

export default {
  name: 'WhenCanIPLAYIt',
  components: {
    Header,
    Footer,
    Jumbotron
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #27282e;
  background-repeat:repeat;
  min-height: 100vh;
  display:flex; 
  flex-direction:column; 
}
</style>
