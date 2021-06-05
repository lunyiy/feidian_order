<template>
  <div class="menu-management">
    <div>
      <SearchMeal @search="search" ref="searchMeal"></SearchMeal>
    </div>
    <div class="menu">
      <Meal :meal="meal" v-for="(meal, index) in meals" :key="meal">
        <template v-slot:edit-price>
          <span v-show="meal.isEditing">
            ￥<input
              type="number"
              min="0"
              v-model="meal.price"
              class="input-price"
            />
          </span>
        </template>
        <template v-slot:func-btn>
          <el-button
            type="warning"
            size="mini"
            class="slotbtn btn1"
            round
            @click="deleteMeal(index)"
            >删除</el-button
          >
          <el-button
            type="warning"
            size="mini"
            v-if="!meal.isEditing"
            class="slotbtn btn2"
            @click="isEditPrice(index)"
            round
            >调价</el-button
          >
          <el-button
            type="warning"
            size="mini"
            v-else
            class="slotbtn btn2"
            @click="isEditPrice(index)"
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
      <AddMeal v-else @cancel="cancelAdd()" @refresh="getMeals()"></AddMeal>
    </div>
  </div>
</template>

<script>
import Meal from "../User/Menu/Meal";
import AddMeal from "../tools/AddMeal.vue";
import SearchMeal from "../tools/SearchMeal";
import request from "../../utils/js/netwok/request";

export default {
  name: "MenuManagement",
  components: {
    Meal,
    AddMeal,
    SearchMeal,
  },
  data() {
    return {
      meals: [],
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
    getMeals() {
      request({
        url: "/menu",
        method: "get",
      })
        .then((result) => {
          this.meals = result.data.map(function (meal) {
            meal.isEditing = false;
            return meal;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    isEditPrice(index) {
      this.meals[index].isEditing = this.meals[index].isEditing ? false : true;
      if (!this.meals[index].isEditing) {
        request({
          url: "/priceAdiust",
          method: "post",
          data: {
            meal: this.meals[index],
          },
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    deleteMeal(index) {
      request({
        url: "/deleteMeal",
        method: "post",
        data: {
          meal: this.meals[index],
        },
      })
        .then((result) => {
          this.getMeals();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    search(name) {
      request({
        url: "/menu",
        method: "get",
      })
        .then((result) => {
          if (name.length !== 0) {
            this.meals = result.data
              .filter(function (meal) {
                return meal.dishName.indexOf(name) > 0;
              })
              .map(function (meal) {
                meal.isEditing = false;
                return meal;
              });
          } else {
            this.meals = result.data.map(function (meal) {
              meal.isEditing = false;
              return meal;
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    request({
      url: "/menu",
      method: "get",
    })
      .then((result) => {
        this.meals = result.data.map(function (meal) {
          meal.isEditing = false;
          return meal;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.menu {
  height: 330px;
  overflow: auto;
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