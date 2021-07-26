<template>
  <v-card shaped class=" pa-15 mt-5">
      
      <v-row class="d-flex justify-end">
        <v-btn 
          class="mr-11" 
          :to="{ name: 'Marketplace' }" 
          absolute 
          top 
          right 
          icon 
          @click="$emit('changeView')">

        <v-icon color="light-blue lighten-2">
          mdi-arrow-left-circle
        </v-icon>
      </v-btn>
      </v-row>

      <v-row>
        <v-text-field 
          v-model="marketplaceTitle" 
          type="text" 
          class="mx-5 mt-5" 
          label="Nombre de tienda" 
          outlined 
          dense>
        </v-text-field>
      </v-row>

      <v-row>
        <v-col 
        class="d-flex justify-center align-center flex-column ml-7"> 

          <v-btn 
            class="mt-3 mx-10" 
            color="light-blue lighten-2" 
            dark>
            Añadir imágen de perfil
          </v-btn>

        </v-col>
        <v-col 
          class="d-flex justify-center align-center flex-column ml-7"> 

          <v-btn 
            class="mt-3 mx-10" 
            color="light-blue lighten-2" 
            dark>
            Añadir imágen de banner
          </v-btn>
        </v-col>

      </v-row>
      <v-row class="px-5">

        <v-textarea 
          v-model="marketplaceDescription" 
          solo 
          :rules="rules.description" 
          label="Añade aquí una descripción de tu tienda" 
          class="mt-8">
        </v-textarea>

      </v-row>

      <v-row>
        <v-col>

          <v-text-field 
            v-model="cates" 
            type="text" 
            class="mx-2" 
            label="Categorías" 
            outlined 
            dense
            @keydown.enter="sendCategories()"> 
          </v-text-field>

          <div class="d-flex flex-wrap px-2">
            <div 
              v-for="(item, idx) in categories" 
              :key="idx" 
              class="ma-1">
              <v-chip 
                color="cyan lighten-4" 
                close 
                @click:close="removeCategory(item)">
                <strong>{{ item }}</strong>&nbsp;
              </v-chip>
            </div>
          </div>

        </v-col>
        <v-col>

           <v-text-field 
            v-model="ubication" 
            type="text" 
            class="mr-2" 
            label="Ubicación de tu tienda" 
            outlined 
            dense>
          </v-text-field>

        </v-col>

      </v-row>
      <v-row>

        <v-col>
          <v-switch 
            v-model="shipping"
            class="ml-3" 
            label="¿Tienes servicio de envíos?" 
            color="light-blue lighten-2"> 
          </v-switch>
        </v-col>

        <v-col 
        class="d-flex justify-center align-end flex-column mr-2">
          <v-btn 
            color="light-blue lighten-2" 
            dark 
            @click="submitMarketplace">
            Crear tienda
          </v-btn>
        </v-col>
      </v-row>

    </v-card>
</template>

<script>
export default {
  name: 'UMarketplaceInfo',
   data() {
    return {
      marketplaceTitle: '',
      marketplaceDescription: '',
      cates: '',
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
      this.categories.push(this.cates)
      this.cates = ''
    },
    removeCategory(item) {
      this.categories.splice(this.categories.indexOf(item), 1)
      this.categories = [...this.categories]
    },
    async submitMarketplace() {
      const res = await this.$axios.$put('/marketplace', {
        name: this.marketplaceTitle,
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