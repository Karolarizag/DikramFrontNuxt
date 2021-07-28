<template>
  <v-form>
    <v-card
      class="mx-auto py-8 px-3"
      width="600"
      height="400"
      shaped
      elevation="10"
    >
      <v-btn absolute top right icon @click="$emit('changeView')">
        <v-icon color="fourth">mdi-arrow-left-circle</v-icon>
      </v-btn>
      <v-card-text class="mt-5">
        <v-text-field
          v-model="email"
          label="E-mail"
          required
          prepend-icon="mdi-email"
          outlined
          class="mt-9"
          color="fourth"
        >
        </v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          label="Contraseña"
          required
          outlined
          prepend-icon="mdi-lock"
          @keydown.enter="iniciar"
          class="5"
          color="fourth"
        ></v-text-field>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          class="mt-n5"
          width="300"
          block
          @click="iniciar"
          color="fourth"
          dark
          >Acceder</v-btn
        >
      </v-card-actions>
      <v-overlay v-if="errorLogin">
        <v-card
          shaped
          color="white"
          width="600"
          height="400"
          class="d-flex align-center px-15"
        >
          <v-card-title class="black--text ma-auto">
            <p>Email y contraseña incorrectos</p>
          </v-card-title>
          <v-card-actions>
            <v-btn absolute top right icon @click="errorLogin = !errorLogin">
              <v-icon color="fourth"
                >mdi-arrow-left-circle</v-icon
              >
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-overlay>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      errorLogin: false,
      overlay: false,
    }
  },
  methods: {
    async iniciar() {
       await this.$auth.loginWith('local', {
        data: { email: this.email, password: this.password },
      })
      
    },
  },
}
</script>