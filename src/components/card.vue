<template>
  <div>
    <v-card class="mx-1 my-1" max-width="400">
      {{ message }}
      <v-img
        class="white--text align-end"
        height="200px"
        :src="data.Product.imageUrl"
      >
        <v-card-title class="white--text">{{ data.Product.name }}</v-card-title>
      </v-img>
      <v-card-text class="text--primary">
        <div>Price : {{ Rupiah(data.Product.price) }}</div>
        <div>Status : {{ data.status }}</div>
        <div>Stock : {{ data.Product.stock }}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="error" text @click.prevent="removeCart(data)">
          remove
        </v-btn>
        <v-btn color="primary" text @click.prevent="buyCart(data)">
          Buy
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'Card',
  props: ['data'],
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
    removeCart (Cart) {
      const payload = {
        token: localStorage.getItem('token'),
        id: Cart.id
      }
      this.$store
        .dispatch('removeCart', payload)
        .then(({ data }) => {
          this.message = data.message
          this.$store.commit('set_removeWhistlist', Cart)
          setTimeout(() => {
            this.message = ''
          }, 1500)
        })
        .catch(err => {
          setTimeout(() => {
            this.message = ''
          }, 2000)
          this.message = err.response.data.message
        })
    },
    buyCart (Cart) {
      // console.log(Cart, 'dari buyCart')
      const payload = {
        token: localStorage.getItem('token'),
        id: Cart.id,
        status: 'success'
      }
      this.$store
        .dispatch('updateCart', payload)
        .then(({ data }) => {
          // console.log(data.updated, 'data dari buyCart')
          localStorage.money = data.updated.money
          this.$store.commit('set_money', localStorage.money)
          setTimeout(() => {
            this.$store.commit('set_messageSuccess', '')
          }, 2000)
          this.$store.commit('set_messageSuccess', 'Success payment')
          this.$store.commit('set_removeWhistlist', Cart)
        })
        .catch(err => {
          // console.log(err, 'err dari buycart')
          setTimeout(() => {
            this.message = ''
          }, 2000)
          this.message = err.response.data.message
        })
    }
  }
}
</script>

<style></style>
