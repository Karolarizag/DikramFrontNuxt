<template>
  <v-container>
    <v-card class="pb-10 pa-3 mt-5">
      <v-row>
        <v-col cols="4" class="d-flex justify-center align-center flex-column ml-7">  
          <div>imageInput</div>
          <v-btn class="mt-3 mx-10" color="light-blue lighten-2" dark> Añadir imagen </v-btn>
        </v-col>

        <v-col cols="7" >

          <div class="d-flex flex-wrap mt-5 justify-center" >

            <div v-for="(item, idx) in imagenes" :key="idx">
              <v-img max-height="150" class="ma-1" max-width="150" src="../assets/imagedefault.png">
              </v-img>
            </div>

            <v-textarea solo name="input-7-4" label="Añade aquí la descripción de tu producto" class="mt-3" v-model="description">
            </v-textarea>

          </div>

        </v-col>
      </v-row>
      <v-row class="px-15">

      <v-col>
        <v-text-field type="text" width="500" class="mx-2" label="Nombre" outlined dense v-model="name"></v-text-field>
      </v-col>

      <v-col >
        <v-text-field type="text" class="mx-2" label="Etiquetas" v-model="etiquetas" @keydown.enter="sendTags()" outlined dense>
        </v-text-field>
        <div class="d-flex flex-wrap px-2">
          <div v-for="(item, idx) in this.tags" :key="idx" class="ma-1">
            <v-chip color="cyan lighten-4" close @click:close="removeTag(item)">
              <strong>{{ item }}</strong>&nbsp;
            </v-chip>
          </div>
        </div>
        
      </v-col>

    </v-row>
    <v-row class="px-15">

      <v-col>
        <v-text-field type="text" class="mx-2" v-model="price" label="Precio" outlined dense>
        </v-text-field>
      </v-col>

      <v-col>
        <v-text-field type="text" class="mx-2" label="Tallas" v-model="tallas" @keydown.enter="sendSizes()" outlined dense>
        </v-text-field>
        <div class="d-flex flex-wrap px-2">
          <div v-for="(item, idx) in this.sizes" :key="idx" class="ma-1">
            <v-chip color="cyan lighten-4" close @click:close="removeSize(item)">
              <strong>{{ item }}</strong>&nbsp;
            </v-chip>
          </div>
        </div>
      </v-col>

      <v-col>
        <v-text-field type="text" class="mx-2" label="Color" v-model="color" @keydown.enter="sendColors()" outlined dense>
        </v-text-field>
        <div class="d-flex flex-wrap px-2">
          <div v-for="(item, idx) in this.colors" :key="idx" class="ma-1">
            <v-chip color="cyan lighten-4" close @click:close="removeColor(item)">
              <strong>{{ item }}</strong>&nbsp;
            </v-chip>
          </div>
        </div>
      </v-col>

      <v-col>
        <v-text-field type="text" class="mx-2" label="Material" v-model="material" @keydown.enter="sendMaterials()" outlined dense>
        </v-text-field>
        <div class="d-flex flex-wrap px-2">
          <div v-for="(item, idx) in this.materials" :key="idx" class="ma-1">
            <v-chip color="cyan lighten-4" close @click:close="removeMat(item)">
              <strong>{{ item }}</strong>&nbsp;
            </v-chip>
          </div>
        </div>
      </v-col>

    </v-row>
    <v-row class="d-flex justify-center">

      <v-switch class="mb-2" label="Producto customizable" color="light-blue lighten-2" v-model="customizable" >
      </v-switch>

      <v-btn class="mt-3 mx-10" color="light-blue lighten-2" dark @click="submitProduct"> 
        Enviar 
      </v-btn>

    </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "CProductImage",
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
      imagenes: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  },
  methods: {
    removeTag(item) {
      this.tags.splice(this.tags.indexOf(item), 1)
      this.tags = [...this.tags]
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
     return  this.tags.push(this.etiquetas)
    },
    sendSizes() {
      return this.sizes.push(this.tallas)
    },
    sendColors() {
      return this.colors.push(this.color)
    },
    sendMaterials() {
      return this.materials.push(this.material)
    },
    async submitProduct() {
      const res = await this.$axios.$post('/products', {
        name: this.title,
        description: this.description,
        image: this.image,
        sizes: this.sizes,
        colors: this.colors,
        materials: this.materials,
        customizable: this.customizable,
        tags: this.tags,
        price: this.price
      },
      {
        headers: {
          token: localStorage.token
        }
      })
      this.$router.push({ name: "Marketplace" });
      console.log(res)
    }
  },
};
</script>