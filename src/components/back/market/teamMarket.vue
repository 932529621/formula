<template>
  <div class="teamMarket">
    <div class="search">
      <v-text-field
        solo
        label="搜索车队信息"
        prepend-inner-icon="mdi-magnify"
        v-model="Teamsearch"
      ></v-text-field>
    </div>
    <div class="item">
      <v-card class="v-cards pa-5" elevation="10">
        <v-list three-line>
          <template v-for="(item, index) in items">
            <v-divider
              v-if="item.divider"
              :key="Math.random() + index"
              :inset="item.inset"
            ></v-divider>

            <v-list-item v-else :key="item.team_id" link>
              <v-list-item-avatar>
                <v-img :src="item.team_icon"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item.full_teamname }}</v-list-item-title>
                <v-list-item-subtitle style="font-size: 0.5rem">
                  {{ item.base }}
                </v-list-item-subtitle>
                <v-list-item-subtitle style="font-size: 0.5rem">
                  {{ item.email }}
                </v-list-item-subtitle>
                <!-- <v-list-item-subtitle v-html="item.team_biography">
                </v-list-item-subtitle> -->
              </v-list-item-content>
              <v-btn
                text
                @click="
                  $router.push({
                    name: 'Teamdetail',
                    path: `/team/teamdetail`,
                    query: {
                      teamId: items[index].team_id,
                      teamName: items[index].full_teamname,
                    },
                  })
                "
                >查看详细</v-btn
              >
              <v-btn
                text
                :disabled="item.apply_status"
                :loding="saveloading"
                @click="enterTeam(index)"
                >{{ item.apply_status ? "正在审核" : "申请入队" }}</v-btn
              >
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </div>
    <v-snackbar
      :timeout="2500"
      :value="isSnackbar"
      fixed
      bottom
      tile
      :color="isSnackbarSuccess ? 'success' : 'red'"
      ref="snackbar"
    >
      {{ snackbarTitle }}
    </v-snackbar>
  </div>
</template>

<script>
import {
  getTeamdetail,
  getDriverReviewByemail,
  DriverEnterapply,
  getDriverTrainByemail,
} from "@/plugins/http";
import { mapState } from "vuex";
export default {
  data: () => ({
    items: [],
    items2: [],
    reviewInfo: [],
    Teamsearch: "",

    isSnackbar: false,
    isSnackbarSuccess: null,
    snackbarTitle: "",
    saveloading: false,
  }),
  computed: {
    ...mapState("Backuser", ["BackuserInfos"]),
  },
  watch: {
    Teamsearch(newValue) {
      if (newValue) {
        this.items = this.items2.filter((item) => {
          if (item.full_teamname) {
            return item.full_teamname
              .toLowerCase()
              .includes(newValue.toLowerCase());
          } else {
            return item;
          }
        });
      } else {
        this.items = this.items2;
      }
    },
  },
  async mounted() {
    const result = await getDriverReviewByemail({
      email: this.BackuserInfos.email,
    });
    this.reviewInfo = result.data.driverReview.filter((item) => {
      return item.type == "enterTeam" && item.state == "will check";
    });
    //     this.Alength = `<div class="text parbase">
    // <h3>In profile</h3>
    // </div>"`;
    const res = await getTeamdetail();
    console.log(res);
    res.data.teaminfo.forEach((item) => {
      this.items.push({
        team_id: item.id,
        team_icon: item.team_icon,
        full_teamname: item.full_teamname,
        base: item.base,
        email: item.email,
        // team_biography: item.team_biography.substring(this.Alength),
        apply_status: false,
      });
      this.items.push({ divider: true, inset: true });
    });
    this.items.forEach((item) => {
      item.full_teamname === this.BackuserInfos.team
        ? (item.apply_status = true)
        : "";
      this.reviewInfo.forEach((review) => {
        if (item.full_teamname === review.full_teamname) {
          item.apply_status = true;
          console.log(item);
        }
      });
    });
    this.items2 = this.items;
  },
  methods: {
    refuse() {
      this.snackbarTitle = "你还未通过培训！";
      this.isSnackbarSuccess = false;
      this.isSnackbar = true;
      setTimeout(() => {
        this.saveloading = false;
        this.isSnackbar = false;
      }, 2500);
      return false;
    },
    async enterTeam(index) {
      this.saveloading = true;
      const  DriverTrain= await getDriverTrainByemail();
      const results = DriverTrain.data.trainfo[0];
      console.log(DriverTrain);
      console.log(results);
      var r=false;
      r=DriverTrain.data.trainfo.length>0 ?  r=true
       : this.refuse();
      console.log(r);
      if(!r){
        return false
      }else{
        results.reaction > 60 ? '' : this.refuse();
      }
      
      const res = await DriverEnterapply({
        title: "入队申请",
        content: "车手入队申请",
        type: "enterTeam",
        full_teamname: this.items[index].full_teamname,
      });
      console.log(res);

      if (res.data.Operation === "success") {
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        this.snackbarTitle = "操作成功";
        this.items[index].apply_status = true;
        setTimeout(() => {
          this.isSnackbar = false;
          this.saveloading = false;
        }, 2500);
        this.Exitdialog = false;
      } else {
        res.data.Operation === "repeat"
          ? (this.snackbarTitle = "请勿重复申请！")
          : (this.snackbarTitle = "操作失败");
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        setTimeout(() => {
          this.saveloading = false;
          this.isSnackbar = false;
        }, 2500);
        this.Exitdialog = false;
      }
    },
  },
};
</script>

<style lang="scss">
.teamMarket {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .search {
    width: 80%;
  }
  .item {
    width: 80%;
  }
}
</style>
