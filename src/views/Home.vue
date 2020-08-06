<template>
 <v-container>
   <v-main app>
     <Content :Products="Products" :Categories="Categories" />
   </v-main>
 </v-container>
</template>

<script>
// @ is an alias to /src
import Content from '@/components/content.vue'

export default {
  name: 'Home',
  components: {
    Content
  },
  computed: {
    Products () {
      return this.$store.state.Products
    },
    Categories () {
      return this.$store.state.Categories
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('fetchProduct')
      this.$store.dispatch('fetchCategory')
      this.$store.commit('set_isLogin', true)
    }
  }
}
</script>
