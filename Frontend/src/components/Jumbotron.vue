<template>
    <div class="jumbotron text-center">
        <div class="container">
        <h1><a>When Can I PLAY It?</a></h1>
        <div class="md-form pt-4">
            <form @submit.prevent="">
                <input ref="search" v-model="text" @input="$emit('text-changed', text);" class="form-control" type="text" placeholder="Game title...">
            </form>
        </div>
        </div>
    </div>
</template>

<script>
    import '../styles/jumbotron.scss'

    export default {
        name: "Jumbotron",
        props: {
            initialText: String
        },
        data() {
            return {
                text: ""
            }
        },
        mounted() {
            if(this.initialText != null) {
                this.text = this.initialText;
			    this.$refs.search.focus();
            }
        }
    }
</script>
