<template>
    <div height="50">
      <v-app-bar flat fixed>
      <v-toolbar-title>
        <NuxtLink :to="{ path: '/' }">
          <v-img
            src="logo.png"
            max-height="40"
            max-width="120"
            class="ml-5"
          ></v-img>
        </NuxtLink>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        color="light-blue lighten-2"
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        solo-inverted
        flat
        dense
        dark
        class="btn-search pt-5 mt-1"
        :class="{ closed: searchClosed }"
        @focus="searchClosed = false"
        @blur="searchClosed = true"
        @keyup="searchItem"
      ></v-text-field>

      <v-btn icon @click="logout" :to="{ path: '/marketplace' }">
        <v-icon color="light-blue lighten-2">mdi-arrow-right-thick</v-icon>
      </v-btn>
      <v-btn text color="light-blue lighten-2" @click="login = !login">
        Acceder
      </v-btn>
      <v-btn text color="light-blue lighten-2" @click="signup = !signup">
        Registrarse
      </v-btn>
    </v-app-bar>
    <v-overlay :dark="false" :absolute="absolute" :value="login">
      <LoginForm @changeView="login = !login" />
    </v-overlay>
    <v-overlay :dark="false" :absolute="absolute" :value="signup">
      <RegisterForm @changeView="signup = !signup" />
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      showSearch: false,
      searchClosed: true,
      search: '',
      login: false,
      signup: false,
      email: '',
      password: '',
    }
  },
  computed: {
    isSeller() {
      return this.$auth.user && this.$auth.user.role === 'seller'
    },
  },
  mounted() {
    console.log('storage', this.$auth.user)
  },

  methods: {
    showRoles() {
      console.log(this.$auth.$storage.getUniversal('role'))
    },
    logout() {
      this.$auth.logout()
    },
    searchDrop() {
      this.showSearch = !this.showSearch
    },
    searchItem() {
      this.$nuxt.$emit('searchItem', this.search)
    },
    async iniciar() {
      await this.$auth.loginWith('local', {
        data: { email: this.email, password: this.password },
      })
    },
  },
}
</script>

<style >
.btn-search {
  border-radius: 40px;
  max-width: 300px;
  transition: all 0.5s ease;
}
.closed {
  max-width: 40px;
}
.v-input__prepend-inner .v-icon {
  margin-left: -5px;
  margin-top: 2px;
  color: #4fc3f7 !important;
}
</style>