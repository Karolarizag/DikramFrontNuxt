<template>
  <v-app>
    <Header />
    <v-main>
      <Nuxt />    
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  name: 'default'
}
</script>

<style scoped>
#app{ 
  background-image: url('../assets/basebg.png') !important;
}
</style>