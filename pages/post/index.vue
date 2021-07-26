<template>
  <v-container fluid class="mt-15">
    <div class="d-flex flex-wrap flex-row justify-center mx-5">

      <PostCard
      v-for="(item, idx) in posts"
      :key="idx" 
      elevation="2" 
      outlined
      :post="item"
      />
      
    </div>
  </v-container>
</template>

<script>
export default {
name:'Post',
async asyncData({ $axios}){
  const posts = await $axios.$get('/post')
  return {posts}
}
}
</script>
