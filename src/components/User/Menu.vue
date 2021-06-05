<template>
  <div id="menu">
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

export default {
  name: "Menu",
  data() {
    return {
      meals: [
        {
          dishName: "辣椒炒肉",
          counts: 0,
          price: 10,
        },
        {
          dishName: "番茄炒蛋",
          counts: 0,
          price: 100,
        },
        {
          dishName: "炸鸡",
          counts: 0,
          price: 20,
        },
        {
          dishName: "任梓睿",
          counts: 0,
          price: 1,
        },
        {
          dishName: "油焖大虾",
          counts: 0,
          price: 1000,
        },
        {
          dishName: "番茄炒蛋",
          counts: 0,
          price: 100,
        },
        {
          dishName: "炸鸡",
          counts: 0,
          price: 20,
        },
      ],
    };
  },
  components: {
    Meal,
    Trolley,
  },
  methods: {
    increase(index) {
      this.meals[index].counts++;
    },
    decrease(index) {
      this.meals[index].counts--;
    },
  },
  computed: {
    orderMeals() {
      return this.meals.filter(function (meal) {
        return meal.counts > 0;
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