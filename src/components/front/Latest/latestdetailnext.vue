<template>
  <div class="latestdetailnext">
    <div class="lastest_mask"></div>
    <div class="latestdetailnext_container">
      <div class="latestdetailnext_container_title">NEXT NEW</div>
      <div class="latestdetailnext_container_category">FEATURE</div>
      <div class="latestdetailnext_container_intro">
        ANALYSIS: Piastri, Ricciardo, Williams and more – where next for F1’s
        2023 driver market?
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    news:{},
  }),

};
</script>

<style lang="scss" scoped>
.latestdetailnext {
  width: 100%;
  height: 420px;
  background-image: url("http://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/news_pic/driver_market/image1.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  position: relative;
  .lastest_mask{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    transition: all 0.5s ease;
    background-color: rgb(0, 0, 0,.8);
  }
  .latestdetailnext_container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 10;
    padding: 100px 120px;
    row-gap: 10px;
    transition: all 0.5s ease;
    .latestdetailnext_container_title {
      color: rgb(255, 255, 255);
      font-size: 2.5rem;
      font-family: Heavy;
      transition: all 0.5s ease;
    }
    .latestdetailnext_container_category {
      color: rgb(255, 0, 0);
      font-size: 1.2rem;
      font-family: Heavy;
      transition: all 0.5s ease;
    }
    .latestdetailnext_container_intro {
      width: 100%;
      color: rgb(255, 255, 255);
      font-size: 1.5rem;
      font-family: Heavy;
      max-width: 1000px;
      transition: all 0.5s ease;
    }
  }
}

.latestdetailnext::after {
  content: "";
  position: absolute;
  width: 60%;
  height: 72%;
  top: 28%;
  left: 23%;
  border-top: 10px solid red;
  border-right: 10px solid red;
  border-top-right-radius: 20px;
  transition: all 0.5s ease;
}
.latestdetailnext_container:hover div {
  transform: translateY(-10px);
  cursor: pointer;
}
.latestdetailnext:hover .lastest_mask {
    background-color: rgb(0, 0, 0,.65);
}

</style>