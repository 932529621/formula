<template>
  <div class="race_standing" >
    <div class="race_standing_header" v-if="isshow">
      <div class="race_standing_header_driver"  @click="$router.push('/home/Standingdriver')">车手</div>
      <div class="race_standing_header_team" @click="$router.push('/home/standingteam')">车队</div>
    </div>
    <div class="race_standing_header_title" v-if="isshow">
      <div class="race_standing_header_title_container">
        <div class="race_standing_header_title_content">
          2022 车手排行榜
        </div>
      </div>
    </div>
    <div class="race_standing_driver" v-if="isshow">
      <div class="race_standing_driver">
        <div class="race_standing_driver_top"></div>
        <img
          class="race_standing_drivernumber"
          :src="standinginfo[1].driver_number_icon"
        >
        <img
          class="race_standing_driver_pic"
          :src="standinginfo[1].driver_half_pic"
        />
        <div
          class="team_border"
          :style="{ background: `${standinginfo[1].team_color}` }"
        ></div>
        <div class="race_standing_driver_bottom">
          <div class="race_standing_driver_bottom_lastname_container">
            <div class="race_standing_driver_bottom_lastname">
              {{ standinginfo[1].first_name }}
            </div>
            <img
              class="race_standing_driver_bottom_nation"
              :src="standinginfo[1].nation_icon"
            />
          </div>
          <div class="race_standing_driver_bottom_firstname">
            {{ standinginfo[1].last_name }}
          </div>
        </div>
      </div>
      <div class="race_standing_driver race_standing_driver_middle">
        <div class="race_standing_driver_top"></div>
         <img
          class="race_standing_drivernumber"
          :src="standinginfo[0].driver_number_icon"
        >
        <img
          class="race_standing_driver_pic race_standing_driver_pic_middle"
          :src="standinginfo[0].driver_half_pic"
        />
        <div
          class="team_border"
          :style="{ background: `${standinginfo[0].team_color}` }"
        ></div>
        <div class="race_standing_driver_bottom">
          <div class="race_standing_driver_bottom_lastname_container">
            <div class="race_standing_driver_bottom_lastname">
              {{ standinginfo[0].first_name }}
            </div>
            <img
              class="race_standing_driver_bottom_nation"
              :src="standinginfo[0].nation_icon"
            />
          </div>
          <div class="race_standing_driver_bottom_firstname">
            {{ standinginfo[0].last_name }}
          </div>
        </div>
      </div>
      <div class="race_standing_driver">
        <div class="race_standing_driver_top"></div>
        <img
          class="race_standing_drivernumber"
          :src="standinginfo[2].driver_number_icon"
        >
        <img
          class="race_standing_driver_pic"
          :src="standinginfo[2].driver_half_pic"
        />
        <div
          class="team_border"
          :style="{ background: `${standinginfo[2].team_color}` }"
        ></div>
        <div class="race_standing_driver_bottom">
          <div class="race_standing_driver_bottom_lastname_container">
            <div class="race_standing_driver_bottom_lastname">
              {{ standinginfo[2].first_name }}
            </div>
            <img
              class="race_standing_driver_bottom_nation"
              :src="standinginfo[2].nation_icon"
            />
          </div>
          <div class="race_standing_driver_bottom_firstname">
            {{ standinginfo[2].last_name }}
          </div>
        </div>
      </div>
    </div>
    <!-- table -->
    <div class="race_standing_table_container" v-if="isshow">
      <div
        class="race_standing_table"
        v-for="(item, index) in standinginfo"
        :key="index"
      >
        <div class="race_standing_table_left">
          <div class="race_standing_rank">
            {{ index+1 }}
          </div>
          <div
            class="race_standing_teamcolor"
            :style="{ background: `${standinginfo[index].team_color}` }"
          ></div>
          <div class="race_standing_firstname">
            {{ standinginfo[index].first_name }}
          </div>
          <div class="race_standing_lastname">
            {{ standinginfo[index].last_name }}
          </div>
          <div class="race_standing_teamname">
            {{ standinginfo[index].team }}
          </div>
        </div>
        <div class="race_standing_table_right">
          <div class="race_standing_points">
            {{ standinginfo[index].points+' PTS' }}
          </div>
          <div class="race_standing_arrow"></div>
        </div>
      </div>
      <v-btn class="race_standing_btn">查看完整榜单</v-btn>
    </div>
  </div>
