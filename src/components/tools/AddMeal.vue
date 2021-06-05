<template>
  <div class="add-meal">
    <label for="dishName">新菜名</label>
    <input
      type="text"
      id="dishName"
      v-model="meal.dishName"
      placeholder="新菜名"
    />

    <label for="price">价格</label>
    <input
      type="number"
      min="0"
      id="price"
      v-model="meal.price"
      placeholder="价格"
    />

    <el-button
      type="success"
      size="medium"
      :disabled="!meal.dishName || !meal.price"
      @click="addMeal()"
      round
      >添加</el-button
    >
    <el-button type="info" @click="cancel()" size="medium" round
      >取消</el-button
    >
    <div v-show="!!error.type">
      <i style="color: red">{{ error.tips[error.type] }}</i>
    </div>
  </div>
</template>

<script>
import request from "../../utils/js/netwok/request";

export default {
  name: "AddMeal",
  data() {
    return {
      meal: {
        dishName: "",
        price: "",
      },
      error: {
        tips: ["", "添加失败", "添加失败，已有此菜", "添加成功"],
        type: 0,
      },
    };
  },
  methods: {
    cancel(item) {
      this.$emit("cancel", item);
    },
    addMeal() {
      request({
        url: "/addMeal",
        method: "post",
        data: {
          meal: this.meal,
        },
      })
        .then((result) => {
          this.error.type = result.data;
          this.$emit('refresh', result.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style >
.el-button {
  font-size: 0.8rem;
  padding: 0 8px;
}
</style>