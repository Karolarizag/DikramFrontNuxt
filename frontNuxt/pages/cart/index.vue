<template>
  <v-container v-if="products && characteristics">
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
    <v-card v-for="(item, idx) in products" :key="idx" class="px-5 my-5">
      <v-row>
        <v-col
          ><v-img height="100" width="100" :src="item.image[0]"></v-img
        ></v-col>
        <v-col cols="6" class="d-flex justify-center align-center">
          {{ item.name }}
        </v-col>
        <v-col class="d-flex justify-center align-center" :key="idx">
          {{ characteristics[idx].size }}
        </v-col>
        <v-col class="d-flex justify-center align-center" :key="idx">
          {{ characteristics[idx].quantity }}
        </v-col>

        <v-col class="d-flex justify-center align-center" :key="idx">
          {{ characteristics[idx].price }} €
        </v-col>
        <v-col class="d-flex justify-end align-center">
          <v-btn icon color="light-blue lighten-2"
            @click="deleteFromCart(characteristics[idx]._id)"
            ><v-icon>mdi-trash-can</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-card>
    <v-card class="d-flex justify-end pa-5 my-5">
      <v-btn color="light-blue lighten-2" dark>Pagar</v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Cart',
  async asyncData({ $axios, $auth }) {
    try {
      const products = await $axios.$get(`/users/${$auth.user._id}/cart`)
      return { products }
    } catch (err) {
      console.log(err)
    }
  },
  data() {
    return {
      characteristics: null,
    }
  },
  mounted() {
    this.characteristics = this.$auth.user.cart
  },
  methods: {
    async deleteFromCart(i) {
      const res = await this.$axios.$delete(
        `/users/${this.$auth.user._id}/cart/${i}`
      )
      location.reload()
      return res
    },
  },
}
</script>