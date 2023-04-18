<template>
  <div class="driverSwiper">
    <div class="SwiperContainer" ref="SwiperContainer">
      <div class="SwiperGroup" ref="SwiperGroup">

        <img
          v-for="(item, index) in SwiperInfo"
          :key="index"
          :src="SwiperInfo[index].driver_detail_pic"
        />
      </div>
      <div class="swiper_intro">
       
         <transition name="introAnimate" v-for="(item,index) in SwiperInfo" :key="index">
          <div v-if="pageIndex === index+1">
            {{SwiperInfo[index].pic_introdution}}
          </div>
        </transition>
      
      </div>
      <div class="swiper_page">
        <transition name="introAnimate" v-for="(item,index) in SwiperInfo" :key="index">
          <div
            class="page_num"
            v-if="pageIndex === index+1"
          >
            {{pageIndex}}
          </div>
        </transition>
       
      </div>
      <div class="nextSwiper" @click="nextSwiper()">
        <svg
          t="1664615226815"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1787"
          width="32"
          height="32"
        >
          <path
            d="M793.1392 544l-198.8096 198.8096a32 32 0 0 0 45.2608 45.2608l249.856-249.856a37.12 37.12 0 0 0 0-52.48l-249.856-249.8048a32 32 0 0 0-45.2608 45.2608l198.8096 198.8096H153.6a32 32 0 1 0 0 64h639.5392z"
            fill="#2c2c2c"
            p-id="1788"
          ></path>
        </svg>
      </div>
      <div class="preSwiper" @click="preSwiper()">
        <svg
          t="1664615273296"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2856"
          width="32"
          height="32"
        >
          <path
            d="M192.125 548.409L418.327 774.61a36.409 36.409 0 0 1-51.496 51.496L82.55 541.826a42.234 42.234 0 0 1 0-59.71l284.28-284.222a36.409 36.409 0 0 1 51.496 51.496L192.125 475.59H919.78a36.409 36.409 0 1 1 0 72.818H192.125z"
            p-id="2857"
            fill="#2c2c2c"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: () => ({
    SwiperIndex: null,
    pageIndex:1,
    SwiperInfo: [],
  }),
  methods: {
    nextSwiper() {
      this.pageIndex>=this.$refs.SwiperGroup.children.length - 1 ? this.pageIndex=1 : this.pageIndex++
      console.log(this.pageIndex+'pageIndex');

        this.SwiperIndex++;
        const containerWidth = this.$refs.SwiperContainer.offsetWidth;
        for (
          let index = 0;
          index < this.$refs.SwiperGroup.children.length;
          index++
        ) {
          this.$refs.SwiperGroup.children[index].width = containerWidth;
        }

        console.log(containerWidth);

        if (this.SwiperIndex > this.$refs.SwiperGroup.children.length - 1) {
          this.SwiperIndex = 1;
          this.$refs.SwiperGroup.style.transition = "0s";
          this.$refs.SwiperGroup.style.left = `${0 + "px"}`;
          setTimeout(() => {
            this.$refs.SwiperGroup.style.transition = ".7s";
            this.$refs.SwiperGroup.style.left = `${
              // this.SwiperIndex * -1440 + "px"
              this.SwiperIndex * -containerWidth + "px"
            }`;
          }, 10);
        } else {
          this.$refs.SwiperGroup.style.transition = "0.7s";
          this.$refs.SwiperGroup.style.left = `${
            this.SwiperIndex * -containerWidth + "px"
          }`;
        }
      ;

      console.log(this.SwiperIndex, this.$refs.SwiperGroup.children.length - 1);
    },
    preSwiper() {
      this.pageIndex<=1 ? this.pageIndex=this.$refs.SwiperGroup.children.length-1 : this.pageIndex--
      console.log(this.pageIndex+'pageIndex');
      this.$nextTick(() => {
        const containerWidth = this.$refs.SwiperContainer.offsetWidth;
        for (
          let index = 0;
          index < this.$refs.SwiperGroup.children.length;
          index++
        ) {
          this.$refs.SwiperGroup.children[index].width = containerWidth;
        }
        if (this.SwiperIndex == 0) {
          this.SwiperIndex = this.$refs.SwiperGroup.children.length - 1;
          this.$refs.SwiperGroup.style.transition = "0s";
          this.$refs.SwiperGroup.style.left = `${
            this.SwiperIndex * -containerWidth + "px"
          }`;
          console.log(this.SwiperIndex);
       
          setTimeout(() => {
            this.SwiperIndex--
            this.$refs.SwiperGroup.style.transition = ".7s";
            this.$refs.SwiperGroup.style.left = `${
              this.SwiperIndex * -containerWidth + "px"
            }`;
          }, 10);
        } else {
          this.SwiperIndex--;
          this.$refs.SwiperGroup.style.transition = "0.7s";
          this.$refs.SwiperGroup.style.left = `${
            this.SwiperIndex * -containerWidth + "px"
          }`;
        }
      });

      console.log(this.SwiperIndex+'  index');
    },
  },

 async mounted() {
   await this.$axios
      .get(
        `http://127.0.0.1:8080/api/driverdetail/getdriverSWiper/?teamName=${this.$route.query.teamName}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(this.$route.query.teamName);
          
          for (const key in res.data) this.SwiperInfo.push(res.data[key]);
        }
        this.SwiperInfo.push(res.data[0]);
        console.log(this.SwiperInfo);
      })
      .catch((err) => {
        console.log(err);
      });
    this.$nextTick(() => {
      const containerWidth = this.$refs.SwiperContainer.offsetWidth;
      for (
        let index = 0;
        index < this.$refs.SwiperGroup.children.length;
        index++
      ) {
        this.$refs.SwiperGroup.children[index].width = containerWidth;
      }
      this.SwiperIndex = this.$refs.SwiperGroup.children.length - 1;
      this.$refs.SwiperGroup.style.left = `${
        this.SwiperIndex * -containerWidth + "px"
      }`;
      console.log('nexttick');
      console.log(this.$route.query.team);
    });
  },
};
</script>

<style lang="scss" scoped>
.driverSwiper {
  width: 100%;
  display: flex;
  justify-content: center;
  .SwiperContainer {
    width: 93%;
    height: 810px;
    overflow: hidden;
    position: relative;
    .SwiperGroup {
      width: auto;
      height: 100%;
      display: flex;
      transition: all 0.7s ease;
      position: absolute;

      img {
        object-fit: cover;
      }
    }
    .swiper_intro {
      position: absolute;
      width: 100%;
      height: 100px;
      background-color: rgba(255, 255, 255, 0.75);
      backdrop-filter: blur(16px) saturate(180%) filter(5px);
      z-index: 5;
      bottom: 0;
      padding: 20px 80px;
      overflow: hidden;
      div {
        font-family: Heavy;
      }
    }
    .swiper_page {
      position: absolute;
      width: 50px;
      height: 50px;
      background-color: rgb(255, 255, 255);
      border-radius: 50%;
      z-index: 5;
      bottom: 3%;
      left: 1%;
      padding: 10px;
      font-family: blacks;
      font-size: 1.2rem;
      text-align: center;
      overflow: hidden;
    }
    .nextSwiper {
      position: absolute;
      top: 50%;
      right: 10%;
      width: 50px;
      height: 50px;
      background-color: rgb(255, 255, 255);
      border-radius: 50%;
      line-height: 4.5;
      text-align: center;
      transition: all 0.7s ease;
    }
    .preSwiper {
      position: absolute;
      top: 50%;
      left: 10%;
      width: 50px;
      height: 50px;
      background-color: rgb(255, 255, 255);
      border-radius: 50%;
      line-height: 4.5;
      text-align: center;
      transition: all 1s ease;
    }
    .preSwiper:hover {
      background-color: rgb(255, 71, 71);
    }
    .nextSwiper:hover {
      background-color: rgb(255, 71, 71);
    }
  }
}
.introAnimate-enter-active {
  transition: all 1.5s ease;
}
.introAnimate-leave-active {
  transition: all 0.5s ease;
}
.introAnimate-enter {
  transform: translateY(150%);
}
.introAnimate-enter-to {
  transform: translateY(0%);
}
.introAnimate-leave {
  transform: translateY(0%);
}
.introAnimate-leave-to {
  transform: translateY(-200%);
}
</style>