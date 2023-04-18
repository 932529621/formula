<template>
  <v-app>
    <div class="exam-card" ref="views" v-if="questionType == 'single'">
      <v-stepper
        v-model="e6"
        vertical
        v-for="(items, index) of singQuestion"
        :key="index"
      >
        <v-stepper-step :complete="e6 > index + 1" :step="index + 1">
          {{ items.question }}
          <small
            :style="{
              color: items.type == 'single' ? 'red' : 'orange',
              fontSize: '1rem',
            }"
            >{{ items.type }}</small
          >
        </v-stepper-step>

        <v-stepper-content :step="index">
          <v-card
            style="box-shadow: none !important"
            color="white lighten-1 ma-5"
            class="mb-12"
            height="150px"
          >
            <v-radio-group v-model="items.selectOption">
              <v-radio
                v-for="n in items.options"
                :key="n"
                :label="n"
                :value="n"
              ></v-radio>
            </v-radio-group>
          </v-card>
          <v-btn color="primary" v-show="e6 != 50" @click="continueQuestion()">
            下一题
          </v-btn>
          <v-btn text v-show="e6 != 0" @click="e6 = e6 - 1"> 上一题 </v-btn>
        </v-stepper-content>
      </v-stepper>
      <div class="exam-navcard">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="indigo" fab dark v-bind="attrs" v-on="on">
              <v-icon>mdi-box</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title> 更改问题类型</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-radio-group v-model="questionType" row>
                      <v-radio
                        label="单选题"
                        color="red darken-3"
                        value="single"
                      ></v-radio>
                      <v-radio
                        label="多选题"
                        color="indigo"
                        value="mutiple"
                      ></v-radio>
                    </v-radio-group>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <v-list-item>
                <v-text-field
                  label="跳转到"
                  filled
                  v-model="skipToTitle"
                  hide-details
                  autofocus
                ></v-text-field>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn text @click="menu = false"> 取消 </v-btn>
              <v-btn color="primary" text @click="skipto()"> 跳转 </v-btn>
              <v-btn
                v-if="skipToTitle == '998'"
                color="green"
                text
                @click="passall()"
              >
                PassAll
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </div>
    <div class="exam-card" ref="views" v-if="questionType == 'mutiple'">
      <v-stepper
        v-model="e6"
        vertical
        v-for="(items, index) of multipleQuestion"
        :key="index"
      >
        <v-stepper-step :complete="e6 > 1" :step="index + 1">
          {{ items.question }}
          <small
            :style="{
              color: items.type == 'single' ? 'red' : 'orange',
              fontSize: '1rem',
            }"
            >{{ items.type }}</small
          >
        </v-stepper-step>

        <v-stepper-content :step="index">
          <v-card
            style="box-shadow: none !important"
            color="white lighten-1 ma-5"
            class="mb-12"
            height="150px"
          >
            <v-row v-for="(option, indexs) of items.options" :key="indexs">
              <v-checkbox
                v-model="items.selectOptions[indexs]"
                :label="option"
                color="red"
                :value="option"
                hide-details
              >
              </v-checkbox>
            </v-row>
          </v-card>
          <v-btn color="primary" v-show="e6 != 50" @click="e6 = e6 + 1">
            下一题
          </v-btn>
          <v-btn text v-show="e6 != 0" @click="e6 = e6 - 1"> 上一题 </v-btn>
        </v-stepper-content>
      </v-stepper>
      <div class="exam-navcard">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="indigo" fab dark v-bind="attrs" v-on="on">
              <v-icon>mdi-box</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>更改问题类型 </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-radio-group v-model="questionType" row>
                      <v-radio
                        label="单选题"
                        color="red darken-3"
                        value="single"
                      ></v-radio>
                      <v-radio
                        label="多选题"
                        color="indigo"
                        value="mutiple"
                      ></v-radio>
                    </v-radio-group>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <v-list-item>
                <v-text-field
                  label="跳转到"
                  filled
                  v-model="skipToTitle"
                  :rules="skiprule"
                  hide-details
                  autofocus
                ></v-text-field>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn text @click="menu = false"> 取消 </v-btn>
              <v-btn color="primary" text @click="skipto()"> 跳转 </v-btn>
              <v-btn
                v-if="skipToTitle == '998'"
                color="green"
                text
                @click="passall()"
              >
                PassAll
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title style="justify-content: center !important" class="text-h5"
          >你确定要提交吗 ?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            :loading="saveloading"
            text
            @click="dialog = false"
            >取消</v-btn
          >
          <v-btn
            color="green darken-1"
            :loading="saveloading"
            text
            @click="submitQuestion()"
            >提交</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div
      class="pa-4 text-center pass"
      v-if="examflag == true && hasSubmit == true"
    >
      <v-img
        class="mb-4"
        contain
        height="128"
        src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/logo.svg"
      ></v-img>
      <h3 class="text-h5 font-weight-light mb-2">恭喜你，理论考试通过 !</h3>
      <h3 class="text-caption grey--text">
        请您尽快前往体能测验室参与体能测试！
      </h3>
      <v-btn
        @click="$router.push('/AdminHome/physical')"
        style="color: #42a5f5; font-size: 0.75rem"
        text
        >查看体能测试成绩</v-btn
      >
    </div>
    <div class="preloadfail" v-if="examflag == false && hasSubmit == true">
      <v-icon size="32" color="error">mdi-alert-circle</v-icon>
      <div class="card-title" style="font-size: 1.5rem; color: #e53935">
        对不起，你没有通过 !
      </div>
      <div class="card-title" style="font-size: 1rem; color: black">
        你的得分是： {{ score }}
      </div>
      <v-btn @click="tryagain()" style="color: #42a5f5; font-size: 0.75rem" text
        >再试一次</v-btn
      >
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
  </v-app>
