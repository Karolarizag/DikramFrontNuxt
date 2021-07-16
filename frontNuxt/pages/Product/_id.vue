<template>
  <div v-if="product">
    <div class="productpagebody">
      <v-banner class="pa-5 pt-0">
        <v-row>
          <v-col>
            <h2>{{ product.name.toUpperCase() }}</h2>
          </v-col>
          <v-col>
            <v-btn v-if="isSeller" dark color="light-blue lighten-2" @click="deleteoverlay = !deleteoverlay"
              >Borrar Producto</v-btn
            >
          </v-col>
          <v-col>
            <v-btn v-if="isSeller" dark color="light-blue lighten-2" @click="modifyoverlay = !modifyoverlay"
              >Modificar Producto</v-btn
            >
          </v-col>
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
      <v-divider></v-divider>
      <!-- OVERLAY TO SHOW FULL IMAGE -->
      <v-overlay :dark="false" :absolute="absolute" :value="overlay">
        <v-img
          :src="product.image[0]"
          max-height="800"
          max-width="800"
          @click="overlay = false"
        >
        </v-img>
      </v-overlay>

      <!-- OVERLAY TO DELETE PRODUCTS -->
      <v-overlay :dark="false" :absolute="absolute" :value="deleteoverlay">
        <v-card height="300" width="500" shaped class="px-8">
          <v-card-title class="d-flex justify-center mt-15"> 
            <p class="mt-10"> ¡Atención!</p> </v-card-title>
          <v-card-text>
            <span
            class="d-flex justify-center"
              >¿Estás seguro de querer borrar este producto? Se borrarán todos
              sus datos y no podrás recuperarlos.</span
            >
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col class="d-flex justify-end"><v-btn @click="deleteProductPage" dark color="light-blue lighten-2" class="mr-2">
              Borrar producto
            </v-btn></v-col>
              <v-col class="d-flex justify-center"> <v-btn
              @click="deleteoverlay = !deleteoverlay"
              dark
              color="light-blue lighten-2"
              class="ml-2"
            >
              Volver
            </v-btn></v-col>
            </v-row>
            
           
          </v-card-actions>
        </v-card>
      </v-overlay>

      <!-- OVERLAY TO MODIFY PRODUCT FORM -->

      <v-overlay :dark="false" :absolute="absolute" :value="modifyoverlay">
        <v-container fluid>
          <div class="pa-5 overlay">
            <ProductModifyForm
              shaped
              @backClick="actualize"
              @returnClick="modifyoverlay = false"
              :product="product"
            />
          </div>
        </v-container>
      </v-overlay>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProductPage',
    async asyncData({ $axios, params }) {
      const response = await $axios.$get(`/products/${params.id}`)
      return { product: response }
    },
    data() {
      return {
        absolute: true,
        overlay: false,
        deleteoverlay: false,
        modifyoverlay: false,
        productKey: 0,
      }
    },
    methods: {
      async deleteProductPage() {
        const response = await this.$axios.$delete(
          `/products/${this.product._id}`,
          {
            headers: {
              token: localStorage.token,
            },
          }
        )
        this.$router.push({ name: 'Marketplace' })
        return response
      },
      actualize(product) {
        this.product = product
        this.modifyoverlay = false
        this.productKey++
      },
    },
    computed: {
      isSeller() {
      return this.$auth.user && this.$auth.user.role === 'seller'
      },
    },
  }
</script>

<style>
  .productpagebody {
    width: 80vw;
      margin: auto;
    padding-top: 20px;
  }
</style>