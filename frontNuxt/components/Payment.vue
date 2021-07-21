<template>
  <container>
    <v-card id="card-element">

    </v-card>
  </container>
</template>

<script>
export default {
  mounted() {
    if (this.$stripe) {
      const elements = this.$stripe.elements()
      const card = elements.create('card', {})
      // Add an instance of the card Element into the `card-element` <div>
      card.mount('#card-element')
    }
  },
}
</script>
