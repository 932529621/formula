<!--//flex 自适应有问题 用grid重做 2022-9-12 <template>

    <div class="morenews">
      <div class="morenews_container">
        <div class="morenews_title">
          <div class="morenews_title_content">More News</div>
          <div class="morenews_arrow"></div>
        </div>

        <div class="morenews_news">
          <div
            class="morenews_news_container"
            v-for="(item, index) in newsinfo"
            :key="index"
            ref="newscontainer"
            @mouseenter="videoplay(index)"
            @mouseleave="videopause(index)"
          >
            <div class="morenews_news_top">
              <img
                class="morenews_news_pic"
                src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/news_pic/more_news/image31.jpg"
              />
              <video muted class="inner_videos" src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/video/onboard/onboard_video/Valtteri%20Bottas'%20Onboard%20Pole%20Lap%20_%202021%20Turkish%20Grand%20Prix%20_%20Pirelli.mp4"></video>
              <img class="video_play" src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/video_play.png" alt="">
            </div>
            <div class="morenews_news_bottom">
              <div class="morenews_news_title">NEWS</div>
              <div class="morenews_news_content">
                How to stream the 2022 Italian Grand Prix on F1 TV Pro
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data: () => ({
    newsinfo: ["q", "w", "e", "r"],
  }),
  methods:{
   async videoplay(index){
       await this.$refs.newscontainer[index].children[0].children[1].play();
    },
    async videopause(index){
        await this.$refs.newscontainer[index].children[0].children[1].pause();
    }
  }
};
</script>

