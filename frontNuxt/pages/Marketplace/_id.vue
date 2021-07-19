<template>
  <v-container fluid class="px-0">
    <v-card>
      <v-app-bar extended extension-height="250" :src="marketplace.banner[0]">
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
        v-for="(item, idx) in products"
        :key="idx"
      />
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
    const response = await $axios.$get(`/marketplace/${params.id}`)
    const res = await $axios.$get(`/marketplace/${response._id}/products`)
    return { marketplace: response, products: res }
  },
  data() {
    return {
      productSection: true,
      postsSection: false,
    }
  },
  methods: {
    showPosts() {
      if (!this.productSection) {
        this.productSection = true
        this.postsSection = false
      }
    },
    showProducts() {
      if(!this.posts) {
        this.postsSection = true
        this.productSection = false
      }
    }
  },
}
</script>