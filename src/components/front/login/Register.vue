<template>
  <v-app>
    <v-card class="mx-auto" width="600px">
      <v-card-title class="text-h6 font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
        <v-avatar
          color="primary lighten-2"
          class="subheading white--text"
          size="24"
          v-text="step"
        ></v-avatar>
      </v-card-title>

      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              :success-messages="emailSuccess"
              label="E-mail"
              required
              color="red"
              :loading="isLoading"
              @input="
                $v.email.$touch();
                isAreadyRegister();
              "
              @blur="
                $v.email.$touch();
                isAllcorrect();
              "
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
              请输入邮箱地址
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-text-field
              v-model="password"
              type="password"
              :error-messages="passwordErrors"
              :success-messages="passwordSuccess"
              label="密码"
              required
              @input="
                $v.password.$touch();
                isPasswordCorrect();
              "
              @blur="
                $v.password.$touch();
                isAllcorrect();
              "
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
              请输入密码
            </span>
            <v-text-field
              v-model="Confirmpassword"
              type="password"
              :error-messages="ConfirmpasswordErrors"
              :success-messages="ConfirmpasswordSuccess"
              label="确认密码"
              required
              @input="$v.Confirmpassword.$touch()"
              @blur="
                $v.Confirmpassword.$touch();
                isAllcorrect();
              "
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
              请输入确认密码
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <v-card-text>
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              :success-messages="nameSuccess"
              :counter="10"
              label="名字"
              required
              @input="$v.name.$touch()"
              @blur="
                $v.name.$touch();
                isAllcorrect();
              "
            ></v-text-field>
            <span class="text-caption grey--text text--darken-1">
              请输入你的名字
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="4">
          <!-- <v-text-field
              v-model="VertifyCode"
              :error-messages="VertifyCodeErrors"
              :success-messages="VertifyCodeSuccess"
              :counter="6"
              label="VertifyCode"
              required
              @input="$v.VertifyCode.$touch()"
              @blur="$v.VertifyCode.$touch();isAllcorrect()"
            ></v-text-field> -->
          <div class="ma-auto position-relative" style="max-width: 300px">
            <div class="text-caption grey--text text--darken-1">
              请输入邮箱验证码
            </div>
            <v-otp-input
              v-model="emailCode"
              :disabled="GetCodeloading ? false : true"
              @finish="onFinish"
            ></v-otp-input>
            <div class="d-flex justify-center align-center">
              <div class="text-caption grey--text text--darken-1">
                获取验证码
              </div>

              <div>
                <v-btn
                  class="ma-5 text-button"
                  :loading="GetCodeloading"
                  color="secondary"
                  @click="getCode()"
                  ref="getCodebtn"
                >
                  获取验证码
                </v-btn>
                <span
                  v-if="CodeTips"
                  class="CodeTips text-caption grey--text text--darken-1"
                  >请在 {{ Seconds }}秒后重试
                </span>
              </div>
            </div>
            <!-- 遮罩层 -->
            <v-overlay absolute :value="overlayloading">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-overlay>
          </div>
          <!-- 消息弹出框 -->
          <v-snackbar
            v-model="snackbar"
            :color="snackbarColor"
            :timeout="5000"
            top
            class="ma-12"
          >
            {{ snackbartext }}
          </v-snackbar>
        </v-window-item>

        <v-window-item :value="5">
          <div class="pa-4 text-center">
            <v-img
              class="mb-4"
              contain
              height="128"
              src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/logo.svg"
            ></v-img>
            <h3 class="text-h5 font-weight-light mb-2">Welcome to Formula!</h3>
            <span class="text-caption grey--text">感谢您的注册!</span>
          </div>
        </v-window-item>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn :disabled="step === 1 || step === 5" text @click="step--">
          返回
        </v-btn>
        <v-spacer> </v-spacer>
        <v-btn @click="clear" color="error" class="ma-2"> 清空 </v-btn>
        <v-spacer> </v-spacer>
        <v-btn
          :disabled="step === 5 || isCorrect"
          text
          depressed
          @click="steps()"
        >
          下一步
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
  sameAs,
  minLength,
} from "vuelidate/lib/validators";
import { registerpassword, emailValidate,getcode,emailcode } from "@/plugins/http";
export default {
  mixins: [validationMixin],

  data: () => ({
    name: "",
    email: "",
    password: "",
    Confirmpassword: "",
    step: 0,
    isCorrect: true,
    Registerstatus: 0,
    isLoading: true,
    overlayloading: false,

    snackbar: false,
    snackbarColor: "default",
    emailCode: "",
    snackbartext: "",
    //验证码
    GetCodeloading: false,
    //try again
    Seconds: 60,
    CodeTips: false,
  }),
  validations: {
    name: { required, maxLength: maxLength(10), minLength: minLength(3) },
    email: { required, email },
    password: { required, maxLength: maxLength(16), minLength: minLength(8) },
    Confirmpassword: {
      required,
      maxLength: maxLength(16),
      minLength: minLength(8),
      sameAsPassword: sameAs("password"), //sameAs('') 传入字符串
    },
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "E-mail";
        case 2:
          return "请输入密码";
        case 3:
          return "Hello! 请输入您的名字";
        case 4:
          return "邮箱验证码认证";
        case 5:
          return "账户创建成功！";
      }
    },
    nameSuccess() {
      const sucess = [];
      this.$v.name.maxLength &&
        this.$v.name.minLength &&
        this.$v.name.required &&
        sucess.push("成功");
      return sucess;
    },
    passwordSuccess() {
      const sucess = [];
      this.$v.password.maxLength &&
        this.$v.password.minLength &&
        this.$v.password.required &&
        sucess.push("成功");
      return sucess;
    },
    emailSuccess() {
      const sucess = [];
      if (this.Registerstatus === 205) sucess.push("邮箱还未被注册");
      return sucess;
    },
    ConfirmpasswordSuccess() {
      const sucess = [];
      this.$v.Confirmpassword.maxLength &&
        this.$v.Confirmpassword.minLength &&
        this.$v.Confirmpassword.required &&
        this.$v.Confirmpassword.sameAsPassword &&
        sucess.push("成功");
      return sucess;
    },
    ConfirmpasswordErrors() {
      const errors = [];
      if (!this.$v.Confirmpassword.$dirty) return errors;
      !this.$v.Confirmpassword.maxLength && errors.push("密码最长16个字符");
      !this.$v.Confirmpassword.minLength && errors.push("密码最短8个字符");
      !this.$v.Confirmpassword.required && errors.push("密码是必填的");
      !this.$v.Confirmpassword.sameAsPassword && errors.push("两次密码不正确");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength && errors.push("名字最长10个字符");
      !this.$v.name.minLength && errors.push("名字最短3个字符");
      !this.$v.name.required && errors.push("名字是必填的");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;

      !this.$v.email.email && errors.unshift("请输入正确的邮箱");
      !this.$v.email.required && errors.unshift("邮箱是必填的");
      if (this.Registerstatus === 405) errors.unshift("这个邮箱已经被注册");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength && errors.push("密码最长16个字符");
      !this.$v.password.minLength && errors.push("密码最短8个字符");
      !this.$v.password.required && errors.push("密码是必填的");
      return errors;
    },
  },

  methods: {
    async submit() {
      const isFormCorrect = await this.v$.$anyError;
      if (!isFormCorrect) return;
    },
    isAllcorrect() {
      // console.log(this.$v.email.$anyError,this.$v.name.$anyError,this.$v.password.$anyError,this.$v.Confirmpassword.$anyError,this.Registerstatus===205);
      this.isLoading = false;
      if (
        !this.$v.email.$anyError &&
        !this.$v.name.$anyError &&
        !this.$v.password.$anyError &&
        !this.$v.Confirmpassword.$anyError &&
        this.Registerstatus === 205
      ) {
        this.isCorrect = false;
      } else {
        this.isCorrect = true;
      }
    },
    steps() {
      this.isCorrect = true;
      return this.step++;
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.password = "";
      this.emailCode = "";
    },
    async isAreadyRegister() {
      let data = { email: this.email };
      // this.$axios
      //   .post("http://127.0.0.1:8080/api/register/emailValidate", data)
      //   .then((res) => {
      //后端传注册状态码，以此来判断是否启动按钮
      const res = await emailValidate(data);
      console.log(res.data.Registerstatus);
      this.Registerstatus = res.data.Registerstatus;
      this.isLoading = true;
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    },
    async isPasswordCorrect() {
      let data = {
        email: this.email,
        Confirmpassword: this.Confirmpassword,
        password: this.password,
      };
      // this.$axios
      //   .post("http://127.0.0.1:8080/api/registerpassword", data)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      const res = await registerpassword(data);
    },
    async onFinish(InputCode) {
      this.overlayloading = true;
      let data = {
        emailCode: InputCode,
        email: this.email,
        name: this.name,
        password: this.password,
        time_code: new Date().getTime(),
      };
      // this.$axios
      //   .post("http://127.0.0.1:8080/api/emailcode", data)
      //   .then((res) => {
      //     console.log(res);
      const res = await emailcode(data);
      console.log(res);
      
      if (res.data.vertifyStatus === 206) {
        this.overlayloading = false;
        this.snackbarColor = "success";
        this.snackbartext = "邮箱验证成功! ";
        this.snackbar = true;
        this.overlayloading = false;
        this.isCorrect = false;
        this.step = 5;
      } else if (res.data.vertifyStatus === 406) {
        this.snackbarColor = "error";
        this.snackbartext = "请输入正确的验证码!";
        this.snackbar = true;
        this.overlayloading = false;
      } else {
        this.snackbarColor = "warning";
        this.snackbartext = "验证码已经过期！";
        this.snackbar = true;
        this.overlayloading = false;
      }
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    },
    startCodetips() {
      clearInterval();
      var timer = setInterval(() => {
        this.TimeSeconds();
        if (this.Seconds < 0) {
          clearInterval(timer);
          //计时器结束 去掉提示框 恢复按钮状态
          this.CodeTips = false;
          this.GetCodeloading = false;
        }
      }, 1000);
    },
    TimeSeconds() {
      console.log(this.Seconds);
      this.Seconds = this.Seconds - 1;
    },
    async getCode() {
      // this.$axios
      //   .get("http://127.0.0.1:8080/api/getcode", {
      //     params: {
      //       email: this.email,
      //     },
      //   })
      //   .then((res) => {
      //     console.log(res);
      //     console.log(this.Seconds);
      const res = await getcode({ email: this.email });
      this.GetCodeloading = true;
      this.CodeTips = true;
      console.log(res);
      
      if (res.status === 200) {
        console.log("time");
        this.snackbar = true;
        this.snackbartext = "邮箱验证码已经发送 ! ";
        this.snackbarColor = "success";
        //成功就启动计时器
        this.startCodetips();
      } else {
        this.snackbar = true;
        this.snackbartext = "对不起，发生了一些错误！";
        this.snackbarColor = "error";
      }
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    },
  },
};
</script>

<style>
.CodeTips {
  position: absolute;
  margin-top: 30px;
}
</style>