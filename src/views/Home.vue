<template>
  <div class="home">
    <h1>Welcum</h1>
    <Games />
  </div>
</template>

<script>
import axios from 'axios'
import Games from './Games'

export default {
  name: 'Home',
  components: {
    Games
  }
}
</script>
