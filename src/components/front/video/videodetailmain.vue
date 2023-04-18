<template>
  <div class="videodetail">
    <div class="videodetail_video_container">
      <video
        class="videodetail_video"
        controls
        :src="videoinfo.video_path"
      ></video>
    </div>
    <div class="videodetail_context_container">
      <div class="videodetail_time">{{ videoinfo.created_time.split('T')[0] }}</div>
      <div class="videodetail_title">
        {{ videoinfo.video_title }}
      </div>
      <div class="videodetail_intro">
        {{ videoinfo.video_introdution }}
      </div>
      <div class="videoshare_container">
        <button class="share_box">
          <svg
            height="20"
            width="20"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
            fill="black"
          >
            <path
              d="m7.94.01c-.81-.07-1.36.51-1.43 1.29s.36 1.46 1.17 1.53 5.97.83 7.17 6.17c.05-.26.09-.52.11-.78.39-4.16-2.75-7.84-7.02-8.21zm-2.77 7.95c-.2.53-.23 1.04-.07 1.13.11.06.28-.08.44-.35.06.3.22.56.45.78-.24.09-.39.25-.39.44 0 .3.42.54.93.54.46 0 .85-.2.92-.46h.11c.07.26.45.46.92.46.51 0 .93-.24.93-.54 0-.18-.15-.34-.39-.44.22-.22.38-.49.44-.78.16.27.33.41.44.35.16-.09.13-.6-.07-1.13-.16-.41-.37-.72-.53-.78 0-.03 0-.05 0-.08 0-.16-.04-.31-.11-.43 0-.01 0-.02 0-.03 0-.07-.02-.14-.04-.2-.03-1.08-.65-1.94-1.65-1.94s-1.62.86-1.66 1.94c-.03.06-.04.12-.04.2v.03c-.07.12-.11.27-.11.43v.08c-.15.06-.36.37-.52.78zm8.53 3.54c.45-.67.19-1.44-.46-1.88s-1.45-.37-1.9.3-3.58 4.85-8.84 3.36c.2.17.41.32.63.47 3.47 2.32 8.21 1.31 10.57-2.25zm-12.98-.55c.34.74 1.12.93 1.84.61.71-.32 1.09-1.04.75-1.77-.34-.74-2.23-5.61 1.82-9.29-.25.08-.49.18-.74.29-3.81 1.71-5.45 6.27-3.67 10.16z"
            ></path>
          </svg>
        </button>
        <button class="share_box">
          <svg
            height="20"
            width="20"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
            fill="black"
          >
            <path
              d="m11.07 7.59c-.25-.09-.33-.09-.25-.44.25-.62.25-1.24 0-1.59-.49-.71-1.8-.71-3.28 0 0 0-.49.27-.33-.18.25-.8.16-1.51-.16-1.86-.82-.89-2.95 0-4.84 2.04-1.39 1.5-2.21 3.09-2.21 4.51 0 2.66 3.11 4.43 6.15 4.43 4.02 0 6.64-2.75 6.64-4.7.08-1.24-.9-1.95-1.72-2.21zm-4.84 5.67c-2.46.27-4.51-.97-4.67-2.66-.17-1.77 1.64-3.37 4.1-3.63 2.46-.27 4.51.89 4.67 2.66s-1.64 3.36-4.1 3.63zm8.77-7.89c0-2.66-2.05-4.87-4.51-4.87-.33 0-.49.27-.49.53 0 .35.25.53.49.53 1.89 0 3.44 1.68 3.44 3.72 0 .35.25.53.49.53.42.18.58-.08.58-.44zm-2.05-.09c-.25-1.24-1.15-2.3-2.38-2.57-.24-.08-.57.18-.65.45s.16.62.41.71c.74.18 1.39.8 1.56 1.68.08.27.33.53.66.44.24-.08.48-.35.4-.71zm-7.95 3.46c-.98.18-1.64 1.06-1.48 1.95s1.07 1.42 2.05 1.24 1.64-1.06 1.48-1.95c-.16-.97-1.07-1.51-2.05-1.24z"
            ></path>
          </svg>
        </button>
        <button class="share_box">
          <svg
            height="20"
            width="20"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
            fill="black"
          >
            <path
              d="m15 1.25v1.25h-15v-1.25zm-4.38 11.25h4.38v1.25h-15v-1.25h4.37l-1.24-3.75h-.63-1.25v-1.25-2.5-1.25h1.25 10 1.25v5h-1.25-.63zm1.88-5v-2.5h-10v2.5zm-1.88 1.25h-6.24l1.25 3.75h3.75z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { mapState } from "vuex";
export default {
  data: () => ({
    hasinfo: false,
    videoinfo:{}
  }),
  computed: {
    ...mapState("videos", ["video"]),
  },
  mounted(){
    console.log(this.video);
    this.videoinfo=this.video[0];
  }
};
</script>
  
  <style lang="scss" scoped>
.videodetail {
  width: 100%;
  height: 1100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #15151e;
  .videodetail_video_container {
    width: 100%;
    height: 100%;
    background-image: url("https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/video-white-back.png");
    background-repeat: repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    .videodetail_video {
      object-fit: cover;
      width: 80vw;
      height: 90vh;
    }
  }
  .videodetail_context_container {
    display: flex;
    flex-direction: column;
    height: 500px;
    width: 85%;
    row-gap: 20px;
    padding: 20px;
    .videodetail_time {
      color: #949498;
      font-size: 1rem;
      font-family: Medium;
    }
    .videodetail_title {
      color: white;
      font-size: 2.5rem;
      font-family: Heavy;
    }
    .videodetail_intro {
      color: rgb(255, 255, 255);
      font-size: 1.2rem;
      font-family: Heavy;
    }
  }
  .videoshare_container {
    width: 150px;
    display: flex;
    justify-content: space-between;
    align-self: flex-end;
    button {
      width: 40px;
      height: 40px;
      background-color: rgb(255, 255, 255);
      border-radius: 10px;
      transition: all 0.7s ease;
    }
    button:hover {
      background-color: rgb(0, 0, 0);
      svg {
        fill: rgb(255, 255, 255);
      }
    }
  }
}
</style>