<template>
  <v-card class="overflow-hidden mt-13">
    <v-app-bar 
    extended 
    extension-height="250"
    :src="banner"
    >
    <v-card class="ma-auto mt-7 pa-5" width="1400" height="250" color="rgba(236, 236, 236, 0.411)">
      <v-card-title class="mt-5"><h1>{{name}}</h1></v-card-title>
      <div class="mr-5"><h2>{{description}}</h2></div>
      <div><h3>{{ubication}}</h3></div>

    </v-card>
      
    </v-app-bar>
  </v-card>
</template>

<script>
export default {
  name: 'MarketplaceInfo',
  data() {
    return {
      banner: 'https://cdn.discordapp.com/attachments/860532293738692626/862356860568076308/bgimagerotate.png',
      name: 'YUZYS',
      description: 'Bienvenidos a Yuzys,',
      ubication: 'Tenerife sur, Islas canarias'
    }
  },
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap');

  h1 {
    font-family: 'Staatliches', cursive;
    font-size: 100px;
    color: rgb(236, 236, 236);
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.74)
  }
  h2, h3 {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 30px;
    color: rgb(233, 233, 233);
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.74)

  }
</style>