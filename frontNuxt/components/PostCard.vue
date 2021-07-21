<template>
  <v-card v-if="post" class="ma-5" width="640">
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
    <v-card-text>
      <v-divider class="mx-2"></v-divider>
      <div class="mt-3">{{ post.description }}</div>
      <v-divider class="mx-2"></v-divider>
    </v-card-text>
    <v-card-actions>
      <div v-if="data">
      <v-row justify="space-around">
        <v-menu bottom origin="center center" transition="scale-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Productos
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(item, i) in productsName" :key="i">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        </v-row>
        <!-- <v-select
          :items="productsName"
          filled
          label="Productos"
          dense
        ></v-select> -->
      </div>
      <div class="d-flex flex-wrap px-2">
        <div v-for="(item, idx) in post.tags" :key="idx" class="ma-1">
          <v-chip color="cyan lighten-4">
            <strong>{{ item }}</strong
            >&nbsp;
          </v-chip>
        </div>
      </div>
      <!-- <NuxtLink
        :to="{ path: `/marketplace/${marketplace._id}` }"
        style="text-decoration: none"
      >
        <v-btn color="light-blue lighten-2" text> Ver Tienda </v-btn>
      </NuxtLink> -->
    </v-card-actions>
  </v-card>
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
    }
  },
  computed: {
    productsName() {
      return this.post.products.map((e) => {
        return e.name
      })
    },
  },
  mounted() {
    if (this.post.products.length === 0) this.data = false
    else this.data = true
  },
}
</script>
