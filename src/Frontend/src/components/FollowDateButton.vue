<template>
    <div class="follow-box" role="button"  @click="followClick()" v-html="getIcon()">
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'FollowDateButton',
  props: {
    dateID: String
  },
  methods: {
    ...mapActions(['followDate', 'unfollowDate']),
    async followClick() {
        if(this.getUserProfile != null && !this.getUserProfile.datesFollowed.includes(this.dateID)) {
            await this.followDate(this.dateID);
            this.$notify({
              group: 'notify',
              type: 'info',
              title: 'Followed Game!'
            });
        } else if (this.getUserProfile != null){
            await this.unfollowDate(this.dateID);
            this.$notify({
              group: 'notify',
              type: 'info',
              title: 'Unfollowed Game!'
            });
        } else {
          this.$notify({
              group: 'notify',
              type: 'error',
              title: 'Sign-in in order to follow games!'
            });
        }
    },
    getIcon() {
      return this.isFollowed ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    }
  },
  computed: {
      ...mapGetters(['getUserProfile']),
      isFollowed() {
          return this.getUserProfile != null && this.getUserProfile.datesFollowed.includes(this.dateID);
      }
  }
}
</script>