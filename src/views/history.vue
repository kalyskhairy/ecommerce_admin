<template>
<v-container>
   <v-simple-table fixed-header height="600px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Image</th>
          <th class="text-left">Name</th>
          <th class="text-left">Status</th>
          <th class="text-left">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in History" :key="item.name">
          <img :src="item.Product.imageUrl" height="50">
          <td>{{ item.Product.name }}</td>
          <td>{{ item.status }}</td>
          <td> {{ Rupiah(item.Product.price) }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</v-container>
</template>

<script>
export default {
  name: 'History',
  data () {
    return {
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
    }
  },
  computed: {
    History () {
      return this.$store.state.history
    }
  },
  created () {
    // console.log('masuk')
    if (localStorage.getItem('token')) {
      const payload = {
        token: localStorage.getItem('token')
      }
      this.$store.dispatch('fetchHistory', payload)
    } else {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>
</style>
