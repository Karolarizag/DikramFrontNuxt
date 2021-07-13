<template>
  <div>
    <v-carousel class="carousel" hide-delimiters>
      <v-carousel-item
        v-for="(item,i) in product.image"
        :key="i"
        :src="item"
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
  export default {
    name: "ProductImages",
    props: {
      product: Object
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