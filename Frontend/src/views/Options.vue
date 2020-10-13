<template>
  <div id="options">
      <div class="container">
            <h2> E-mail Notifications </h2>
            <div class="divider"></div>
            <div class="form-email">
                    <multiselect v-model="selectedMail"  open-direction="bottom" :options="mailSettings" :searchable="false" placeholder="" :show-labels="true" :selectedLabel="'✔'" :deselectLabel="'✘'" :selectLabel="''" :close-on-select="false" ></multiselect>			
                    <button @click="updateMail">Save</button>
            </div>
        </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Multiselect from 'vue-multiselect';

import '../styles/options_style.scss';
export default {
  name: 'Options',
  components: {
        Multiselect
  },
  data() {
      return {
            mailSettings: ["Receive mail notifications","Not receive mail notifications"],
            selectedMail: ""
      }
  },
  methods: {
      ...mapActions(['fetchUserProfile', 'setMailNotifications']),
      async updateMail() {
        if(this.selectedMail == this.mailSettings[0]) {
            await this.setMailNotifications(true);
        } else {
            await this.setMailNotifications(false);
        }

        this.$notify({
            group: 'notify',
            type: 'info',
            title: 'Correctly updated settings!'
        });
      }
  },
  computed: mapGetters(['getUserProfile']),
  async mounted() {   
    await this.fetchUserProfile();     
    if(this.getUserProfile == null) {
        this.$router.push({
            name: "Home"
        });
        this.$notify({
			group: 'notify',
			type: 'error',
			title: 'You need to be signed-in in order to see this page!'
		});
    } else {
        if(this.getUserProfile.mailNotifications) {
            this.selectedMail = this.mailSettings[0];
        } else {
            this.selectedMail = this.mailSettings[1];
        }
    }
  } 
}
</script>

