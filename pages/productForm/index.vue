<template>
  <v-container>
    <v-card class="pb-10 pa-3 mt-5">
      <v-row>
        <v-col
          cols="4"
          class="d-flex justify-center align-center flex-column ml-7"
        >
          <div class="ma-3 mr-n4" max-width="300">
            <cld-image
              quality="auto"
              width="300"
              crop="scale"
              :public-id="url"
            />
          </div>
          <CloudinaryUpload type="product" />
          <span class="mt-2">Recomendamos que sea tamaño 500x500</span>
        </v-col>

        <v-col cols="7">
          <v-row>
            <div class="d-flex flex-wrap mt-5 justify-center px-2">
              <div v-for="(item, idx) in images" :key="idx" class="mx-1">
                <cld-image width="150" crop="crop" :public-id="item" />
                <!-- <img class="ma-1" style="max-width: 150px; max-height: 150px;" src="~/assets/imagedefault.png"/> -->
              </div>
            </div>
          </v-row>
          <v-row>
            <v-textarea
              v-model="description"
              solo
              label="Añade aquí la descripción de tu producto"
              class="mt-3 px-3"
            >
            </v-textarea>
          </v-row>
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
            <div v-for="(item, idx) in productTags" :key="idx" class="ma-1">
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
            label="Tallas"
            multiple
            clearable
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
            <div v-for="(item, idx) in productColors" :key="idx" class="ma-1">
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
            <div v-for="(item, idx) in productMaterial" :key="idx" class="ma-1">
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
          color="fourth"
        >
        </v-switch>

        <v-btn
          class="mt-3 mx-10"
          color="fourth"
          dark
          @click="submitProduct"
          v-if="!customizable"
        >
          Enviar
        </v-btn>
      </v-row>
      <v-btn
        absolute
        top
        right
        icon
        :to="{ path: `/marketplace/${$auth.user.marketplace}` }"
      >
        <v-icon color="fourth">mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-card>
    <v-expansion-panels v-if="customizable">
      <v-expansion-panel>
        <v-row class="mx-16">
          <v-col>
            <v-autocomplete
              v-model="texture"
              :items="textures"
              item-text="name"
              item-value="_id"
              outlined
              return-object
              dense
              label="Texturas disponibles para este producto"
              multiple
              auto-select-fourth
            >
            </v-autocomplete
          ></v-col>
          <v-col>
            <v-autocomplete
              v-model="pattern"
              :items="patterns"
              item-text="name"
              item-value="_id"
              outlined
              return-object
              dense
              label="Patrones de estilado"
              multiple
              auto-select-fourth
            >
            </v-autocomplete
          ></v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center mb-10">
            <v-btn
              class="mt-3 mx-10"
              color="fourth"
              dark
              @click="submitProduct"
              v-if="customizable"
            >
              Enviar
            </v-btn></v-col
          >
        </v-row>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
export default {
  name: 'NewProduct',
  async asyncData({ $axios }) {
    const textures = await $axios.$get('/custom/texture')
    const patterns = await $axios.$get('/custom/pattern')
    return { textures, patterns }
  },
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
      images: [],
      url: '',
      texture: null,
      pattern: null,
      basecolor: '',
      baseColors: [],
    }
  },
  mounted() {
    this.$root.$on('cloudImage', (url) => {
      this.url = url
      this.images.push(url)
    })
  },
  methods: {
    colorsCustom() {
      this.baseColors.push(this.basecolor)
      this.basecolor = ''
    },
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
      const texture = this.texture.map((t) => t._id)
      const pattern = this.pattern.map((p) => p._id)
      const res = await this.$axios.$post('/products', {
        name: this.productTitle,
        description: this.description,
        image: this.images,
        sizes: this.productSizes,
        colors: this.productColors,
        materials: this.productMaterial,
        customizable: this.customizable,
        tags: this.productTags,
        price: this.price,
        customForm: {
          texture,
          pattern,
          basecolor: this.baseColors,
        },
      })
      this.$router.push({ path: `/marketplace/${this.$auth.user.marketplace}` })
      return res
    },
  },
}
</script>