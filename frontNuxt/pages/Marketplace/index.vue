<template>
  <v-container fluid>
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
  async asyncData({ $axios }) {
    const response = await $axios.$get('/products')
    return { products: response }
  },
  data() {
    return {
      showSearch: true,
      filter: '',
    }
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
  mounted() {
    // console.log(this.$auth)
    this.$nuxt.$on("searchItem", (item) => {
      console.log(item)
     this.filter=item
    });
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