<template>
  <div id="app">
    <notifications group="notify" position="bottom left"/>
    <Header v-on:login-pressed="show()"/>
      <modal name="login-modal" :adaptive="true" >
        Login
        <Google v-on:logged="hide()"/>
    </modal>
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Google from './components/LoginService/Google'

import './components/layout/styles/main_style.scss'

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