<template>
  <div height="50">
    <v-app-bar flat app color="second">
      <v-toolbar-title>
        <NuxtLink :to="{ path: '/' }">
          <!-- <v-img
            src=""
            max-height="40"
            max-width="120"
            class="ml-5"
          ></v-img> -->
        </NuxtLink>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn
        text
        :to="{ name: 'explore' }"
        color="fourth"
        nuxt
        class="mx-1"
      >
        Explorar
      </v-btn>

      <v-btn
        text
        color="fourth"
        class="mx-1"
        @click="login = !login"
      >
        Acceder
      </v-btn>
      <v-btn
        text
        color="fourth"
        class="mx-1"
        @click="signup = !signup"
      >
        Registrarse
      </v-btn>
    </v-app-bar>

    <v-overlay :dark="false" :value="login">
      <LoginForm @changeView="login = !login" />
    </v-overlay>
    <v-overlay :dark="false" :value="signup">
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
  methods: {
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