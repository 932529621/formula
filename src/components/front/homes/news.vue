<template>
  <div class="main">
    <div class="latest_news_container">
      <div class="border-top"></div>
      <div class="top_news">
        <div class="top_news_left pointer">
          <div class="colom-1">
            <video
              style="width: 100%; height: 100%; object-fit: cover"
              controls
              :src="topNewsVideoinfo.video_path"
            ></video>
          </div>
          <div
            @click="
              $router.push({
                name: 'Videodetail',
                path: `/video/videodetail`,
                query: {
                  video_id: topNewsVideoinfo.video_id,
                },
              })
            "
          >
            <div class="top_news_label_left">
              {{ topNewsVideoinfo.video_title }}
            </div>
            <div class="top_news_content_left">
              {{ topNewsVideoinfo.video_introdution }}
            </div>
          </div>
        </div>
        <div class="top_news_right">
          <div class="top_news_right_right">
            <div
              class="colom-2 pointer"
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
                  isIncolomImg2 ? 'transform:scale(1.2)' : 'transform:scale(1)'
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
              class="colom-4 pointer"
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
                  isIncolomImg4 ? 'transform:scale(1.2)' : 'transform:scale(1)'
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
              class="colom-3 pointer"
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
                  isIncolomImg3 ? 'transform:scale(1.2)' : 'transform:scale(1)'
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
              class="colom-5 pointer"
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
                  isIncolomImg5 ? 'transform:scale(1.2)' : 'transform:scale(1)'
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
</template>

<script>
import { getTopNewsVideo } from "@/plugins/http";
import { mapState } from "vuex";
export default {
  data: () => ({
    isIncolomImg2: false,
    isIncolomImg3: false,
    isIncolomImg4: false,
    isIncolomImg5: false,
    topNewsinfo: [],
    topNewsVideoinfo: {},
  }),
  methods: {},
  computed: {
    ...mapState("latest", ["latesInfo"]),
  },
  async mounted() {
    //改成父组件统一 2023.2.28
    // const getTopNews = await this.$axios
    //   .get("http://127.0.0.1:8080/api/home/getTopNews")
    //   .then((res) => {
    //     if (res.data.Homestatus === 208) {
    //       for (let key in res.data) {
    //         this.topNewsinfo.push(res.data[key]);
    //       }
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // let reqArr = [
    //   this.$axios({
    //     method: "get",
    //     url: "http://127.0.0.1:8080/api/home/getTopNewsVideo",
    //   }),
    //   this.$axios({
    //     method: "get",
    //     url: "http://127.0.0.1:8080/api/home/getTopNews",
    //   }),
    // ];
    // // let reqArr=[getTopNews,getTopNewsVideo]
    // Promise.all(reqArr)
    //   .then((res) => {
    //     this.isshow = true;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    await this.$store.dispatch("latest/getlatestDetail");
    // const getTopNewsVideo = await this.$axios
    //   .get("http://127.0.0.1:8080/api/home/getTopNewsVideo")
    //   .then((res) => {
      const res=await getTopNewsVideo();
        if (res.data.Homestatus === 208) {
          this.topNewsVideoinfo = res.data;
        }
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    this.latesInfo.forEach((item) => {
      if (item.news_status == "Top News") {
        this.topNewsinfo.push(item);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.main {
  margin-top: 5%;
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1%;
}
.latest_news_container {
  width: 90%;
  height: 100%;
  position: relative;
  border-right: 10px solid rgb(255, 0, 0);
  border-bottom: 10px solid rgb(255, 0, 0);
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
    border-top: 10px solid rgb(255, 0, 0);
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
      font-size: 1rem;
      color: #e10600;
      word-break: break-all;
    }
    .top_news_content {
      font-family: Medium;
      font-size: 0.8rem;
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
        overflow: hidden;
        position: relative;
        transition: all 0.5s ease;
        margin-top: 15px;
        border-radius: 10px;
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
          backdrop-filter: blur(5px) opacity(1.08);
          background-color: rgba(0, 0, 0, 0.3);
          transition: all 0.5s ease;
          top: 220px;
          left: 0;
          padding: 5px;
        }
      }
    }
    .top_news_left {
      height: 100%;
      width: 80%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      transition: all 0.5s ease;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;

      .colom-1 {
        width: 100%;
        height: 80%;
        background-color: pink;
        border-radius: 10px;
      }
      .top_news_label_left {
        padding: 2%;
        font-family: Medium;
        font-size: small;
        color: #e10600;
        width: 100%;
        height: auto;
      }
      .top_news_content_left {
        padding: 2%;
        font-family: Medium;
        font-size: small;
        color: #000000;
        width: 100%;
        height: auto;
        word-break: break-all;
        overflow: hidden;
        transition: all 0.5s ease;
      }
    }
  }
}
.latest_news_container::after {
  content: "Top News";
  position: absolute;
  top: -5%;
  font-family: Heavy;
  font-size: 1.8em;
  color: black;
  background: rgba(255, 255, 255);
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

.top_news_left:hover {
  background-color: rgb(21, 21, 30) !important;
}
.top_news_left:hover .top_news_content_left {
  color: rgb(255, 255, 255) !important;
}
.pointer {
  cursor: pointer;
}
</style>