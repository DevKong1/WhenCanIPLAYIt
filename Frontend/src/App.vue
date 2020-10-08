<template>
  <div id="app">
    <notifications group="notify" position="bottom left"/>
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
			type: 'success',
			title: 'Signed-in succesfully!'
		});
    }
  }
}
</script> 

<style lang="scss" scoped>
	.login-text {
		font-size: small;
		font-weight: bold;
		padding-left: 4px;
	}
</style>