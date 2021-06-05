<template>
  <div class="add-meal">
    <label for="dishName">新菜名</label>
    <input type="text" id="dishName" placeholder="新菜名" />

    <label for="price">价格</label>
    <input type="text" id="price" placeholder="价格" />

    <el-button type="success" size="medium" round>添加</el-button>
    <el-button type="info" @click="cancel()" size="medium" round>取消</el-button>
  </div>
</template>

<script>
export default {
  name: "AddMeal",
  methods: {
    cancel(item) {
      this.$emit('cancel', item)
    }
  }
};
</script>

<style >

.el-button {
  font-size: 0.8rem;
  padding: 0 8px;
}
</style>