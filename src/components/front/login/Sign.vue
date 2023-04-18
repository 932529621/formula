<template>
  <v-app>
    <v-card class="mx-auto xl" width="40%" height="400px" app>
      <v-card-title class="text-h6 font-weight-regular justify-center">
        <span style="font-family: Heavy; font-size: x-large">登录</span>
      </v-card-title>
      <v-window>
        <v-card-text>
          <form>
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              :success-messages="emailSuccess"
              label="E-mail"
              required
              @keyup.enter="submit()"
              @input="$v.email.$touch()"
              @blur="
                $v.email.$touch();
                isAllcorrect();
              "
            ></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              :error-messages="passwordErrors"
              :success-messages="passwordSuccess"
              label="密码"
              required
              @keyup.enter="submit()"
              @input="$v.password.$touch()"
              @blur="
                $v.password.$touch();
                isAllcorrect();
              "
            ></v-text-field>
            <svg
              t="1669561344417"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3744"
              width="20"
              height="20"
            >
              <path
                d="M536 480v192a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V480a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16z m-32-128h16a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16z m8 448c159.056 0 288-128.944 288-288s-128.944-288-288-288-288 128.944-288 288 128.944 288 288 288z m0 48c-185.568 0-336-150.432-336-336s150.432-336 336-336 336 150.432 336 336-150.432 336-336 336z"
                p-id="3745"
              ></path>
            </svg>
            <span style="margin-right: 10px"> 还没注册账号？</span
            ><router-link to="/login/register">前去注册一个账号</router-link>
          </form>
          <v-snackbar
            :value="snackbar"
            :color="snackbarColor"
            :timeout="5000"
            top
            class="ma-12"
            min-width="150px"
          >
            {{ snackbartext }}
          </v-snackbar>
        </v-card-text>
      </v-window>

      <v-card-actions class="justify-center align-self-end">
        <v-btn
          class="mr-4"
          @click="submit"
          :loading="isloading"
          :disabled="isCorrect"
        >
          提交
        </v-btn>
        <v-btn class="error" @click="clear"> 清空 </v-btn>
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
  minLength,
} from "vuelidate/lib/validators";

import { login } from "@/plugins/http";

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required, maxLength: maxLength(16), minLength: minLength(8) },
  },

  data: () => ({
    email: "",
    password: "",
    isCorrect: true,
    snackbar: false,
    snackbartext: "",
    snackbarColor: "",
    isloading: false,
  }),

  computed: {
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
      this.$v.email.email && this.$v.email.required && sucess.push("成功");
      return sucess;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("请输入正确的邮箱");
      !this.$v.email.required && errors.push("邮箱是必填的");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength && errors.push("密码最多16个字符");
      !this.$v.password.minLength && errors.push("密码最少8个字符");
      !this.$v.password.required && errors.push("密码是必填的");
      return errors;
    },
  },

  methods: {
    async submit() {
      const isFormCorrect = await this.$v.$anyError;
      if (isFormCorrect) return;
      const { data: res } = await login({
        email: this.email,
        password: this.password,
      });

      // console.log(res.msg, res.token, res.Loginstatus === 208);
      if (res.Loginstatus === 208) {
        localStorage.setItem("Token", "Bearer " + res.token);
        this.snackbar = true;
        this.snackbartext = "登录成功 ";
        this.snackbarColor = "success";
        this.isloading = true;
        setTimeout(() => {
          this.$router.push("/home");
        }, 3000);
      } else {
        this.snackbar = true;
        setTimeout(() => {
          this.snackbar = false;
        }, 3000);
        this.snackbartext = "登录失败 ";
        this.snackbarColor = "error";
      }
    },
    isAllcorrect() {
      if (!this.$v.email.$anyError && !this.$v.password.$anyError) {
        this.isCorrect = false;
      }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.password = "";
    },
  },
};
</script>




<style>
.v-card {
  margin-top: 5% !important;
  border-radius: 25px !important;
}
</style>





