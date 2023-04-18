<template>
  <div class="race_partners" v-if="isshow">
    <div class="race_partners_container">
      <div class="race_partners_title_container">
        <img
          class="race_partners_logo"
          src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/logo.svg"
        />
        <div class="race_partners_title">Our Partners</div>
      </div>
      <div class="race_partners_gradeOne">
        <img
          class="race_partners_logos"
          v-for="(item, index) in partnersgradeone"
          :key="index"
          :src="partnersgradeone[index].partner_icon"
        />
      </div>
      <div class="race_partners_gradeTwo">
        <img
          class="race_partners_logos"
          v-for="(item, index) in partnersgradetwo"
          :key="index"
          :src="partnersgradetwo[index].partner_icon"
        />
      </div>
      <div class="race_partners_gradeThree">
        <img
          class="race_partners_logos"
          v-for="(item, index) in partnersgradethree"
          :key="index"
          :src="partnersgradethree[index].partner_icon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getpartnersinfo } from "@/plugins/http";
export default {
  data: () => ({
    partnersgradeone: [],
    partnersgradetwo: [],
    partnersgradethree: [],
    isshow: false,
  }),
 async mounted() {
    // this.$axios
    //   .get("http://127.0.0.1:8080/api/home/getpartnersinfo")
    //   .then((res) => {
      const res = await getpartnersinfo();
        if (res.status === 200) {
          // this.$store.commit("standingDetail/gethomeloadingvalue", 10);
          for (let key in res.data) {
            if (res.data[key].partner_grade === 1) {
              this.partnersgradeone.push(res.data[key]);
            } else if (res.data[key].partner_grade === 2) {
              this.partnersgradetwo.push(res.data[key]);
            } else {
              this.partnersgradethree.push(res.data[key]);
            }
          }
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
.race_partners {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  background-color: rgba(21, 21, 30, 1);
  .race_partners_container {
    width: 95%;
    height: 100%;
    .race_partners_title_container {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .race_partners_logo {
        width: 5%;
        height: 95%;
        min-width: 5%;
        min-height: 95%;
      }
      .race_partners_title {
        width: 15%;
        height: auto;
        color: rgba(255, 255, 255, 1);
        font-family: Heavy;
        font-size: 1.5rem;
        text-align: center;
        user-select: none;
        white-space: nowrap;
      }
    }
    .race_partners_gradeOne {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      border-bottom: 1px solid rgba(56, 56, 63, 1);
      flex-wrap: wrap;
      padding: 25px;
      .race_partners_logos {
        width: 10%;
        height: 80%;
        min-width: 98px;
        min-height: 68px;
      }
    }
    .race_partners_gradeTwo {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      border-bottom: 1px solid rgba(56, 56, 63, 1);
      flex-wrap: wrap;
      padding: 25px;
      .race_partners_logos {
        width: 10%;
        height: 80%;
        min-width: 98px;
        min-height: 68px;
      }
    }
    .race_partners_gradeThree {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      border-bottom: 1px solid rgba(56, 56, 63, 1);
      flex-wrap: wrap;
      padding: 25px;
      .race_partners_logos {
        width: 10%;
        height: 80%;
        min-width: 98px;
        min-height: 68px;
      }
    }
  }
}
</style>