<template>
  <v-app>
    <HeaderLogged v-if="$auth.loggedIn" />
    <Header v-else />
    <v-main>
      <Nuxt/>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  name: 'Default',
}
</script>

<style scoped>
#app {
  background-image: url('../assets/basebg.png') !important;
}
</style>