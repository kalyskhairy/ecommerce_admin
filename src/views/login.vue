<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="email"
                    clearable
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"
                    v-model="password"
                  ></v-text-field>
                </v-form>
                <v-card-text>Don't have an account ?
                    <a href="/Register" style="text-decoration: none;" @click="getRegister">Registration</a>
                </v-card-text>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="Login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import axios from 'axios'
const baseUrl = 'http://localhost:3000/'
export default {
  name: 'Login',
  data () {
    return {
      show: false,
      email: '',
      password: '',
      message: ''
    }
  },
  methods: {
    getRegister () {
      this.$router.push({ name: 'Register' })
    },
    Login () {
      axios.post(`${baseUrl}users/Login`, {
        email: this.email,
        password: this.password
      })
        .then(({ data }) => {
          // console.log(data.username, 'dari login')
          localStorage.setItem('token', data.token)
          localStorage.setItem('username', data.username)
          localStorage.setItem('money', data.money)
          this.$store.commit('set_isLogin', true)
          this.$store.commit('set_money', localStorage.money)
          this.$router.push({ name: 'Home' })
          this.email = ''
          this.password = ''
        })
        .catch(err => {
          setTimeout(() => {
            this.message = ''
          }, 2000)
          this.message = err.response.data.message
        })
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$router.push({ name: 'Home' })
    }
  },
  computed: {
    money () {
      return this.$store.state.money
    }
  }
}
</script>
