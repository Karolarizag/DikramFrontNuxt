<template>
  <v-container class="pa-0">
    <v-card>
      <v-row>
        <v-col cols="9">
          <v-card-title>
            {{ product.name }}
          </v-card-title></v-col
        >
        <v-col cols="1" class="mt-3">
          <v-btn
            v-if="isTheOwner"
            dark
            color="light-blue lighten-2"
            @click="deleteOverlay = !deleteOverlay"
            icon
          >
            <v-icon color="light-blue lighten-2">mdi-delete-forever</v-icon>
          </v-btn></v-col
        >
        <v-col cols="1" class="mt-3">
          <v-btn
            v-if="isTheOwner"
            dark
            color="light-blue lighten-2"
            @click="modifyOverlay = !modifyOverlay"
            icon
          >
            <v-icon color="light-blue">mdi-update</v-icon>
          </v-btn></v-col
        >
      </v-row>

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
          <tbody>
            <v-row v-for="item in characteristics" :key="item.title">
              <v-col cols="6" md="6" sm="12 d-flex justify-center"
                ><h4>{{ item.title }}</h4></v-col
              >
              <v-col cols="6" md="6" sm="12 d-flex justify-center"
                ><p>{{ item.value }}</p></v-col
              >
            </v-row>
          </tbody>
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
            <v-btn
              v-if="!product.customizable"
              elevation="1"
              color="light-blue lighten-2"
              dark
            >
              Añadir al carrito
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
      <v-expansion-panels v-if="product.customizable">
        <v-expansion-panel>
          <v-row>
            <v-col>
              {{product._id}}
              <v-autocomplete
                v-model="pattern"
                :items="product.customForm.pattern"
                item-text="name"
                item-value="_id"
                outlined
                return-object
                dense
                label="Patrones de estilado"
                multiple
                auto-select-first
              >
              </v-autocomplete>
            </v-col>
            <v-col> </v-col>
          </v-row>
          ><v-col cols="12" class="d-flex justify-center">
            <v-btn
              v-if="product.customizable"
              elevation="1"
              color="light-blue lighten-2"
              dark
            >
              Añadir al carrito
            </v-btn>
          </v-col></v-expansion-panel
        ></v-expansion-panels
      >
    </v-card>
    <!-- OVERLAY TO DELETE PRODUCTS -->
    <v-overlay :dark="false" :absolute="absolute" :value="deleteOverlay">
      <v-card height="300" width="500" shaped class="px-8">
        <v-card-title class="d-flex justify-center mt-15">
          <p class="mt-10">¡Atención!</p>
        </v-card-title>

        <v-card-text>
          <span class="d-flex justify-center"
            >¿Estás seguro de querer borrar este producto? Se borrarán todos sus
            datos y no podrás recuperarlos.</span
          >
        </v-card-text>

        <v-card-actions>
          <v-row>
            <v-col class="d-flex justify-center"
              ><v-btn
                :to="{ path: `/marketplace/${$auth.user.marketplace}` }"
                dark
                color="light-blue lighten-2"
                class="mr-2"
                @click="deleteProductPage"
              >
                Borrar producto
              </v-btn>
            </v-col>

            <v-btn
              absolute
              top
              right
              icon
              @click="deleteOverlay = !deleteOverlay"
            >
              <v-icon color="light-blue lighten-2"
                >mdi-arrow-left-circle</v-icon
              >
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-overlay>

    <!-- OVERLAY TO MODIFY PRODUCT FORM -->

    <v-overlay :dark="false" :absolute="absolute" :value="modifyOverlay">
      <v-container fluid>
        <div class="pa-5 overlay">
          <ProductModifyForm
            shaped
            :product="product"
            @returnClick="modifyOverlay = false"
            @backClick.native="actualize"
            @backClick="modifyOverlay = false"
          />
        </div>
      </v-container>
    </v-overlay>
  </v-container>
</template>

<script>
export default {
  name: 'ProductData',
  props: {
    product: Object,
  },
  data() {
    return {
      absolute: true,
      deleteOverlay: false,
      modifyOverlay: false,
      productKey: 0,
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
    async addToCart({ $axios }) {
      try {
        const cart = await this.$axios.$put(
          `/users/${this.$auth.user._id}/cart`,
          {
            product: this.product._id,
            marketplace: this.product.marketplace,
            size: this.size,
            color: this.color,
            quantity: this.quantity,
            price: this.product.price * this.quantity,
          }
        )
        return cart
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error.message)
      }
    },
  },
  async deleteProductPage() {
    const response = await this.$axios.$delete(`/products/${this.product._id}`)
    return response
  },
  computed: {
    isTheOwner() {
      return this.$auth.user.marketplace === this.product.marketplace
    },
  },
}
</script>