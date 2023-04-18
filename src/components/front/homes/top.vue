<template>
  <div class="top" v-if="isshow">
    <div class="top_container">
      <video
        autoplay
        loop
        muted
        class="video_banner"
        :src="topVideoinfo.video_path"
      ></video>
      <span class="banner_h1">{{ topVideoinfo.video_title }}</span>
      <span class="banner_h2">{{ topVideoinfo.video_introdution }}</span>
      <button class="banner_btn">查看更多</button>
    </div>
  </div>
</template>

<script>
import { getTopVideo } from "@/plugins/http";
export default {
  data: () => ({
    topVideoinfo: {},
    isshow: false,
  }),
  async mounted() {
    // this.$axios
    //   .get("http://127.0.0.1:8080/api/home/getTopVideo")
    //   .then((res) => {
    const res = await getTopVideo();
    if (res.data.Homestatus === 208) {
      this.topVideoinfo = res.data;
      this.isshow = true;
    }
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  },
};
</script>

<style lang="scss">
.top {
  height: 100vh;
  width: 100vh;
}

.top_container {
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  position: absolute;
  overflow: hidden;
  background-color: rgb(151, 61, 83);
  span {
    font-family: Lobster;
    color: rgb(255, 255, 255);
  }
  .banner_h1 {
    font-size: 3em;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 60%;
    left: 50%;
    white-space: nowrap;
  }
  .banner_h2 {
    display: block;
    font-size: 1em;
    width: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 70%;
    left: 50%;
    letter-spacing: 1px;
  }
  .banner_btn {
    color: #ffffff;
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid rgb(255, 255, 255);
    padding: 10px;
    border-radius: 5%;
    transition: all 0.7s ease;
  }
}
.top_container:before {
  content: " ";
  border-right: 5px solid rgba(255, 255, 255, 1);
  border-top: 5px solid rgba(255, 255, 255, 1);
  height: 20px;
  width: 20px;
  margin: 50px auto 0;
  transform: rotate(135deg);
  border-left: 2px solid transparent;
  border-bottom: 2px solid transparent;
  position: absolute;
  top: 80%;
  left: 49%;
  animation: arrowdown 1s ease 0.5s infinite normal;
}
.banner_btn:hover {
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.5s;
}
.video_banner {
  min-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

@keyframes arrowdown {
  0% {
    top: 80%;
    left: 49%;
  }
  100% {
    top: 90%;
    left: 49%;
    border-right: 5px solid rgba(255, 255, 255, 0.2);
    border-top: 5px solid rgba(255, 255, 255, 0.2);
  }
}
</style>