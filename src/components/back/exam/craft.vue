<template>
  <v-card class="ma-4">
    <v-data-table
      :headers="headers"
      :items="desserts"
      hide-default-footer
      class="elevation-6"
    >
      <template v-slot:[`item.grade`]="{ item }">
        <v-chip :color="getColor(item.grade)" dark>
          {{ item.grade }}
        </v-chip>
      </template>
    </v-data-table>
    <v-snackbar
      class="snack"
      :timeout="-1"
      :value="snackbar"
      :color="color"
      elevation="24"
      multi-line
    >
      <strong>
        {{ snackbarTitle }}
      </strong>
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import { getDriverTrainByemail } from "@/plugins/http";
export default {
  data() {
    return {
      name: "",
      headers: [
        {
          text: "项目",
          align: "start",
          value: "name",
        },
        { text: "First", value: "first" },
        { text: "Second", value: "second" },
        { text: "Third", value: "third" },
        { text: "Average ", value: "average" },
        { text: "Grade", value: "grade" },
      ],
      desserts: [],
      snackbar: true,
      snackbarTitle: "",
      color: "",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const res = await getDriverTrainByemail();
      const result = res.data.trainfo[0];
      if (res.length>0) {
        delete result["HL capacity"];
        delete result["neck strength"];
        delete result["reaction"];
        delete result["stamina"];
        delete result["theory"];
        delete result["email"];
        delete result["id"];
        delete result["status"];
        if (
          result["break"] &&
          result["turn"] &&
          result["power"] &&
          result["gear"] &&
          result["overtake"] &&
          result["antiskid"] &&
          result["emergency"] &&
          result["stop"]
        ) {
          for (let key in result) {
            let nums = result[key].split(",").map(Number);
            let average = Math.floor((nums[0] + nums[1] + nums[2]) / 3);
            let grade = "";
            switch (key) {
              case "break":
                this.name = "刹车技巧";
                break;
              case "turn":
                this.name = "转向技巧";
                break;
              case "power":
                this.name = "油门技巧";
                break;
              case "gear":
                this.name = "换挡技巧";
                break;
              case "overtake":
                this.name = "超车技巧";
                break;
              case "antiskid":
                this.name = "防滑技巧";
                break;
              case "emergency":
                this.name = "应急能力";
                break;
              case "stop":
                this.name = "停车技巧";
                break;
            }
            if (average < 60) {
              grade = "D";
            } else if (average < 80) {
              grade = "C";
            } else if (average < 90) {
              grade = "B";
            } else {
              grade = "A";
            }
            this.desserts.push({
              name: this.name,
              first: nums[0],
              second: nums[1],
              third: nums[2],
              average: average,
              grade: grade,
            });
          }
          this.desserts.some((i) => {
            console.log(i.grade);

            if (i.grade === "D") {
              this.snackbar = true;
              this.snackbarTitle =
                " 对不起 ! 你没有通过了驾驶技能测试，请你前往技能测试场地重新参加测试.";
              this.color = "deep-red accent-4";
              return true;
            } else {
              this.snackbar = true;
              this.snackbarTitle =
                "🎉🎉🎉 恭喜你 ! 你成功通过了驾驶技能测试，你现在可以进入俱乐部参加赛事.";
              this.color = "deep-purple accent-4";
            }
          });
          console.log(this.desserts);
        }
      } else {
        this.snackbar = true;
        this.snackbarTitle =
          " 对不起 ! 你还没有参加过驾驶技能测试，请你前往技能测试场地参加测试.";
        this.color = "deep-red accent-4";
      }
    },
    getColor(state) {
      switch (state) {
        case "A":
          return "green";
        case "B":
          return "blue";
        case "C":
          return "orange";
        case "D":
          return "red";
      }
    },
  },
};
</script>

<style>
</style>