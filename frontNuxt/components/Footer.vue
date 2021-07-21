<template>
  <v-footer color="#CFE0E8">
    <v-col cols="12" md="4"
      >Hecho con <v-icon color="light-blue lighten-2">mdi-heart</v-icon> por
      Manu, Karol & Ari
    </v-col>
    <v-col cols="12" md="7" class="mx-0">
      <v-row>
        <v-col cols="2" sm="4">
          <v-btn text>Contacto</v-btn>
        </v-col>
        <v-col cols="3" sm="4">
          <v-btn text>Sobre nosotros</v-btn>
        </v-col>
        <v-col cols="4" sm="5">
          <v-btn text>Información de envíos</v-btn>
        </v-col>
        <v-col cols="3" sm="6">
          <v-btn text>Términos y condiciones de uso</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>