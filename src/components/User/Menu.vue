<template>
  <div id="menu">
    <SearchMeal @search="search"></SearchMeal>
    <el-scrollbar height="365px">
      <div class="item" :key="meal.dishName" v-for="(meal, index) in meals">
        <Meal
          :meal="meal"
          @meal-increase="increase(index)"
          @meal-decrease="decrease(index)"
        ></Meal>
      </div>
    </el-scrollbar>

    <div class="trolley-container">
      <Trolley :orderMeals="orderMeals"></Trolley>
    </div>
  </div>
</template>

<script>
import Meal from "./Menu/Meal";
import Trolley from "./Menu/Trolley";
import request from "../../utils/js/netwok/request";
import SearchMeal from "../tools/SearchMeal";

export default {
  name: "Menu",
  data() {
    return {
      meals: [],
    };
  },
  components: {
    Meal,
    Trolley,
    SearchMeal,
  },
  computed: {
    orderMeals() {
      return this.meals.filter(function (meal) {
        return meal.counts > 0;
      });
    },
  },
  created() {
    request({
      url: "/menu",
      method: "get",
    })
      .then((result) => {
        this.meals = result.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
   methods: {
    increase(index) {
      this.meals[index].counts++;
    },
    decrease(index) {
      this.meals[index].counts--;
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
};
</script>

<style>
.meals {
  overflow: auto;
}
.trolley-container {
  position: sticky;
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
  text-align: left;
  overflow: hidden;
}
</style>