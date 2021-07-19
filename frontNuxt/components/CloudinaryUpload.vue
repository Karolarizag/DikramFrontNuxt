<template>
  <div>
    <!-- <v-text-field
      v-model="nameImage"
      label="nombre imagen"
      outlined
    ></v-text-field> -->
    <!-- <v-file-input
      label="Subir imagen"
      outlined
      accept="image/*"
      @change="inputImage({ $event })"
    ></v-file-input> -->

    <!-- <v-btn rounded type="submit" color="primary" dark @click="onUpload"
      >Subir</v-btn
    > -->
    <v-btn
      @click="onInput"
      class="mt-3 mx-10 mt-10"
      color="light-blue lighten-2"
      dark
    >
      Añadir imagen
    </v-btn>
      <input  id="cloud" hidden type="file" accept="image/*" @change="onUpload" />
    <cld-image :public-id="url" />
  </div>
</template>

<script>
export default {
  name: 'CloudinaryUpload',
  data() {
    return {
      image: '',
      image2: '',
      nameImage: '',
      url: '',
      src: '',
    }
  },
  methods: {
    onInput(){
      document.getElementById("cloud").click()
    },
    async onUpload(event) {
      try {

        this.image = event.target.files[0]
        if (!this.image) return

        const readData = (f) =>
          new Promise((resolve) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.readAsDataURL(f)
          })
        const data = await readData(this.image)

        const instance = this.$cloudinary.upload(data, {
          folder: 'subidas',
          uploadPreset: 'pordefecto',
        })
        this.src = instance.then((e) => {
          console.log(e.secure_url)
          this.url = e.secure_url
        })
        this.$bus.$emit('cloudImage', this.url)
        
        // eslint-disable-next-line no-console
        console.log(this.scr)
        // const formData = new FormData()
        // formData.append('file', this.image)
        // const results = await this.$cloudinary.upload(formData, {
        //   public_id: 'vengaCoño',
        //   folder: 'subidas',
        //   upload_preset: 'pordefecto',
        // })
        // // eslint-disable-next-line no-console
        // console.log(results)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error.message)
      }
    },
  },
}
</script>
