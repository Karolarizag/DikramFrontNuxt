<template>
  <v-card v-if="marketplace" class="ma-5" width="640">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="400" :src="marketplace.bannerimage"></v-img>

    <v-card-title>{{ marketplace.name }}</v-card-title>

    <v-card-text>
      <div class="mt-3">{{ marketplace.description }}</div>

      <v-divider class="mx-2"></v-divider>
    </v-card-text>

    <v-card-actions>
      <NuxtLink :to="{ path: `/marketplace/${marketplace._id}` }" style="text-decoration: none;">
        <v-btn color="fourth" text> Ver Tienda </v-btn>
      </NuxtLink>
    </v-card-actions>

  </v-card>
</template>

<script>
export default {
  name: 'MarketplaceCard',
  props: {
    marketplace: {
      type: Object,
      default: null
      }
      
  }
}
</script>
