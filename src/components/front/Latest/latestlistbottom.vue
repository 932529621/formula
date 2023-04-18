<template>
  <!-- flex，grid自适应都应该满足父元素height：auto，子元素设定min,max，flex应为父元素设flex-flow：wrap，而grid需要temple-grid-columns:repeat(auto-fill) 精确的宽度值。
          如果必须设定准确的父元素height值，那只能设个overf：scroll了（2022-9-12）
    -->
  <div class="morevideos">
    <div class="morevideos_container">
      <div class="morevideos_title_container">
        <div class="morevideos_title">More News</div>
        <div class="morevideos_category">
          <div class="morevideos_filter" @click="hideOrSeek()">
            <div class="morevideos_filter_content">filter</div>
            <div class="morevideos_filter_arrow" ref="filter_arrow"></div>
          </div>
          <li
            class="morevideos_category_items"
            :class="{
              hideOrSeek: ishide,
              category_active: CateActiveIndex === index,
            }"
            v-for="(item, index) in catelist"
            :key="index"
            @click="cateActive(index)"
          >
            {{ catelist[index] }}
          </li>
        </div>
      </div>
      <div class="morevideos_video_container" ref="videocontainer">
        <div
          class="morenews_news_container"
          v-for="(item, index) in videolist"
          :key="index"
          ref="newscontainer"
          @click="$router.push({
          name:'Latestdetail',
          path:`/latest/latestdetail`,
          query:{
            news_id:videolist[index].news_id,
          }
        });"
        >
          <div class="morenews_news_top">
            <img
              class="morenews_news_pic"
              :src="videolist[index].news_pic"
            />
          </div>
          <div class="morenews_news_bottom">
            <div class="morenews_news_title">{{videolist[index].news_title}}</div>
            <div class="morenews_news_content">
              {{ videolist[index].news_introdution }}
            </div>
          </div>
        </div>
      </div>
      <div class="morevideos_loadmore">
        <div class="morevideos_loadmore_content" @click="loadMore()">
          Load More Videos
        </div>
        <div class="morevideos_filter_arrow"></div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { getlatestAll } from "@/plugins/http";
export default {
  data: () => ({
    ishide: true,
    CateActiveIndex: 0,
    catelist: ["Lastest", "Technical", "Driver Market", "Analysis"],
    videolist: [],
    newslength: 24,
  }),
  methods: {
    hideOrSeek() {
      this.ishide = !this.ishide;
      if (this.ishide) {
        this.$refs.filter_arrow.style.transform = "rotate(130deg)";
      } else {
        this.$refs.filter_arrow.style.transform = "rotate(-45deg)";
      }
    },
    cateActive(index) {
      this.CateActiveIndex = index;
    },
    async initNews() {
      this.videolist = [];
      const res = await getlatestAll();
      res.data.newsItem.some((item, index) => {
        if (index < this.newslength) {
          this.videolist.push(item);
          return false;
        }
      });
    },
   async loadMore() {
      this.newslength = this.newslength + 8;
     await this.initNews();
      let videoNum = this.newslength;
      this.$refs.videocontainer.style.height = `${85 * videoNum}` + "px";
      // this.$nextTick(() => {
      //   let videositem = this.$refs.videocontainer.children;
      //   let videolen=this.$refs.videocontainer.children.length
      //   for(let i=0;i<=7;i++){
      //     this.$refs.videocontainer.children[videolen - i].style.height ="0" + "px";

      //   }
      // });
      this.$nextTick(() => {
        var videoitems = this.$refs.videocontainer.children.length;
        for (let i = 0; i <= 7; i++) {
          this.$refs.videocontainer.children[videoitems - 1 - i].style.opacity =
            "0";
        }
        setTimeout(() => {
          for (let i = 0; i <= 7; i++) {
            this.$refs.videocontainer.children[
              videoitems - 1 - i
            ].style.opacity = "1";
          }
        }, 1000);
      });
    },
  },
  mounted() {
    this.initNews();
  },
};
</script>
  
  <style lang="scss" scoped>
