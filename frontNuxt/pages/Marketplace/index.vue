<template>
  <v-container fluid class="px-0 mt-13">
    <v-card>
      <v-app-bar extended extension-height="250" :src="banner">
        <v-card
          class="ma-auto mt-7 pa-5"
          width="1400"
          height="250"
          color="rgba(236, 236, 236, 0.411)"
        >
          <v-card-title class="mt-5"
            ><h1>{{ name }}</h1></v-card-title
          >
          <div class="mr-5">
            <h2>{{ description }}</h2>
          </div>
          <div>
            <h3>{{ ubication }}</h3>
          </div>
        </v-card>
      </v-app-bar>
    </v-card>
    <v-toolbar class="fixed-bar" height="40">
      <v-row>
        <v-col class="d-flex justify-end"
          ><v-btn @click="showProducts" text color="light-blue lighten-2">Publicaciones</v-btn></v-col
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
    </div>
     <div
      v-else
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
  name: 'Marketplace',
  data() {
    return {
      showSearch: true,
      filter: '',
      banner:
        'https://cdn.discordapp.com/attachments/860532293738692626/862356860568076308/bgimagerotate.png',
      name: 'YUZYS',
      description: 'Bienvenidos a Yuzys,',
      ubication: 'Tenerife sur, Islas canarias',
      productSection: true,
      posts: false,
    }
  },
  // eslint-disable-next-line vue/order-in-components
  async asyncData({ $axios }) {
    const response = await $axios.$get('/products')
    return { products: response }
  },
  mounted() {
    this.$nuxt.$on('searchItem', (item) => {
      console.log(item)
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
    showPosts() {
      if (!this.productSection) {
        this.productSection = true
        this.posts = false
      }
    },
    showProducts() {
      if(!this.posts) {
        this.posts = true
        this.productSection = false
      }
    }
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap');

h1 {
  font-family: 'Staatliches', cursive;
  font-size: 100px;
  color: rgb(236, 236, 236);
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.74);
}
h2,
h3 {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 30px;
  color: rgb(233, 233, 233);
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.74);
}
.ProductCard::after {
  content: '';
  flex: auto;
}
.fixed-bar {
  position: sticky;
  position: -webkit-sticky;
  top: 4em;
  z-index: 2;
}
</style>