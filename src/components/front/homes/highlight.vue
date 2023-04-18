<template>
  <div class="hight_light" >
    <div class="hight_light_container" v-if="isshow" ref="hight_light_container">
      <div class="video_title">HightLight Moment AT:</div>

      <div class="click_pre_container" @click="nextvideo()">
        <div class="pre"></div>
      </div>
      <div class="click_next_container" @click="prevideo()">
        <div class="next"></div>
      </div>

      <!-- <li class="videos one">  2022-8-29 改变数组，循环重新赋样式
          <div class="hightlight_prix_container">
            <div class="hightlight_prix">
              {{ prixName[prixName.length - prixName.length] }}
            </div>
          </div>
          <video class="video" src="../../assets/img/videoplayback.mp4"></video>
        </li>
        <li class="videos two">
          <div class="hightlight_prix_container">
            <div class="hightlight_prix">
              {{ prixName[prixName.length - prixName.length] }}
            </div>
          </div>
          <video
            class="video"
            controls
            src="../../assets/img/videoplayback.mp4"
          ></video>
        </li>
        <li class="videos three">
          <div class="hightlight_prix_container">
            <div class="hightlight_prix">
              {{ prixName[prixName.length - prixName.length] }}
            </div>
          </div>
          <video class="video" src="../../assets/img/videoplayback.mp4"></video>
        </li>
        <li class="videos four">
          <div class="hightlight_prix_container">
            <div class="hightlight_prix">
              {{ prixName[prixName.length - prixName.length] }}
            </div>
          </div>
          <video class="video" src="../../assets/img/videoplayback.mp4"></video>
        </li>
        <li class="videos five">
          <div class="hightlight_prix_container">
            <div class="hightlight_prix">
              {{ prixName[prixName.length - prixName.length] }}
            </div>
          </div>
          <video class="video" src="../../assets/img/videoplayback.mp4"></video>
        </li>
        <li class="videos six">
          <div class="hightlight_prix_container">
            <div class="hightlight_prix">
              {{ prixName[prixName.length - prixName.length] }}
            </div>
          </div>
          <video class="video" src="../../assets/img/videoplayback.mp4"></video>
        </li> -->
      <!-- <li class="videos" :class="classnamelist[0]"> 2022-8-30 v-bind 动态改变样式
          <div class="hightlight_prix_container">
            <div class="hightlight_prix">
              {{ prixName[prixName.length - prixName.length] }}
            </div>
          </div>
          <video class="video"  src="../../assets/img/videoplayback.mp4"></video>
        </li>
        <li class="videos" :class="classnamelist[1]">
          <div class="hightlight_prix_container">
            <div class="hightlight_prix">
              {{ prixName[prixName.length - prixName.length] }}
            </div>
          </div>
          <video
            class="video"
            controls
            src="../../assets/img/videoplayback.mp4"
          ></video>
        </li>
        <li class="videos" :class="classnamelist[2]">
          <div class="hightlight_prix_container">
            <div class="hightlight_prix">
              {{ prixName[prixName.length - prixName.length] }}
            </div>
          </div>
          <video class="video" src="../../assets/img/videoplayback.mp4"></video>
        </li>
        <li class="videos" :class="classnamelist[3]">
          <div class="hightlight_prix_container">
            <div class="hightlight_prix">
              {{ prixName[prixName.length - prixName.length] }}
            </div>
          </div>
          <video class="video" src="../../assets/img/videoplayback.mp4"></video>
        </li>
        <li class="videos" :class="classnamelist[4]">
          <div class="hightlight_prix_container">
            <div class="hightlight_prix">
              {{ prixName[prixName.length - prixName.length] }}
            </div>
          </div>
          <video class="video" src="../../assets/img/videoplayback.mp4"></video>
        </li>
        <li class="videos" :class="classnamelist[5]">
          <div class="hightlight_prix_container">
            <div class="hightlight_prix">
              {{ prixName[prixName.length - prixName.length] }}
            </div>
          </div>
          <video class="video" src="../../assets/img/videoplayback.mp4"></video>
        </li> -->
      <!--2022-8-31 v-for循环生成 -->
      <li
        class="videos video_pointer"
        v-for="(item, index) in HightlightVideoInfo"
        :key="index"
        :class="classnamelist[index]"
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
        <div class="hightlight_prix_container">
          <div class="hightlight_prix">
            {{ HightlightVideoInfo[index].video_label }}
          </div>
        </div>
        <video
          class="video"
          loop
          muted
          :src="HightlightVideoInfo[index].video_path"
        ></video>
      </li>
    </div>
      <v-progress-circular
        :size="50"
        v-if="!isshow"
        color="black"
        indeterminate
      ></v-progress-circular>
  </div>
</template>

