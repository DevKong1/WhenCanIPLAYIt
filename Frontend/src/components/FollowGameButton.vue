<template>
    <div class="follow-box" role="button"  @click="followClick()">
      <i v-if="isFollowed" class="fas fa-heart"></i>
      <i v-else class="far fa-heart"></i>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'FollowGameButton',
  props: {
    gameID: String
  },
  methods: {
    ...mapActions(['followGame', 'unfollowGame']),
    async followClick() {
        if(this.getUserProfile != null && !this.getUserProfile.gamesFollowed.includes(this.gameID)) {
            await this.followGame(this.gameID);
        } else if (this.getUserProfile != null){
            await this.unfollowGame(this.gameID);
        } 
    }
  },
  computed: {
      ...mapGetters(['getUserProfile']),
      isFollowed() {
          return this.getUserProfile != null && this.getUserProfile.gamesFollowed.includes(this.gameID);
      }
  }
}
</script>