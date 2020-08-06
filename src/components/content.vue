<template>
  <v-container>
    <v-carousel>
      <v-carousel-item
        v-for="(item, i) in Products"
        :key="i"
        :src="item.imageUrl"
        reverse-transition="fade-transition"
        transition="fade-transition"
        progress="true"
        progress-color="blue"
        interval="3000"
        continuous
      ></v-carousel-item>
    </v-carousel>
    <v-layout row warp>
      <v-flex v-for="data in Categories" :key="data.id">
        <v-col>
          <div>
            <v-btn link :data="data.Products" router :to="`/${data.type}`">
            {{ data.type }}
            </v-btn>
          </div>
        </v-col>
      </v-flex>
    </v-layout>
    <v-layout row warp>
      <v-flex v-for="data in Products" :key="data.id">
        <v-card class="mx-auto mt-5" max-width="300">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="data.imageUrl"
          >
            <v-card-title>{{ data.name }} </v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">{{
            data.Category.type
          }}</v-card-subtitle>

          <v-card-text class="text--primary">
            <div>Price : {{ Rupiah(data.price) }}</div>

            <div>Stock : {{ data.stock }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="orange"
              text
              v-if="isLogin"
              @click.prevent="addCart(data)"
            >
              Add Whislits
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Content',
  props: ['Products', 'Categories'],
  data () {
    return {
      message: '',
      cardId: null,
      disabled: false,
      dialog: false
    }
  },
  methods: {
    Rupiah (uang) {
      if (uang === 0) {
        return `Rp.${uang},00`
      }
      let rupiah = ''
      const convert = uang
        .toString()
        .split('')
        .reverse()
        .join('')
      for (let i = 0; i < convert.length; i++) {
        if (i % 3 === 0) rupiah += convert.substr(i, 3) + '.'
      }
      return (
        'Rp. ' +
        rupiah
          .split('', rupiah.length - 1)
          .reverse()
          .join('') +
        ',00'
      )
    },
    addCart (product) {
      // console.log(product.id, 'ini addCart')
      const payload = {
        ProductId: product.id,
        token: localStorage.token
      }
      this.$store
        .dispatch('addWhistlist', payload)
        .then(({ data }) => {
          // console.log(data, 'ini data addCart')
          this.$store.commit('set_updateWhistlist', data.whistlist)
        })
        .catch(err => {
          console.log(err.response, 'ini error addCart')
        })
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  created () {
    if (localStorage.token) {
      this.$store.commit('set_isLogin', true)
    }
  }
}
</script>

<style></style>
