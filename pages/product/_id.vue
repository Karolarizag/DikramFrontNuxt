<template>
  <v-container v-if="product" fluid app>
    <div class="productpagebody">
      <v-banner class="pa-5 pt-0">
        <v-row>
          <v-col cols="6" sm="6" xs="12">
            <h2>{{ product.name.toUpperCase() }}</h2>
          </v-col>
          <v-col cols="6" sm="6" xs="12">
            <v-row>
              <v-spacer></v-spacer>
              <v-btn
                absolute
                top
                right
                icon
                :to="{ path: `/marketplace/${$auth.user.marketplace}` }"
                class="mr-10"
              >
                <v-icon color="light-blue lighten-2"
                  >mdi-arrow-left-circle</v-icon
                >
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-banner>

{{patternP}}
      <v-row class="pa-15 d-flex align-start mt-n15">
        <v-col v-if="product" cols="12" md="6">
          <ProductImage :product="product" @click.native="overlay = !overlay" />
        </v-col>

        <v-col cols="12" md="6">
          <ProductData :product="product" :customForm="customForm" />
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
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'ProductPage',
  async asyncData({ $axios, params }) {
    const product = await $axios.$get(`/products/${params.id}`)
    const customForm = await $axios.$get(`/products/${product._id}/customForm`)
    return { product, customForm }
  },
  data() {
    return {
      absolute: true,
      overlay: false,
      patternP: Object
    }
  },
  computed: {
    isTheOwner() {
      return this.$auth.user.marketplace === this.product.marketplace
    },
    getPattern() {
      return this.$nuxt.$on('pattern', (item) => {
        console.log(this.patternP, '........', item)
        this.patternP = item
        console.log(this.patternP, '........----')

      })

    },
  },
  methods: {
    actualize(product) {
      this.product = product
      this.modifyOverlay = false
      this.productKey++
      location.reload()
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