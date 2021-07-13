<template>
  <div width="300">
    <v-row>
      <v-col cols="2">
        <v-text-field
      label="Búsqueda"
      filled
      rounded
      dense
      v-model="search"
      @keyup="searchItem"
      ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
    searchItem() {
      this.$nuxt.$emit('searchItem', this.search)
    }
  }
}
</script>