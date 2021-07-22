<template>
  <v-app-bar flat app>
    <v-toolbar-title class="mr-3">
      <NuxtLink :to="{ path: '/explore' }">
        <v-img
          src="logo.png"
          max-height="40"
          max-width="120"
          class="ml-5"
        ></v-img>
      </NuxtLink>
    </v-toolbar-title>

    <v-divider vertical></v-divider>

    <v-btn
      v-for="(item, idx) in navButtons"
      :key="idx"
      :to="{ name: item.path }"
      text
      color="light-blue lighten-2"
      class="ml-3"
      active-class="no-active"
      >{{ item.name }}
    </v-btn>

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

    <v-menu left offset-y>
      <template #activator="{ on, attrs }">
        <v-btn 
          icon 
          v-bind="attrs" 
          v-on="on"
        >
          <v-icon color="light-blue lighten-2">mdi-cart</v-icon>
        </v-btn>
      </template>

      <v-list width="300">
        <v-list-item 
          v-for="(item, idx) in $auth.user.cart"
          :key="idx"
         
        >
          {{item._id}} 
          <v-spacer></v-spacer>
          <v-btn icon color="light-blue lighten-2" @click="deleteFromCart(item._id)"> <v-icon>mdi-trash-can-outline</v-icon> </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn icon @click="logout">
      <v-icon color="light-blue lighten-2">mdi-logout</v-icon>
    </v-btn>

    <v-menu left offset-y>
      <template #activator="{ on, attrs }">
        <v-btn icon color="light-blue lighten-2" v-bind="attrs" v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list v-if="isSeller" width="300">
        <v-list-item>
          <v-btn
            width="270"
            text
            color="light-blue lighten-2"
            :to="{ path: `/marketplace/${$auth.user.marketplace}` }"
          >
            Mi tienda
          </v-btn>
        </v-list-item>
        <v-list-item v-if="ownMarketplace">
          <v-btn
            width="270"
            text
            color="light-blue lighten-2"
            :to="{ name: 'marketplaceForm' }"
          >
            Crear tienda
          </v-btn></v-list-item
        >
      </v-list>
    </v-menu>
  </v-app-bar>
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
      navButtons: [
        { name: 'Explorar', path: 'explore' },
        { name: 'Tiendas', path: 'marketplace' },
      ],
    }
  },
  computed: {
    isSeller() {
      return this.$auth.user && this.$auth.user.role === 'seller'
    },
    ownMarketplace() {
      return this.$auth.user.marketplace === undefined
    },
  },
  methods: {
    async deleteFromCart(item){
      const res = await this.$axios.$delete(`/users/${this.$auth.user._id}/cart/${item}`)
      location.reload()
      return res
    },
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

<style>
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