<template>
  <div class="profile">
    <div class="profile_container">
      <div class="profileLeft">
        <div class="userInfocontainer">
          <v-avatar @click="uploadAvatar()" size="110" tile color="transparent">
            <v-img
              ref="Avatar"
              style="border-radius: 5px"
              :src="userInfos.avatar"
              alt=""
            >
            </v-img>
          </v-avatar>
          <input
            type="file"
            id="upload"
            ref="uploadAvatar"
            @change="changeAvatar()"
            accept="image/*"
          />
          <div class="userprofile">
            <span class="userName"> {{ userInfos.username }} </span>
            <span class="roleChips"> 用户 </span>
          </div>
        </div>
        <div class="userinfoDetail">
          <span
            class="userDetailTitle"
            style="font-family: Heavy; font-size: 1.25rem"
            >Details</span
          >
          <v-divider></v-divider>
          <div class="userInfoItem">
            <h4>
              姓名:
              <span style="font-size: 0.8rem; color: #3a354199">{{
                userInfos.username
              }}</span>
            </h4>
          </div>
          <div class="userInfoItem">
            <h4>
              Email:
              <span style="font-size: 0.8rem; color: #3a354199">{{
                userInfos.user_email
              }}</span>
            </h4>
          </div>
          <div class="userInfoItem">
            <h4>
              性别:
              <span style="font-size: 0.8rem; color: #3a354199">{{
                userInfos.gender
              }}</span>
            </h4>
          </div>
          <div class="userInfoItem">
            <h4>
              生日:
              <span style="font-size: 0.8rem; color: #3a354199">{{
                userInfos.birthday
              }}</span>
            </h4>
          </div>
          <div class="userInfoItem">
            <h4>
              电话:
              <span style="font-size: 0.8rem; color: #3a354199">{{
                userInfos.phone
              }}</span>
            </h4>
          </div>
          <div class="userInfoItem">
            <h4>
              地址:
              <span style="font-size: 0.8rem; color: #3a354199">{{
                userInfos.address
              }}</span>
            </h4>
          </div>
          <div class="userInfoItem">
            <h4>
              个人简介:
              <span style="font-size: 0.8rem; color: #3a354199">{{
                userInfos.introduction
              }}</span>
            </h4>
          </div>
        </div>
        <div class="userinfobtn">
          <v-btn color="#9155fd" style="color: white" @click="editInfo()"
            >编辑</v-btn
          >
        </div>
      </div>
      <div class="profileRight">
        <div class="profileNav">
          <v-tabs
            v-model="tabIndex"
            background-color="transparent"
            color="black"
            center-active
          >
            <v-tab
              v-for="(item, index) of profileNav"
              :key="index"
              @click="
                $router.push({ path: item.url });
                tabIndex = index;
              "
            >
              <v-icon color="red darken-2" class="ma-1">
                {{ item.icon }}</v-icon
              >
              {{ item.NavName }}
            </v-tab>
          </v-tabs>
        </div>
        <v-dialog v-model="dialog" max-width="800px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Edit Details</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-form ref="cardform" v-model="valid" lazy-validation>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.username"
                        label="姓名"
                        :rules="NameRules"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.user_email"
                        label="Email"
                        :rules="emailRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-select
                        :items="Genderitems"
                        v-model="editedItem.gender"
                        label="性别"
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.phone"
                        label="电话"
                        :rules="PhoneRules"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <!-- <v-text-field
                      v-model="editedItem.birthday"
                      label="Birthday"
                    ></v-text-field> -->
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="date"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.birthday"
                            label="生日"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">
                            取消
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="saveBirthday(date)"
                          >
                            选择
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                      <v-text-field
                        v-model="editedItem.address"
                        label="地址"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-textarea
                        filled
                        name="input-7-4"
                        label="个人简介"
                        :value="editedItem.introduction"
                        v-model="editedItem.introduction"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-btn color="light-green accent-4" @click="autoComplete()">生成</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> 取消 </v-btn>
              <v-btn
                color="blue darken-1"
                :loading="saveloading"
                text
                @click="validate()"
              >
                保存
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <div class="profileMain">
          <router-view></router-view>
        </div>
      </div>
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
import { mapState } from "vuex";
import { changeUserInfo, OssuploadNewsImg } from "@/plugins/http";
import moment from "moment";
export default {
  data: () => ({
    editedItem: {
      username: "",
      user_email: "",
      gender: "",
      birthday: "",
      phone: "",
      address: "",
      introduction: "",
      LicenseID: "",
    },
    defaultItem: {
      username: "",
      user_email: "",
      gender: "",
      birthday: "",
      phone: "",
      address: "",
      introduction: "",
      LicenseID: "",
    },
    DeletefileItem: [],
    isSnackbar: false,
    isSnackbarSuccess: null,
    menu: false,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),

    NameRules: [(v) => !!v || "姓名是必填的"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "请填写正确的邮箱",
    ],
    PhoneRules: [
      (v) => !!v || "Phone is required",
      (v) => /^1[34578]\d{9}$/.test(v) || "电话是必填的",
    ],
    valid: true,

    Genderitems: ["男", "女", "保密"],

    dialog: false,
    dialogDelete: false,
    saveloading: false,
    isSnackbar: false,
    isSnackbarSuccess: null,

    tabIndex: null,
    profileNav: [
      {
        index: 0,
        NavName: "我的收藏",
        icon: "mdi-heart-outline",
        url: "/profile/favourite",
      },
      {
        index: 1,
        NavName: "账号安全",
        icon: "mdi-lock-outline",
        url: "/profile/security",
      },
      {
        index: 2,
        NavName: "邮箱信息",
        icon: "mdi-bell-outline",
        url: "/profile/notifications",
      },
      {
        index: 3,
        NavName: "门票信息",
        icon: "mdi-ticket-confirmation-outline",
        url: "/profile/tickets",
      },
      {
        index: 4,
        NavName: "申请",
        icon: "mdi-note-edit-outline",
        url: "/profile/apply/applydriver",
      },
    ],
  }),
  computed: {
    ...mapState("user", ["userInfos"]),
    snackbarTitle() {
      return this.isSnackbarSuccess === true
        ? "操作成功"
        : "操作失败";
    },
  },
  methods: {
    autoComplete(){
      this.editedItem.address='福建江夏学院13号楼715宿舍';
      this.editedItem.birthday="March 30, 2023";
      this.editedItem.gender='男'
      this.editedItem.introduction='大角牛，冲冲冲！'
      this.editedItem.phone='15980618073'
      this.editedItem.username='林伟博'
    },
    saveBirthday(date) {
      this.editedItem.birthday = moment(date).format("LL");
      this.menu = false;
    },
    editInfo() {
      Object.keys(this.editedItem).forEach((k) => {
        this.editedItem[k] = this.userInfos[k];
      });
      this.DeletefileItem[0] = this.editedItem.avatar;
      this.dialog = true;
    },
    uploadAvatar() {
      this.$refs.uploadAvatar.click();
    },
    async changeAvatar() {
      let uploadbtn = this.$refs.uploadAvatar;
      const file = uploadbtn.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      var formData = new FormData();
      formData.append("file", file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/another/avatar",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      if (res.data.href) {
        Object.keys(this.editedItem).forEach((k) => {
          this.editedItem[k] = this.userInfos[k];
        });
        this.editedItem.avatar = res.data.href;
        const changeUserInfores = await changeUserInfo({
          editedItem: this.editedItem,
        });
        if ((changeUserInfores.data.Operation = "success")) {
          this.isSnackbarSuccess = true;
          this.isSnackbar = true;
          setTimeout(() => {
            this.isSnackbar = false;
            window.location.reload();
          }, 2500);
        } else {
          this.isSnackbarSuccess = false;
          this.isSnackbar = true;
          setTimeout(() => {
            this.isSnackbar = false;
          }, 2500);
        }
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        this.snackbarTitle = "Upload Avatar Fail!";
        setTimeout(() => {
          this.isSnackbar = false;
        }, 5000);
        return false;
      }
    },

    validate() {
      this.$refs.cardform.validate() ? this.save() : (this.valid = false);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      });
    },

    async save() {
      this.saveloading = true;
      const res = await changeUserInfo({ editedItem: this.editedItem });
      if ((res.data.Operation = "success")) {
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
        }, 2500);
        this.close();
        this.saveloading = false;
        setTimeout(() => {
          this.isSnackbar = false;
          window.location.reload();
        }, 1500);
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
        }, 2500);
        this.close();
        this.saveloading = false;
      }
    },
  },
  mounted() {
    this.profileNav.forEach((item, index) => {
      if (this.$route.path == item.url) {
        this.tabIndex = index;
      }
    });
  },
};
</script>

