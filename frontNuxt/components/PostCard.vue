<template>
  <div v-if="post">
    <v-card class="ma-5" width="640">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img height="400" :src="post.image[0]"></v-img>
      <v-row>
        <v-col>
          <v-card-title>@{{ $auth.user.username }}</v-card-title>
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
          <div class="mt-3">{{ post.description }}</div>
        </v-card-text>
      </v-row>

      <v-card-actions>
        <div v-if="data">
          <v-row justify="space-around">
            <v-col>
              <v-menu left offset-y>
                <template #activator="{ on, attrs }">
                  <v-btn
                    icon
                    absolute
                    bottom
                    right
                    color="light-blue lighten-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-store</v-icon>
                  </v-btn>
                </template>

                <v-list v-if="productsName" width="300">
                  <v-list-item v-for="(item, i) in productsName" :key="i">
                    <v-btn
                      width="270"
                      text
                      color="light-blue lighten-2"
                      :to="{ path: `/product/${item.id}` }"
                    >
                      {{ item.name }}
                    </v-btn>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="11">
              <div class="d-flex flex-wrap px-2">
                <div v-for="(item, idx) in post.tags" :key="idx" class="ma-1">
                  <v-chip color="cyan lighten-4">
                    <strong>{{ item }}</strong
                    >&nbsp;
                  </v-chip>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <v-row>
          <v-col>
            <v-btn v-if="isTheOwner" absolute top right icon>
              <v-icon color="light-blue" @click="updateOverlay = !updateOverlay"
                >mdi-update</v-icon
              >
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              v-if="isTheOwner"
              absolute
              top
              left
              icon
              @click="deleteOverlay = !deleteOverlay"
            >
              <v-icon color="light-blue lighten-2">mdi-delete-forever</v-icon>
            </v-btn>
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
                color="light-blue lighten-2"
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
              <v-icon color="light-blue lighten-2"
                >mdi-arrow-left-circle</v-icon
              >
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-overlay>

    <v-overlay :dark="false"  :value="updateOverlay">
      <v-container>
        <div class="pa-5 overlay">
          <v-card>
          form update post

          </v-card>
        </div>
      </v-container>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    post: Object,
  },
  data() {
    return {
      data: false,
      fav: false,
      like: '',
      absolute: true,
      deleteOverlay: false,
      updateOverlay: false,
    }
  },
  computed: {
    productsName() {
      return this.post.products.map((e) => {
        return { name: e.name, id: e._id }
      })
    },
    isTheOwner() {
      return this.$auth.user.marketplace === this.post.marketplace
    },
  },
  mounted() {
    if (this.post.products.length === 0) this.data = false
    else this.data = true
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
