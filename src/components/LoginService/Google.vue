<template>
     <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure">Login</GoogleLogin>
</template>

<script>
    import GoogleLogin from 'vue-google-login';

    export default {
        name: "Google",
        components: {
            GoogleLogin
        },
        data() {
            return {
                params: {
                    client_id: "622730842078-9lofcuu8e3cj16cei8unieq9qgj4ld6h.apps.googleusercontent.com"
                },
                renderParams: {
                    'width': 240,
                    'height': 50,
                    'longtitle': true,
                    'theme': 'dark'
                }
            }
        },
        methods: {
            async onSuccess(user) {
                this.$emit('logged');
                this.$notify({
                    group: 'notify',
                    type: 'success',
                    title: 'Signed-in succesfully!'
                });
                console.log(user.getBasicProfile());
            },
            async onFailure(msg) {
                this.$notify({
                    group: 'notify',
                    type: 'warning',
                    title: 'Signing-in failed!',
                    text: msg
                });
            }
        }
    }
</script>