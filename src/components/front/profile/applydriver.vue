<template>
  <!-- 1.个人基础信息 2.身体基本素质体检证明 3.机动车驾驶证号码  补充：4.未成年需监护人同意书 -->
  <v-app>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <div v-for="n in steps" :key="`${n}-step`">
          <v-stepper-step :complete="e1 > n" :step="n">
            Step {{ n }}
          </v-stepper-step>

          <v-divider v-if="n !== steps" :key="n"></v-divider>
        </div>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n">
          <v-card
            class="mb-12 card-main-step1 cards"
            color="grey lighten-4"
            min-height="200px"
            v-show="n == 1"
          >
            <div class="preload" v-if="Preloading">
              <v-progress-circular
                indeterminate
                color="red"
                class="progress"
              ></v-progress-circular>
              <div class="card-title">正在验证身份证信息</div>
            </div>
            <div class="preloadfail" v-if="!Preloading && hasVertify == false">
              <v-icon color="error">mdi-alert-circle</v-icon>
              <div class="card-title" style="color: #e53935">
                对不起, 你还未进行身份证认证，请先进行身份认证后申请 !
              </div>
              <v-btn
                @click="$router.push('/profile/security')"
                style="color: #42a5f5; font-size: 0.75rem"
                text
                >前去身份认证</v-btn
              >
            </div>
          </v-card>
          <v-card
            class="mb-12 card-main-step2 cards"
            min-height="200px"
            v-show="n == 2"
          >
            <v-img src=""></v-img>
            <div class="card-title">License</div>
            <div class="card-license">
              <v-form ref="cardform" v-model="valid" lazy-validation>
                <v-combobox
                  v-model="select"
                  :items="items"
                  label="驾照"
                  outlined
                  dense
                ></v-combobox>
                <v-file-input
                  v-model="licensefile"
                  label="驾照图"
                  hide-details
                  @change="previewlicenseImage"
                  accept="image/*"
                ></v-file-input>
                <v-img
                  :src="
                    licenseUrl
                      ? licenseUrl
                      : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                  "
                  width="128"
                  height="128"
                  class="ma-4"
                ></v-img>
                <v-text-field
                  v-model="licenseid"
                  :rules="rules"
                  :counter="10"
                  label="驾照号码"
                  required
                ></v-text-field>
                <v-file-input
                  v-model="physicalfile"
                  label="身体体检表"
                  hide-details
                  @change="previewphysicalImage"
                  accept="image/*"
                ></v-file-input>
                <v-img
                  :src="
                    physicalUrl
                      ? physicalUrl
                      : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                  "
                  width="128"
                  height="128"
                  class="ma-4"
                ></v-img>
                <v-text-field
                  v-model="physicalid"
                  :rules="rules"
                  :counter="10"
                  label="体检号"
                  required
                ></v-text-field>
              </v-form>
            </div>
          </v-card>
          <v-card
            class="mb-12 card-main-step3 cards"
            min-height="200px"
            v-show="n == 3"
          >
            <div class="pa-4 text-center">
              <v-img
                class="mb-4"
                contain
                height="128"
                src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/logo.svg"
              ></v-img>
              <h3 class="text-h5 font-weight-light mb-2">申请成功!</h3>
              <span class="text-caption grey--text"
                >我们将会在 1-3 个工作日回复您!</span
              >
            </div>
          </v-card>
          <v-btn
            :disabled="!valid"
            v-if="n !== steps"
            :loading="Preloading"
            color="primary"
            @click="validate()"
          >
            下一步
          </v-btn>
          <v-btn
            text
            v-if="n !== 1 && hasLicense != true && hasVertify != true"
            @click="backStep(n)"
          >
            取消
          </v-btn>
          <v-btn color="light-green accent-4" v-if="physicalUrl && n===2" @click="autoComplete()">生成</v-btn>

        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
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
import { mapState } from "vuex";
import { Driverapply, OssuploadNewsImg } from "@/plugins/http";
export default {
  data() {
    return {
      e1: null,
      steps: 3,
      Preloading: true,
      isSnackbar: false,
      isSnackbarSuccess: false,
      //license
      select: "Formula Ford",
      licenseid: "",
      physicalid: "",
      physicalimageUrl: "",
      physicalUrl: "",
      licenseimageUrl: "",
      licenseUrl: "",
      physicalfile: "",
      licensefile: "",

      hasVertify: false,
      hasLicense: false,
      items: ["F3000", "Formula Ford", "Formula Renault", "GP2"],
      rules: [
        (v) => !!v || "license is required",
        (v) => v.length <= 10 || "license must be less than 10 characters",
      ],
      valid: true,
    };
  },

  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    },
  },

  computed: {
    snackbarTitle() {
      return this.isSnackbarSuccess === true
        ? "操作成功"
        : "操作失败";
    },
    ...mapState("user", ["userInfos"]),
  },

  methods: {
    nextStep(n) {
      this.e1 = n + 1;
    },
    backStep(n) {
      this.e1 = n - 1;
    },
    autoComplete(){
        this.licenseid='3200001985';
        this.physicalid="198375998E";
    },
    validate() {
      const result = [];
      this.$refs.cardform.forEach((i) => {
        if (!i.validate()) {
          result.push(i.validate());
        }
      });
      if (result.length == 0 && this.e1 == 2) {
        this.Driverapply();
      } else {
        this.valid = false;
      }
    },
    async Driverapply() {
      this.Preloading = true;
      const res = await Driverapply({
        LicenseID: this.licenseid,
        LicenseName: this.select,
        physicalimageUrl: this.physicalimageUrl,
        licenseimageUrl: this.licenseimageUrl,
        physicalid: this.physicalid,
        title: "车手注册申请",
        content: "车手注册申请",
      });
      console.log(res);
      
      if (res.data.Operation == "success") {
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
          this.Preloading = false;
          this.e1 = this.e1 + 1;
        }, 2500);
      } else {
        this.e1 = 2;
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
          this.Preloading = false;
        }, 2500);
      }
    },
    async previewlicenseImage() {
      if (!this.licensefile) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.licensefile);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      console.log(res);
      this.licenseimageUrl = res.data.href;
      const reader = new FileReader();
      reader.readAsDataURL(this.licensefile);
      reader.onload = () => {
        this.licenseUrl = reader.result;
      };
    },
    async previewphysicalImage() {
      if (!this.physicalfile) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.physicalfile);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      console.log(res);

      this.physicalimageUrl = res.data.href;
      const reader = new FileReader();
      reader.readAsDataURL(this.physicalfile);
      reader.onload = () => {
        this.physicalUrl = reader.result;
      };
    },
  },
  mounted() {
    console.log(this.userInfos);

    if (this.userInfos.VertifyID) {
      setTimeout(() => {
        this.hasVertify = true;
        this.e1 = 2;
        console.log(this.userInfos);
        
        if (this.userInfos.LicenseID) {
          setTimeout(() => {
            this.hasLicense = true;
            this.Preloading = false;
            this.e1 = 3;
          }, 1500);
        } else {
          setTimeout(() => {
            this.hasLicense = false;
            this.Preloading = false;
          }, 1500);
        }
      }, 1500);
    } else {
      setTimeout(() => {
        this.Preloading = false;
        this.hasVertify = false;
      }, 1500);
    }
  },
};
</script>

<style lang="scss">
.apply-main .v-application--wrap {
  min-height: 300px !important;
}
.cards {
  box-shadow: none !important;
}
.card-main-step1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .preload {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
  }
  .preloadfail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 10px;
  }
  .card-title {
    font-family: Heavy;
    font-size: 1.25rem;
  }
}
.card-main-step2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 20px;
  .card-title {
    font-family: Heavy;
    font-size: 1.25rem;
  }
}
</style>