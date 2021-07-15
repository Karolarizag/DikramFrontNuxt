<template>
  <div v-if="product">
    <div class="productpagebody">
      <v-banner class="pa-5 pt-0">
        <v-row>
          <v-col
            ><h2>{{ product.name.toUpperCase() }}</h2></v-col
          >
          <v-col
            ><v-btn @click="deleteoverlay = !deleteoverlay"
              >Borrar Producto</v-btn
            ></v-col
          >
        </v-row>
      </v-banner>
      <v-row class="pa-15 d-flex align-center">
        <v-col v-if="product" cols="12" md="6">
          <ProductImage :product="product" @click.native="overlay = !overlay" />
        </v-col>
        <v-col cols="12" md="6">
          <ProductData :product="product" />
        </v-col>
      </v-row>
      <!-- <v-row class="pa-15 pt-0">
        <v-col cols="12">
          <ProductPucharse :product="product" />
        </v-col>
      </v-row> -->
      <v-divider></v-divider>
      <!-- OVERLAY TO SHOW FULL IMAGE -->
      <v-overlay :absolute="absolute" :value="overlay">
        <v-img
          :src="product.image[0]"
          max-height="800"
          max-width="800"
          @click="overlay = false"
        >
        </v-img>
      </v-overlay>

      <!-- OVERLAY TO DELETE PRODUCTS -->
      <v-overlay :absolute="absolute" :value="deleteoverlay">
        <v-card>
          <v-card-title> ¡Atención! </v-card-title>
          <v-card-text>
            <span
              >¿Estás seguro de querer borrar este producto? Se borrarán todos
              los datos de este producto y no podrás recuperarlos.</span
            >
          </v-card-text>
          <v-card-actions>
            <v-btn @click="deleteProductPage" dark color="light-blue lighten-2">
              Borrar producto
            </v-btn>
            <v-btn @click="deleteoverlay = !deleteoverlay" dark color="light-blue lighten-2">
              Volver
            </v-btn>
            
          </v-card-actions>
        </v-card>
      </v-overlay>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductPage',
  async asyncData({ $axios, params }) {
    const response = await $axios.$get(
      `/products/${params.id}`
    )
    return { product: response }
  },
  data() {
    return {
      absolute: true,
      overlay: false,
      deleteoverlay: false
    }
  },
  methods: {
    async deleteProductPage() {
      console.log('----------', this.product)
      const response = await this.$axios.$delete(`/products/${this.product._id}`, 
      {
        headers: {
        token: localStorage.token
        }
      })
     this.$router.push({ name: 'Marketplace' })
     return response
    }
  },
}
</script>

<style lang="scss" scoped>
.productpagebody {
  width: 80vw;
  margin: auto;
  padding-top: 20px;
}
</style>