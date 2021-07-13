<template>
  <v-card>
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

      {{ props }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr v-for="item in characteristics" :key="item.title">
              <td>{{ item.title }}</td>
              <td>{{ item.value }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-row class="d-flex justify-end mb-6">
        <v-col class="d-flex" cols="6">
          <v-select
            :items="product.sizes"
            filled
            label="Talla"
            dense
          ></v-select>
        </v-col>

        <v-col class="d-flex" cols="6">
          <v-select
            :items="product.colors"
            filled
            label="Color"
            dense
          ></v-select>
        </v-col>

        <v-col cols="12" class="d-flex justify-center">
          <v-btn elevation="1" color="light-blue lighten-2" dark>
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
  data() {
    return {
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
          value: 'No',
        },
      ],
    }
  },
  props: {
    product: Object,
  },
}
</script>