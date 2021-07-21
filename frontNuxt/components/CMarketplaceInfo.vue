<template>
  <v-card class="pa-15 mt-5">
    <v-row class="d-flex justify-end">
      <v-btn
        class="mr-11"
        :to="{ name: 'Marketplace' }"
        absolute
        top
        right
        icon
        @click="$emit('changeView')"
      >
        <v-icon color="light-blue lighten-2">mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-row>

    <v-row>
      <v-text-field
        v-model="title"
        dense
        outlined
        type="text"
        class="mx-5 mt-5"
        label="Nombre de tienda"
      ></v-text-field>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-center align-center flex-column ml-7">
        <div class="ma-3 mr-n4" max-width="300">
          <cld-image
            quality="auto"
            width="300"
            crop="scale"
            :public-id="bannerimage"
          />
        </div>
        Añadir imagen para banner
        <CloudinaryUpload type="banner" />
      </v-col>
      <v-col class="d-flex justify-center align-center flex-column ml-7">
        <div class="ma-3 mr-n4" max-width="300">
          <cld-image
            quality="auto"
            width="300"
            crop="scale"
            :public-id="profileimage"
          />
        </div>
        Apadir imagen para perfil
        <CloudinaryUpload type="profile" />
      </v-col>
    </v-row>

    <v-row class="px-5">
      <v-textarea
        v-model="marketplaceDescription"
        solo
        :rules="rules.description"
        label="Añade aquí una descripción de tu tienda"
        class="mt-8"
      ></v-textarea>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          v-model="category"
          type="text"
          class="mx-2"
          label="Categorías"
          outlined
          dense
          @keydown.enter="sendCategories()"
        >
        </v-text-field>
        <div class="d-flex flex-wrap px-2">
          <div v-for="(item, idx) in categories" :key="idx" class="ma-1">
            <v-chip
              color="cyan lighten-4"
              close
              @click:close="removeCategory(item)"
            >
              <strong>{{ item }}</strong
              >&nbsp;
            </v-chip>
          </div>
        </div>
      </v-col>

      <v-col>
        <v-text-field
          v-model="ubication"
          type="text"
          class="mr-2"
          outlined
          dense
          label="Ubicación de tu tienda"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-switch
          v-model="shipping"
          class="ml-3"
          label="¿Tienes servicio de envíos?"
          color="light-blue lighten-2"
        >
        </v-switch>
      </v-col>
      <v-col class="d-flex justify-center align-end flex-column mr-2">
        <v-btn color="light-blue lighten-2" dark @click="submitMarketplace"
          >Crear tienda</v-btn
        >
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
      bannerimage: '',
      profileimage: '',
      rules: {
        description: [(v) => v.length <= 195 || 'Máximo de caracteres 195'],
      },
    }
  },
  mounted() {
    this.$root.$on('cloudImage', (url, type) => {
      if (type === 'banner') {
        this.bannerimage = url
      } else if (type === 'profile') {
        this.profileimage = url
      }
    })
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
      const res = await this.$axios.$post(
        '/marketplace',
        {
          name: this.title,
          description: this.marketplaceDescription,
          categories: this.categories,
          shipping: this.shipping,
          ubication: this.ubication,
          profileimage: this.profileimage,
          bannerimage: this.bannerimage,
        },
        {
          headers: {
            token: localStorage.token,
          },
        }
      )
      this.$router.push({ name: 'marketplace' })
      res.status(200).json(res)
    },
  },
}
</script>