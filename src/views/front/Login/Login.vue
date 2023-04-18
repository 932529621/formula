<template>
  <v-app>
    <!-- <v-img 
        max-height="50"
        max-width="200"
        src="https://account.formula1.com/images/f1_logo.svg"
      >
      </v-img> -->
    <v-app-bar app height="50px">
      <v-tabs
        :background-color="changeColor ? 'black' : 'red'"
        height="50px"
        centered
        color="purple lighten-5"
      >
        <v-tab to="/home"
          ><router-link
            to="/home"
            active-class="active-class"
            class="tab_login"
          >
            <svg
              style="vertical-align: bottom"
              t="1669561561729"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4918"
              width="20"
              height="20"
            >
              <path
                d="M96 480c-9.6 0-19.2-3.2-25.6-12.8-12.8-12.8-9.6-35.2 3.2-44.8l377.6-310.4c35.2-25.6 86.4-25.6 118.4 0l377.6 307.2c12.8 9.6 16 32 3.2 44.8-12.8 12.8-32 16-44.8 3.2L531.2 166.4c-9.6-6.4-28.8-6.4-38.4 0L115.2 473.6c-6.4 6.4-12.8 6.4-19.2 6.4zM816 928H608c-19.2 0-32-12.8-32-32v-150.4c0-22.4-38.4-44.8-67.2-44.8-28.8 0-64 19.2-64 44.8V896c0 19.2-12.8 32-32 32H211.2C163.2 928 128 892.8 128 848V544c0-19.2 12.8-32 32-32s32 12.8 32 32v304c0 9.6 6.4 16 19.2 16H384v-118.4c0-64 67.2-108.8 128-108.8s131.2 44.8 131.2 108.8V864h176c9.6 0 16 0 16-19.2V544c0-19.2 12.8-32 32-32s32 12.8 32 32v304C896 896 864 928 816 928z"
                fill="#666666"
                p-id="4919"
              ></path>
            </svg>
            主页</router-link
          ></v-tab
        >
        <v-tab @click="changeBackColor()" to="/login/sign"
          ><router-link
            to="/login/sign"
            active-class="active-class"
            class="tab_login"
            >登录</router-link
          ></v-tab
        >
        <v-tab @click="changeBackColor()" to="/login/register"
          ><router-link
            to="/login/register"
            active-class="active-class"
            class="tab_login"
            >注册</router-link
          ></v-tab
        >
      </v-tabs>
    </v-app-bar>
    <v-main> <router-view></router-view></v-main>
    <v-footer app>
      <v-img
        max-height="33"
        max-width="100"
        src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/logo.svg"
      >
      </v-img>
      <span class="copyright"
        >2003-2022 Formula One World Championship Limited</span
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    changeColor: true,
  }),
  methods: {
    changeBackColor() {
      this.changeColor = !this.changeColor;
    },
  },
};
</script>

<style scoped>
a {
  color: white !important;
  font-family: "Medium" !important;
  font-weight: 400 !important;
}
.active-class {
  font-weight: bold !important;
  color: rgb(255, 255, 255) !important;
}

.v-footer {
  border: solid 2px #38383f;
  padding: 0;
  border-left: 0;
  border-bottom: 0;
  border-top-right-radius: 25px;
  padding-top: 15px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-application {
  background-color: rgba(247, 244, 241, 0.7);
}

.copyright {
  font-family: "Thin";
  font-size: 13px;
  letter-spacing: 0.5px;
  font-weight: 500;
}
</style>