<template>
  <div>
    <v-app-bar height="920" flat prominent src="https://static-cse.canva.com/blob/215565/beautiful-twitter-banners.jpg">
    </v-app-bar>
    <v-container fluid>
        <div class="d-flex flex-wrap flex-row justify-center mx-5" >
          <ProductCard
            elevation="2"
            outlined
            :product="item"
            :key="idx"
            v-for="(item, idx) in products"
          />
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  async asyncData({ $axios }) {
    const products = await $axios.$get('/products')
    return { products }
  },
  data() {
    return {
      showLogin: false,
      showSignup: false,
      showSearch: true,
      filter: '',
    };
  },
};
</script>

