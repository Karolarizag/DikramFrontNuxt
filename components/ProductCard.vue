<template>
  <v-card v-if="product" class="ma-5 rounded-b-xl" width="320" hover>

    <v-img height="400" :src="product.image[0]"></v-img>

    <v-card-title style="color: #A31D5E;">{{ product.name }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="product.rate"
          color="third"
          dense
          half-increments
          readonly
          size="18"
          class="mt-0"
          background-color="third"
          empty-icon="mdi-heart-outline"
          full-icon="mdi-heart"
          half-icon="mdi-heart-half-full"
        ></v-rating>

        <div class="grey--text ms-4 mt-0">
          {{ product.rate }}
        </div>
      </v-row>
      <div class="mt-3">{{ descr }}</div>

      <div class="mt-2 text-subtitle-1">
        €{{ product.price }} • Tenerife, islas Canarias
      </div>

      <v-divider class="mx-2"></v-divider>
    </v-card-text>

    <v-card-actions class="d-flex align-end">
      <NuxtLink :to="{ path: `/product/${product._id}` }" style="text-decoration: none;">
        <v-btn color="fourth" text> Ver producto </v-btn>
      </NuxtLink>
    </v-card-actions>

  </v-card>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      descr: ''
    }
  },
  mounted () {
    if (this.product.description.length <= 35) {
      this.descr = this.product.description
    } else {
      this.descr = this.product.description.slice(0,35) + '...'
    }
  }
}
</script>