<template>
  <div>
    <div class="navmobile_tab" @click="showmenu()">
      <svg
        t="1665834713562"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1473"
        width="28"
        height="28"
      >
        <path
          d="M133.8 115h756.4c20.9 0 37.8 16.9 37.8 37.8v37.8c0 20.9-16.9 37.8-37.8 37.8H133.8c-20.9 0-37.8-16.9-37.8-37.8v-37.8c0-20.9 16.9-37.8 37.8-37.8zM133.8 455.3h491.6c20.9 0 37.8 16.9 37.8 37.8v37.8c0 20.9-16.9 37.8-37.8 37.8H133.8c-20.9 0-37.8-16.9-37.8-37.8v-37.8c0-20.9 16.9-37.8 37.8-37.8zM133.8 795.6h756.4c20.9 0 37.8 16.9 37.8 37.8v37.8c0 20.9-16.9 37.8-37.8 37.8H133.8c-20.9 0-37.8-16.9-37.8-37.8v-37.8c0-20.9 16.9-37.8 37.8-37.8zM757.8 600.7V423.3c0-22 29.2-33.1 46.2-17.5l97.1 88.7c10.6 9.7 10.6 25.3 0 35L804 618.1c-17 15.6-46.2 4.6-46.2-17.4z"
          p-id="1474"
        ></path>
      </svg>
    </div>
    <div
      class="navmobile_menu"
      :style="[
        { height: showmenuValue == true ? '100%' : '0' },
        { opacity: showmenuValue == true ? '1' : '0' },
        { zIndex: showmenuValue == true ? '101' : '-101' },
      ]"
    >
      <div class="navmobile_menu_container">
        <div class="navmobile_left">
          <div class="navmobile_left_content" @click="$router.push('/latest')">
            <span>Latest</span>
            <svg
              t="1665838095856"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3502"
              width="16"
              height="16"
            >
              <path
                d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z"
                p-id="3503"
                fill="#ffffff"
              ></path>
            </svg>
          </div>
          <div
            class="navmobile_left_content"
            @click="$router.push('/schedule')"
          >
            <span>Schedule</span>
            <svg
              t="1665838095856"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3502"
              width="16"
              height="16"
            >
              <path
                d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z"
                p-id="3503"
                fill="#ffffff"
              ></path>
            </svg>
          </div>
          <div class="navmobile_left_content" @click="$router.push('/driver')">
            <span>Driver</span>
            <svg
              t="1665838095856"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3502"
              width="16"
              height="16"
            >
              <path
                d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z"
                p-id="3503"
                fill="#ffffff"
              ></path>
            </svg>
          </div>
        </div>
        <div class="navmobile_right">
          <div class="navmobile_left_content" @click="$router.push('/video')">
            <span>Video</span>
            <svg
              t="1665838095856"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3502"
              width="16"
              height="16"
            >
              <path
                d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z"
                p-id="3503"
                fill="#ffffff"
              ></path>
            </svg>
          </div>
          <div
            class="navmobile_left_content"
            @click="$router.push('/standing')"
          >
            <span>Standing</span>
            <svg
              t="1665838095856"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3502"
              width="16"
              height="16"
            >
              <path
                d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z"
                p-id="3503"
                fill="#ffffff"
              ></path>
            </svg>
          </div>
          <div class="navmobile_left_content" @click="$router.push('/team')">
            <span>Team</span>
            <svg
              t="1665838095856"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3502"
              width="16"
              height="16"
            >
              <path
                d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z"
                p-id="3503"
                fill="#ffffff"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="navmobile_btn">
        <div class="navmobile_btn_container">
          <v-btn
            style="font-family: Heavy; color: #000"
            color="#ffffff"
            @click="$router.push('/login')"
          >
            <svg
              t="1669561265733"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2777"
              width="20"
              height="20"
            >
              <path
                d="M1022 513.2C1022 795.6 793.6 1024 511.2 1024S0.4 795.6 0.4 513.2C0.4 297.6 135.2 113 325.4 37.8 382 15.2 446 2.4 511.2 2.4s129.2 12.8 185.8 35.4C887.2 113 1022 297.6 1022 513.2z m-706.6-106.4c0 86.6 44 160.4 107.8 197.2 27 15.6 56.8 24.2 88 24.2s59.6-8.6 85.2-22.8c65.2-35.4 110.6-110.6 110.6-198.6 0-122-88-221.4-195.8-221.4s-195.8 99.4-195.8 221.4z m197.2 584.6c149 0 282.4-68.2 370.4-176-10-85.2-92.2-157.4-210-193-44 39.8-100.8 63.8-161.8 63.8-62.4 0-120.6-25.6-164.6-66.6-113.6 32.6-197.2 99.4-215.6 177.4 85 117.8 225.6 194.4 381.6 194.4z"
                fill=""
                p-id="2778"
              ></path>
            </svg>
            Sign in
          </v-btn>
          <v-btn
            style="font-family: Heavy; color: #ffffff"
            color="#e10106"
            @click="$router.push('/ticket')"
          >
            Ticket
          </v-btn>
        </div>
      </div>
      <div class="navmobile_mask" @click="showmenu()"></div>
    </div>
    <div
      class="header_flex"
      @mouseenter="inbanner()"
      @mouseleave="outbanner()"
      ref="header_flex"
    >
      <div class="banner_left">
        <li ref="bannerfont">
          <router-link
            :style="{ color: bannerfont + '!important' }"
            to="/latest"
            >新闻</router-link
          >
        </li>
        <li>
          <router-link :style="{ color: bannerfont + '!important' }" to="/video"
            >视频</router-link
          >
        </li>
        <li>
          <router-link
            :style="{ color: bannerfont + '!important' }"
            to="/schedule"
            >赛事安排</router-link
          >
        </li>
      </div>

      <div class="banner_svg_container">
        <svg
          width="120px"
          height="30px"
          viewBox="0 0 120 30"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          fill="#fc0000"
          ref="logos"
          @click="$router.push('/home')"
        >
          <defs>
            <path
              d="M101.086812,30 L101.711812,30 L101.711812,27.106875 L101.722437,27.106875 L102.761812,30 L103.302437,30 L104.341812,27.106875 L104.352437,27.106875 L104.352437,30 L104.977437,30 L104.977437,26.25125 L104.063687,26.25125 L103.055562,29.18625 L103.044937,29.18625 L102.011187,26.25125 L101.086812,26.25125 L101.086812,30 Z M97.6274375,26.818125 L98.8136875,26.818125 L98.8136875,30 L99.4699375,30 L99.4699375,26.818125 L100.661812,26.818125 L100.661812,26.25125 L97.6274375,26.25125 L97.6274375,26.818125 Z M89.9999375,30 L119.999937,0 L101.943687,0 L71.9443125,30 L89.9999375,30 Z M85.6986875,13.065 L49.3818125,13.065 C38.3136875,13.065 36.3768125,13.651875 31.6361875,18.3925 C27.2024375,22.82625 20.0005625,30 20.0005625,30 L35.7324375,30 L39.4855625,26.246875 C41.9530625,23.779375 43.2255625,23.52375 48.4068125,23.52375 L75.2405625,23.52375 L85.6986875,13.065 Z M31.1518125,16.253125 C27.8774375,19.3425 20.7530625,26.263125 16.9130625,30 L-6.25e-05,30 C-6.25e-05,30 13.5524375,16.486875 21.0849375,9.0725 C28.8455625,1.685 32.7143125,0 46.9486875,0 L98.7643125,0 L87.5449375,11.21875 L48.0011875,11.21875 C37.9993125,11.21875 35.7518125,11.911875 31.1518125,16.253125 Z"
              id="path-1"
            ></path>
          </defs>

          <g id="Page-1">
            <mask id="mask-2" fill="white">
              <use xlink:href="#path-1"></use>
            </mask>
            <use id="Fill-1" xlink:href="#path-1"></use>
          </g>
        </svg>
      </div>
      <div class="banner_right">
        <li>
          <router-link
            :style="{ color: bannerfont + '!important' }"
            to="/standing"
            >赛事记录</router-link
          >
        </li>
        <li>
          <router-link
            :style="{ color: bannerfont + '!important' }"
            to="/driver"
            >车手</router-link
          >
        </li>
        <li>
          <router-link :style="{ color: bannerfont + '!important' }" to="/team"
            >车队</router-link
          >
        </li>
        <li>
          <router-link
            :style="{ color: bannerfont + '!important' }"
            to="/ticket"
            >门票</router-link
          >
        </li>
      </div>
      <div
        class="login"
        @click="$router.push('/login')"
        style="cursor: pointer"
        v-if="!isLogin"
      >
        <svg
          t="1669561265733"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2777"
          width="20"
          height="20"
        >
          <path
            d="M1022 513.2C1022 795.6 793.6 1024 511.2 1024S0.4 795.6 0.4 513.2C0.4 297.6 135.2 113 325.4 37.8 382 15.2 446 2.4 511.2 2.4s129.2 12.8 185.8 35.4C887.2 113 1022 297.6 1022 513.2z m-706.6-106.4c0 86.6 44 160.4 107.8 197.2 27 15.6 56.8 24.2 88 24.2s59.6-8.6 85.2-22.8c65.2-35.4 110.6-110.6 110.6-198.6 0-122-88-221.4-195.8-221.4s-195.8 99.4-195.8 221.4z m197.2 584.6c149 0 282.4-68.2 370.4-176-10-85.2-92.2-157.4-210-193-44 39.8-100.8 63.8-161.8 63.8-62.4 0-120.6-25.6-164.6-66.6-113.6 32.6-197.2 99.4-215.6 177.4 85 117.8 225.6 194.4 381.6 194.4z"
            fill=""
            p-id="2778"
          ></path>
        </svg>
      </div>
      <div
        class="profile login"
        style="cursor: pointer"
        @click="$router.push('/profile')"
        v-if="isLogin"
      >
        <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar v-bind="attrs" v-on="on">
              <img :src="userInfos.avatar" />
            </v-avatar>
          </template>
          <v-card class="mx-auto profile-card" max-width="450" tile>
            <v-list dense>
              <v-list-item-group v-model="selectedItem" color="red">
                <v-list-item
                  v-for="(item, index) of items"
                  :key="index"
                  @click.stop="
                    $router.push({ path: item.url });
                    selectedItem = index;
                  "
                >
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.text }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
              <v-divider></v-divider>
              <v-btn text color="red" width="100%" @click="logout()"
                >退出</v-btn
              >
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    bannerfont: "white",
    showmenuValue: false,
    isLogin: false,
    selectedItem: 1,
    items: [
      { text: "我的收藏", icon: "mdi-heart", url: "/profile/favourite" },
      { text: "账号安全", icon: "mdi-lock", url: "/profile/security" },
      {
        text: "邮箱信息",
        icon: "mdi-bell",
        url: "/profile/notifications",
      },
      {
        text: "门票信息",
        icon: "mdi-ticket-confirmation",
        url: "/profile/tickets",
      },
      { text: "申请", icon: "mdi-note-edit", url: "/profile/apply" },
    ],
  }),
  computed: {
    ...mapState("user", ["userInfos"]),
  },
  methods: {
    inbanner() {
      this.bannerfont = "black";
      this.$refs.header_flex.style.backgroundColor = "rgba(255,255,255,.3)";
      this.$refs.header_flex.style.backdropFilter = `blur(5px)`;

      // .backdropFilter='blur(5px) opacity(5px)'
    },
    outbanner() {
      this.bannerfont = "white";
      this.$refs.header_flex.style.backgroundColor = "rgba(255,255,255,0)";
      this.$refs.header_flex.style.backdropFilter = `blur(0px)`;
    },
    handleScroll() {
      if (window.scrollY > 0) {
        this.$refs.header_flex.style.backgroundColor = "rgba(255,255,255,.3)";
        this.$refs.header_flex.style.backdropFilter = `blur(5px)`;
        this.bannerfont = "black";
      } else {
        this.$refs.header_flex.style.backgroundColor = "rgba(255,255,255,0)";
        this.bannerfont = "white";
        this.$refs.header_flex.style.backdropFilter = `blur(0px)`;
      }
    },
    showmenu() {
      this.showmenuValue = !this.showmenuValue;
    },
    logout() {
      window.localStorage.removeItem("Token");
      this.$router.push("/home");
      setTimeout(() => {
        window.reload();
      }, 500);
      this.isLogin = false;
    },
  },
  mounted() {
    console.log(this.userInfos.user_id);

    this.userInfos.user_id != undefined
      ? (this.isLogin = true)
      : (this.isLogin = false);
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll, false);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, false);
  },
};
</script>

