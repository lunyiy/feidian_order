<template>
  <div class="counter" ref="">
    <el-button
      type="primary"
      icon="el-icon-minus"
      size="mini"
      v-show="counts > 0"
      class="btn"
      @click="decrease()"
      circle
    ></el-button>

    <span class="count" v-show="counts > 0">{{ counts }}</span>

    <el-button
      type="primary"
      icon="el-icon-plus"
      size="mini"
      class="btn"
      @click="increase()"
      circle
    ></el-button>
  </div>
</template>

<script>
export default {
  name: "Counter",
  data() {
    return {
      count: 0
    }
  },
  props: {
    counts: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  methods: {
    decrease(item) {
      this.$emit('counts-decrease', item)
    },
    increase(item) {
      this.$emit('counts-increase', item)
    },
  },
};
</script>

<style scoped>
.count {
  width: 2rem;
  text-align: center;
  display: inline-block;
}
.btn {
  width: fit-content;
  display: inline;
  background-color: #e6a23c;
  border: #e6a23c;
}
.counter {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
}
</style>