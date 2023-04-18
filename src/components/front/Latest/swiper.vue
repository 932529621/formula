<template>
  <div class="swiper_container">
    <div
      class="swiper_content colom-pointer"
      v-for="(item, index) in bannerlist"
      :key="index"
      :class="classNamelist[index]"
      @click="$router.push({
          name:'Latestdetail',
          path:`/latest/latestdetail`,
          query:{
            news_id:bannerlist[index].news_id,
          }
        });"
    >
      <div
        class="swiper_news_container swiper_news_container_scanfontin"
        :class="[
          isanimate
            ? 'swiper_news_container_scanfontout'
            : 'swiper_news_container_scanfontin',
        ]"
      >
        <div class="swiper_news_title">
          {{ bannerlist[index].news_introdution }}
        </div>
        <!-- <div class="swiper_news_content">
            Watch extended race highlights from the 1999 French Grand Prix, with the
            full race available to watch along with over 700 classic grands prix at
            F1TV.com
        </div> -->
      </div>
      <img :src="bannerlist[index].news_pic" alt="" />
    </div>

    <div class="click_pre_container" @click.stop="swipePre()">
      <div class="pre"></div>
    </div>
    <div class="click_next_container" @click.stop="swipeNext()">
      <div class="next"></div>
    </div>
  </div>

  <!-- <img src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/driver_detail_pic/ALBON4.jpg" alt=""> -->
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    isanimate: false,
    ischangable: false,
    classNamelist: [
      "swipe_one",
      "swipe_two",
      "swipe_three",
      "swipe_four",
      "swipe_five",
      "swipe_six",
    ],
    bannerlist:[],
  }),
  computed: {
    ...mapState("latest", ["latesInfo"]),
  },
  mounted(){
    this.latesInfo.forEach(item => {
      if(item.news_status=='Banner'){
        this.bannerlist.push(item)
      }
    });
  },
  methods: {
    swipePre() {
      //节流
      if (this.ischangable) {
        return false;
      }
      this.ischangable = true;
      let res = this.classNamelist.pop();
      this.classNamelist.unshift(res);
      if (this.isanimate) {
        this.isanimate = false;
      } else {
        this.isanimate = true;
      }
      this.$nextTick(() => {
        setTimeout(() => {
          this.ischangable = false;
          if (this.isanimate) {
            this.isanimate = false;
          } else {
            this.isanimate = true;
          }
        }, 500);
      });
    },
    swipeNext() {
      if (this.ischangable) {
        return false;
      }
      this.ischangable = true;
      let res = this.classNamelist.shift();
      this.classNamelist.push(res);
      if (this.isanimate) {
        this.isanimate = false;
      } else {
        this.isanimate = true;
      }

      this.$nextTick(() => {
        setTimeout(() => {
          this.ischangable = false;
          if (this.isanimate) {
            this.isanimate = false;
          } else {
            this.isanimate = true;
          }
        }, 500);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.swiper_container {
  width: 100%;
  height: 560px;
  background-color: aqua;
  position: relative;
  .swiper_colum1 {
    background-color: #e10600;
  }
  .swiper_colum2 {
    background-color: blueviolet;
  }
  .swiper_content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0%;
    left: 0%;
    transition: all 0.7s ease;
  }
  .swiper_news_container {
    position: absolute;
    bottom: 0%;
    left: 50%;
    width: 0%;
    height: 20%;
    opacity: 0;
    background-color: transparent;
    border-left: 5px solid #e10600;
    transform: translate(-50%, -50%);
    z-index: 20;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    transition: all 1s linear;
    .swiper_news_title {
      letter-spacing: 2px; 
      font-family: Heavy;
      font-size: 2em;
      color: rgba(255, 255, 255, 1);
      background-color: rgb(21,21,30);
      border-radius: 15px;
      padding: 10px;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .swipe_one {
    opacity: 1;
    z-index: 10;
  }
  .swipe_two {
    opacity: 0;
  }
  .swipe_three {
    opacity: 0;
  }
  .swipe_four {
    opacity: 0;
  }
  .swipe_five {
    opacity: 0;
  }
  .swipe_six {
    opacity: 0;
  }
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
.colom-pointer:hover{
  cursor: pointer;
}
.click_pre_container:hover {
  cursor: pointer;
  background-color: #e10600;
  border-radius: 50%;
}
img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.swiper_news_container_scanfontin {
  animation: scanfontin 1s ease 0.2s 1 normal forwards;
}
.swiper_news_container_scanfontout {
  animation: scanfontout 1s ease 0s 1 normal forwards;
}
// .swipe_one:hover .swiper_news_container{
//     animation: scanfontin 3s ease .2s 1 normal forwards;
//用hover 实现不太行 2022-9-10
// }
@keyframes scanfontin {
  25% {
    opacity: 1;
    transform: translateY(0);
    width: 0%;
  }
  50% {
    opacity: 1;
    transform: translate(-50%, 0%);
    width: 0%;
  }
  100% {
    transform: translate(-50%, 0%);
    opacity: 1;
    width: 80%;
  }
}
@keyframes scanfontout {
  0% {
    transform: translate(-50%, 0%);
    opacity: 1;
    width: 80%;
  }
  50% {
    opacity: 1;
    transform: translate(-50%, 0%);
    width: 0%;
  }
  100% {
    opacity: 0;
    transform: translateY(-50%);
    width: 0%;
  }
}
</style>