<style lang="scss" scoped>
.navmobile_tab {
  position: fixed;
  top: 3%;
  left: 2.5%;
  z-index: 101;
  opacity: 0;
}
.navmobile_menu {
  position: fixed;
  width: 100%;
  top: 70px;
  transition: all 0.5s ease;
  z-index: 101;
  .navmobile_menu_container {
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: center;
    column-gap: 35px;
    padding: 20px 0;
    background-color: #1f1f21;
    .navmobile_left {
      width: 40%;
      display: flex;
      flex-direction: column;
      row-gap: 20px;
      .navmobile_left_content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ffffff;
        border-right: 1px solid #ffffff;
        border-bottom-right-radius: 10px;
        height: 20%;

        span {
          font-size: 1rem;
          color: #ffffff;
          font-family: Heavy;
        }
      }
    }
    .navmobile_right {
      width: 40%;
      display: flex;
      flex-direction: column;
      row-gap: 20px;
      .navmobile_left_content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ffffff;
        border-right: 1px solid #ffffff;
        border-bottom-right-radius: 10px;
        height: 20%;

        span {
          font-size: 1rem;
          color: #ffffff;
          font-family: Heavy;
        }
      }
    }
  }
  .navmobile_btn {
    width: 100%;
    height: 20%;
    background-color: #1f1f21;
    display: flex;
    justify-content: center;
    .navmobile_btn_container {
      width: 93%;
      display: flex;
      justify-content: center;
      column-gap: 20px;
      .v-btn {
        width: calc(50%-30px) !important;
      }
    }
  }
  .navmobile_mask {
    width: 100%;
    height: 40%;
    background: rgba(21, 21, 30, 0.5);
  }
}
.header_flex {
  width: 100vw;
  height: 70px;
  background-color: rgba(0, 0, 0, 0);
  position: fixed;
  display: flex;
  z-index: 100;
  justify-content: space-around;
  align-items: center;
  transition: all 0.3s linear;
  .banner_svg_container {
    width: 15%;
  }
  .banner_left {
    width: 45%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .banner_right {
    width: 35%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .login {
    width: 10%;
  }
  a {
    color: #ffffff !important;
    font-family: Medium;
    transition: all 0.5s linear;
  }
  .profile {
    position: relative;
    .v-avatar {
      transition: all 0.3s;
    }
  }
  .profile-card {
    position: absolute;
    top: -200%;
    right: 25%;
    opacity: 0;
    transition: all 0.3s;
    z-index: -1;
  }
}
// svg:hover {
//   cursor: pointer;
// }
// .v-avatar:hover + .profile-card {
//   opacity: 1;
//   opacity: 1;
//   z-index: 1;
//   top: 110%;
// }
// .profile-card:hover {
//   opacity: 1;
//   z-index: 1;
//   top: 110%;
//   transition-delay: 0.7s;
// }
@media screen and (max-width: 1300px) {
}
@media screen and (max-width: 1050px) {
  .header_flex {
    justify-content: flex-end !important;
  }
  .banner_svg_container {
    width: 50% !important;
  }
  .banner_left {
    display: none !important;
    width: 0% !important;
  }
  .banner_right {
    display: none !important;
    width: 0% !important;
  }
  .navmobile_tab {
    opacity: 1 !important;
  }
}
@media screen and (max-width: 780px) {
  .header_flex {
    justify-content: flex-end !important;
  }
  .banner_left {
    display: none !important;
    width: 0% !important;
  }
  .banner_right {
    display: none !important;
    width: 0% !important;
  }
  .navmobile_tab {
    opacity: 1 !important;
  }
}
</style>