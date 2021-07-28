<template>
  <div>
    <v-parallax height="600" src="https://cdn.discordapp.com/attachments/860532293738692623/869906253634211890/banner.png">
    </v-parallax>
    <v-container fluid>
        <div class="d-flex flex-wrap flex-row justify-center mx-5" >
          <ProductCard
            elevation="2"
            outlined
            :product="item"
            :key="idx"
            v-for="(item, idx) in products"
          />
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  async asyncData({ $axios }) {
    const products = await $axios.$get('/products')
    return { products }
  },
  data() {
    return {
      showLogin: false,
      showSignup: false,
      showSearch: true,
      filter: '',
    };
  },
};
</script>

<style scoped>

#custombar {
  border-bottom: 41% ;
}

</style>