<script>
import { getHightlightVideo } from "@/plugins/http";
export default {
  data: () => ({
    classnamelist: ["one", "two", "three", "four", "five", "six"],
    HightlightVideoInfo: {},
    isshow: false,
    ischangeable: false,
  }),
  methods: {
    // prevideo() {
    //   let videos = this.$refs.hight_light_container.querySelectorAll("li");
    //   let v = this.$refs.hight_light_container.querySelectorAll("li>video");

    //   let res = this.classnamelist.pop();
    //   this.classnamelist.unshift(res);
    //   let prix = this.prixName.pop();
    //   this.prixName.unshift(prix);
    //   for (let i = 0; i < this.classnamelist.length; i++) {
    //     videos[i].className = this.classnamelist[i];
    //     videos[i].className = this.classnamelist[i];
    //     if (videos[i].className === "videos two") {
    //       v[i].play();
    //       v[i].controller = true;
    //     } else {
    //       v[i].pause();
    //       v[i].currentTime = 0;
    //     }
    //   }
    // },
    // nextvideo() {
    //   let videos = this.$refs.hight_light_container.querySelectorAll("li");
    //   let v = this.$refs.hight_light_container.querySelectorAll("li>video");
    //   let res = this.classnamelist.shift();
    //   this.classnamelist.push(res);
    //   let prix = this.prixName.shift();
    //   this.prixName.push(prix);
    //   for (let i = 0; i < this.classnamelist.length; i++) {
    //     videos[i].className = this.classnamelist[i];
    //     if (videos[i].className === "videos two") {
    //       v[i].play();
    //     } else {
    //       v[i].pause();
    //       v[i].currentTime = 0;
    //     }
    //   }
    // },
    prevideo() {
      if (this.ischangeable) {
        return false;
      }
      this.ischangeable = true;
      setTimeout(() => {
        this.ischangeable = false;
      }, 1000);
      let res = this.classnamelist.pop();
      this.classnamelist.unshift(res);
      let videos = this.$refs.hight_light_container.querySelectorAll("li");
      let v = this.$refs.hight_light_container.querySelectorAll("li>video");
      //点击更换数组，只在函数结束后重新渲染，用nexttick((callback)=>{})，在执行完并重新渲染dom后，在执行nexttick中的回调函数
      this.$nextTick(() => {
        for (let i = 0; i < this.classnamelist.length; i++) {
          if (videos[i].className === "videos video_pointer two") {
            v[i].play();
            v[i].controller = true;
          } else {
            v[i].pause();
            v[i].currentTime = 0;
          }
        }
      });
    },
    nextvideo() {
      if (this.ischangeable) {
        return false;
      }
      this.ischangeable = true;
      setTimeout(() => {
        this.ischangeable = false;
      }, 1000);
      let res = this.classnamelist.shift();
      this.classnamelist.push(res);
      let videos = this.$refs.hight_light_container.querySelectorAll("li");
      let v = this.$refs.hight_light_container.querySelectorAll("li>video");
      this.$nextTick(() => {
        for (let i = 0; i < this.classnamelist.length; i++) {
          if (videos[i].className === "videos video_pointer  two") {
            v[i].play();
            v[i].controller = true;
          } else {
            v[i].pause();
            v[i].currentTime = 0;
          }
        }
      });
    },
  },
 async mounted() {
    // this.$axios
    //   .get("http://127.0.0.1:8080/api/home/getHightlightVideo")
    //   .then((res) => {
      const res=await getHightlightVideo();
        if (res.data.Homestatus === 208) {
          this.HightlightVideoInfo = res.data;
          this.isshow=true;
          // this.$store.commit("standingDetail/gethomeloadingvalue", 20);
        }
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
  },
};
</script>

<style lang="scss" scoped>
.hight_light {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .hight_light_container {
    width: 1300px;
    height: 100%;
    position: relative;
  }
  .videos {
    width: 100%;
    height: 100%;
    position: absolute;
    transition: all 0.5s ease;
  }
  .video {
    min-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
  .pre {
    border-right: 5px solid rgba(255, 255, 255, 1);
    border-top: 5px solid rgba(255, 255, 255, 1);
    height: 20px;
    width: 20px;
    border-left: 2px solid transparent;
    border-bottom: 2px solid transparent;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(225deg);
  }
  .next {
    border-right: 5px solid rgba(255, 255, 255, 1);
    border-top: 5px solid rgba(255, 255, 255, 1);
    height: 20px;
    width: 20px;
    border-left: 2px solid transparent;
    border-bottom: 2px solid transparent;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  .click_next_container {
    position: absolute;
    width: 60px;
    height: 60px;
    top: 50%;
    right: 10%;
    z-index: 25;
    border-radius: 30%;
    transition: all 0.5s ease;
  }
  .click_pre_container {
    position: absolute;
    width: 60px;
    height: 60px;
    top: 50%;
    left: 10%;
    z-index: 25;
    border-radius: 30%;
    transition: all 0.5s ease;
  }

  .click_next_container:hover {
    cursor: pointer;
    background-color: #e10600;
    border-radius: 50%;
  }
  .click_pre_container:hover {
    cursor: pointer;
    background-color: #e10600;
    border-radius: 50%;
  }
  .video_title {
    letter-spacing: 2px;
    font-family: Heavy;
    font-size: 2em;
    color: rgba(255, 255, 255, 1);
    position: absolute;
    top: 10%;
    left: 50%;
    z-index: 25;
    transform: translateX(-50%);
    white-space: nowrap;
  }
  .hightlight_prix_container {
    position: absolute;
    top: 20%;
    left: 50%;
  }

  .hightlight_prix {
    width: 100%;
    height: 100%;
    letter-spacing: 2px;
    font-family: Heavy;
    font-size: 2em;
    color: rgba(255, 255, 255, 1);
    z-index: 25;
    transition: all 1s ease;
    transform: translate(-50%, -50%);
  }

  .one {
    transform: translateX(-1345px);
    z-index: 10;
  }
  .two {
    transform: translateX(0);
    z-index: 20;
  }
  .three {
    transform: translateX(1345px);
    z-index: 10;
  }
  .four,
  .five.six {
    transform: scale(0.9);
  }
  .video_pointer :hover {
    cursor: pointer;
  }
}
</style>