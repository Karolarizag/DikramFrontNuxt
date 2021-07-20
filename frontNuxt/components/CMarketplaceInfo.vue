<template>
  <v-card class=" pa-15 mt-5">
      
      <v-row class="d-flex justify-end">
        <v-btn class="mr-11" :to="{ name: 'Marketplace' }" absolute top right icon @click="$emit('changeView')">
        <v-icon color="light-blue lighten-2">mdi-arrow-left-circle</v-icon>
      </v-btn>
      </v-row>

      <v-row>
        <v-text-field type="text" class="mx-5 mt-5" label="Nombre de tienda" v-model="title" outlined dense></v-text-field>
      </v-row>

      <v-row>
        <v-col class="d-flex justify-center align-center flex-column ml-7"> 
          <v-btn class="mt-3 mx-10" color="light-blue lighten-2" dark>Añadir imágen de perfil</v-btn>
        </v-col>
        <v-col class="d-flex justify-center align-center flex-column ml-7"> 
         <v-btn class="mt-3 mx-10" color="light-blue lighten-2" dark>Añadir imágen de banner</v-btn>
        </v-col>
      </v-row>

      <v-row class="px-5">
        <v-textarea solo :rules="rules.description" label="Añade aquí una descripción de tu tienda" v-model="marketplaceDescription" class="mt-8"></v-textarea>
      </v-row>

      <v-row>

        <v-col>
          <v-text-field type="text" class="mx-2" label="Categorías" v-model="category" @keydown.enter="sendCategories()" outlined dense>
        </v-text-field>
        <div class="d-flex flex-wrap px-2">
          <div v-for="(item, idx) in this.categories" :key="idx" class="ma-1">
            <v-chip color="cyan lighten-4" close @click:close="removeCategory(item)">
              <strong>{{ item }}</strong>&nbsp;
            </v-chip>
          </div>
        </div>
        </v-col>

        <v-col>
           <v-text-field type="text" class="mr-2" label="Ubicación de tu tienda" v-model="ubication" outlined dense></v-text-field>
        </v-col>

      </v-row>

      <v-row>
        <v-col>
          <v-switch class="ml-3" label="¿Tienes servicio de envíos?" color="light-blue lighten-2" v-model="shipping" >
          </v-switch>
        </v-col>
        <v-col class="d-flex justify-center align-end flex-column mr-2">
          <v-btn color="light-blue lighten-2" dark @click="submitMarketplace">Crear tienda</v-btn>
        </v-col>
      </v-row>

    </v-card>
</template>

<script>
export default {
  name: 'CMarketplaceInfo',
   data() {
    return {
      title: '',
      marketplaceDescription: '',
      category: '',
      categories: [],
      shipping: false,
      ubication: '',
      rules: {
        description: [(v) => v.length <= 195 || 'Máximo de caracteres 195']
        }
    }
  },
  methods: {
    sendCategories() {
      this.categories.push(this.category)
      this.category = ''
    },
    removeCategory(item) {
      this.categories.splice(this.categories.indexOf(item), 1)
      this.categories = [...this.categories]
    },
    async submitMarketplace() {
      const res = await this.$axios.$post('/marketplace', {
        name: this.title,
        description: this.marketplaceDescription,
        categories: this.categories,
        shipping: this.shipping,
        ubication: this.ubication
      },
      {
        headers: {
          token: localStorage.token
        }
      })
      this.$router.push({ name: 'Marketplace' })
      res.status(200).json(res)
    }
  },
}
</script>