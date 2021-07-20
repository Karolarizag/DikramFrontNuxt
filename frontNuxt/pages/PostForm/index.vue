<template>
  <div>
    <CPost elevation="2" outlined :products="products"/>
  </div>
</template>

<script>
export default {
  name: 'PostForm',
  async asyncData({ $axios, $auth }) {
    const products = await $axios.$get(
      `/marketplace/${$auth.user.marketplace}/products`
    )
    return { products }
  },
}
</script>
