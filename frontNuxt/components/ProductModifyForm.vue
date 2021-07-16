<template>
  <v-container>
    <v-card class="pb-10 pa-3 mt-5">
      <v-row>
        <v-col
          cols="4"
          class="d-flex justify-center align-center flex-column ml-7"
        >
          <VImageInput class="ml-7" /> 
          <v-btn class="mt-3 mx-10" color="light-blue lighten-2" dark>
            Añadir imagen
          </v-btn>
        </v-col>

        <v-col cols="7">
          <div class="d-flex flex-wrap mt-5 justify-center">
            <div v-for="(item, idx) in imagenes" :key="idx">
              <img
                class="ma-1"
                style="max-width: 150px; max-height: 150px"
                src="~/assets/imagedefault.png"
              />
            </div>

            <v-textarea
              solo
              label="Añade aquí la descripción de tu producto"
              class="mt-3 px-3"
              v-model="productdata.description"
            >
            </v-textarea>
          </div>
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
            v-model="etiquetas"
            @keydown.enter="sendTags()"
            outlined
            dense
          >
          </v-text-field>
          <div class="d-flex flex-wrap px-2">
            <div v-for="(item, idx) in productdata.tags" :key="idx" class="ma-1">
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
          <v-text-field
            type="text"
            class="mx-2"
            label="Tallas"
            v-model="productdata.tallas"
            @keydown.enter="sendSizes()"
            outlined
            dense
          >
          </v-text-field>
          <div class="d-flex flex-wrap px-2">
            <div v-for="(item, idx) in this.sizes" :key="idx" class="ma-1">
              <v-chip
                color="cyan lighten-4"
                close
                @click:close="removeSize(item)"
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
            label="Color"
            v-model="productdata.color"
            @keydown.enter="sendColors()"
            outlined
            dense
          >
          </v-text-field>
          <div class="d-flex flex-wrap px-2">
            <div v-for="(item, idx) in this.colors" :key="idx" class="ma-1">
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
            v-model="productdata.material"
            @keydown.enter="sendMaterials()"
            outlined
            dense
          >
          </v-text-field>
          <div class="d-flex flex-wrap px-2">
            <div v-for="(item, idx) in this.materials" :key="idx" class="ma-1">
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
          @click="$emit('returnClick')"
          dark
          class="mt-3 mx-10"
          color="light-blue lighten-2"
        >
          Volver
        </v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'CProductImage',
  data() {
    return {
      imageInput: ['urlimage'],
      title: '',
      description: '',
      etiquetas: '',
      tags: [],
      price: null,
      tallas: '',
      sizes: [],
      color: '',
      colors: [],
      material: '',
      materials: [],
      customizable: false,
      imagenes: [1, 2, 3, 4, 5, 6, 7, 8],
      productdata: this.product
    }
  },
  props: {
    product: Object
  },
  methods: {
    removeTag(item) {
      this.productdata.tags.splice(this.productdata.tags.indexOf(item), 1)
      this.productdata.productdata.tags = [...this.productdata.tags]
    },
    removeSize(item) {
      this.sizes.splice(this.sizes.indexOf(item), 1)
      this.sizes = [...this.sizes]
    },
    removeColor(item) {
      this.colors.splice(this.colors.indexOf(item), 1)
      this.colors = [...this.colors]
    },
    removeMat(item) {
      this.materials.splice(this.materials.indexOf(item), 1)
      this.materials = [...this.materials]
    },
    sendTags() {
      this.productdata.tags.push(this.etiquetas)
      this.etiquetas = ''
    },
    sendSizes() {
      this.sizes.push(this.tallas)
      this.tallas = ''
    },
    sendColors() {
      this.colors.push(this.color)
      this.color = ''
    },
    sendMaterials() {
      this.materials.push(this.material)
      this.material = ''
    },
    async submitProduct() {
      console.log(this.productdata)
      const res = await this.$axios.$put(
        `/products/${this.product._id}`, this.productdata,
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

