<template>
  <div class="menu-management">
    <div>
      <SearchMeal></SearchMeal>
    </div>
    <div class="menu">
      <Meal :meal="meal">
        <template v-slot:edit-price >
          <span v-show="meal.isEditing" >
            ￥<input
              type="number"
              min="0"
              v-model="meal.price"
              class="input-price"
            />
          </span>
        </template>
        <template v-slot:func-btn>
          <el-button type="warning" size="mini" class="slotbtn btn1" round
            >删除</el-button
          >
          <el-button
            type="warning"
            size="mini"
            v-if="!meal.isEditing"
            class="slotbtn btn2"
            @click="isEditPrice()"
            round
            >调价</el-button
          >
          <el-button
            type="warning"
            size="mini"
            v-else
            class="slotbtn btn2"
             @click="isEditPrice()"
            round
            >确定</el-button
          >
        </template>
      </Meal>
    </div>
    <div class="creat">
      <el-button
        type="warning"
        v-if="!isAddMeal"
        @click="addMeal()"
        size="medium"
        class="btn"
        round
        >添加新菜</el-button
      >
      <add-meal v-else @cancel="cancelAdd()"></add-meal>
    </div>
  </div>
</template>

<script>
import Meal from "../User/Menu/Meal";
import AddMeal from "../tools/AddMeal.vue";
import SearchMeal from "../tools/SearchMeal";

export default {
  name: "MenuManagement",
  components: {
    Meal,
    AddMeal,
    SearchMeal,
  },
  data() {
    return {
      meal: {
        dishName: "辣椒炒肉",
        counts: 0,
        price: 10,
        isEditing: false,
      },
      isAddMeal: false,
    };
  },
  methods: {
    addMeal() {
      this.isAddMeal = true;
    },
    cancelAdd() {
      this.isAddMeal = false;
    },
    isEditPrice() {
      this.meal.isEditing = this.meal.isEditing?false:true;
    },
  },
};
</script>

<style scoped>
.menu {
  height: 330px;
}
.creat {
  margin: 20px 0;
  font-size: 0.9rem;
}
.el-button {
  font-size: 0.5rem;
  padding: 0 10px;
}
.slotbtn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  height: fit-content;
}
.btn2 {
  right: 70px;
}
.input-price {
  height: 20px;
  width: 50px;
}
</style>