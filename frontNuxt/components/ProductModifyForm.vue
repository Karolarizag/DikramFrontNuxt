<template>
  <v-container>
    <v-card class="pb-10 pa-3 mt-5">
      <v-row>
        <v-col cols="6" class="d-flex justify-center align-center flex-column">
          <img
            v-if="url === ''"
            src="~/assets/imagedefault.png"
            style="margin-top: 20px; width: 350px; height: auto"
          />
          <cld-image v-else width="450" crop="scale" :public-id="url" />
          <CloudinaryUpload type="product" />
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-col cols="12" v class="d-flex flex-wrap mt-5 justify-center">
              <div v-for="(item, idx) in productdata.image" :key="idx">
                <img
                  class="ma-1"
                  style="max-width: 150px; max-height: 150px"
                  :src="item"
                />
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-textarea
              solo
              label="Añade aquí la descripción de tu producto"
              class="mt-3 px-3"
              v-model="productdata.description"
            >
            </v-textarea>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="px-15">
        <v-col>
          <v-text-field
            type="text"
            width="500"
            class="mx-2"
            label="Nombre"
            outlined
            dense
            v-model="productdata.name"
          ></v-text-field>
        </v-col>

        <v-col>
          <v-text-field
            type="text"
            class="mx-2"
            label="Etiquetas"
            v-model="tag"
            @keydown.enter="sendTags()"
            outlined
            dense
          >
          </v-text-field>

          <div class="d-flex flex-wrap px-2">
            <div
              v-for="(item, idx) in productdata.tags"
              :key="idx"
              class="ma-1"
            >
              <v-chip
                color="cyan lighten-4"
                close
                @click:close="removeTag(item)"
              >
                <strong>{{ item }}</strong
                >&nbsp;
              </v-chip>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row class="px-15">
        <v-col>
          <v-text-field
            type="text"
            class="mx-2"
            v-model="productdata.price"
            label="Precio"
            outlined
            dense
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-autocomplete
            v-model="productdata.sizes"
            :items="size"
            outlined
            dense
            chips
            small-chips
            label="Tallas"
            multiple
          >
          </v-autocomplete>
        </v-col>
        <v-col>
          <v-text-field
            type="text"
            class="mx-2"
            label="Color"
            v-model="color"
            @keydown.enter="sendColors()"
            outlined
            dense
          >
          </v-text-field>

          <div class="d-flex flex-wrap px-2">
            <div
              v-for="(item, idx) in this.productdata.colors"
              :key="idx"
              class="ma-1"
            >
              <v-chip
                color="cyan lighten-4"
                close
                @click:close="removeColor(item)"
              >
                <strong>{{ item }}</strong
                >&nbsp;
              </v-chip>
            </div>
          </div>
        </v-col>
        <v-col>
          <v-text-field
            type="text"
            class="mx-2"
            label="Material"
            v-model="material"
            @keydown.enter="sendMaterials()"
            outlined
            dense
          >
          </v-text-field>

          <div class="d-flex flex-wrap px-2">
            <div
              v-for="(item, idx) in this.productdata.materials"
              :key="idx"
              class="ma-1"
            >
              <v-chip
                color="cyan lighten-4"
                close
                @click:close="removeMat(item)"
              >
                <strong>{{ item }}</strong
                >&nbsp;
              </v-chip>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-switch
          class="mb-2"
          label="Producto customizable"
          color="light-blue lighten-2"
          v-model="productdata.customizable"
        >
        </v-switch>

        <v-btn
          class="mt-3 mx-10"
          color="light-blue lighten-2"
          dark
          @click="submitProduct"
        >
          Actualizar
        </v-btn>
        <v-btn
          absolute
          top
          right
          icon
          @click="$emit('returnClick')"
        >
          <v-icon color="light-blue lighten-2">mdi-arrow-left-circle</v-icon>
        </v-btn>
        <!-- <v-btn
          @click="$emit('returnClick')"
          dark
          class="mt-3 mx-10"
          color="light-blue lighten-2"
        >
          Volver
        </v-btn> -->
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'CProductImage',
  data() {
    return {
      url: '',
      productTitle: '',
      description: '',
      tag: '',
      price: null,
      size: [
        'Única',
        'XS',
        'S',
        'M',
        'L',
        'XL',
        'XXL',
        '35',
        '36',
        '37',
        '38',
        '39',
        '40',
        '41',
        '42',
        '43',
        '44',
      ],
      color: '',
      material: '',
      customizable: false,
      images: [1, 2, 3, 4, 5, 6, 7, 8],
      productdata: this.product,
    }
  },
  props: {
    product: Object,
  },
  mounted() {
    this.$root.$on('cloudImage', (url) => {
      // eslint-disable-next-line no-console
      console.log(url)
      this.url = url
      this.productdata.image.push(this.url)
    })
  },
  methods: {
    removeTag(item) {
      this.productdata.tags.splice(this.productdata.tags.indexOf(item), 1)
      this.productdata.tags = [...this.productdata.tags]
    },
    removeSize(item) {
      this.productdata.sizes.splice(this.productdata.sizes.indexOf(item), 1)
      this.productdata.sizes = [...this.productdata.sizes]
    },
    removeColor(item) {
      this.productdata.colors.splice(this.productdata.colors.indexOf(item), 1)
      this.productdata.colors = [...this.productdata.colors]
    },
    removeMat(item) {
      this.productdata.materials.splice(
        this.productdata.materials.indexOf(item),
        1
      )
      this.productdata.materials = [...this.productdata.materials]
    },
    sendTags() {
      this.productdata.tags.push(this.tag)
      this.tag = ''
    },
    sendSizes() {
      this.productdata.sizes.push(this.size)
      this.size = ''
    },
    sendColors() {
      this.productdata.colors.push(this.color)
      this.color = ''
    },
    sendMaterials() {
      this.productdata.materials.push(this.material)
      this.material = ''
    },
    async submitProduct() {
      const res = await this.$axios.$put(
        `/products/${this.product._id}`,
        this.productdata,
        {
          headers: {
            token: localStorage.token,
          },
        }
      )
      this.$emit('backClick', res.product)
    },
  },
}
</script>