<style lang="scss" scoped>
.morenews {
  width: 100%;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(247, 244, 241, 1);
  .morenews_container {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .morenews_title {
      width: auto;
      height: 15%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 10px solid rgb(21, 21, 30);
      .morenews_title_content {
        color: rgb(21, 21, 30);
        font-family: Heavy;
        font-size: 1.5rem;
        transition: all 0.5s ease;
      }
      .morenews_arrow {
        width: 14.5px;
        height: 14px;
        border-bottom-right-radius: 2.5px;
        border-right: 2px solid #e10600;
        border-bottom: 2px solid #e10600;
        transform: rotate(-45deg);
      }
      .morenews_title_content:hover {
        color: #e10600 !important;
        cursor: pointer;
      }
    }



    .morenews_news {
      width: auto;
      height: 80%;
      display: flex;
      justify-content: space-around;
      .morenews_news_container {
        width: 24%;
        height: 90%;
        display: flex;
        flex-direction: column;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        transition: all 0.5s ease;
        background-color: rgb(255, 255, 255);
        .morenews_news_top {
          width: 100%;
          height: 60%;
          position: relative;
          .morenews_news_pic {
            width: 100%;
            height: 100%;
            transition: all 0.7s ease;
          }
          .video_play{
            position: absolute;
            top: 50%;
            left:50%;
            transform: translate(-50%,-50%);
          }
          .inner_videos{
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            top: 0%;
            left: 0;
            opacity: 0;
            transition: all 0.7s ease;

          }
        }
        .morenews_news_bottom {
          width: 100%;
          height: 40%;
          transition: all 0.5s ease;
          .morenews_news_title {
            font-family: Medium;
            font-size: small;
            color: #e10600;
            word-break: break-all;
          }
          .morenews_news_content {
            font-family: Medium;
            font-size: small;
            color: #000000;
            word-break: break-all;
            overflow: hidden;
            transition: all 0.5s ease;
          }
        }
      }
     
      .morenews_news_container:hover {
        background-color: rgb(21, 21, 30);
      }
      .morenews_news_container:hover .morenews_news_content {
        color: rgb(255, 255, 255);
      }
      .morenews_news_container:hover .morenews_news_bottom {
        transform: translateY(20%);
      }
      .morenews_news_container:hover .morenews_news_pic {
        transform: scale(1.2);
        opacity: 0;
      }
      .morenews_news_container:hover .video_play {
        opacity: 0;
      }
      .morenews_news_container:hover .inner_videos{
        transform: scale(1.2);
        opacity: 1;
        z-index: 99;
      }
    }
  }
}
</style> -->
<template>
  <div class="morenews">
    <div class="morenews_container">
      <div class="morenews_title">
        <div class="morenews_title_content">Interview</div>
        <div class="morenews_arrow"></div>
      </div>

      <div class="morenews_news">
        <div
          class="morenews_news_container video_pointer"
          v-for="(item, index) in videos"
          :key="index"
          ref="newscontainer"
          @mouseenter="videoplay(index)"
          @mouseleave="videopause(index)"
          @click="
              $router.push({
                name: 'Videodetail',
                path: `/video/videodetail`,
                query: {
                  video_id: item.video_id,
                },
              })
            "
        >
          <div class="morenews_news_top">
            <img
              class="morenews_news_pic"
              :src="item.video_pic"
            />
            <video
              muted
              class="inner_videos"
              :src="item.video_path"
            ></video>
            <img
              class="video_play"
              src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/video_play.png"
              alt=""
            />
          </div>
          <div class="morenews_news_bottom">
            <div class="morenews_news_title">{{ item.video_status }}</div>
            <div class="morenews_news_content">
              {{ item.video_title }}
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
    videos: [],
  }),
  computed: {
    ...mapState("videos", ["videoInfo"]),
  },
  methods: {
    async videoplay(index) {
      await this.$refs.newscontainer[index].children[0].children[1].play();
    },
    async videopause(index) {
      await this.$refs.newscontainer[index].children[0].children[1].pause();
    },
  },
  mounted(){
    this.videoInfo.forEach(item => {
      if(item.video_status=='Interview'){
        this.videos.push(item)
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.morenews {
  margin-top: 20px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .morenews_container {
    width: 90%;
    height: 100%;
    flex-direction: column;
    gap: 10px;
    .morenews_title {
      width: auto;
      height: 15%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 10px solid rgb(21, 21, 30);
      .morenews_title_content {
        color: rgb(21, 21, 30);
        font-family: Heavy;
        font-size: 1.5rem;
        transition: all 0.5s ease;
      }
      .morenews_arrow {
        width: 14.5px;
        height: 14px;
        border-bottom-right-radius: 2.5px;
        border-right: 2px solid #e10600;
        border-bottom: 2px solid #e10600;
        transform: rotate(-45deg);
      }
      .morenews_title_content:hover {
        color: #e10600 !important;
        cursor: pointer;
      }
    }

    .morenews_news {
      width: auto;
      height: auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, 330px);
      margin-top: 1.15%;
      column-gap: 1%;
      .morenews_news_container {
        width: 95%;
        height: 90%;
        display: flex;
        flex-direction: column;
        min-width: 313px;
        min-height: 297px;
        margin-bottom: 20px;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        transition: all 0.5s ease;
        background-color: rgb(255, 255, 255);
        .morenews_news_top {
          width: 100%;
          height: 60%;
          position: relative;
          .morenews_news_pic {
            width: 100%;
            height: 100%;
            transition: all 0.7s ease;
          }
          .video_play {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .inner_videos {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            top: 0%;
            left: 0;
            opacity: 0;
            transition: all 0.7s ease;
          }
        }
        .morenews_news_bottom {
          width: 100%;
          height: 40%;
          transition: all 0.5s ease;
          .morenews_news_title {
            font-family: Medium;
            font-size: small;
            color: #e10600;
            word-break: break-all;
          }
          .morenews_news_content {
            font-family: Medium;
            font-size: small;
            color: #000000;
            word-break: break-all;
            overflow: hidden;
            transition: all 0.5s ease;
          }
        }
      }

      .morenews_news_container:hover {
        background-color: rgb(21, 21, 30);
      }
      .morenews_news_container:hover .morenews_news_content {
        color: rgb(255, 255, 255);
      }
      .morenews_news_container:hover .morenews_news_bottom {
        transform: translateY(20%);
      }
      .morenews_news_container:hover .morenews_news_pic {
        transform: scale(1.2);
        opacity: 0;
      }
      .morenews_news_container:hover .video_play {
        opacity: 0;
      }
      .morenews_news_container:hover .inner_videos {
        transform: scale(1.2);
        opacity: 1;
        z-index: 99;
      }
    }
  }
  .video_pointer:hover{
    cursor: pointer;
  }
}
</style>