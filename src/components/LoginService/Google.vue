<template>
<div>
     <a href="http://localhost:3030/api/auth/google">Login</a>
     <button @click="this.logWithGoogle">info</button>
</div>
</template>

<script>
    import GoogleLogin from 'vue-google-login';
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "Google",
        components: {
            GoogleLogin
        },
        data() {
            return {
                renderParams: {
                    'width': 240,
                    'height': 50,
                    'longtitle': true,
                    'theme': 'dark'
                }
            }
        },
        methods: {
            ...mapActions(['fetchUserProfile', 'logout']),
            async logWithGoogle() {
                await this.fetchUserProfile();
                this.$emit('logged');
                console.log(this.getUserProfile);
                if(this.getUserProfile != null) {
                    this.$notify({
                        group: 'notify',
                        type: 'success',
                        title: 'Signed-in succesfully!'
                    });
                }     
                axios.get(`${backendUrl}/api/notifications/test`, { withCredentials: true })     
            }
        },
        computed: mapGetters(['getUserProfile'])
    }
</script>