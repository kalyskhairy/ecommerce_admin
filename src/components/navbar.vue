<template>
  <v-container>
    <nav>
      <v-navigation-drawer
        v-model="drawer"
        app
        clipped
        temporary
        v-if="isLogin"
      >
        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.text"
            link
            router
            :to="item.router"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-subheader class="mt-4 grey--text text--darken-1"
            >My Account</v-subheader
          >
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-img
                  src="https://cdn0.iconfinder.com/data/icons/man-user-human-profile-avatar-business-person/100/09B-1User-512.png"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-title>{{ username }}</v-list-item-title>
            </v-list-item>
            <v-list-item>
                <v-list-item-title>
                    Money : {{ Rupiah(money) }}
                </v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list-item class="mt-4" link>
            <v-list-item-action>
              <v-icon color="grey darken-1">mdi-logout-variant</v-icon>
            </v-list-item-action>
            <v-list-item-title class="grey--text text--darken-1" @click="Logout"
              >Log out</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app clipped-left color="blue" dense>
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          v-if="isLogin"
        ></v-app-bar-nav-icon>
        <!-- <v-icon class="mx-4" large>
          mdi-foot-print
        </v-icon> -->
        <v-img src="@/assets/icon.jpg" max-height="30" max-width="30">
        </v-img>
        <v-toolbar-title class="mr-12 align-center">
          <span class="title">Dekornata</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-row align="center" style="max-width: 650px">
          <v-text-field
            :append-icon-cb="() => {}"
            placeholder="Search..."
            single-line
            append-icon="mdi-magnify"
            color="white"
            hide-details
          ></v-text-field>
        </v-row>
        <v-spacer></v-spacer>
        <router-link to="/Login" v-if="!isLogin">
          <v-btn>
            Login
          </v-btn>
        </router-link>
      </v-app-bar>
    </nav>
  </v-container>
</template>
<script>
export default {
  name: 'navbar',
  props: {
    source: String
  },
  data: () => ({
    drawer: false,
    items: [
      { icon: 'mdi-view-dashboard-variant-outline', text: 'Home', router: '/' },
      { icon: 'mdi-cart', text: 'Cart List', router: '/whistlist' },
      { icon: 'mdi-history', text: 'History', router: '/History' },
      { icon: 'mdi-credit-card-plus-outline', text: 'Topup', router: '/Topup' }
    ]
  }),
  methods: {
    Logout () {
      localStorage.clear()
      this.$store.commit('set_isLogin', false)
    },
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
    username () {
      return localStorage.getItem('username')
    },
    isLogin () {
      return this.$store.state.isLogin
    },
    money () {
      return this.$store.state.money
    }
  }
}
</script>

<style></style>
