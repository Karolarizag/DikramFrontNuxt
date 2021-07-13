<template>
  <v-form>
    <v-card shaped class="mx-auto my-12 pa-10" min-width="650" elevation="10">
      <v-btn absolute top right icon @click="$emit('changeView')">
        <v-icon color="light-blue lighten-2">mdi-arrow-left-circle</v-icon>
      </v-btn>
      <v-card-text class="mt-5">
        <v-text-field
          v-model="username"
          :counter="16"
          label="Usuario"
          required
          prepend-icon="mdi-account"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="E-mail"
          required
          prepend-icon="mdi-email"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          label="Contraseña"
          required
          outlined
          prepend-icon="mdi-lock"
        ></v-text-field>
        <v-text-field
          v-model="repeatPassword"
          type="password"
          label="Confirmar contraseña"
          outlined
          prepend-icon="mdi-lock-check"
          required
        ></v-text-field>
        <v-text-field
          v-model="birthdate"
          type="date"
          label="Fecha de nacimiento"
          required
          prepend-icon="mdi-calendar"
          class="mt-3"
        ></v-text-field>

        <v-switch
          v-model="isSeller"
          color="indigo lighten-1"
          label="¿Quieres una cuenta como empresa?"
          class="mt-3"
        ></v-switch>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn 
        block @click="signup" dark color="light-blue lighten-2">Registrarse</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  name: "RegisterForm",
  data: () => ({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    isSeller: "",
    birthdate: "",
    formHasErrors: false,
    snackbar: false,
    // rules: {
    //   username: [
    //     (v) => !!v || "El nombre de usuario es obligatorio",
    //     (v) =>
    //       v.length <= 16 ||
    //       "El nombre de usuario no debe de tener más de 16 caracteres",
    //   ],
    //   email: (value) =>
    //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    //       value
    //     ) || "Inserte un e-mail válido",
    //   password: (value) =>
    //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(value) ||
    //     "La contraseña debe de tener al menos 8 caracteres, incluir mayúsculas y números",
    // },
  }),
  computed: {
    confPassRule() {
      return () =>
        this.password === this.repeatPassword || "Las contraseñas no coinciden";
    },
    form() {
      return {
        email: this.email,
        password: this.password,
      };
    },
  },
  methods: {
    submit() {
      this.formHasErrors = false;

      Object.keys(this.form).forEach((field) => {
        if (!this.form[field]) this.formHasErrors = true;

        this.$refs[field].validate(true);
      });

      if (!this.formHasErrors) this.signup();
    },
    // signup() {
    //   const role = this.isSeller ? "seller" : "user";
    //   authService
    //     .signup(this.username, this.email, this.password, this.birthdate, role)
    //     .then((res) => {
    //       localStorage.setItem("token", res.token);
    //       localStorage.setItem("email", res.email);
    //       localStorage.setItem("role", res.role);
    //       this.$router.push({ name: "MarketPlace" });
    //     })
    //     .catch((err) => console.log(err));
    // },
  },
};
</script>