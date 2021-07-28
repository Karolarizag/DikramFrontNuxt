<template>
  <div>
    <v-btn
      @click="onInput"
      class="mt-3 mx-10 mt-10"
      color="fourth"
      dark
    >
      Añadir imagen
    </v-btn>
    <input :id="type" hidden type="file" accept="image/*" @change="onUpload" />
  </div>
</template>

<script>
export default {
  name: 'CloudinaryUpload',
  props: {
    type: {
      type: String,
      required: true,
      default: ''
    },
  },
  data() {
    return {
      image: '',
      url: '',
      src: '',
    }
  },
  methods: {
    onInput() {
      document.getElementById(this.type).click()
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
          this.$root.$emit('cloudImage', e.secure_url, this.type)
        })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error.message)
      }
    },
  },
}
</script>
