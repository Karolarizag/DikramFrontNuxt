<template>
  <div v-if="product">
    <div class="productpagebody">
      <v-banner class="pa-5 pt-0">
        <h2>{{ product.name.toUpperCase() }}</h2>
      </v-banner>
      <v-row class="pa-15 d-flex align-center">

        <v-col cols="12" md="6" v-if="product">
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
      <v-overlay :absolute="absolute" :value="overlay">
        <v-img
          :src="product.image[0]"
          max-height="800"
          max-width="800"
          @click="overlay = false"
        >
        </v-img>
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