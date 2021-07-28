<template>
  <v-container fluid class="pa-0">
    <v-toolbar class="fixed-bar" height="40">
      <v-row>
        <v-col class="d-flex justify-end">
          <v-btn
            class="mt-1 mb-1"
            text
            color="first"
            @click="showProducts"
          >
            Publicaciones
          </v-btn>
        </v-col>

        <v-col>
          <v-row>
            <v-col cols="11" md="10" sm="9" xs="1">
              <v-btn
                class="mt-1 mb-1"
                text
                color="first"
                @click="showPosts"
              >
                Productos
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-toolbar>

    <div class="d-flex flex-wrap flex-row justify-center">
      <LastProduct :products="products" />
    </div>
    <div
      v-if="productSection"
      class="d-flex flex-wrap flex-row justify-center mx-5"
    >
      <ProductCard
        v-for="(item, idx) in filterItem"
        :key="idx"
        elevation="2"
        outlined
        :product="item"
      />
    </div>

    <div v-else class="d-flex flex-wrap flex-row justify-center mx-5">
      <PostCard
        v-for="(item, idx) in posts"
        :key="idx"
        elevation="2"
        outlined
        :post="item"
        :marketplace="item.marketplace"
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
      productSection: true,
      postsSection: false,
    }
  },
  // eslint-disable-next-line vue/order-in-components
  async asyncData({ $axios }) {
    const products = await $axios.$get('/products')
    const posts = await $axios.$get('/post')
    return { products, posts }
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
    isTheOwner() {
      return this.$auth.user.marketplace === this.marketplace?.id
    },
  },
  methods: {
    show() {
      this.showSearch = !this.showSearch
    },
    showPosts() {
      if (!this.productSection) {
        this.productSection = true
        this.postsSection = false
      }
    },
    showProducts() {
      if (!this.postsSection) {
        this.postsSection = true
        this.productSection = false
      }
    },
  },
}
</script>

<style scoped>
.ProductCard::after {
  content: '';
  flex: auto;
}
.fixed-bar {
  position: sticky;
  position: -webkit-sticky;
  top: 64px;
  z-index: 2;
}
</style>