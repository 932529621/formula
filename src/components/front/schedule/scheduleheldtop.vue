<template>
  <div class="scheduledetailtop">
    <div class="scheduledetailtop_container">
      <div class="scheduledetailtop_left_container">
        <div class="scheduledetailtop_title">
          Ferrari make the perfect start to 2022 with a Leclerc-Sainz 1-2
        </div>
        <div class="scheduledetailtop_table">
          <div>
            <span class="scheduledetailtop_table_pos pos_first">1</span>
            <span class="scheduledetailtop_table_lastname">Charles </span>
            <span class="scheduledetailtop_table_firstname">LECLERC</span>
            <span class="scheduledetailtop_table_record">1:37:33.584</span>
          </div>
          <div>
            <span class="scheduledetailtop_table_pos pos_second">2</span>
            <span class="scheduledetailtop_table_lastname">Carlos </span>
            <span class="scheduledetailtop_table_firstname">SAINZ</span>
            <span class="scheduledetailtop_table_record">+5.598</span>
          </div>
          <div>
            <span class="scheduledetailtop_table_pos pos_third">3</span>
            <span class="scheduledetailtop_table_lastname">Lewis </span>
            <span class="scheduledetailtop_table_firstname">HAMILTON</span>
            <span class="scheduledetailtop_table_record">+5.598</span>
          </div>
        </div>
        <v-btn class="scheduledetailtop_btn" color="error"> RESULTS </v-btn>
      </div>
      <div class="scheduledetailtop_right_container">
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
  </div>
</template>
<script>
export default {
  data: () => ({
    newsinfo: ["q", "w"],
  }),
};
</script>
<style lang="scss" scoped>
.scheduledetailtop {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(247, 244, 241);
  .scheduledetailtop_container {
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 10px solid rgb(255, 0, 0);
    border-right: 10px solid rgb(255, 0, 0);
    border-top-right-radius: 15px;
    .scheduledetailtop_left_container {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      row-gap: 30px;
      .scheduledetailtop_title {
        color: rgb(0, 0, 0);
        font-size: 2.5rem;
        font-family: Heavy;
      }

      .scheduledetailtop_table {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        row-gap: 5px;
        width: 100%;
        div {
          background-color: rgb(255, 255, 255);
          width: 90%;
          height: 50px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          align-self: flex-start;
          justify-content: flex-start;
          transition: all 0.7s ease;
          padding: 5px;
        }
        .scheduledetailtop_table_pos {
          color: rgb(0, 0, 0);
          font-size: 1.5rem;
          font-family: Heavy;
          width: 5%;
          border-radius: 20%;
          text-align: center;
          margin: 0 20px 0 0;
        }
        .pos_first {
          background-color: rgb(254, 213, 48);
        }
        .pos_second {
          background-color: rgb(232, 232, 232);
        }
        .pos_third {
          background-color: rgb(202, 149, 97);
        }
        .scheduledetailtop_table_lastname {
          color: rgb(0, 0, 0);
          font-size: 1.2rem;
          font-family: Medium;
          width: auto;
          margin-right: 10px;
        }
        .scheduledetailtop_table_firstname {
          color: rgb(0, 0, 0);
          font-size: 1.5rem;
          font-family: Heavy;
          width: 80%;
        }
        .scheduledetailtop_table_record {
          color: rgb(0, 0, 0);
          font-size: 1rem;
          font-family: Medium;
          background-color: rgb(237, 237, 237);
          border-radius: 10px;
          width: 80px;
          height: 25px;
          text-align: center;
        }
        div:hover {
          background-color: #15151e;
          span {
            color: rgb(255, 255, 255);
          }
          .scheduledetailtop_table_record {
            color: rgb(0, 0, 0);
          }
        }
      }
      .scheduledetailtop_btn {
        align-self: flex-start;
      }
    }
    .scheduledetailtop_right_container {
      width: 50%;
      height: 100%;
      .morenews_news {
        width: auto;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: space-around;
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
          margin-bottom: 26px;
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
}
</style>