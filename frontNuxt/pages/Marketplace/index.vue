<template>
  <v-container fluid class="mt-15">
    {{marketplace}}
    <div class="d-flex flex-wrap flex-row justify-center mx-5">
      <MarketplaceCard
      v-for="(item, idx) in marketplaces"
      :key="idx" 
      :marketplace="item"
      elevation="2" 
      outlined
      />
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Marketplace',
  async asyncData ({ $axios }) {
    const response = await $axios.$get('/marketplace')
    return { marketplaces: response }
  }
}
</script>