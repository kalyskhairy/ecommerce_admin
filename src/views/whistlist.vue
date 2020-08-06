<template>
  <v-container>
    <v-flex>
      <div justify="center" align="center">
        <p>My Whislist</p>
        <p>{{ messageSuccess }}</p>
        <p>{{ messageError }}</p>
      </div>
    </v-flex>
    <v-layout row warp>
      <v-flex xs 12 md4 lg3 v-for="data in Whistlist" :key="data.id">
        <Card :data="data" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Card from '@/components/card.vue'

export default {
  name: 'Whistlist',
  components: {
    Card
  },
  computed: {
    Whistlist () {
      return this.$store.state.whistlist
    },
    messageSuccess () {
      return this.$store.state.messageSuccess
    },
    messageError () {
      return this.$store.state.messageError
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('set_isLogin', true)
      const payload = {
        token: localStorage.getItem('token')
      }
      this.$store.dispatch('fetchWhistlist', payload)
    } else {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>
p {
  background-color: cadetblue;
  size: 20px;
}
</style>
