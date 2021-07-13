<template>
  <div>
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
          Iniciar
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
      <div
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
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      showLogin: false,
      showSignup: false,
    };
  },
};
</script>

