<template>
  <div class="vrcar">
    <div class="vrcar_container">
      <div class="vrcar_outter">
        <img
          ref="vrcaroutter"
          v-for="(item, index) in carImgsrc"
          :style="{ display: Slidervalue === index ? 'block' : 'none' }"
          :key="index"
          :src="carImgsrc[index].vrCarSrc"
          @load="Carload()"
        />
        <img
          ref="indexImg"
          src="http://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/360Car/redbull/redbull-10.png"
          alt=""
        />
        <input
          type="range"
          min="0"
          max="42"
          step="1"
          v-model="Slidervalue"
          ref="slider"
        />
        <div class="vrcar_mask" ref="mask" @click="loadImg()"></div>
        <svg
          t="1665481157957"
          class="icon"
          viewBox="0 0 1069 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2029"
          width="128"
          height="128"
          ref="svgs"
        >
          <path
            d="M537.6 700.235294c-209.317647 0-380.988235-87.341176-380.988235-195.764706 0-30.117647 13.552941-61.741176 40.658823-88.847059 64.752941-64.752941 198.776471-106.917647 340.329412-106.917647 143.058824 0 277.082353 42.164706 340.329412 106.917647 27.105882 27.105882 40.658824 57.223529 40.658823 88.847059-1.505882 108.423529-171.670588 195.764706-380.988235 195.764706z m0-361.411765c-135.529412 0-260.517647 39.152941-319.247059 97.882353-21.082353 21.082353-31.623529 43.670588-31.623529 66.258824 1.505882 90.352941 161.129412 165.647059 350.870588 165.647059S888.470588 591.811765 888.470588 502.964706c0-22.588235-10.541176-45.176471-31.623529-66.258824-58.729412-58.729412-185.223529-97.882353-319.247059-97.882353z"
            fill="#000000"
            p-id="2030"
          ></path>
          <path
            d="M534.588235 896C406.588235 896 299.670588 719.811765 299.670588 512S406.588235 128 534.588235 128 768 304.188235 768 512s-106.917647 384-233.411765 384z m0-737.882353C426.164706 158.117647 331.294118 323.764706 331.294118 512s94.870588 353.882353 203.294117 353.882353S737.882353 700.235294 737.882353 512s-94.870588-353.882353-203.294118-353.882353z"
            fill="#000000"
            p-id="2031"
          ></path>
          <path
            d="M534.588235 67.764706C289.129412 67.764706 90.352941 266.541176 90.352941 512s198.776471 444.235294 444.235294 444.235294S978.823529 757.458824 978.823529 512 780.047059 67.764706 534.588235 67.764706z m0 813.17647C331.294118 880.941176 165.647059 715.294118 165.647059 512S331.294118 143.058824 534.588235 143.058824 903.529412 308.705882 903.529412 512 737.882353 880.941176 534.588235 880.941176z"
            fill="#ffffff"
            p-id="2032"
          ></path>
          <path
            d="M534.588235 971.294118C281.6 971.294118 75.294118 764.988235 75.294118 512S281.6 52.705882 534.588235 52.705882 993.882353 259.011765 993.882353 512 787.576471 971.294118 534.588235 971.294118z m0-888.470589C298.164706 82.823529 105.411765 275.576471 105.411765 512s192.752941 429.176471 429.17647 429.176471S963.764706 748.423529 963.764706 512 771.011765 82.823529 534.588235 82.823529z m0 813.176471C322.258824 896 150.588235 724.329412 150.588235 512S322.258824 128 534.588235 128 918.588235 299.670588 918.588235 512 746.917647 896 534.588235 896z m0-737.882353C338.823529 158.117647 180.705882 316.235294 180.705882 512s158.117647 353.882353 353.882353 353.882353S888.470588 707.764706 888.470588 512 730.352941 158.117647 534.588235 158.117647z"
            fill="#000000"
            p-id="2033"
          ></path>
          <path
            d="M542.117647 609.882353h-30.117647c-16.564706 0-30.117647-13.552941-30.117647-30.117647v-135.529412c0-16.564706 13.552941-30.117647 30.117647-30.117647h30.117647c16.564706 0 30.117647 13.552941 30.117647 30.117647v15.058824h-30.117647v-15.058824h-30.117647v48.188235c6.023529-1.505882 12.047059-3.011765 18.070588-3.011764h12.047059c16.564706 0 30.117647 13.552941 30.117647 30.117647v60.235294c0 16.564706-13.552941 30.117647-30.117647 30.117647z m-30.117647-84.329412v54.211765h30.117647v-60.235294h-12.047059c-6.023529 0-12.047059 3.011765-18.070588 6.023529zM647.529412 609.882353h-15.058824c-25.6 0-45.176471-19.576471-45.17647-45.176471v-105.411764c0-25.6 19.576471-45.176471 45.17647-45.176471h15.058824c25.6 0 45.176471 19.576471 45.17647 45.176471v105.411764c0 25.6-19.576471 45.176471-45.17647 45.176471z m-15.058824-165.647059c-9.035294 0-15.058824 6.023529-15.058823 15.058824v105.411764c0 9.035294 6.023529 15.058824 15.058823 15.058824h15.058824c9.035294 0 15.058824-6.023529 15.058823-15.058824v-105.411764c0-9.035294-6.023529-15.058824-15.058823-15.058824h-15.058824zM406.588235 489.411765h45.176471v30.117647h-45.176471z"
            fill="#000000"
            p-id="2034"
          ></path>
          <path
            d="M436.705882 609.882353h-30.117647c-16.564706 0-30.117647-13.552941-30.117647-30.117647v-15.058824h30.117647v15.058824h30.117647v-135.529412h-30.117647v15.058824h-30.117647v-15.058824c0-16.564706 13.552941-30.117647 30.117647-30.117647h30.117647c16.564706 0 30.117647 13.552941 30.117647 30.117647v135.529412c0 16.564706-13.552941 30.117647-30.117647 30.117647z"
            fill="#000000"
            p-id="2035"
          ></path>
        </svg>
        <v-progress-circular
          :rotate="360"
          :size="100"
          :width="15"
          :value="loadingPercent"
          color="teal"
          ref="circular"
          class="circular"
          v-if="loadingPercent===100 || loadingPercent===0 ? false : true"
        >
        <span style="font-size:large;font-family:Heavy">{{ loadingPercent }}%</span>  
        </v-progress-circular>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    carImgsrc: [],
    sliderMin: 0,
    canvasWidth: null,
    canvasHeight: null,
    Slidervalue: 0,
    loadingValue: 0,
    loadingPercent:0,
  }),
  methods: {
    loadImg() {
      console.log(this.$route.query.teamName);
      this.$axios
        .get(
          
          `http://127.0.0.1:8080/api/teamdetail/getteamvrcar?teamname=${this.$route.query.teamName}`
        )
        .then((res) => {
          console.log(res);
          
          if (res.status === 200) {
            this.$refs.indexImg.style.display = "none";
            this.$refs.svgs.style.display = "none";
            this.carImgsrc = [];
            for (let key in res.data) {
              this.carImgsrc.push(res.data[key]);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    Carload() {
      this.loadingValue = this.loadingValue + 1;
      this.loadingPercent=Math.round((this.loadingValue/this.carImgsrc.length)*1000)/10;
      console.log(this.loadingPercent);
      console.log(this.loadingValue);
      console.log(this.carImgsrc.length);
      if (this.loadingValue >= this.carImgsrc.length) {
        this.loadComplete();
      }
    },
    loadComplete() {
      this.$refs.mask.style.width = "0";
      const timer = setInterval(() => {
        this.Slidervalue = this.Slidervalue + 1;
        if (this.Slidervalue > 42) {
          this.Slidervalue = 10;
          this.$refs.slider.min = 10;
          clearInterval(timer);
        }
      }, 100);
    },
  },

  mounted() {
    // for (let i = 0; i < 43; i++) {
    //   const number = i.toString().padStart(2, "00");
    //   const url = `https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/360Car/alfa/alfa-${number}.png`;
    //   this.carImgsrc[i] = {
    //     url:url,
    //   };
    // }
    // this.loadImg();
  },
  watch: {
    Slidervalue: {
      handler(newValue, oldValue) {
        this.$refs.vrcaroutter[oldValue].style.display = "none";
        this.$refs.vrcaroutter[newValue].style.display = "block";
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.vrcar {
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  min-height: 100vh;
  .vrcar_container {
    height: 100%;
    width: 93%;
    min-height: 25vh;

    .vrcar_outter {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }

      input {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 11;
      }
    }
  }
}
.vrcar_mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 12;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.1);
  transition: all 0.7s ease;
}
svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 12;
  pointer-events: none;
}
.circular{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 12;
}

.vrcar_mask:hover {
  // backdrop-filter: blur(0);
  // background-color: transparent;
  cursor: pointer;
  svg {
    transform: translate(500%, 250%) scale(1.1);
  }
}
</style>