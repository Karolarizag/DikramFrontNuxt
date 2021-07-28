<template>
  <v-container>
    <v-card class="px-5 my-5">
      <v-row>
        <v-col class="d-flex justify-center">Imagen</v-col>
        <v-col class="d-flex justify-center" cols="6">Producto</v-col>
        <v-col class="d-flex justify-center">Talla</v-col>
        <v-col class="d-flex justify-center">Cantidad</v-col>
        <v-col class="d-flex justify-center">Precio</v-col>
        <v-col></v-col>
      </v-row>
    </v-card>
    <v-card v-for="(item, idx) in allProducts" :key="idx" class="px-5 my-5">
      <v-row>
        <v-col
          ><v-img height="100" width="100" :src="item.image[0]"></v-img
        ></v-col>
        <v-col cols="6" class="d-flex justify-center align-center">
          {{ cart[idx].name }}
        </v-col>
        <v-col class="d-flex justify-center align-center">
          {{ cart[idx].size }}
        </v-col>
        <v-col class="d-flex justify-center align-center">
          {{ cart[idx].quantity }}
        </v-col>

        <v-col class="d-flex justify-center align-center">
          {{ cart[idx].price }} €
        </v-col>
        <v-col class="d-flex justify-end align-center">
          <v-btn
            icon
            color="fourth"
            @click="deleteFromCart(cart[idx]._id)"
            ><v-icon>mdi-trash-can</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-card>
    <v-card v-if="allProducts.length>0" class="d-flex justify-end pa-5 my-5">
        <v-btn :to="{ name: 'payment'}" color="fourth" dark>Pagar {{getFullPrice}} €</v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  async asyncData({ $axios, $auth }) {
    try {
      const { allProducts, cart } = await $axios.$get(`/users/${$auth.user._id}/cart`)
      // const cart = $auth.user.cart
    console.log(allProducts, cart)
      return { allProducts, cart }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  },
  data() {
    return {
      total: 0
    }
  },
   computed: {
    getFullPrice() {
      this.cart.forEach(v => {
        this.total += v.price
      })
      return this.total
    },
  },
  methods: {
    async deleteFromCart(id) {
      const res = await this.$axios.$delete(
        `/users/${this.$auth.user._id}/cart/${id}`
      )
      this.$auth.setUser(res.user)
      this.$nuxt.refresh()
      return res
    },
  }
}
</script>