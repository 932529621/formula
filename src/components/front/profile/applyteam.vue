<template>
  <!--  1.车队基本信息 车队名、车队队徽、车队简述、车队基地地址（场地所有权或场地租赁凭证） 2.体育赛事活动 经营许可证 3.车队赛车信息 赛车参数 车辆所有权文件 -->

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
            <div class="card-title">Basic Info</div>
            <div class="card-license">
              <v-form ref="cardform" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="form.full_teamname"
                  :rules="rules"
                  :counter="10"
                  label="队名"
                  outlined
                  required
                ></v-text-field>
                <v-file-input
                  v-model="file"
                  label="队徽"
                  hide-details
                  @change="previewImage"
                  accept="image/*"
                ></v-file-input>
                <v-img
                  :src="
                    imageUrl
                      ? imageUrl
                      : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                  "
                  width="128"
                  height="128"
                  class="ma-4"
                ></v-img>
                <v-text-field
                  v-model="form.base"
                  :rules="rules"
                  :counter="10"
                  label="基地地址"
                  outlined
                  required
                ></v-text-field>
                <v-textarea
                  v-model="form.team_biography"
                  outlined
                  required
                  :rules="rules"
                  label="车队介绍"
                  no-resize
                ></v-textarea>
              </v-form>
            </div>
          </v-card>
          <v-card
            class="mb-12 card-main-step2 cards"
            min-height="200px"
            v-show="n == 3"
          >
            <div class="card-title">License</div>
            <div class="card-license">
              <v-form ref="cardform" v-model="valid" lazy-validation>
                <v-file-input
                  v-model="Placefile"
                  label="场地所有权或场地租赁证明"
                  hide-details
                  @change="previewPlaceImage"
                  accept="image/*"
                ></v-file-input>
                <v-img
                  :src="
                    PlaceimageUrl
                      ? PlaceimageUrl
                      : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                  "
                  width="128"
                  height="128"
                  class="ma-4"
                ></v-img>
                <v-text-field
                  v-model="form.licensePlaceid"
                  :rules="rules"
                  :counter="10"
                  label="场地所有权或场地租赁证明号"
                  outlined
                  required
                ></v-text-field>
                <v-file-input
                  v-model="Businessfile"
                  label="营业执照"
                  hide-details
                  @change="previewBusinessImage"
                  accept="image/*"
                ></v-file-input>
                <v-img
                  :src="
                    BusinessimageUrl
                      ? BusinessimageUrl
                      : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                  "
                  width="128"
                  height="128"
                  class="ma-4"
                ></v-img>
                <v-text-field
                  v-model="form.licenseBusinessid"
                  :rules="rules"
                  :counter="10"
                  label="营业执照号"
                  outlined
                  required
                ></v-text-field>
              </v-form>
            </div>
          </v-card>
          <v-card
            class="mb-12 card-main-step2 cards"
            min-height="200px"
            v-show="n == 4"
          >
            <div class="card-title">Car Info</div>
            <div class="card-license" v-show="licensecard == true">
              <v-form ref="cardform" v-model="valid" lazy-validation>
                <v-file-input
                  v-model="carfile"
                  label="车辆所有权"
                  hide-details
                  @change="previewcarImage"
                  accept="image/*"
                ></v-file-input>
                <v-img
                  :src="
                    carimageUrl
                      ? carimageUrl
                      : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                  "
                  width="128"
                  height="128"
                  class="ma-4"
                ></v-img>
                <v-text-field
                  v-model="form.licensecarid"
                  :rules="rules"
                  :counter="10"
                  label="车辆所有权号"
                  outlined
                  required
                ></v-text-field>
              </v-form>
            </div>

            <div class="pa-4 text-center" v-show="submitCarInfo">
              <v-img
                class="mb-4"
                contain
                height="128"
                src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/logo.svg"
              ></v-img>
              <h3 class="text-h5 font-weight-light mb-2">车辆信息上传成功!</h3>
              <span class="text-caption grey--text"
                >我们将会在
                1-3个工作日回复您!请您时刻留意车辆信息审核结果，我们将在通过车辆信息检测后，对您进行最后的实地考察</span
              >
              <!-- 恭喜你！通过了车辆信息审核，请您使用账号：xxx，密码：xxx，登录并支付审核费用，我们将委派审核员对您进行最后的实地考察。 -->
            </div>
            <div
              class="pa-4 text-center"
              v-show="CarInforeview == true && e1 == 4"
            >
              <v-img
                class="mb-4"
                contain
                height="128"
                src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/logo.svg"
              ></v-img>
              <h3 class="text-h5 font-weight-light mb-2">车辆信息审核通过!</h3>
              <span class="text-caption grey--text"
                >请您登录并支付审核费用，我们将委派审核员进行最后的实地考察!</span
              >
              <v-btn
                @click="$router.push('/Adminlogin')"
                style="color: #42a5f5; font-size: 0.75rem"
                text
                >前去支付</v-btn
              >
            </div>
            <div class="preloadfails" v-show="CarInforeview == false && e1 == 4">
              <v-icon color="error">mdi-alert-circle</v-icon>
              <div class="card-title" style="color: #e53935">
                对不起, 你的审核未通过，请修改后重新提交 !
              </div>
              <v-btn
                @click="retry()"
                style="color: #42a5f5; font-size: 0.75rem"
                text
                >前去修改</v-btn
              >
            </div>
          </v-card>
          <v-card
            class="mb-12 card-main-step3 cards"
            min-height="200px"
            v-show="n == 5"
          >
            <div class="pa-4 text-center" v-show="passAllinfo == true">
              <v-img
                class="mb-4"
                contain
                height="128"
                src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/logo.svg"
              ></v-img>
              <h3 class="text-h5 font-weight-light mb-2">
                您的审核已全部通过!
              </h3>
              <span class="text-caption grey--text"
                >请您登录后台进行相应的事宜处理!</span
              >
              <v-btn
                @click="$router.push('/Adminlogin')"
                style="color: #42a5f5; font-size: 0.75rem"
                text
                >前去登录</v-btn
              >
            </div>
          </v-card>
          <v-btn
            :disabled="!valid"
            v-if="n !== steps && n != 4"
            :loading="Preloading"
            color="primary"
            @click="validate()"
          >
            下一步
          </v-btn>
          <v-btn
            v-if="n == 4"
            :loading="Preloading"
            color="green"
            text
            @click="Teamapply()"
          >
            提交
          </v-btn>
          <v-btn color="light-green accent-4" v-if="form.team_icon" @click="autoComplete()">生成</v-btn>
          <v-btn text v-if="n !== 1" @click="backStep(n)"> 取消 </v-btn>
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
import { Teamapply, OssuploadNewsImg, getTeamreviewByIdInfo } from "@/plugins/http";
export default {
  data() {
    return {
      e1: 1,
      steps: 5,
      Preloading: false,
      isSnackbar: false,
      isSnackbarSuccess: false,
      snackbarTitle:'',
      //license
      passAllinfo: false,
      hasVertify: false,
      submitCarInfo: null,
      CarInforeview: null,
      licensecard: true,


      rules: [(v) => !!v || "此项目是必填的"],
      valid: true,

      file: null,
      Placefile: null,
      Businessfile: null,
      carfile: null,
      imageUrl: null,
      PlaceimageUrl: null,
      BusinessimageUrl: null,
      carimageUrl: null,
      form: {
        id: null,

        team_icon: "",
        Placeurl: "",
        BusinessUrl: "",
        carUrl: "",

        full_teamname: "",
        base: "",
        team_biography: "",

        licensePlaceid: "",
        licenseBusinessid: "",
        licensecarid: "",
      },
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
    ...mapState("user", ["userInfos"]),
  },

  methods: {
    autoComplete(){
      if(this.e1 ===2){
        this.form.full_teamname='好运来车队'
        this.form.base='福建江夏学院'
        this.form.team_biography='冲冲冲'
      }
      if(this.e1 ===3){
        this.form.licenseBusinessid='RWQE23552'
        this.form.licensePlaceid='OPT0946664'
      }
      if(this.e1 === 4){
        this.form.licensecarid='TWE2316437'
      }
    },
    nextStep(n) {
      this.e1 = n + 1;
    },
    backStep(n) {
      this.e1 = n - 1;
    },
    validate() {
      const result = [];
      this.$refs.cardform.forEach((i) => {
        if (!i.validate()) {
          result.push(i.validate());
        }
      });
      console.log(result.length);
      
      if (result.length <= 10) {
        this.e1 = this.e1 + 1;
      } else {
        this.valid = false;
      }
    },
    retry(){
      this.e1=2;
      this.CarInforeview=null;
      this.licensecard=true;
    },

    async Teamapply() {
      this.Preloading = true;
      const res = await Teamapply(this.form);
      if (res.data.Operation == "success") {
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
          this.Preloading = false;
          this.submitCarInfo = true;
          this.licensecard=false;
          this.valid=false;
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
    async previewImage() {
      if (!this.file) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      console.log(res);
      this.form.team_icon = res.data.href;
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    },
    async previewPlaceImage() {
      if (!this.Placefile) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.Placefile);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      console.log(res);

      this.form.Placeurl = res.data.href;
      const reader = new FileReader();
      reader.readAsDataURL(this.Placefile);
      reader.onload = () => {
        this.PlaceimageUrl = reader.result;
      };
    },
    async previewBusinessImage() {
      if (!this.Businessfile) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.Businessfile);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      this.form.BusinessUrl = res.data.href;
      const reader = new FileReader();
      reader.readAsDataURL(this.Businessfile);
      reader.onload = () => {
        this.BusinessimageUrl = reader.result;
      };
    },
    async previewcarImage() {
      if (!this.carfile) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.carfile);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      this.form.carUrl = res.data.href;
      const reader = new FileReader();
      reader.readAsDataURL(this.carfile);
      reader.onload = () => {
        this.carimageUrl = reader.result;
      };
    },
  },
  async mounted() {
    this.Preloading = true;
    const res = await getTeamreviewByIdInfo();
    if (res.data.TeamreviewByIdInfo[0]) {
      this.form.id=res.data.TeamreviewByIdInfo[0].id;
      if (res.data.TeamreviewByIdInfo[0].status == "info pass") {
        setTimeout(() => {
          this.CarInforeview = true;
          this.licensecard=false;
          this.valid=false;
          this.Preloading=false;
          this.e1 = 4;
        }, 1500);
      } else if(res.data.TeamreviewByIdInfo[0].status == "pass") {
        setTimeout(() => {
          this.CarInforeview = false;
          this.licensecard=false;
          this.passAllinfo=true;
          this.Preloading=false;
          this.e1 = 5;
        }, 1500);
      }else if(res.data.TeamreviewByIdInfo[0].status == "will check"){
        setTimeout(() => {
          this.licensecard=false;
          this.submitCarInfo=true;
          this.valid=false;
          this.Preloading=false;
          this.e1 = 4;
        }, 1500);
      }else{
        setTimeout(() => {
          this.CarInforeview = false;
          this.licensecard=false;
          this.e1 = 4;
        }, 1500);
        this.form=res.data.TeamreviewByIdInfo[0];
        this.valid=false;
        this.Preloading=false;
      }
    }else{
      if(this.userInfos.VertifyID){
        setTimeout(() => {
          this.hasVertify=true;
          this.Preloading=false;
          this.e1 = 2;
        }, 1500);
      } else{
        setTimeout(() => {
          this.hasVertify=false;
          this.Preloading=false;
        }, 1500);
      }     
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
.preloadfails {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 10px;
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