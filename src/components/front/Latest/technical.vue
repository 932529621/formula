<template>
  <div>
    <div class="top_empty"></div>
    <div class="main">
      <div class="latest_news_container">
        <div class="border-top"></div>
        <div class="top_news">
          <div
            class="top_news_left"
            @click="
              $router.push({
                name: 'Latestdetail',
                path: `/latest/latestdetail`,
                query: {
                  news_id: topNewsinfo[4].news_id,
                },
              })
            "
          >
            <div class="colom-1">
              <img :src="topNewsinfo[4].news_pic" />
            </div>
            <div class="top_news_label_left">
              {{ topNewsinfo[4].news_title }}
            </div>
            <div class="top_news_content_left">
              {{ topNewsinfo[4].news_introdution }}
            </div>
          </div>
          <div class="top_news_right">
            <div class="top_news_right_right">
              <div
                class="colom-2 colom-pointer"
                @mouseenter="isIncolomImg2 = true"
                @mouseleave="isIncolomImg2 = false"
                @click="
                  $router.push({
                    name: 'Latestdetail',
                    path: `/latest/latestdetail`,
                    query: {
                      news_id: topNewsinfo[0].news_id,
                    },
                  })
                "
              >
                <img
                  :style="
                    isIncolomImg2
                      ? 'transform:scale(1.2);border'
                      : 'transform:scale(1)'
                  "
                  :src="topNewsinfo[0].news_pic"
                />
                <span
                  class="mask"
                  :style="isIncolomImg2 ? 'top:105px' : 'top:220px'"
                >
                  <div class="top_news_label">
                    {{ topNewsinfo[0].news_title }}
                  </div>
                  <div class="top_news_content">
                    {{ topNewsinfo[0].news_introdution }}
                  </div>
                </span>
              </div>
              <div
                class="colom-4 colom-pointer"
                @mouseenter="isIncolomImg4 = true"
                @mouseleave="isIncolomImg4 = false"
                @click="
                  $router.push({
                    name: 'Latestdetail',
                    path: `/latest/latestdetail`,
                    query: {
                      news_id: topNewsinfo[1].news_id,
                    },
                  })
                "
              >
                <img
                  :style="
                    isIncolomImg4
                      ? 'transform:scale(1.2)'
                      : 'transform:scale(1)'
                  "
                  :src="topNewsinfo[1].news_pic"
                  alt=""
                />
                <span
                  class="mask"
                  :style="isIncolomImg4 ? 'top:105px' : 'top:220px'"
                >
                  <div class="top_news_label">
                    {{ topNewsinfo[1].news_title }}
                  </div>
                  <div class="top_news_content">
                    {{ topNewsinfo[1].news_introdution }}
                  </div>
                </span>
              </div>
            </div>
            <div class="top_news_right_left">
              <div
                class="colom-3 colom-pointer"
                @mouseenter="isIncolomImg3 = true"
                @mouseleave="isIncolomImg3 = false"
                @click="
                  $router.push({
                    name: 'Latestdetail',
                    path: `/latest/latestdetail`,
                    query: {
                      news_id: topNewsinfo[2].news_id,
                    },
                  })
                "
              >
                <img
                  :style="
                    isIncolomImg3
                      ? 'transform:scale(1.2)'
                      : 'transform:scale(1)'
                  "
                  :src="topNewsinfo[2].news_pic"
                />
                <span
                  class="mask"
                  :style="isIncolomImg3 ? 'top:105px' : 'top:220px'"
                >
                  <div class="top_news_label">
                    {{ topNewsinfo[2].news_title }}
                  </div>
                  <div class="top_news_content">
                    {{ topNewsinfo[2].news_introdution }}
                  </div>
                </span>
              </div>
              <div
                class="colom-5 colom-pointer"
                @mouseenter="isIncolomImg5 = true"
                @mouseleave="isIncolomImg5 = false"
                @click="
                  $router.push({
                    name: 'Latestdetail',
                    path: `/latest/latestdetail`,
                    query: {
                      news_id: topNewsinfo[3].news_id,
                    },
                  })
                "
              >
                <img
                  :style="
                    isIncolomImg5
                      ? 'transform:scale(1.2)'
                      : 'transform:scale(1)'
                  "
                  :src="topNewsinfo[3].news_pic"
                  alt=""
                />
                <span
                  class="mask"
                  :style="isIncolomImg5 ? 'top:105px' : 'top:220px'"
                >
                  <div class="top_news_label">
                    {{ topNewsinfo[3].news_title }}
                  </div>
                  <div class="top_news_content">
                    {{ topNewsinfo[3].news_introdution }}
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom_empty"></div>
  </div>