<style scoped lang="scss">
#upload {
  height: 0;
  width: 0;
  display: none;
}
.profile {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(244, 245, 250);
  .profile_container {
    display: flex;
    justify-content: center;
    padding: 80px 0 0 0;
    width: 80%;
    min-height: 700px;
    margin-bottom: 50px;
    .profileLeft {
      width: 30%;
      height: 90%;
      min-height: 627px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: white;
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
        0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
      .userInfocontainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 40%;
        padding: 20px;
        row-gap: 30px;
        .userprofile {
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          .roleChips {
            background-color: rgb(255 102 102 / 15%);
            border-color: red;
            color: red;
            text-align: center !important;
            border-radius: 5px;
            padding: 3px;
            margin: 5px;
            font-size: 0.8rem;
            font-family: heavy;
            display: inline;
          }
          .userName {
            font-size: 1.25rem !important;
            font-weight: 500;
            line-height: 2rem;
            letter-spacing: 0.0094rem !important;
            font-family: Heavy;
            text-transform: none !important;
          }
        }
      }
      .userinfoDetail {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        height: 40%;
        padding: 20px;
      }
      .userinfobtn {
        display: flex;
        justify-content: center;
        padding: 5px 0 20px 0;
      }
    }
    .profileRight {
      width: 65%;
      padding: 0 0 0 50px;
      display: flex;
      flex-direction: column;
      .profileNav {
        max-width: 100%;
      }
      .profileMain {
        margin-top: 10px;
        width: 100%;
      }
    }
  }
}
</style>