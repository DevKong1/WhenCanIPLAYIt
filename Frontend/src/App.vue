<template>
  <div id="app">
    <notifications group="notify" position="bottom right" classes="notification-style"/>
    <Header v-on:login-pressed="show()"/>
      <modal name="login-modal" :adaptive="true" :width="'270px'" :height="'135px'" >
        <span class="login-text">Sign in with one of the following options:</span>
        <Google />
    </modal>
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import Google from './components/Google'
import { mapGetters, mapActions } from 'vuex';

import './styles/main_style.scss'

export default {
  name: 'WhenCanIPLAYIt',
  components: {
    Header,
    Footer,
    Google
  },
  metaInfo: {
    title: "When Can You PLAY It!",
    link: [
      { rel: 'icon', href: "/favicon.png" }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
    ]
  },
  methods: {
    ...mapActions(['fetchUserProfile']),
      show () {
          this.$modal.show('login-modal');
      },
      hide () {
          this.$modal.hide('login-modal');
      }
  },
  computed: mapGetters(['getUserProfile']),
  async created() {
	  await this.fetchUserProfile();
    
    if (this.$route.query.loginSuccessful && this.getUserProfile != null) {
		let query = { ...this.$route.query };
		delete query.loginSuccessful;
		this.$router.replace({
			path: this.$route.path,
			query
		});
		this.$notify({
			group: 'notify',
			type: 'notification-success',
			title: 'Signed-in succesfully!'
		});
    }
  }
}
</script> 

<style lang="scss">
	.login-text {
		font-size: small;
		font-weight: bold;
		padding-left: 4px;
	}

  .notification-style {
    padding: 10px;
    margin: 0 5px 5px;

    font-size: 12px;

    color: #ffffff;
    background: #44A4FC;
    border-left: 5px solid #187FE7;

    
    &.warn {
      background: #ffb648;
      border-left-color: #f48a06;
    }

    &.error {
      background: #E54D42;
      border-left-color: #B82E24;
    }

    &.success {
      background: #68CD86;
      border-left-color: #42A85F;
    }

    &.info {
      background: #3c9bac;
      border-left-color: #4389e4;
    }

    &.notification-success {  
      background: #1d9740;
      border-left-color: #68CD86;
    }
  }
</style>