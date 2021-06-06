
<template>
  <div id="home">
    <el-carousel indicator-position="outside">
      <el-carousel-item>
        <img src="../assets/img/img.jpg" class="home-img" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/img/img1.jpg" class="home-img" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/img/img2.jpg" class="home-img" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/img/img3.jpg" class="home-img" alt="" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/img/img4.jpg" class="home-img" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.home-img{
  height: 18.625rem;
}
</style>