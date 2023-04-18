<template>
  <div class="drivermarket">
    <div class="drivermarket_container">
      <div class="drivermarket_title">
        <div class="drivermarket_title_content">Driver Market</div>
        <div class="arrow"></div>
      </div>
      <div class="drivermarket_news">
        <div
          class="drivermarket_news_container colom-pointer"
          v-for="(item, index) of Marketnewsinfo"
          :key="index"
          @click="
            $router.push({
              name: 'Latestdetail',
              path: `/latest/latestdetail`,
              query: {
                news_id: item.news_id,
              },
            })
          "
        >
          <div class="drivermarket_news_top">
            <img class="drivermarket_news_pic" :src="item.news_pic" />
          </div>
          <div class="drivermarket_news_bottom">
            <div class="drivermarket_news_title">{{ item.news_title }}</div>
            <div class="drivermarket_news_content">
              {{ item.news_introdution }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="drivermarket_container">
      <div class="drivermarket_title">
        <div class="drivermarket_title_content">Analysis</div>
        <div class="arrow"></div>
      </div>
      <div class="drivermarket_news">
        <div
          class="drivermarket_news_container colom-pointer"
          v-for="(item, index) of Analysisnewsinfo"
          :key="index"
          @click="
            $router.push({
              name: 'Latestdetail',
              path: `/latest/latestdetail`,
              query: {
                news_id: item.news_id,
              },
            })
          "
        >
          <div class="drivermarket_news_top">
            <img class="drivermarket_news_pic" :src="item.news_pic" />
          </div>
          <div class="drivermarket_news_bottom">
            <div class="drivermarket_news_title">{{ item.news_title }}</div>
            <div class="drivermarket_news_content">
              {{ item.news_introdution }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    Marketnewsinfo: [],
    Analysisnewsinfo: [],
  }),
  computed: {
    ...mapState("latest", ["latesInfo"]),
  },
  mounted() {
    this.latesInfo.forEach((item) => {
      if (item.news_status == "Driver Market") {
        this.Marketnewsinfo.push(item);
      }
      if (item.news_status == "Analysis") {
        this.Analysisnewsinfo.push(item);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.colom-pointer:hover {
  cursor: pointer;
}
.drivermarket {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  .drivermarket_container {
    width: 45%;
    height: auto;
    min-width: 328px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    border-top: 5px solid #15151e;
    border-right: 5px solid #15151e;
    border-top-right-radius: 25px;
    transition: all 0.5s ease;
    flex-wrap: wrap;
    .drivermarket_title {
      width: auto;
      height: 15%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .drivermarket_title_content {
        color: rgb(21, 21, 30);
        font-family: Heavy;
        font-size: 1.5rem;
        transition: all 0.5s ease;
      }
      .arrow {
        width: 14.5px;
        height: 14px;
        border-bottom-right-radius: 2.5px;
        border-right: 2px solid #e10600;
        border-bottom: 2px solid #e10600;
        transform: rotate(-45deg);
      }
      .drivermarket_title_content:hover {
        color: #e10600 !important;
        cursor: pointer;
      }
    }
    .drivermarket_news {
      width: auto;
      height: auto;
      min-width: 323px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .drivermarket_news_container {
        width: 45%;
        height: 85%;
        min-width: 303px;
        min-height: 297px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        transition: all 0.5s ease;
        background-color: rgb(255, 255, 255);
        .drivermarket_news_top {
          width: 100%;
          height: 60%;
          .drivermarket_news_pic {
            width: 100%;
            height: 100%;
            transition: all 0.5s ease;
          }
        }
        .drivermarket_news_bottom {
          width: 100%;
          height: 40%;
          transition: all 0.5s ease;
          .drivermarket_news_title {
            font-family: Medium;
            font-size: small;
            color: #e10600;
            word-break: break-all;
          }
          .drivermarket_news_content {
            font-family: Medium;
            font-size: small;
            color: #000000;
            word-break: break-all;
            overflow: hidden;
            transition: all 0.5s ease;
          }
        }
      }
      .drivermarket_news_container:hover {
        background-color: rgb(21, 21, 30);
      }
      .drivermarket_news_container:hover .drivermarket_news_content {
        color: rgb(255, 255, 255);
      }
      .drivermarket_news_container:hover .drivermarket_news_bottom {
        transform: translateY(20%);
      }
      .drivermarket_news_container:hover .drivermarket_news_pic {
        transform: scale(1.2);
      }
    }
  }
}
</style>