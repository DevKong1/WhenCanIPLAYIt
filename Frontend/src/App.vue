<template>
  <div id="app">
    <notifications group="notify" position="bottom left"/>
    <Header v-on:login-pressed="show()"/>
      <modal name="login-modal" :adaptive="true" :width="'270px'" :height="'200px'" >
        <span class="text-center">Login</span>
        <Google v-on:logged="hide()"/>
    </modal>
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import Google from './components/Google'

import './styles/main_style.scss'

export default {
  name: 'WhenCanIPLAYIt',
  components: {
    Header,
    Footer,
    Google
  },
  methods: {
      show () {
          this.$modal.show('login-modal');
      },
      hide () {
          this.$modal.hide('login-modal');
      }
  }
}
</script> 