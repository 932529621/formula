<template>
  <div class="aboutNews">
    <div class="aboutNews_container">
      <div
        class="aboutNews_column"
        v-for="(item, index) of newsinfo"
        :key="index"
        @click="
          $router.push({
            name: 'Latestdetail',
            path: `/latest/latestdetail`,
            query: {
              news_id: item.news_id,
            },
          })
        "
      >
        <div class="aboutNews_columnTop">
          <img :src="item.news_pic" />
        </div>
        <div class="aboutNews_columnBottom">
          <div class="aboutNews_column_time">
            <svg
              t="1664245338902"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1936"
              width="32"
              height="32"
            >
              <path
                d="M497.11104 842.46528c180.67456 0 327.68-147.00544 327.68-327.68s-147.00544-327.68-327.68-327.68-327.68 147.00544-327.68 327.68S316.43648 842.46528 497.11104 842.46528zM497.11104 228.06528c158.1056 0 286.72 128.6144 286.72 286.72s-128.6144 286.72-286.72 286.72-286.72-128.6144-286.72-286.72S339.02592 228.06528 497.11104 228.06528z"
                p-id="1937"
                fill="#bfbfbf"
              ></path>
              <path
                d="M608.8704 655.50336c3.9936 3.9936 9.23648 6.00064 14.47936 6.00064s10.48576-2.00704 14.47936-6.00064c8.00768-8.00768 8.00768-20.95104 0-28.95872l-120.23808-120.23808L517.59104 285.20448c0-11.30496-9.15456-20.48-20.48-20.48s-20.48 9.17504-20.48 20.48l0 229.5808c0 5.4272 2.1504 10.6496 6.00064 14.47936L608.8704 655.50336z"
                p-id="1938"
                fill="#bfbfbf"
              ></path>
            </svg>
            <span>{{ item.createdate }}</span>
          </div>
          <div class="aboutNews_column_content">
            {{ item.news_introdution }}
          </div>
          <div class="aboutNews_column_category">{{ item.news_title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getdrivernews } from "@/plugins/http";
export default {
  data: () => ({
    newsinfo: [],
  }),
  async mounted() {
    const res = await getdrivernews({
      driverlastName: this.$route.query.driverlastName,
    });
    this.newsinfo = res.data.drivernewinfo;
    console.log(res);
  },
};
</script>

<style lang="scss" scoped>
.aboutNews {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  background-color: #f7f4f1;

  .aboutNews_container {
    width: 93%;
    height: 98%;
    display: flex;
    justify-content: space-evenly;
    column-gap: 5px;
    flex-wrap: wrap;
    .aboutNews_column {
      width: 24%;
      height: 100%;
      background-color: rgb(255, 255, 255);
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      .aboutNews_columnTop {
        width: 100%;
        height: 50%;
        transition: all 0.5s ease;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.5s ease;
        }
      }
      .aboutNews_columnBottom {
        width: 100%;
        height: 50%;
        padding: 10px 25px;
        background-color: rgb(255, 255, 255);
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        transition: all 0.5s ease;
        .aboutNews_column_time {
          color: #949498;
          font-size: 0.9rem;
          font-family: Heavy;
          margin: 0 0 5px -5px;
          svg,
          span {
            vertical-align: middle;
          }
        }
        .aboutNews_column_content {
          color: #000000;
          font-size: 1.1rem;
          font-family: Medium;
          margin-bottom: 20px;
          transition: all 0.5s ease;
        }
        .aboutNews_column_category {
          color: rgb(255, 255, 255);
          font-size: 1.2rem;
          font-family: Heavy;
          transition: all 0.5s ease;
        }
      }
    }
    .aboutNews_column:hover {
      cursor: pointer;
      .aboutNews_columnBottom {
        background-color: rgb(23, 23, 23);
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        height: 55%;
      }
      .aboutNews_column_content {
        color: rgb(255, 255, 255);
      }
      .aboutNews_column_category {
        color: #ff0000;
      }
      .aboutNews_columnTop {
        height: 45%;
        img {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>