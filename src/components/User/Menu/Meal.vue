<template>
  <div class="meal">
    <slot name="img" class="img">
      <img src="../../../assets/img/no_img.gif" alt="" />
      <!-- <img :src="'../../../assets/img/' + meal.imgName" alt="" /> -->
    </slot>
    <div class="description">
      {{ meal.dishName }}
      <div class="edit-price">
        <slot name="edit-price"></slot>
      </div>

      ￥{{ meal.price }}
    </div>

    <slot name="func-btn">
      <Counter
        :counts="meal.counts"
        @counts-increase="increase()"
        @counts-decrease="decrease()"
      ></Counter>
    </slot>
  </div>
</template>

<script>
import Counter from "../../tools/Counter";

export default {
  name: "Meal",
  props: {
    meal: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    Counter,
  },
  methods: {
    increase(item) {
      this.$emit("meal-increase", item);
    },
    decrease(item) {
      this.$emit("meal-decrease", item);
    },
  },
};
</script>

<style scoped>
.meal {
  float: left;
  position: relative;
  display: flex;
  border: 1px solid rgba(179, 192, 209, 0.3);
  text-align: left;
  width: 49%;
  margin: 2px;
}
.meal > img {
  width: 80px;
}
.description {
  padding-left: 0.625rem;
  width: 40%;
}
.counter {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
}
.edit-price {
  height: 30px;
  width: 5rem;
}
</style>