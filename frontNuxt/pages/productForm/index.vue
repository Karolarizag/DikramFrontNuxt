<template>
  <v-container>
    <v-card class="pb-10 pa-3 mt-5">
      <v-row>
        <v-col
          cols="4"
          class="d-flex justify-center align-center flex-column ml-7"
        >
          <!-- <VImageInput class="ml-7" />  -->
          <v-btn class="mt-3 mx-10" color="light-blue lighten-2" dark>
            Añadir imagen
          </v-btn>
        </v-col>

        <v-col cols="7">
          <div class="d-flex flex-wrap mt-5 justify-center">
            <div v-for="(item, idx) in images" :key="idx">
              <img
                class="ma-1"
                style="max-width: 150px; max-height: 150px"
                src="~/assets/imagedefault.png"
              />
            </div>

            <v-textarea
              v-model="description"
              solo
              label="Añade aquí la descripción de tu producto"
              class="mt-3 px-3"
            >
            </v-textarea>
          </div>
        </v-col>
      </v-row>
      <v-row class="px-15">
        <v-col>
          <v-text-field
            v-model="productTitle"
            type="text"
            width="500"
            class="mx-2"
            label="Nombre"
            outlined
            dense
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="tag"
            type="text"
            class="mx-2"
            label="Etiquetas"
            outlined
            dense
            @keydown.enter="sendTags()"
          >
          </v-text-field>

          <div class="d-flex flex-wrap px-2">
            <div
              v-for="(item, idx) in productTags"
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
            v-model="price"
            type="number"
            class="mx-2"
            label="Precio"
            outlined
            dense
          >
          </v-text-field>
        </v-col>

        <v-col>
          <v-autocomplete
            v-model="productSizes"
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
            v-model="color"
            type="text"
            class="mx-2"
            label="Color"
            outlined
            dense
            @keydown.enter="sendColors()"
          >
          </v-text-field>

          <div class="d-flex flex-wrap px-2">
            <div
              v-for="(item, idx) in productColors"
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
            v-model="material"
            type="text"
            class="mx-2"
            label="Material"
            outlined
            dense
            @keydown.enter="sendMaterials()"
          >
          </v-text-field>

          <div class="d-flex flex-wrap px-2">
            <div
              v-for="(item, idx) in productMaterial"
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
          v-model="customizable"
          class="mb-2"
          label="Producto customizable"
          color="light-blue lighten-2"
        >
        </v-switch>

        <v-btn
          class="mt-3 mx-10"
          color="light-blue lighten-2"
          dark
          @click="submitProduct"
        >
          Enviar
        </v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'NewProduct',
  data() {
    return {
      imageInput: ['urlimage'],
      productTitle: '',
      description: '',
      tag: '',
      productTags: [],
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
      productSizes: [],
      color: '',
      productColors: [],
      material: '',
      productMaterial: [],
      customizable: false,
      images: [1, 2, 3, 4, 5, 6, 7, 8],
    }
  },
  methods: {
    removeTag(item) {
      this.productTags.splice(this.productTags.indexOf(item), 1)
      this.productTags = [...this.productTags]
    },
    removeSize(item) {
      this.productSizes.splice(this.productSizes.indexOf(item), 1)
      this.productSizes = [...this.productSizes]
    },
    removeColor(item) {
      this.productColors.splice(this.productColors.indexOf(item), 1)
      this.productColors = [...this.productColors]
    },
    removeMat(item) {
      this.productMaterial.splice(this.productMaterial.indexOf(item), 1)
      this.productMaterial = [...this.productMaterial]
    },
    sendTags() {
      this.productTags.push(this.tag)
      this.tag = ''
    },
    sendSizes() {
      this.productSizes.push(this.size)
      this.size = ''
    },
    sendColors() {
      this.productColors.push(this.color)
      this.color = ''
    },
    sendMaterials() {
      this.productMaterial.push(this.material)
      this.material = ''
    },
    async submitProduct() {
      const res = await this.$axios.$post(
        '/products',
        {
          name: this.productTitle,
          description: this.description,
          image: this.image,
          sizes: this.productSizes,
          colors: this.productColors,
          materials: this.productMaterial,
          customizable: this.customizable,
          tags: this.productTags,
          price: this.price,
        }
        // {
        //   headers: {
        //     token: localStorage.token,
        //   },
        // }
      )
      this.$router.push({ name: 'explore' })
      res.status(200).json(res)
    },
  },
}
</script>