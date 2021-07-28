<template>
  <v-app-bar flat app min-height="64" color="second">
    <v-toolbar-title class="mr-3">
      <NuxtLink :to="{ path: '/explore' }">
        <v-img
          src="https://cdn.discordapp.com/attachments/860532293738692624/869930319598481438/dikram.png"
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
      color="fourth"
      class="ml-3"
      active-class="no-active"
      >{{ item.name }}
    </v-btn>

    <v-spacer></v-spacer>

    <v-text-field
      v-model="search"
      color="fourth"
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
        <v-btn icon color="fourth" v-bind="attrs" v-on="on">
          <v-icon v-if="$auth.user.notifications.length===0">mdi-bell</v-icon>
          <v-icon v-else>mdi-bell-ring</v-icon>
        </v-btn>
      </template>
      <v-list v-if="$auth.user.notifications.length" width="300">
        <v-list-item v-for="(notification, idx) in $auth.user.notifications" :key="idx"> 
          {{notification.msg}}
           <v-btn icon @click="deleteNot(idx)"><v-icon color="fourth">mdi-alpha-x</v-icon></v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn icon :to="{ path: '/cart' }">
      <v-icon color="fourth">mdi-cart</v-icon>
    </v-btn>

    <v-btn icon @click="logout">
      <v-icon color="fourth">mdi-logout</v-icon>
    </v-btn>

    <v-menu left offset-y>
      <template #activator="{ on, attrs }">
        <v-btn icon color="fourth" v-bind="attrs" v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list v-if="isSeller" width="300">
        <v-list-item>
          <v-btn
            width="270"
            text
            color="fourth"
            :to="{ path: `/marketplace/${$auth.user.marketplace}` }"
          >
            Mi tienda
          </v-btn>
        </v-list-item>
        <v-list-item v-if="ownMarketplace">
          <v-btn
            width="270"
            text
            color="fourth"
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
    checkReports() {
      return this.$auth.user.marketplace
    }
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
    async deleteNot(i) {

      this.$auth.user.notifications.splice(i, 1)
      const user = await this.$axios.$put('/users/account', this.$auth.user)
      this.$auth.setUser(user)
    }
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
  color: #A31D5E !important;
}
</style>