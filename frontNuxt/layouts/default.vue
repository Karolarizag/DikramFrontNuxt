<template>
  <v-app>
    <HeaderLogged v-if="this.$auth.loggedIn" />
    <Header v-else />
    <v-main>
      <Nuxt class="mt-10"/>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  name: 'default',
}
</script>

<style scoped>
#app {
  background-image: url('../assets/basebg.png') !important;
}
</style>