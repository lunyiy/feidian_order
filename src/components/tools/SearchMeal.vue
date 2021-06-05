<template>
  <div class="search-meal">
    <input type="text" v-model="dishName" placeholder="搜索想吃的菜"  >
    <button @click="search(dishName)">搜索</button>
  </div>
</template>

<script>
export default {
  name: 'SearchMeal',
  data() {
    return {
      dishName: ''
    }
  },
  methods: {
    search(name) {
      // console.log(name)
      this.$emit('search', name)
    }
  }
}
</script>