<template>
  <v-container fluid style="display: flex; justify-content: center">
    <v-col cols="12" md="6">
      <v-sheet elevation="12" class="pa-10 primary">
        {{ messageSuccess }}
        {{ messageError }}
        <v-form>
          <v-text-field
            v-model="model"
            :hint="hint"
            placeholder="topup ..."
            outlined
            type="number"
            rounded
            solo
            single-line
            clearable
            persistent-hint
            :loading="loading"
          ></v-text-field>
          <div class="mt-12 text-center">Top up : {{ Rupiah(model) }}</div>
          <div class="mt-12 text-center">my money : {{ Rupiah(money) }}</div>
          <v-btn value="recent" @click.prevent="topUp()">
            <span>Top up!</span>
            <v-icon>mdi-wallet-plus-outline</v-icon>
          </v-btn>
        </v-form>
      </v-sheet>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: 'Topup',
  data: () => ({
    model: 0,
    hint: 'value must integer',
    loading: false
  }),
  methods: {
    topUp () {
      // console.log('masuk')
      // console.log(this.model)
      // console.log(typeof parseInt(this.model))
      // console.log('===')
      const payload = {
        token: localStorage.token,
        money: this.model
      }
      this.$store
        .dispatch('topUp', payload)
        .then(({ data }) => {
          // console.log(data, 'ini data topup')
          this.model = 0
          this.loading = true
          setTimeout(() => {
            setTimeout(() => {
              this.$store.commit('set_messageSuccess', '')
            }, 2000)
            this.$store.commit('set_messageSuccess', 'successfuly top up')
            localStorage.setItem('money', data.user.money)
            this.$store.commit('set_money', localStorage.money)
            this.loading = false
          }, 3000)
        })
        .catch(err => {
          // console.log(err, 'ini error topup')
          this.$store.commit('set_messageError', err.response.data.message)
        })
    },
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
    }
  },
  computed: {
    money () {
      return this.$store.state.money
    },
    messageSuccess () {
      return this.$store.state.messageSuccess
    },
    messageError () {
      return this.$store.state.messageError
    }
  },
  created () {
    if (!localStorage.getItem('token')) {
      this.$router.push({ name: 'Home' })
    } else {
      this.$store.commit('set_isLogin', true)
    }
  }
}
</script>

<style>
#v-main__warp {
  display: flex;
  justify-content: center;
}
</style>
