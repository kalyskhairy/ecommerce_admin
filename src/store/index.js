import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const baseUrl = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Products: [],
    isLogin: false,
    whistlist: [],
    Categories: [],
    messageSuccess: '',
    messageError: '',
    dialog: false,
    money: 0,
    history: []
  },
  mutations: {
    set_money (state, payload) {
      state.money = payload
    },
    set_products (state, payload) {
      state.Products = payload
    },
    set_isLogin (state, payload) {
      state.isLogin = payload
    },
    set_addWhistlist (state, payload) {
      state.whistlist.push(payload)
    },
    set_whistlist (state, payload) {
      state.whistlist = payload
    },
    set_updateWhistlist (state, payload) {
      state.whistlist.push(payload)
    },
    set_removeWhistlist (state, payload) {
      const index = state.whistlist.indexOf(payload)
      if (index !== -1) state.whistlist.splice(index, 1)
    },
    set_category (state, payload) {
      state.Categories = payload
    },
    set_messageSuccess (state, payload) {
      state.messageSuccess = payload
    },
    set_messageError (state, payload) {
      state.messageError = payload
    },
    set_history (state, payload) {
      state.history = payload
    }
  },
  actions: {
    fetchProduct (context, payload) {
      axios
        .get(baseUrl + '/products')
        .then(({ data }) => {
          context.commit('set_products', data.Products)
          // console.log(data)
        })
        .catch(err => {
          console.log(err, 'error fetchproduct')
        })
    },
    fetchCategory (context, payload) {
      axios.get(baseUrl + '/categories')
        .then(({ data }) => {
          context.commit('set_category', data.dataProduct)
          // console.log(data, 'ini data category')
        })
        .catch(err => {
          console.log(err, 'error fetchtcateogry')
        })
    },
    fetchWhistlist (context, payload) {
      axios.get(baseUrl + '/transaction', {
        headers: {
          token: payload.token
        }
      })
        .then(({ data }) => {
          context.commit('set_whistlist', data.Cart)
          // console.log(data.Cart, 'ini data whistlist')
        })
        .catch(err => {
          context.commit('set_messageError', err.response.data.message)
        })
    },
    fetchHistory (context, payload) {
      // console.log('masuk')
      axios.get(baseUrl + '/transaction/history', {
        headers: {
          token: payload.token
        }
      })
        .then(({ data }) => {
          // console.log(data.whistlist, 'ini history')
          context.commit('set_history', data.whistlist)
        })
        .catch(err => {
          console.log(err)
        })
    },
    topUp (context, payload) {
      return axios({
        method: 'post',
        url: baseUrl + '/users/topUp',
        headers: {
          token: payload.token
        },
        data: {
          money: payload.money
        }
      })
    },
    addWhistlist (context, payload) {
      // console.log(payload, 'ini payload addWhistlist')
      return axios({
        method: 'post',
        url: baseUrl + '/transaction',
        headers: {
          token: payload.token
        },
        data: {
          ProductId: payload.ProductId
        }
      })
    },
    removeCart (context, payload) {
      return axios({
        method: 'delete',
        url: baseUrl + '/transaction/' + payload.id,
        headers: {
          token: payload.token
        }
      })
    },
    updateCart (context, payload) {
      return axios({
        method: 'put',
        url: baseUrl + '/transaction/' + payload.id,
        headers: {
          token: payload.token
        },
        data: {
          status: payload.status
        }
      })
    }
  },
  modules: {}
})
