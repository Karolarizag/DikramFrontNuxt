<template>
  <v-container fluid class="mt-15">
    <div class="d-flex flex-wrap flex-row justify-center mx-5">

      <MarketplaceCard
      v-for="(item, idx) in marketplaces"
      :key="idx" 
      elevation="2" 
      outlined
      :marketplace="item"
      />
      
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Marketplace',
  async asyncData ({ $axios }) {
    const marketplaces = await $axios.$get('/marketplace')
    return { marketplaces }
  }
}
</script>