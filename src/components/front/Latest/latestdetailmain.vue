<template>
  <v-app>
    <div class="newsdetail">
      <div class="newsdetail_container">
        <div class="newsdetail_container_category">{{ news.news_title }}</div>
        <div class="newsdetail_container_subcategory">{{ news.category }}</div>

        <div class="newsdetail_container_title">
          {{ news.news_introdution }}
        </div>
        <div class="newsdetail_container_updateTime">{{ news.createdate }}</div>
        <div class="newsdetail_container_img">
          <img
            :src="news.news_pic"
            class="newsdetail_img"
          />
        </div>
        <div class="newsdetail_container_content" v-html="news.news_content">
        </div>
      </div>
    </div></v-app
  >
</template>
  
  <script>
import { mapState } from "vuex";
export default {
  data: () => ({
    news:{},
  }),
  computed: {
    ...mapState("latest", ["latest"]),
  },
  methods: {
    backTop() {
      window.scrollTo(0, 0);
    },  
  },
  async mounted() {
    this.news=this.latest[0]
  }
};
</script>
  
  <style lang="scss" scoped>
.newsdetail {
  margin-top: 70px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  .newsdetail_container {
    width: 95%;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-bottom: 10px solid rgb(225, 0, 0);
    .backTop {
      position: fixed;
      bottom: 5%;
      right: 3%;
      border: 1px solid rgba(240, 235, 235, 0.7);
      box-shadow: 0 0 5px 5px rgb(240 235 235 / 70%);
      border-radius: 50%;
      width: 45px;
      height: 45px;
      text-align: center;
      line-height: 4;
      transition: all 0.5s ease;
      z-index: 9999;
    }
    .backTop:hover {
      box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }
    .newsdetail_container_category {
      margin-top: 50px;
      color: rgb(225, 0, 0);
      font-size: 1rem;
      font-family: Medium;
      text-transform: uppercase;
      letter-spacing: 0.7px;
    }
    .newsdetail_container_subcategory {
      color: rgb(0, 0, 0);
      font-size: 1.2rem;
      font-family: Medium;
      text-transform: uppercase;
      letter-spacing: 0.7px;
      height: 50px;
      border-bottom: 1px solid rgb(208, 202, 202);
      transition: all 0.7s ease-in-out;
    }
    .newsdetail_container_title {
      color: rgb(0, 0, 0);
      font-size: 2.5rem;
      font-family: Heavy;
      margin-top: 50px;
      text-align: center;
    }
    .newsdetail_container_updateTime {
      height: 2%;
      color: rgb(0, 0, 0);
      font-size: 1rem;
      font-family: Medium;
      letter-spacing: 1px;
      margin: 5px 0;
    }
    .newsdetail_container_img {
      margin-top: 10px;
      width: 85%;
      height: 25%;
      position: relative;

      .newsdetail_img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .newsdetail_container_img::after {
      content: "";
      position: absolute;
      top: -25px;
      left: -40px;
      width: 105%;
      height: 100px;
      border-top: 10px solid red;
      border-right: 10px solid red;
      border-top-right-radius: 25px;
    }
    .newsdetail_container_content {
      width: 80%;
      color: rgb(0, 0, 0);
      font-size: 1rem;
      font-family: Medium;
      margin-top: 50px;
      background-color: rgb(247, 247, 247);
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 0 5px 5px rgb(240 235 235 / 90%);
      position: relative;
    }
    .newsdetail_container_content::before {
      content: "";
      position: absolute;
      bottom: -50px;
      width: 102%;
      height: 100px;
      border-bottom: 10px solid red;
      border-right: 10px solid red;
      border-bottom-right-radius: 20px;
    }
  }
}
</style>