</template>

<script>
import { getStanding } from "@/plugins/http";
export default {
  data: () => ({
    isshow:false,
    istandingHover: true,
    standinginfo: [],
  }),
 async mounted() {
    // this.$axios
    //   .get("http://127.0.0.1:8080/api/home/getStanding")
    //   .then((res) => {
        const res = await getStanding();
        if (res.status === 200) {
          for (let key in res.data) {
            this.standinginfo.push(res.data[key]);
            const last_name=this.standinginfo[key].name.split(" ")[1];
            const first_name=this.standinginfo[key].name.split(" ")[0];
            this.standinginfo[key].last_name=last_name;
            this.standinginfo[key].first_name=first_name;
            this.isshow=true
            // this.$store.commit("standingDetail/gethomeloadingvalue", 10);进度条删了
          }
        }
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
  },
};
</script>

<style lang="scss" scoped>
.race_standing {
  min-width: 100%;
  height: 1500px;
  background-color: rgb(243, 243, 243);
  display: flex;
  flex-direction: column;
  align-items: center;
  .race_standing_header {
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    .race_standing_header_driver {
      color: #e10600;
      font-family: Medium;
      font-size: larger;
      margin-right: 1%;
      position: relative;
      transition: all 0.5s ease;
      border: 1px solid transparent;
      background-color: rgb(243, 243, 243);
    }

    .race_standing_header_driver::before {
      content: "";
      border-left: 1px solid #d0d0d2;
      height: 30px;
      position: absolute;
      right: -25%;
      top: 50%;
      transform: translate(50%, -50%);
    }
    .race_standing_header_team {
      color: rgba(0, 0, 0, 1);
      font-family: Medium;
      font-size: larger;
      margin-left: 1%;
      transition: all 0.5s ease;
      border: 1px solid transparent;
      background-color: rgb(243, 243, 243);
    }
    .race_standing_header_driver:hover {
      cursor: pointer;
      color: #e10600;

    }
    .race_standing_header_team:hover {
      cursor: pointer;
      color: #e10600;
    }

  }
  .race_standing_header_title {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    .race_standing_header_title_container {
      width: 100%;
      height: 100%;
      position: relative;
    }
    .race_standing_header_title_content {
      color: rgba(255, 255, 255, 1);
      letter-spacing: 2.5px;
      font-size: 2.5rem;
      font-family: Heavy;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 11;
      white-space: nowrap;
    }
  }
  .race_standing_header_title_container::before {
    content: "";
    position: absolute;
    z-index: 10;
    top: 0;
    width: 100%;
    height: 220%;
    background-image: url("https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/standing_bg.jpg");
    background-size: cover;
  }
  .race_standing_driver {
    min-width: 100%;
    height: 25%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 20px;
    .race_standing_driver {
      min-width: 300px;
      height: 280px;
      position: relative;
      margin-bottom: 25px;
    }
    .race_standing_drivernumber {
      width: 90px;
      height: 50px;
      position: absolute;
      z-index: 99;
      top: 10px;
      left: 10px;
    }
    .race_standing_driver_middle {
      min-width: 350px;
      height: 330px;
    }
    .race_standing_driver_pic_middle {
      top: -29px !important;
      left: 80px !important;
    }

    .race_standing_driver_top {
      min-width: 100%;
      height: 57%;
      z-index: 99;
      position: absolute;
      top: 0;
      background-color: rgb(255, 255, 255);
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
    }
    .race_standing_driver_pic {
      position: absolute;
      min-width: 70%;
      height: 70%;
      top: -25px;
      left: 80px;
      z-index: 99;
    }
    .team_border {
      width: 100%;
      height: 3%;
      background-color: rgb(54, 113, 193);
      position: absolute;
      top: 58%;
      z-index: 25;
    }
    .race_standing_driver_bottom {
      min-width: 100%;
      height: 40%;
      background-color: rgb(56, 56, 63);
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
      position: absolute;
      z-index: 20;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .race_standing_driver_bottom_lastname_container {
        width: 90%;
        height: 50%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #67676d;
        padding: 10%;
        .race_standing_driver_bottom_lastname {
          color: rgb(255, 255, 255);
          font-size: 1.5rem;
          font-family: Medium;
          margin-right: 10px;
        }
        .race_standing_driver_bottom_nation {
          width: 22px;
          height: 15px;
          border-radius: 2px;
        }
      }
      .race_standing_driver_bottom_firstname {
        width: auto;
        height: auto;
        color: rgb(255, 255, 255);
        font-size: 2.2rem;
        font-family: Heavy;
        margin-left: 50px;
      }
    }
  }

  .race_standing_table_container {
    width: 65%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    gap: 10px;
    .race_standing_table {
      width: 100%;
      height: 6%;
      background-color: rgb(255, 255, 255);
      border-radius: 10px;
      transition: all 0.7s ease;
      display: flex;
      justify-content: space-between;
      .race_standing_table_left {
        width: 50%;
        height: auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .race_standing_rank {
          color: #15151e;
          font-size: 1.2rem;
          font-family: Heavy;
          margin-left: 30px;
        }
        .race_standing_teamcolor {
          width: 3.55px;
          height: 10px;
          background-color: blue;
          margin-left: 10px;
        }
        .race_standing_firstname {
          color: #15151e;
          font-size: 1rem;
          font-family: Medium;
          margin-left: 10px;
        }
        .race_standing_lastname {
          color: #15151e;
          font-size: 1rem;
          font-family: Heavy;
          margin-left: 10px;
        }
        .race_standing_teamname {
          color: #67676d;
          font-size: 0.8rem;
          font-family: thin;
          margin-left: 10px;
          white-space: nowrap;
        }
      }
      .race_standing_table_right {
        width: 15%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        .race_standing_points {
          width: 80%;
          height: auto;
          color: #15151e;
          font-size: 1rem;
          font-family: Medium;
          background-color: rgba(237, 237, 237, 1);
          border-radius: 10px;
          text-align: center;
          margin-right: 15px;
        }
        .race_standing_arrow {
          margin-right: 10px;
          width: 10.5px;
          height: 10px;
          border-bottom-right-radius: 2.5px;
          border-right: 2px solid #e10600;
          border-bottom: 2px solid #e10600;
          transform: rotate(-45deg);
        }
      }

    }
    .race_standing_table:hover {
      background-color: rgb(56, 56, 63);
    }
    .race_standing_table:hover .race_standing_rank {
      color: rgb(255, 255, 255) !important;
    }
    .race_standing_table:hover .race_standing_firstname {
      color: rgb(255, 255, 255) !important;
    }
    .race_standing_table:hover .race_standing_lastname {
      color: rgb(255, 255, 255) !important;
    }
    .race_standing_table:hover .race_standing_teamname {
      color: rgb(255, 255, 255) !important;
    }
    .race_standing_table:hover .race_standing_arrow {
      border-right: 2px solid rgb(255, 255, 255) !important;
      border-bottom: 2px solid rgb(255, 255, 255) !important;
    }
    .race_standing_btn{
      margin-top:50px;
      margin-left: 50%;
      transform: translateX(-50%);
      width: 240px;
      height: 50px;
      background-color: #e10600 !important;
      color: rgb(255, 255, 255);
      font-family: Medium;
      font-size: 1rem;
    }
  }
}
</style>