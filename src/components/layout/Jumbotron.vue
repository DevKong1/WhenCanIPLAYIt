<template>
    <div class="jumbotron text-center">
        <div class="container">
        <h1>When Can You PLAY It?</h1>
        <div class="md-form pt-4">
            <form @submit.prevent="">
                <input v-model="text" @input="$emit('text-changed', text);" class="form-control" type="text" placeholder="Game title...">
            </form>
        </div>
        </div>
    </div>
</template>

<script>
    import './styles/jumbotron.scss'

    export default {
        name: "Jumbotron",
        data() {
            return {
                text: ""
            }
        }
    }
</script>