</template>

<script>
import {
  getExaminfo,
  submitQuestion,
  getDriverTrainByemail,
} from "@/plugins/http";
export default {
  data() {
    return {
      singQuestion: [],
      multipleQuestion: [],
      questionType: "single",
      fav: true,
      menu: false,
      hasSubmit: false,
      message: false,
      hints: true,
      skipToTitle: null,
      srcview: null,
      e6: 0,
      dialog: false,
      ex4: [
        "red",
        "indigo",
        "orange",
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "error",
        "red darken-3",
        "indigo darken-3",
        "orange darken-3",
      ],
      saveloading: false,
      isSnackbar: false,
      isSnackbarSuccess: null,
      examflag: null,
      score: 0,
      skiprule: [
        (v) => {
          if (this.questionType.type == "single") {
            if (v > singQuestion.length) {
              return "Value is Valid !";
            }
          } else {
            if (v > this.multipleQuestion.length) {
              return "Value is Valid !";
            }
          }
        },
      ],
    };
  },
  mounted() {
    this.initQuestion();
    const scr =
      this.$refs.views.parentElement.parentElement.parentElement.parentElement
        .parentElement;
    this.srcview = scr;
    this.hastheory();
  },
  computed: {
    snackbarTitle() {
      return this.isSnackbarSuccess === true
        ? "操作成功"
        : "操作失败";
    },
  },

  watch: {
    e6(val) {
      if (val == this.multipleQuestion.length) {
        this.dialog = true;
      }
    },
  },
  methods: {
    skipto() {
      //scrollIntoView 简单
      document
        .getElementsByClassName("v-stepper")
        [this.skipToTitle - 1].scrollIntoView(false);
      this.e6 = Number(this.skipToTitle);
      // this.srcview.scrollTo({
      //   top: 0,
      //   behavior: "smooth",
      // });
      // this.e6=this.skipTo;
    },
    async initQuestion() {
      const res = await getExaminfo();
      if (res.data.Operation === "success") {
        for (let key of res.data.Examinfo) {
          key.type == "single"
            ? this.singQuestion.push(key)
            : this.multipleQuestion.push(key);
        }
      }
      this.singQuestion.forEach((item, index) => {
        this.singQuestion[index].answer = item.answer.split("，");
        this.singQuestion[index].options = item.options.split("，");
        this.singQuestion[index].selectOption = "1";
      });
      this.multipleQuestion.forEach((item, index) => {
        this.multipleQuestion[index].answer = item.answer.split("，");
        this.multipleQuestion[index].options = item.options.split("，");
        this.multipleQuestion[index].selectOptions = [];
      });
    },
    continueQuestion() {
      this.e6 = this.e6 + 1;
      if (this.e6 > this.singQuestion.length - 1) {
        this.e6 = 0;
        document.getElementsByClassName("v-stepper")[0].scrollIntoView(false);
        this.questionType = "mutiple";
      }
    },
    backQuestion() {
      this.e6 = this.e6 - 1;
      if (this.e6 <= 0 && this.questionType == "mutiple") {
        document
          .getElementsByClassName("v-stepper")
          [this.e6].scrollIntoView(false);
        this.questionType = "single";
        this.e6 = 0;
      }
    },
    async submitQuestion() {
      this.questionType = "null";
      const res = await submitQuestion({
        multipleQuestion: this.multipleQuestion,
        singQuestion: this.singQuestion,
      });
      this.score = res.data.examinfo.score;
      this.hasSubmit = true;
      console.log(res);

      if (res.data.Operation === "success" ) {
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
          this.dialog = false;
          this.saveloading = false;
        }, 2500);
        if(this.score >= 60){
          this.examflag = true;
        }else{
          this.examflag=false;
        }
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
          this.dialog = false;
          this.saveloading = false;
        }, 2500);
      }
    },
    tryagain() {
      window.location.reload();
    },
    async passall() {
      const res = await submitQuestion({
        multipleQuestion: this.multipleQuestion,
        singQuestion: this.singQuestion,
        passAll: true,
      });
      this.questionType = "null";
      this.hasSubmit = true;
      this.examflag = true;
    },
    async hastheory() {
      const res = await getDriverTrainByemail();
      if (res.data.trainfo[0].theory >= 60) {
        this.questionType = "null";
        this.examflag = true;
        this.hasSubmit = true;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.exam-card {
  position: relative;
  .exam-navcard {
    background-color: transparent;
    position: fixed;
    right: 50px;
    bottom: 10%;
  }
}
.preloadfail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(200%);
}
.pass {
  transform: translateY(50%);
}
</style>