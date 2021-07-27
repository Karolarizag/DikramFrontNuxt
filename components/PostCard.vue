<template>
  <div v-if="post">
    <v-card class="ma-5 rounded-b-xl pa-4" width="640">
      <v-img height="400" :src="post.image[0]"></v-img>
      <v-row>
        <v-col>
          <v-card-title v-if="marketplace">
            @{{ marketplace.name }}
          </v-card-title>
        </v-col>
        <v-col cols="2">
          <v-list>
            <v-list-item>
              <v-list-item-action>
                <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-row>
        <v-divider class="mx-2"></v-divider>
        <v-card-text>
          <div class="mt-3">
            {{ post.description }}
          </div>
        </v-card-text>
      </v-row>

        <v-row  v-if="data">
          <v-col class="d-flex flex-wrap px-2">
            <div v-for="(item, idx) in post.tags" :key="idx" class="ma-1">
              <v-chip color="light-blue lighten-4">
                <strong>{{ item }}</strong
                >&nbsp;
              </v-chip>
            </div>
          </v-col>
        </v-row>
      <v-card-actions>
        <v-row>
          <v-col cols="6" class="d-flex justify-start">
            <v-btn
              v-if="showBtn"
              icon
              @click="deleteOverlay = !deleteOverlay"
            >
              <v-icon color="fourth">mdi-delete-forever</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="6" class="d-flex justify-end">
            <v-menu left offset-y>
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  color="fourth"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-store</v-icon>
                </v-btn>
              </template>

              <v-list v-if="productsName">
                <v-list-item v-for="(item, i) in productsName" :key="i">
                  <v-btn
                    width="120"
                    text
                    color="fourth"
                    :to="{ path: `/product/${item.id}` }"
                  >
                    {{ item.name }}
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>

    <v-overlay :dark="false" :value="deleteOverlay">
      <v-card height="300" width="500" shaped class="px-8">
        <v-card-title class="d-flex justify-center mt-15">
          <p class="mt-10">¡Atención!</p>
        </v-card-title>

        <v-card-text>
          <span class="d-flex justify-center"
            >¿Estás seguro de querer borrar este Post? Se borrarán todos sus
            datos y no podrás recuperarlos.</span
          >
        </v-card-text>

        <v-card-actions>
          <v-row>
            <v-col class="d-flex justify-center"
              ><v-btn
                dark
                color="fourth"
                class="mt-5"
                @click="deletePost"
              >
                Borrar Post
              </v-btn>
            </v-col>
            <v-btn
              absolute
              top
              right
              icon
              @click="deleteOverlay = !deleteOverlay"
            >
              <v-icon color="fourth"
                >mdi-arrow-left-circle</v-icon
              >
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    post: { type: Object, default: null },
    marketplace: { type: Object, default: null },
  },
  data() {
    return {
      data: false,
      fav: false,
      like: '',
      absolute: true,
      deleteOverlay: false,
      updateOverlay: false,
      showBtn: false
    }
  },
  computed: {
    productsName() {
      return this.post.products.map((e) => {
        return { name: e.name, id: e._id }
      })
    },
  },
  mounted() {
    if (this.post.products.length === 0) this.data = false
    else this.data = true;
    if (this.$auth.user && this.$auth.user.marketplace === this.post.marketplace) this.showBtn = true
  },
  methods: {
    async deletePost() {
      const response = await this.$axios.$delete(`/post/${this.post._id}`)
      location.reload()
      return response
    },
    async updatePost() {
      const response = await this.$axios.$put(
        `/post/${this.post._id}`,
        this.like
      )
      location.reload()
      return response
    },
  },
}
</script>
