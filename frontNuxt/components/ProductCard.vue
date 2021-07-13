<template>
  <v-card
    class=" ma-5"
    width="320"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="400"
      :src="product.image[0]"
    ></v-img>

    <v-card-title>{{product.name}}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="product.rate"
          color="pink lighten-3"
          dense
          half-increments
          readonly
          size="18"
          class="mt-0"
          background-color="pink lighten-3"
          empty-icon="mdi-heart-outline"
          full-icon="mdi-heart"
          half-icon="mdi-heart-half-full"
        ></v-rating>

        <div class="grey--text ms-4 mt-0">
          {{product.rate}}
        </div>
      </v-row>
      <div class="mt-3">{{product.description}}</div>

      <div class="mt-2 text-subtitle-1">
        €{{product.price}} • Tenerife, islas Canarias
      </div>

      <v-divider class="mx-2"></v-divider>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="light-blue lighten-2"
        text
        :to="{ params: {
        productId : product._id}, name: 'Product'}"
      >
        Ver producto
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: Object
  },
}
</script>