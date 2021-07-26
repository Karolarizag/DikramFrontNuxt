<template>
  <v-footer color="#CFE0E8">
    <v-col cols="12" class="mx-0">
      <v-row class="mb-1">
        <v-col class="d-flex justify-center"
          ><v-btn text>Contacto</v-btn>
        </v-col>
        <v-col class="d-flex justify-center"
          ><v-btn text>Sobre nosotros</v-btn></v-col
        >
        <v-col class="d-flex justify-center"
          ><v-btn text>Información de envíos</v-btn></v-col
        >
        <v-col class="d-flex justify-center"
          ><v-btn text>Términos y condiciones de uso</v-btn></v-col
        >
      </v-row>
      <v-divider></v-divider>
      <v-row class="mt-2">
        <v-col cols="12" class="d-flex justify-center">
          Hecho con <v-icon color="light-blue lighten-2">mdi-heart</v-icon> por
          Manu, Karol & Ari
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