.morevideos {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  margin-top: 5%;
  .morevideos_container {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-top: 10px solid rgb(0, 0, 0);
    border-right: 10px solid rgb(0, 0, 0);
    border-top-right-radius: 15px;
    .morevideos_title_container {
      width: 100%;
      height: 7%;
      max-height: 150px;

      .morevideos_title {
        width: 100%;
        height: 50%;
        font-size: 3.5rem;
        font-family: Heavy;
        color: rgb(0, 0, 0);
        border-bottom: 1px solid darkred;
      }
      .morevideos_category {
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .morevideos_category_items {
          user-select: none;
          width: 15%;
          height: 70%;
          text-align: center;
          font-size: 1rem;
          font-family: Medium;
          border-right: 1px solid rgb(208, 208, 210);
          border-bottom: 1px solid rgb(208, 208, 210);
          border-bottom-right-radius: 10px;
          margin-left: 5px;
          transition: all 0.7s ease;
          line-height: 3;
        }
        .hideOrSeek {
          width: 0;
          opacity: 0;
          user-select: none;
        }
        .category_active {
          border-right: 1px solid #e10600;
          border-bottom: 1px solid #e10600;
        }
        .morevideos_category_items:hover {
          cursor: pointer;
          box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
          border-right: 1px solid #e10600;
          border-bottom: 1px solid #e10600;
        }
        .morevideos_filter {
          width: 10%;
          height: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          .morevideos_filter_content {
            font-size: 1rem;
            font-family: Medium;
            color: rgb(0, 0, 0);
            transition: all 0.7s ease;
          }
          .morevideos_filter_arrow {
            margin-left: 10px;
            width: 10.5px;
            height: 10px;
            border-bottom-right-radius: 2.5px;
            border-right: 2px solid #e10600;
            border-bottom: 2px solid #e10600;
            transform: rotate(130deg);
            transition: all 0.7s ease;
          }
        }
        .morevideos_filter:hover .morevideos_filter_content {
          color: #e10600;
          cursor: pointer;
        }
      }
    }
    .morevideos_video_container {
      width: 100%;
      height: 2150px;
      display: grid;
      column-gap: 5px;
      row-gap: 10px;
      grid-template-columns: repeat(auto-fill, 330px);
      grid-template-rows: repeat(auto-fill, 330px);
      align-items: center;
      justify-items: center;
      background-color: rgb(247, 246, 246);
      transition: all 1.5s ease;
      overflow: scroll;
      .morenews_news_container {
        width: 95%;
        height: 90%;
        min-width: 313px;
        min-height: 297px;
        display: flex;
        flex-direction: column;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        transition: all 2s ease;
        background-color: rgb(255, 255, 255);
        margin-left: 50px;
        .morenews_news_top {
          width: 100%;
          height: 60%;
          position: relative;
          .morenews_news_pic {
            width: 100%;
            height: 100%;
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
            transition: all 0.5s ease;
          }
        }
      }

      .morenews_news_container:hover {
        background-color: rgb(21, 21, 30);
        cursor:pointer;
      }
      .morenews_news_container:hover .morenews_news_content {
        color: rgb(255, 255, 255);
      }
      .morenews_news_container:hover .morenews_news_bottom {
        transform: translateY(20%);
      }
      .morenews_news_container:hover .morenews_news_pic {
        transform: scale(1.2);
        z-index: 99;
      }
    }
    .morevideos_loadmore {
      width: auto;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .morevideos_loadmore_content {
        color: rgb(0, 0, 0);
        font-size: 1.2rem;
        font-family: Medium;
        border-left: 1px solid rgb(0, 0, 0);
        border-bottom: 1px solid rgb(0, 0, 0);
        border-bottom-left-radius: 10px;
        padding: 5px;
        transition: all 0.7s ease;
      }
      .morevideos_filter_arrow {
        margin-left: 10px;
        width: 10.5px;
        height: 10px;
        border-bottom-right-radius: 2.5px;
        border-right: 2px solid #e10600;
        border-bottom: 2px solid #e10600;
        transform: rotate(45deg);
      }
    }
    .morevideos_loadmore_content:hover {
      cursor: pointer;
      color: #e10600;
      box-shadow: rgba(247, 84, 84, 0.25) 0px 25px 50px -12px;
      border-left: 1px solid #e10600;
      border-bottom: 1px solid #e10600;
    }
  }
}

.morevideos_video_container::-webkit-scrollbar {
  display: none !important;
}
</style>