</template>
      
      <script>
import { mapState } from "vuex";
export default {
  data: () => ({
    isIncolomImg2: false,
    isIncolomImg3: false,
    isIncolomImg4: false,
    isIncolomImg5: false,
    topNewsinfo: [],
  }),
  computed: {
    ...mapState("latest", ["latesInfo"]),
  },
  mounted() {
    this.latesInfo.forEach((item) => {
      if (item.news_status == "Technical") {
        this.topNewsinfo.push(item);
      }
    });
  },
};
</script>
      
      <style lang="scss" scoped>

.main {
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(21, 21, 30);
}
.latest_news_container {
  width: 90%;
  height: 100%;
  position: relative;
  border-right: 10px solid rgb(56, 56, 63);
  border-bottom: 10px solid rgb(56, 56, 63);
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;

  .border-top {
    position: absolute;
    top: 0;
    right: 0%;
    width: 88%;
    height: 100px;
    border-top: 10px solid rgb(56, 56, 63);
    border-top-right-radius: 10px;
  }
  .top_news {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    .top_news_label {
      font-family: Medium;
      font-size: small;
      color: #e10600;
      word-break: break-all;
    }
    .top_news_content {
      font-family: Medium;
      font-size: small;
      color: #ffffff;
      word-break: break-all;
      overflow: hidden;
    }

    .top_news_right {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      gap: 15px;
      .top_news_right_right {
        width: 40%;
        height: 100%;
      }
      .top_news_right_left {
        width: 40%;
        height: 100%;
      }
      .colom-2,
      .colom-3,
      .colom-4,
      .colom-5 {
        width: 330px;
        height: 210px;
        position: relative;
        transition: all 0.5s ease;
        margin-top: 15px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        img {
          width: 100%;
          height: 100%;
          transition: all 0.5s ease;
        }
        .mask {
          position: absolute;
          width: 100%;
          height: 50%;
          background-color: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(5px) opacity(5);
          transition: all 0.5s ease;
          top: 220px;
          left: 0;
          padding: 5px;
        }
      }
    }
    .top_news_left {
      margin-top: 20px;
      height: 100%;
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      transition: all 0.5s ease;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      background-color: rgb(255, 255, 255);
      .colom-1 {
        width: 100%;
        height: 80%;
        background-color: pink;
        border-radius: 10px;
        img {
          width: 100%;
          height: 100%;
          transition: all 0.5s ease;
        }
      }
      .top_news_label_left {
        padding: 2%;
        font-family: Medium;
        font-size: small;
        color: #e10600;
        width: 100%;
        height: 5%;
      }
      .top_news_content_left {
        padding: 2%;
        font-family: Medium;
        font-size: small;
        color: #000000;
        width: 100%;
        height: 15%;
        word-break: break-all;
        overflow: hidden;
        transition: all 0.5s ease;
      }
    }
  }
}
.latest_news_container::after {
  content: "Technical";
  position: absolute;
  top: -3%;
  font-family: Heavy;
  font-size: 1.8em;
  color: rgb(255, 255, 255);
  background: transparent;
}
.latest_news_container::before {
  content: "";
  position: absolute;
  top: 0%;
  left: 45.5%;
  width: 2px;
  height: 100%;
  border-left: 2px dotted rgb(56, 56, 63);
}
.colom-pointer:hover{
  cursor: pointer;
}
.top_news_left:hover {
  background-color: rgb(21, 21, 30) !important;
  cursor: pointer;
}
.top_news_left:hover .top_news_content_left {
  color: rgb(255, 255, 255) !important;
}
.top_empty {
  width: 100%;
  height: 80px;
  background-color: rgb(21, 21, 30);
}
.bottom_empty {
  width: 100%;
  height: 100px;
  background-color: rgb(21, 21, 30);
}
</style>