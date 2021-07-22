<template>
  <div v-if="product">
    <div class="productpagebody">
      <v-banner class="pa-5 pt-0">
        <v-row>
          <v-col cols="6" sm="6" xs="12">
            <h2>{{ product.name.toUpperCase() }}</h2>
          </v-col>

          <v-col cols="6" sm="6" xs="12">
            <v-row>
              <v-col>
                <v-btn
                  v-if="isTheOwner"
                  dark
                  color="light-blue lighten-2"
                  @click="deleteOverlay = !deleteOverlay"
                  >Borrar Producto</v-btn
                ></v-col
              >
              <v-col>
                <v-btn
                  v-if="isTheOwner"
                  dark
                  color="light-blue lighten-2"
                  @click="modifyOverlay = !modifyOverlay"
                  >Modificar Producto</v-btn
                ></v-col
              >
            </v-row>
          </v-col>
        </v-row>
      </v-banner>

      <v-row class="pa-15 d-flex align-center mt-n15">
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
      <v-overlay :dark="false" :absolute="absolute" :value="deleteOverlay">
        <v-card height="300" width="500" shaped class="px-8">
          <v-card-title class="d-flex justify-center mt-15">
            <p class="mt-10">¡Atención!</p>
          </v-card-title>

          <v-card-text>
            <span class="d-flex justify-center"
              >¿Estás seguro de querer borrar este producto? Se borrarán todos
              sus datos y no podrás recuperarlos.</span
            >
          </v-card-text>

          <v-card-actions>
            <v-row>
              <v-col class="d-flex justify-center"
                ><v-btn
                  dark
                  color="light-blue lighten-2"
                  class="mr-2"
                  @click="deleteProductPage"
                >
                  Borrar producto
                </v-btn>
              </v-col>

                <v-btn
                  absolute
                  top
                  right
                  icon
                  @click="deleteOverlay = !deleteOverlay"
                >
                  <v-icon color="light-blue lighten-2"
                    >mdi-arrow-left-circle</v-icon
                  >
                </v-btn>
              
            </v-row>
          </v-card-actions>
        </v-card>
      </v-overlay>

      <!-- OVERLAY TO MODIFY PRODUCT FORM -->

      <v-overlay :dark="false" :absolute="absolute" :value="modifyOverlay">
        <v-container fluid>
          <div class="pa-5 overlay">
            <ProductModifyForm
              shaped
              :product="product"
              @returnClick="modifyOverlay = false"
              @backClick="actualize"
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
    const product = await $axios.$get(`/products/${params.id}`)
    return { product }
  },
  data() {
    return {
      absolute: true,
      overlay: false,
      deleteOverlay: false,
      modifyOverlay: false,
      productKey: 0,
    }
  },
  computed: {
    isTheOwner() {
      return this.$auth.user.marketplace === this.product.marketplace
    },
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
      this.$router.push({ path: '/explore' })
      return response
    },
    actualize(product) {
      this.product = product
      this.modifyOverlay = false
      this.productKey++
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