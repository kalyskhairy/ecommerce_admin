<template>
  <v-app>
    <Navbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from './components/navbar'

export default {
  name: 'App',

  components: {
    Navbar
  },

  data: () => ({
    //
  }),
  created () {
    this.$store.dispatch('fetchProduct')
    this.$store.dispatch('fetchCategory')
    if (localStorage.getItem('token')) {
      this.$store.commit('set_isLogin', true)
      this.$store.commit('set_money', localStorage.money)
    }
  }
}
</script>

<style scoped>
main {
  background-image: url('./assets/background.jpg');
  background-size: cover;
}
</style>
