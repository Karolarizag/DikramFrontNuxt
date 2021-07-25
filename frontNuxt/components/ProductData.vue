<template>
  <v-card class="pa-5 pb-10">
    <v-card-title>
      {{ product.name }}
    </v-card-title>

    <v-card-text class="pb-15">
      {{ product.description }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <v-row class="mx-2">
        <v-col> {{ product.price }} € </v-col>

        <v-col>
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
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <v-simple-table>
        <v-row v-for="item in characteristics" :key="item.title">
          <v-col cols="6" md="6" sm="12 d-flex justify-center"
            ><h4>{{ item.title }}</h4></v-col
          >
          <v-col cols="6" md="6" sm="12 d-flex justify-center"
            ><p>{{ item.value }}</p></v-col
          >
        </v-row>
      </v-simple-table>
    </v-card-text>

    <v-divider></v-divider>

    <v-row class="d-flex justify-end px-3 mt-3">
      <v-col class="d-flex" cols="6">
        <v-select
          v-model="size"
          :items="product.sizes"
          label="Talla"
          solo
        ></v-select>
      </v-col>

      <v-col class="d-flex" cols="6">
        <v-select
          v-model="color"
          :items="product.colors"
          label="Color"
          solo
        ></v-select>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-row>
        <v-col class="ml-3">
          <div style="background-color: #cff9ff; width: 90px">
            <v-btn icon color="light-blue lighten-2" @click="substractProduct"> — </v-btn>
            {{ quantity }}
            <v-btn icon color="light-blue lighten-2" @click="addProduct">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-col>

        <v-col class="d-flex justify-end">
          <v-btn
            elevation="1"
            color="light-blue lighten-2"
            dark
            @click="addToCart"
          >
            Añadir al carrito
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ProductData',
  props: {
    product: {
      type: Object,
      default: null 
    }
  },
  data() {
    return {
      size: '',
      color: '',
      quantity: 1,
      characteristics: [
        {
          title: 'Colores',
          value: this.product.colors.join(', '),
        },
        {
          title: 'Tallas',
          value: this.product.sizes.join(', '),
        },
        {
          title: 'Envíos disponibles',
          value: 'A toda Canarias',
        },
        {
          title: 'Customizable',
          value: this.product.customizable ? 'Si' : 'No',
        },
      ],
    }
  },
  methods: {
    addProduct() {
      this.quantity++
    },
    substractProduct() {
      if (this.quantity > 0) this.quantity--
    },
    async addToCart() {
      try {
        const saleProduct = {
          product: this.product._id,
          marketplace: this.product.marketplace,
          size: this.size,
          color: this.color,
          quantity: this.quantity,
          price: this.product.price * this.quantity,
        }
        await this.$axios.$put(`/users/${this.$auth.user._id}/cart`, saleProduct)
        this.$store.commit('getUser', { axios: this.$axios, user: this.$auth.user })

      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error.message)
      }
    },
  },
}
</script>