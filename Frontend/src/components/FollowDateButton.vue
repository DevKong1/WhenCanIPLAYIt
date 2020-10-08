<template>
    <div class="follow-box" role="button"  @click="followClick()">
      <i v-if="isFollowed" class="fas fa-heart"></i>
      <i v-else class="far fa-heart"></i>
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
        } else if (this.getUserProfile != null){
            await this.unfollowDate(this.dateID);
        } 
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