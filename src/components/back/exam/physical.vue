<template>
  <v-app>
    <div class="container">
      <div class="physicstep" v-if="hasScore">
        <v-card
          class="mx-auto"
          color="#26c6da"
          dark
          max-width="400"
          min-width="400"
          min-height="260"
        >
          <v-card-title>
            <v-icon large left> mdi-snake </v-icon>
            <span class="text-h6 font-weight-light">Reaction</span>
          </v-card-title>
          <v-card-text class="text-h5 font-weight-bold">
            您的反应能力测试得分是：
          </v-card-text>
          <div class="points">{{ scores1 }}</div>
        </v-card>
        <v-card
          class="mx-auto"
          color="#E53935"
          dark
          max-width="400"
          min-width="400"
          min-height="260"
        >
          <v-card-title>
            <v-icon large left> mdi-kangaroo </v-icon>
            <span class="text-h6 font-weight-light">Stamina</span>
          </v-card-title>
          <v-card-text class="text-h5 font-weight-bold">
            您的能耐力测试得分是：
          </v-card-text>
          <div class="points">{{ scores2 }}</div>
        </v-card>
        <v-card
          class="mx-auto"
          color="#D81B60"
          dark
          max-width="400"
          min-width="400"
          min-height="260"
        >
          <v-card-title>
            <v-icon large left> mdi-lungs </v-icon>
            <span class="text-h6 font-weight-light">HL Capacity</span>
          </v-card-title>
          <v-card-text class="text-h5 font-weight-bold">
            您的心肺功能测试得分是：
          </v-card-text>
          <div class="points">{{ scores3 }}</div>
        </v-card>
        <v-card
          class="mx-auto"
          color="#64FFDA"
          dark
          max-width="400"
          min-width="400"
          min-height="260"
        >
          <v-card-title>
            <v-icon large left> mdi-snowshoeing </v-icon>
            <span class="text-h6 font-weight-light">Neck Strength</span>
          </v-card-title>
          <v-card-text class="text-h5 font-weight-bold">
            您的颈部力量测试得分是：
          </v-card-text>
          <div class="points">{{ scores4 }}</div>
        </v-card>
      </div>
      <div class="NotPoints" v-if="!hasScore">
        <v-icon color="red" size="64">mdi-alert-circle</v-icon>
        <v-card-text class="text-h5 font-weight-bold">
          对不起，您还没有参与线下体能测试 ! 请在下线测试后查询成绩.
        </v-card-text>
      </div>
    </div>
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
  </v-app>
</template>

<script>
import { getDriverTrainByemail } from "@/plugins/http";
export default {
  data() {
    return {
      e1: 1,
      score1: 0,
      score2: 0,
      score3: 0,
      score4: 0,
      scores1: 0,
      scores2: 0,
      scores3: 0,
      scores4: 0,
      timer: null,
      hasScore: false,
      snackbar: false,
      multiLine: true,
      snackbarTitle: "",
      color: "",
    };
  },
  async mounted() {
    const res = await getDriverTrainByemail();
    console.log(res);

    const score = res.data.trainfo[0];
    if (
      score["HL capacity"] &&
      score["reaction"] &&
      score["stamina"] &&
      score["neck strength"]
    ) {
      if (
        score["HL capacity"] >= 60 &&
        score["reaction"] >= 60 &&
        score["stamina"] >= 60 &&
        score["neck strength"] >= 60
      ) {
        this.hasScore = true;
        this.snackbarTitle =
          "🎉🎉🎉 恭喜你 ! 你成功通过了驾驶技能测试，你现在可以进入俱乐部参加赛事.";
        this.color = "deep-purple accent-4";
        this.snackbar = true;
        this.score1 = score["reaction"];
        this.score2 = score["stamina"];
        this.score3 = score["HL capacity"];
        this.score4 = score["neck strength"];
        this.timer1 = setInterval(() => {
          this.addnumber1();
        }, 10);
        this.timer2 = setInterval(() => {
          this.addnumber2();
        }, 10);
        this.timer3 = setInterval(() => {
          this.addnumber3();
        }, 10);
        this.timer4 = setInterval(() => {
          this.addnumber4();
        }, 10);
      } else {
        this.snackbarTitle =
          " 对不起 ! 你没有通过了体能测试，请你前往测试场地重新参加测试.";
        this.color = "deep-red accent-4";
        this.hasScore = true;
        this.snackbar = true;
        this.score1 = score["reaction"];
        this.score2 = score["stamina"];
        this.score3 = score["HL capacity"];
        this.score4 = score["neck strength"];
        this.timer1 = setInterval(() => {
          this.addnumber1();
        }, 10);
        this.timer2 = setInterval(() => {
          this.addnumber2();
        }, 10);
        this.timer3 = setInterval(() => {
          this.addnumber3();
        }, 10);
        this.timer4 = setInterval(() => {
          this.addnumber4();
        }, 10);
      }
    } else {
      this.hasScore = false;
      this.snackbarTitle =
        " 对不起 ! 你还没有参加过体能测试，请你前往测试场地参加测试.";
      this.color = "deep-black accent-4";
      this.snackbar = true;
    }

    // for (const item of score.trainfo) {
    //   console.log(...Object.values(item));

    //   if (Math.min(...Object.values(item)) < 60) {
    //     console.log("fail");
    //   } else {
    //     console.log(Math.min(...Object.values(item)));
    //   }
    // }
  },
  methods: {
    addnumber1() {
      this.scores1 = this.scores1 + 1;
      if (this.score1 === this.scores1) {
        window.clearInterval(this.timer1);
      }
    },
    addnumber2() {
      this.scores2 = this.scores2 + 1;
      console.log(this.scores2);

      if (this.score2 == this.scores2) {
        window.clearInterval(this.timer2);
      }
    },
    addnumber3() {
      this.scores3 = this.scores3 + 1;
      if (this.score3 == this.scores3) {
        window.clearInterval(this.timer3);
      }
    },
    addnumber4() {
      this.scores4 = this.scores4 + 1;
      if (this.score4 == this.scores4) {
        window.clearInterval(this.timer4);
      }
    },
  },
};
</script>

<style>
.snack {
  position: fixed;
  bottom: 0px !important;
  left: 100px;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.physicstep {
  display: grid;
  width: 70%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  row-gap: 6px;
}
.points {
  font-size: 4rem;
  font-family: Heavy;
  text-align: center;
}
.pointbox {
  padding-top: -16px;
}
.NotPoints {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  transform: translateY(100%);
}
.divpoints {
  display: flex;
  justify-content: center;
}
</style>