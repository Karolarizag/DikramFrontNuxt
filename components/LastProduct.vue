<template>
  <v-sheet shaped elevation="2" max-width="100%" color="light-blue lighten-5" >
    <div class="d-flex justify-center mt-3"><h2 color="light-blue lighten-2">Novedades</h2> </div>
      
    <v-slide-group
      v-model="model"
      class="pa-4"
      active-class="success"
      show-arrows
    >
    <v-slide-item v-for="(product, idx) in lastProducts" :key="idx">
      <v-card class="ma-2 mt-0 rounded-b-xl" color="light-blue lighten-4" hover outlined>
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poiret+One&display=swap');

  h2 {
  font-family: 'Poiret One', cursive;
  }
</style>