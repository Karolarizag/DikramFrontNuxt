<template>
  <v-container class="mt-10">
    <v-card class="pa-15">
      <v-row>
        <v-col cols="6" class="d-flex justify-center align-center flex-column">
          <img
            v-if="url === ''"
            src="~/assets/imagedefault.png"
            style="margin-top: 20px; width: 450px; height: auto"
          />
          <cld-image v-else width="450" crop="scale" :public-id="url" />
          <CloudinaryUpload type="post" />
          <span class="mt-2">Recomendamos que sea tamaño 500x500</span>
        </v-col>

        <v-col cols="6">
          <v-row>
            <v-col cols="12" class="d-flex flex-wrap mt-5 justify-center">
              <v-textarea
                v-model="description"
                solo
                label="Añade aquí la descripción de tu producto"
                class="mt-3 px-3"
              >
              </v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
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
                <div v-for="(item, idx) in postTags" :key="idx" class="ma-1">
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

          <v-row>
            <v-col cols="12" class="px-5">
              <v-combobox
                v-model="postProducts"
                :items="products"
                item-text="name"
                item-value="item"
                outlined
                dense
                label="Productos Relacionados"
                multiple
                return-object
              >
              </v-combobox>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex justify-end">
          <v-btn color="light-blue lighten-2" dark @click="crearPost">
            Crear
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'PostForm',
  async asyncData({ $axios, $auth }) {
    const products = await $axios.$get(
      `/marketplace/${$auth.user.marketplace}/products`
    )
    return { products }
  },
  data() {
    return {
      url: '',
      description: '',
      tag: '',
      postTags: [],
      postProducts: [],
      productsId: [],
    }
  },
  computed: {
    sendProductId() {
      return this.postProducts.map((product) => {
        return product._id
      })
    },
  },
  mounted() {
    this.$root.$on('cloudImage', (url) => {
      this.url = url
    })
  },
  methods: {
    onInput() {
      document.getElementById('cloud').click()
    },
    removeTag(item) {
      this.postTags.splice(this.postTags.indexOf(item), 1)
      this.postTags = [...this.postTags]
    },
    sendTags() {
      this.postTags.push(this.tag)
      this.tag = ''
    },
    async crearPost() {
      const idPost = this.postProducts.map((product) => {
        return product._id
      })
      try {
        await this.$axios.$post('/post', {
          image: this.url,
          description: this.description,
          tags: this.postTags,
          products: idPost,
        })
        this.postProducts = []
        this.$router.push({
          path: `/marketplace/${this.$auth.user.marketplace}`,
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    },
  },
}
</script>
