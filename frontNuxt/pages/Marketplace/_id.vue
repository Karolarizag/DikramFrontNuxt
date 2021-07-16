<template>
<<<<<<< HEAD
  <v-container fluid class="px-0">
    <v-card>
      <v-app-bar extended extension-height="250" :src="banner">
        <v-card
          class="ma-auto mt-7 pa-5"
          width="1400"
          height="250"
          color="rgba(236, 236, 236, 0.411)"
        >
          <v-card-title class="mt-5"
            ><h1>{{ marketplace.name }}</h1></v-card-title
          >
          <div class="mr-5">
            <h2>{{ marketplace.description }}</h2>
          </div>
          <div>
            <h3>{{ marketplace.ubication }}</h3>
          </div>
        </v-card>
      </v-app-bar>
    </v-card>
    <v-toolbar class="fixed-bar" height="40">
      <v-row>
        <v-col class="d-flex justify-end"
          ><v-btn @click="showProducts" text color="light-blue lighten-2"
            >Publicaciones</v-btn
          ></v-col
        >
        <v-col
          ><v-btn @click="showPosts" text color="light-blue lighten-2"
            >Productos</v-btn
          ></v-col
        >
      </v-row>
    </v-toolbar>
    <div
      v-if="productSection"
      class="d-flex flex-wrap flex-row justify-center mx-5"
    >
      <ProductCard
        elevation="2"
        outlined
        :product="item"
        v-for="(item, idx) in filterItem"
        :key="idx"
      />
=======
  <div v-if="product">
    <div class="productpagebody">
      <v-banner class="pa-5 pt-0">
        <v-row>
          <v-col>
            <h2>{{ product.name.toUpperCase() }}</h2>
          </v-col>
          <v-col>
            <v-btn @click="deleteoverlay = !deleteoverlay"
              >Borrar Producto</v-btn
            >
          </v-col>
          <v-col>
            <v-btn @click="modifyoverlay = !modifyoverlay"
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
            <v-btn
              @click="deleteoverlay = !deleteoverlay"
              dark
              color="light-blue lighten-2"
            >
              Volver
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-overlay>

      <!-- OVERLAY TO MODIFY PRODUCT FORM -->

      <v-overlay :absolute="absolute" :value="modifyoverlay">
        <v-container fluid>
          <div class="pa-5">
            <ProductModifyForm @backClick="actualize" @returnClick="modifyoverlay = false" :product="product" />
          </div>
        </v-container>
       
        
      </v-overlay>
>>>>>>> efd2d27be843db4127ccca40b41c3e9c72b124a7
    </div>
    <div v-else class="d-flex flex-wrap flex-row justify-center mx-5">
      <PostCardFail elevation="2" outlined />
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'MarketplaceView',
  async asyncData({ $axios, params }) {
<<<<<<< HEAD
    const response = await $axios.$get(`/marketplace/${params.id}`)
    return { marketplace: response }
  },
=======
    const response = await $axios.$get(`/products/${params.id}`)
    return { product: response }
  },
  data() {
    return {
      absolute: true,
      overlay: false,
      deleteoverlay: false,
      modifyoverlay: false,
      productKey: 0
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
    }
  },
}
</script>

<style>
.productpagebody {
  width: 80vw;
  margin: auto;
  padding-top: 20px;
>>>>>>> efd2d27be843db4127ccca40b41c3e9c72b124a7
}
</script>