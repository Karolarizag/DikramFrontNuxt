<template>
  <v-app>
    <Header />
    <v-main>
      <Nuxt style="margin-top: 100px" />    
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