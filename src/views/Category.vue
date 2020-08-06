<template>
  <v-container>
        <div class="d-flex" justify="center" align="center">
        <v-btn link router to="/">Home</v-btn>
        </div>
    <v-layout row warp>
        {{ message }}
      <v-flex xs12 md4 lg3 v-for="item in Category.Products" :key="item.id">
          <v-col>
                <v-card
                class="d-inline-blok mx-2 my-1"
                max-width="400"
                >
                <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="item.imageUrl"
                >
                </v-img>
                <v-toolbar class="white black--text" style="font-size: inherit;" flat>{{item.name}}</v-toolbar>
                <v-card-text class="white black--text">
                    <div>Price : {{Rupiah(item.price)}}</div>
                </v-card-text>
                <v-card-actions class="primary">
                    <v-card-text>
                    <div>Stock : {{item.stock}} </div>
                    </v-card-text>
                    <v-btn
                    color="waring"
                    text
                    @click.prevent="addCart(item)"
                    v-if="isLogin"
                    >
                    Add Whistlist
                    </v-btn>
                </v-card-actions>
                </v-card>
          </v-col>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'CategoryCard',
  data () {
    return {
      message: ''
    }
  },
  methods: {
    Rupiah (uang) {
      if (uang === 0) {
        return `Rp.${uang},00`
      }
      let rupiah = ''
      const convert = uang.toString().split('').reverse().join('')
      for (let i = 0; i < convert.length; i++) {
        if (i % 3 === 0) rupiah += convert.substr(i, 3) + '.'
      }
      return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('') + ',00'
    },
    addCart (product) {
      const payload = {
        ProductId: product.id,
        token: localStorage.token
      }
      this.$store
        .dispatch('addWhistlist', payload)
        .then(({ data }) => {
          this.$store.commit('set_updateWhistlist', data.whistlist)
        })
        .catch(err => {
          this.message = err.response.data.message
        })
    }
  },
  computed: {
    Category () {
      let category = []
      for (let i = 0; i < this.$store.state.Categories.length; i++) {
        if (this.$store.state.Categories[i].type === this.$route.params.type) {
          category = this.$store.state.Categories[i]
        }
      }
      return category
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  created () {
  }
}
</script>

<style>
</style>
