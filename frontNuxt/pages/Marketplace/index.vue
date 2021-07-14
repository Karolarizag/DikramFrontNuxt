<template>
  <v-container fluid class="px-0">
    <MarketplaceInfo />
    <div class="d-flex flex-wrap flex-row justify-center mx-5">
      <ProductCard
        elevation="2"
        outlined
        :product="item"
        v-for="(item, idx) in filterItem"
        :key="idx"
      />
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Marketplace',
  data() {
    return {
      showSearch: true,
      filter: '',
    }
  },
  async asyncData({ $axios }) {
    const response = await $axios.$get('/products')
    return { products: response }
  },
  mounted() {
    this.$nuxt.$on("searchItem", (item) => {
      console.log(item)
     this.filter=item
    });
  },
  computed: {
    filterItem() {
      if (this.filter === "") {
        return this.products;
      } else {
        return this.products.filter((product) =>
          product.name.toLowerCase().includes(this.filter.toLowerCase())
        );
      }
    },
  },
  methods: {
    show() {
      this.showSearch = !this.showSearch;
    },
  },
}
</script>

<style>
.ProductCard::after {
  content: '';
  flex: auto;
}
</style>