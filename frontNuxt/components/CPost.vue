<template>
  <div>
    <v-container>
      <v-card class="pb-10 pa-3 mt-5">
        <v-row>
          <v-col
            cols="4"
            class="d-flex justify-center align-center flex-column ml-7"
          >
            <!-- <VImageInput class="ml-7" /> -->
            <img
              src="../assets/imagedefault.png"
              style="margin-top: 20px; max-width: 350px; max-height: 350px"
            />
            <v-btn class="mt-3 mx-10 mt-10" color="light-blue lighten-2" dark>
              Añadir imagen
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <div class="d-flex flex-wrap mt-5 justify-center">
              <v-textarea
                min-width="100%"
                solo
                label="Añade aquí la descripción de tu producto"
                class="mt-3 px-3"
                v-model="description"
              >
              </v-textarea>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'NewPost',
  data() {
    return {
      description: '',
    }
  },
}
</script>
