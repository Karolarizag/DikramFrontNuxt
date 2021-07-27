<template>
  <div class="d-flex justify-center my-12">
    <v-card max-height="800" max-width="800">
      <v-card-text class="pa-12">
        <v-row>
          <v-col
            ><v-text-field v-model="name" label="Nombre" required outlined
          /></v-col>
          <v-col
            ><v-text-field
              v-model="surname"
              label="Apellidos"
              required
              outlined
          /></v-col>
          <v-col
            ><v-text-field v-model="phone" :rules="[numberRule]" label="Teléfono" required outlined
          /></v-col>
        </v-row>
        <v-row>
          <v-col
            ><v-text-field v-model="country" label="País" required outlined
          /></v-col>
          <v-col
            ><v-text-field v-model="city" label="Ciudad" required outlined
          /></v-col>
        </v-row>
        <v-row>
          <v-col
            ><v-text-field
              v-model="address"
              label="Dirección"
              required
              outlined
          /></v-col>
        </v-row>
        <v-card class="ma-5 pa-4">
          <v-card-text>
            <v-row>
              <v-col>
                <label>Tarjeta: </label>
                <div id="card-number"></div>
              </v-col>
            </v-row>
            <v-row max-height="400" max-width="800">
              <v-col>
                <label>CVC: </label>
                <div id="card-cvc"></div>
              </v-col>
              <v-col>
                <label>Expira: </label>
                <div id="card-expiry"></div>
              </v-col>
              <v-col>
                <label>Código postal: </label>
                <div id="card-postalcode"></div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="d-flex justify-center mt-5">
                <v-btn
                  id="custom-button"
                  color="light-blue lighten-2"
                  dark
                  @click="createToken"
                  >Pagar {{ getFullPrice }} €</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="d-flex justify-center">
                <div id="card-error"></div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
      <!---->
      <v-overlay :dark="false" :absolute="absolute" :value="dialog">
      <v-card height="300" width="500" shaped class="px-8">
        <v-card-title class="d-flex justify-center mt-15">
          <p class="mt-10">¡Genial!</p>
        </v-card-title>

        <v-card-text>
          <span class="d-flex justify-center"
            >Tu pago ha sido realizado con éxito.</span
          >
        </v-card-text>

        <v-card-actions>
          <v-row>
            <v-col class="d-flex justify-center"
              ><v-btn
                :to="{ path: '/explore' }"
                dark
                color="light-blue lighten-2"
                class="mr-2"
              >
                Volver
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: null,
      cardNumber: null,
      cardExpiry: null,
      cardCvc: null,
      postalCode: null,
      name: '',
      surname: '',
      phone: '',
      country: '',
      city: '',
      address: '',
      cart: this.$auth.user.cart,
      numberRule: v  => {
        if (!v.trim()) return true;
        if (!isNaN(parseFloat(v)) && v >= 0 && v <= 99999999999) return true;
        return 'Introduce un teléfono';
      },
      dialog: false,
      absolute: true,
    }
  },
  computed: {
    stripeElements() {
      return this.$stripe.elements()
    },
    getFullPrice() {
      let total = 0
      if (!this.$auth.user.cart) {
        total = 0
      } 
      this.$auth.user.cart.forEach((v) => {
        total += v.price
      })
      return total
    },
  },
  mounted() {
    // Style Object documentation here: https://stripe.com/docs/js/appendix/style
    const style = {
      base: {
        color: 'black',
        fontSmoothing: 'antialiased',
        fontSize: '18px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    }
    this.cardNumber = this.stripeElements.create('cardNumber', { style })
    this.cardNumber.mount('#card-number')
    this.cardExpiry = this.stripeElements.create('cardExpiry', { style })
    this.cardExpiry.mount('#card-expiry')
    this.cardCvc = this.stripeElements.create('cardCvc', { style })
    this.cardCvc.mount('#card-cvc')
    this.postalCode = this.stripeElements.create('postalCode', { style })
    this.postalCode.mount('#card-postalcode')
  },
  beforeDestroy() {
    this.cardNumber.destroy()
    this.cardExpiry.destroy()
    this.cardCvc.destroy()
    this.postalCode.destroy()
  },
  methods: {
    async createToken() {
      try {
        const { token, error } = await this.$stripe.createToken(this.cardNumber)
        if (error) {
          document.getElementById('card-error').innerHTML = error.message
          return error
        }
        await this.$axios.$post('/sales', {
          name: this.name,
          surname: this.surname,
          phone: this.phone,
          country: this.country,
          city: this.city,
          address: this.adress,
          cart: this.cart,
          payment: token,
          price: this.getFullPrice,
        })
        this.dialog = true
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    },
  },
}
</script>

<style scoped>
#custom-button {
  height: 30px;
  background-color: rgb(55, 130, 160);
  padding: 5px;
  border-radius: 5px;
  color: white;
}

#card-error {
  color: red;
}
</style>
