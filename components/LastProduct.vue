<template>
  <v-sheet rounded="lg" class="mx-auto" elevation="8" max-width="100%">
    <v-slide-group
      v-model="model"
      class="pa-4"
      active-class="success"
      show-arrows
    >
      <v-slide-item v-for="(product, idx) in lastProducts" :key="idx">
        <v-card>
          <NuxtLink
            :to="{ path: `/product/${product._id}` }"
            style="text-decoration: none"
          >
            <v-img width="200"  height="300" :src="product.image[0]"> </v-img>
          </NuxtLink>
          
          <v-card-text>{{ product.name }}</v-card-text>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>


<script>
export default {
  name: 'LastProduct',
  props: {
    products: {
      type: Array,
      default: null,
    },
  },
  data: () => ({
    model: null,
  }),
  computed: {
    lastProducts() {
      const lastProducts = [...this.products]
      return lastProducts
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .splice(0, 15)
    },
  },
}
</script>