<template>
  <div height="50">
    <v-app-bar flat fixed>
      <v-toolbar-title>
        <NuxtLink :to="{ name: 'Explore' }">
          <v-img
            src="logo.png"
            max-height="40"
            max-width="120"
            class="ml-5"
          ></v-img>
        </NuxtLink>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        color="light-blue lighten-2"
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        solo-inverted
        flat
        dense
        dark
        class="btn-search pt-5 mt-1"
        :class="{ closed: searchClosed }"
        @focus="searchClosed = false"
        @blur="searchClosed = true"
        @keyup="searchItem"
      ></v-text-field>

      <v-btn icon>
        <v-icon color="light-blue lighten-2">mdi-cart</v-icon>
      </v-btn>

      <v-btn icon @click="logout">
        <v-icon color="light-blue lighten-2">mdi-logout</v-icon>
      </v-btn>

      <v-menu left>
        <template #activator="{ on, attrs }">
          <v-btn icon color="light-blue lighten-2" v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list v-if="isSeller" width="300" class="mt-12">
          <v-list-item>
            <v-btn
              text
              color="light-blue lighten-2"
              :to="{ name: 'ProductForm' }"
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
              :to="{ name: 'MarketplaceForm' }"
            >
              Crear tienda
            </v-btn></v-list-item>
          <v-list-item>
            <v-btn
              width="270"
              text
              color="light-blue lighten-2"
              :to="{ path: `/marketplace/${this.$auth.user.marketplace}` }"
            >
              Ir a tienda
            </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn
              width="270"
              text
              color="light-blue lighten-2"
              :to="{ name: `PostForm` }"
            >
              Crear Post
            </v-btn>
            
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      showSearch: false,
      searchClosed: true,
      search: '',
      updateMarketplace: false,
    }
  },
  computed: {
    isSeller() {
      return this.$auth.user && this.$auth.user.role === 'seller'
    },
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
    searchDrop() {
      this.showSearch = !this.showSearch
    },
    searchItem() {
      this.$nuxt.$emit('searchItem', this.search)
    },
  },
}
</script>

<style >
.btn-search {
  border-radius: 40px;
  max-width: 300px;
  transition: all 0.5s ease;
}
.closed {
  max-width: 40px;
}
.v-input__prepend-inner .v-icon {
  margin-left: -5px;
  margin-top: 2px;
  color: #4fc3f7 !important;
}
</style>