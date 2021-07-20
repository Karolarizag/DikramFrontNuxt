<template>
  <v-container fluid class="px-0">
    <div
      class="d-flex flex-wrap flex-row justify-center mx-5"
    >
      <ProductCard
        elevation="2"
        outlined
        :product="item"
        v-for="(item, idx) in filterItem"
        :key="idx"
      />
    </div>
     <div
      class="d-flex flex-wrap flex-row justify-center mx-5"
    >
      <PostCardFail
        elevation="2"
        outlined
      />
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Explore',
  data() {
    return {
      showSearch: true,
      filter: '',
    }
  },
  // eslint-disable-next-line vue/order-in-components
  async asyncData({ $axios }) {
    const response = await $axios.$get('/products')
    return { products: response }
  },
  mounted() {
    this.$nuxt.$on('searchItem', (item) => {
      this.filter = item
    })
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    filterItem() {
      if (this.filter === '') {
        return this.products
      } else {
        return this.products.filter((product) =>
          product.name.toLowerCase().includes(this.filter.toLowerCase())
        )
      }
    },
  },
  methods: {
    show() {
      this.showSearch = !this.showSearch
    },
  },
}
</script>

<style scoped>
.ProductCard::after {
  content: '';
  flex: auto;
}
</style>