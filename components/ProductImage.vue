<template>
  <div>
    <v-carousel class="carousel" hide-delimiters>
      <v-carousel-item
        v-for="(item, idx) in product.image"
        :key="idx"
        :src="item"
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
  export default {
    name: "ProductImages",
    props: {
      product: {
        type: Object,
        default: null
      }
    },
  }
</script>

<style lang="scss" scoped>
.carousel {
  max-width: 800px;
  max-height: 800px;
  border-radius: 5px;
}
</style>