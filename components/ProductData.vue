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
              <v-btn
                icon
                color="light-blue lighten-2"
                @click="substractProduct"
              >
                —
              </v-btn>
              {{ quantity }}
              <v-btn icon color="light-blue lighten-2" @click="addProduct">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn
              v-if="!product.customizable"
              @click="addToCart"
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
            <v-col cols="12">
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
                class="mx-5 my-0"
              >
              </v-autocomplete>
              </v-col>
              <v-col cols="12">
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
                class="mx-5 my-0"
              >
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn
              v-if="product.customizable"
              elevation="1"
              color="light-blue lighten-2"
              dark
              class="mb-3"
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
    product: {
      type: Object,
      default: null,
    },
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
      deleteOverlay: false,
      modifyOverlay: false
    }
  },
  methods: {
    addProduct() {
      if (this.quantity <= 8) this.quantity++
    },
    substractProduct() {
      if (this.quantity > 1) this.quantity--
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
        await this.$axios.$put(
          `/users/${this.$auth.user._id}/cart`,
          saleProduct
        )
        this.$store.commit('getUser', {
          axios: this.$axios,
          user: this.$auth.user,
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error.message)
      }
    },
    async deleteProductPage() {
      const response = await this.$axios.$delete(
        `/products/${this.product._id}`
      )
      return response
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