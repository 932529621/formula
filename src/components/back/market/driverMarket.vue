<template>
  <div class="teamMarket">
    <div class="search">
      <v-text-field
        solo
        label="搜索车手信息"
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

            <v-list-item v-else :key="item.id" link>
              <v-list-item-avatar>
                <v-img :src="item.driver_half_pic"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle style="font-size: 0.5rem">
                  {{ item.place_of_birth }}
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
                    name: 'Driverdetail',
                    path: `/driver/driverdetail`,
                    query: {
                      driverId: items[index].id,
                      driverlastName: items[index].last_name,
                      team: items[index].items,
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
                >{{ item.apply_status ? "正在审核" : "邀请入队" }}</v-btn
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
  getDriverDetail,
  getDriverReviewByemail,
  InviteDriverapply,
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
          if (item.name) {
            return item.name.toLowerCase().includes(newValue.toLowerCase());
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
      return item.type == "inviteDriver" && item.state == "will check";
    });
    //     this.Alength = `<div class="text parbase">
    // <h3>In profile</h3>
    // </div>"`;
    const res = await getDriverDetail();
    console.log(res);
    res.data.DriverDetail.forEach((item) => {
      this.items.push({
        id: item.id,
        driver_half_pic: item.driver_half_pic,
        email: item.email,
        name: item.name,
        apply_status: false,
        full_teamname: item.team,
        place_of_birth: item.place_of_birth,
        last_name:item.last_name,
      });
      this.items.push({ divider: true, inset: true });
    });
    this.items.forEach((item) => {
      item.full_teamname === this.BackuserInfos.team
        ? (item.apply_status = true)
        : "";
      this.reviewInfo.forEach((review) => {
        if (item.email === review.username) {
          item.apply_status = true;
          console.log(item);
        }
      });
    });
    this.items2 = this.items;
  },
  methods: {
    async enterTeam(index) {
      this.saveloading = true;
      const res = await InviteDriverapply({
        title: "邀请入队",
        content: "邀请车手入队",
        type: "inviteDriver",
        full_teamname: this.BackuserInfos.team,
        username: this.items[index].email,
        user_id: this.items[index].id,
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
