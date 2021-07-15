<template>
  <di>
    <v-app-bar height="920" flat prominent src="../assets/background.png">
      <v-layout
        v-if="!showLogin && !showSignup"
        row
        wrap
        align-center
        justify-center
        my-auto
      >
        <v-btn
          class="mx-10"
          width="200"
          color="light-blue lighten-2"
          dark
          @click="showLogin = true"
        >
          Acceder
        </v-btn>
        <v-btn
          class="mx-10"
          width="200"
          color="light-blue lighten-2"
          dark
          @click="showSignup = true"
        >
          Registrar
        </v-btn>
      </v-layout>
      <v-layout
        v-if="showLogin || showSignup"
        row
        wrap
        align-center
        justify-center
        my-auto
      >
        <LoginForm v-if="showLogin" @changeView="showLogin = false" />
        <RegisterForm v-if="showSignup" @changeView="showSignup = false" />
      </v-layout>
      <!-- <div
        v-if="!showLogin && !showSignup"
        row
        wrap
        align-center
        justify-center
        my-auto
      >
        <NuxtLink :to="{ name: 'Marketplace' }" style="text-decoration: none;">
          <v-btn fab small class="mx-10 mt-3" dark color="light-blue lighten-2">
            <v-icon>mdi-arrow-right-thick</v-icon>
          </v-btn>
        </NuxtLink>
      </div> -->
    </v-app-bar>
    <v-container fluid>
        <div class="d-flex flex-wrap flex-row justify-center mx-5" >
          <ProductCard
            elevation="2"
            outlined
            :product="item"
            v-for="(item, idx) in products"
            :key="idx"
          />
      </div>
    </v-container>
  </di>
</template>

<script>
export default {
  name: "Home",
  async asyncData({ $axios }) {
    const response = await $axios.$get('/products')
    return { products: response }
  },
  data() {
    return {
      showLogin: false,
      showSignup: false,
      showSearch: true,
      filter: '',
    };
  },
};
</script>

