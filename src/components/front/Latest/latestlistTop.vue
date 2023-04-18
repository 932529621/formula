<template>
  
    <div class="lastestlistTop">
        <div class="lastestlistTop_title">
            Latest News
        </div>
    </div>
 
</template>

<script>
export default {
mounted(){
  window.scrollTo(0,0);
}
}
</script>

<style lang="scss" scoped>
  .lastestlistTop{
    width: 100%;
    height: 70vh;
    background-image: url('https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/news_pic/analysis/analysis.jpg');
    background-size: cover;
    background-attachment: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    .lastestlistTop_title{
      color: rgb(255, 255, 255);
      font-size: 4rem;
      position: sticky;
      top: 30%;
      transform: translateY(-50%);
      font-family: Heavy;
    }
  }

</style>