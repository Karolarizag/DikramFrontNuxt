<template>
  <v-container fluid class="pa-0">
    <v-card>
      <v-app-bar extended extension-height="250" :src="marketplace.bannerimage">
        <v-card
          class="ma-auto mt-7 pa-5"
          width="1400"
          height="250"
          color="rgba(236, 236, 236, 0.411)"
        >
          <v-card-title class="mt-5">
            <h1>{{ marketplace.name }}</h1>
          </v-card-title>

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
        <v-col class="d-flex justify-end">
          <v-btn class="mt-1" text color="light-blue lighten-2" @click="showProducts">
            Publicaciones
          </v-btn>
        </v-col>

        <v-col>
          <v-row>
            <v-col cols="11">
              <v-btn class="mt-1" text color="light-blue lighten-2" @click="showPosts">
                Productos
              </v-btn>
            </v-col>

            <v-col v-if="isTheOwner">
              <v-menu left offset-y>
                <template #activator="{ on, attrs }">
                  <v-btn
                    icon
                    color="light-blue lighten-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list  width="300">
                  <v-list-item>
                    <v-btn
                      text
                      color="light-blue lighten-2"
                      :to="{ path: '/productForm' }"
                      width="270"
                    >
                      Crear Producto
                    </v-btn>
                  </v-list-item>

                  <v-list-item>
                    <v-btn
                      width="270"
                      text
                      color="light-blue lighten-2"
                      :to="{ path: `/postForm` }"
                    >
                      Crear Post
                    </v-btn>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-toolbar>

    <div
      v-if="productSection"
      class="d-flex flex-wrap flex-row justify-center mx-5"
    >
      <ProductCard
        v-for="(item, idx) in products"
        :key="idx"
        elevation="2"
        outlined
        :product="item"
      />
    </div>

    <div v-else class="d-flex flex-wrap flex-row justify-center mx-5">
      Cartas de post
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'MarketplaceView',
  async asyncData({ $axios, params }) {
    const marketplace = await $axios.$get(`/marketplace/${params.id}`)
    const products = await $axios.$get(
      `/marketplace/${marketplace._id}/products`
    )
    return { marketplace, products }
  },
  data() {
    return {
      productSection: true,
      postsSection: false,
    }
  },
  computed: {
    isTheOwner() {
      return this.$auth.user.marketplace === this.marketplace._id
    },
  },
  methods: {
    showPosts() {
      if (!this.productSection) {
        this.productSection = true
        this.postsSection = false
      }
    },
    showProducts() {
      if (!this.posts) {
        this.postsSection = true
        this.productSection = false
      }
    },
  },
}
</script>

<style scoped>
.fixed-bar {
  position: sticky;
  position: -webkit-sticky;
  top: 4em;
  z-index: 2;
}
</style>