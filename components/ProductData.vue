<template>
  <v-container class="pa-0">
    <v-card>
      <v-card-text>
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
        <v-row>
          <v-col>
            {{ product.description }}
          </v-col>
        </v-row>
        <v-divider />
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
        <v-divider />
        <v-row>
          <v-col>
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr v-for="(item, idx) in characteristics" :key="idx">
                    <th cols="6" md="6" sm="12 d-flex justify-center">
                      <h3>{{ item.title }}</h3>
                    </th>
                    <th cols="6" md="6" sm="12 d-flex justify-center">
                      <h3>{{ item.value }}</h3>
                    </th>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
        <v-divider />
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

        <v-row v-if="product.customizable">
          <v-col cols="12">
            <v-autocomplete
              v-model="patternP"
              :items="customForm.pattern"
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
              v-model="textureP"
              :items="customForm.texture"
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
      </v-card-text>

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
          <v-col class="d-flex justify-end">
            <v-btn
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
  props: {
    product: {
      type: Object,
      default() {
        return {}
      },
    },
    customForm: {
      type: Object,
      default() {
        return {}
      },
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
          value: this.productColors,
        },
        {
          title: 'Tallas',
          value: this.product?.sizes?.join(', '),
        },
        {
          title: 'Envíos disponibles',
          value: 'A toda Canarias',
        },
        {
          title: 'Customizable',
          value: this.product?.customizable ? 'Si' : 'No',
        },
      ],
      deleteOverlay: false,
      modifyOverlay: false,
      absolute: true,
      patternP: '',
      textureP: '',
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
  computed: {
    isTheOwner() {
      return this.$auth.user.marketplace === this.product?.marketplace
    },
    productColors() {
      return this.product?.colors?.join(', ')
    },
  },
}
</script>