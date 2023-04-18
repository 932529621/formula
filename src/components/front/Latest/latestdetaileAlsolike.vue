<!-- <template> 懒得再加 3-30
    <div class="morenews">
      <div class="morenews_container">
        <div class="morenews_title">
          <div class="morenews_title_content">You Maybe Also Like</div>
          <div class="morenews_arrow"></div>
        </div>
  
        <div class="morenews_news">
          <div
            class="morenews_news_container"
            v-for="(item, index) in newsinfo"
            :key="index"
          >
            <div class="morenews_news_top">
              <img
                class="morenews_news_pic"
                src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/news_pic/more_news/image31.jpg"
              />
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
  };
  </script>
  
  <style lang="scss" scoped>
  .morenews {
    width: 100%;
    height: auto;
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
          font-size: 2.5rem;
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
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .morenews_news_container {
          width: 24%;
          height: 90%;
          display: flex;
          flex-direction: column;
          min-width: 325px;
          min-height: 325px;
          max-width: 325px;
          max-height: 325px;
          border-bottom-left-radius: 15px;
          border-bottom-right-radius: 15px;
          transition: all 0.5s ease;
          background-color: rgb(255, 255, 255);
          margin-bottom: 20px;
          .morenews_news_top {
            width: 100%;
            height: 60%;
            .morenews_news_pic {
              width: 100%;
              height: 100%;
              transition: all 0.5s ease;
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
        }
      }
    }
  }
  </style> -->