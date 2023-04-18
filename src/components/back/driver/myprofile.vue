<template>
  <v-app>
    <v-card>
      <v-card-text>
        <v-container>
          <v-card class="mx-auto" min-width="90%" outlined>
            <v-list-item>
              <v-list-item-content>
                <div
                  class="text-overline mb-4"
                  style="font-size: 1.4rem !important"
                >
                  Basic Info
                </div>
                <div class="basicinfo">
                  <div class="column-info">
                    <p class="font-weight-blod cards-title">姓名</p>
                    <p class="cards-content">{{ editedItems.name }}</p>
                  </div>
                  <v-divider></v-divider>
                  <div class="column-info">
                    <p class="font-weight-blod cards-title">国家</p>
                    <p class="cards-content">{{ editedItems.country }}</p>
                    <v-img
                      max-width="100px"
                      :src="editedItems.nation_icon"
                    ></v-img>
                  </div>
                  <v-divider></v-divider>
                  <div class="column-info">
                    <p class="font-weight-blod cards-title">出生地</p>
                    <p class="cards-content">
                      {{ editedItems.place_of_birth }}
                    </p>
                  </div>
                  <v-divider></v-divider>
                  <div class="column-info">
                    <p class="font-weight-blod cards-title">生日</p>
                    <p class="cards-content">{{ editedItems.birth }}</p>
                  </div>
                  <v-divider></v-divider>
                  <div class="column-info">
                    <p class="font-weight-blod cards-title">个人简介</p>
                    <p
                      class="cards-content"
                      v-html="editedItems.driver_biography"
                    ></p>
                  </div>
                  <v-divider></v-divider>
                  <v-btn @click="editprofile()" text color="green">编辑</v-btn>
                </div>
              </v-list-item-content>
              <v-list-item-avatar tile size="80">
                <v-img :src="editedItems.avatar"></v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
          <v-card class="mx-auto" min-width="90%" outlined>
            <v-list-item>
              <v-list-item-content>
                <div
                  class="text-overline mb-4"
                  style="font-size: 1.4rem !important"
                >
                  Driver Info
                </div>
                <div class="basicinfo">
                  <div class="column-info">
                    <p class="font-weight-blod cards-title">车手头盔</p>
                  </div>
                  <v-divider></v-divider>
                  <div class="column-info">
                    <v-img
                      max-width="500px"
                      :src="editedItems.driver_helmet"
                      class="cards-content"
                    ></v-img>
                  </div>
                  <v-divider></v-divider>
                  <div class="column-info">
                    <p class="font-weight-blod cards-title">半身照</p>
                  </div>
                  <v-divider></v-divider>
                  <div class="column-info">
                    <v-img
                      max-width="500px"
                      :src="editedItems.driver_pic"
                      class="cards-content"
                    ></v-img>
                  </div>
                  <v-divider></v-divider>
                  <div class="column-info">
                    <p class="font-weight-blod cards-title">车手号码</p>
                    <p class="cards-content">{{ editedItems.driver_number }}</p>
                  </div>
                  <v-divider></v-divider>
                  <div class="column-info">
                    <v-img
                      max-width="500px"
                      :src="editedItems.driver_number_icon"
                      class="cards-content"
                    ></v-img>
                  </div>
                  <v-divider></v-divider>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-card>
          <v-card class="mx-auto" min-width="90%" outlined>
            <v-list-item>
              <v-list-item-content>
                <div
                  class="text-overline mb-4"
                  style="font-size: 1.4rem !important"
                >
                  License Info
                </div>
                <div class="basicinfo">
                  <div class="column-info">
                    <p class="font-weight-blod cards-title">驾照积分：</p>
                    <p class="cards-content">
                      {{ editedItems.licenseScore }}
                    </p>
                  </div>
                  <v-divider></v-divider>
                  <div class="column-info">
                    <p class="font-weight-blod cards-title">车手等级</p>
                    <p class="cards-content">{{ driverGrade }}</p>
                  </div>
                  <v-divider></v-divider>
                </div>
              </v-list-item-content>
              <v-list-item-avatar tile size="80">
                <v-img :src="editedItems.driver_half_pic"></v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
          <div id="chart" class="capacity"></div>
          <div id="charts" class="achievement"></div>
        </v-container>
      </v-card-text>
    </v-card>
    <v-dialog v-model="profiledialog" persistent max-width="800px">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  label="姓名"
                  required
                  v-model="editedItem.name"
                ></v-text-field>
              </v-col>
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
                    <v-btn text color="primary" @click="saveBirthday(date)">
                      选择
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-text-field
                  label="出生地"
                  required
                  v-model="editedItem.place_of_birth"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  :items="[
                    'Abu_Dhabi',
                    'Australia',
                    'Austria',
                    'Azerbaijan',
                    'Bahrain',
                    'Belgium',
                    'Brazil',
                    'Canada',
                    'China',
                    'Denmark',
                    'England',
                    'Finland',
                    'France',
                    'Germany',
                    'Hungary',
                    'Italy',
                    'Japan',
                    'Mexico',
                    'Monaco',
                    'Netherland',
                    'Saudi_Arab',
                    'Singapore',
                    'Spain',
                    'Thailand',
                    'United State',
                  ]"
                  label="国家"
                  v-model="editedItem.country"
                  required
                ></v-select>
              </v-col>
              <v-col>
                <v-img
                  label="国家"
                  max-width="150px"
                  :src="`https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/schedule/nation_icon/${editedItem.country}.png`"
                ></v-img>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-file-input
                  v-model="profile1"
                  label="个人简介图"
                  hide-details
                  @change="profile1img()"
                  accept="image/*"
                ></v-file-input>
                <v-img
                  :src="
                    profileUrlObj.profile1Url
                      ? profileUrlObj.profile1Url
                      : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                  "
                  width="128"
                  height="128"
                  class="ma-4"
                ></v-img>
                <v-text-field
                  v-model="profileUrlObj.img1intro"
                  :rules="rules"
                  label="图片简介"
                  required
                ></v-text-field>
              </v-col>
              <v-col>
                <v-file-input
                  v-model="profile2"
                  label="个人简介图"
                  hide-details
                  @change="profile2img()"
                  accept="image/*"
                ></v-file-input>
                <v-img
                  :src="
                    profileUrlObj.profile2Url
                      ? profileUrlObj.profile2Url
                      : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                  "
                  width="128"
                  height="128"
                  class="ma-4"
                ></v-img>
                <v-text-field
                  v-model="profileUrlObj.img2intro"
                  :rules="rules"
                  label="图片简介"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-file-input
                  v-model="profile3"
                  label="个人简介图"
                  hide-details
                  @change="profile3img()"
                  accept="image/*"
                ></v-file-input>
                <v-img
                  :src="
                    profileUrlObj.profile3Url
                      ? profileUrlObj.profile3Url
                      : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                  "
                  width="128"
                  height="128"
                  class="ma-4"
                ></v-img>
                <v-text-field
                  v-model="profileUrlObj.img3intro"
                  :rules="rules"
                  label="图片简介"
                  required
                ></v-text-field>
              </v-col>
              <v-col>
                <v-file-input
                  v-model="profile4"
                  label="个人简介图"
                  hide-details
                  @change="profile4img()"
                  accept="image/*"
                ></v-file-input>
                <v-img
                  :src="
                    profileUrlObj.profile4Url
                      ? profileUrlObj.profile4Url
                      : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                  "
                  width="128"
                  height="128"
                  class="ma-4"
                ></v-img>
                <v-text-field
                  v-model="profileUrlObj.img4intro"
                  :rules="rules"
                  label="图片简介"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-file-input
                  v-model="profile5"
                  label="个人简介图"
                  hide-details
                  @change="profile5img()"
                  accept="image/*"
                ></v-file-input>
                <v-img
                  :src="
                    profileUrlObj.profile5Url
                      ? profileUrlObj.profile5Url
                      : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                  "
                  width="128"
                  height="128"
                  class="ma-4"
                ></v-img>
                <v-text-field
                  v-model="profileUrlObj.img5intro"
                  :rules="rules"
                  label="图片简介"
                  required
                ></v-text-field>
              </v-col>
              <v-col>
                <v-file-input
                  v-model="profile6"
                  label="个人简介图"
                  hide-details
                  @change="profile6img()"
                  accept="image/*"
                ></v-file-input>
                <v-img
                  :src="
                    profileUrlObj.profile6Url
                      ? profileUrlObj.profile6Url
                      : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                  "
                  width="128"
                  height="128"
                  class="ma-4"
                ></v-img>
                <v-text-field
                  v-model="profileUrlObj.img6intro"
                  :rules="rules"
                  label="图片简介"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div style="border: 1px solid #ccc">
                  <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editor"
                    :defaultConfig="toolbarConfig"
                    :mode="mode"
                  />
                  <Editor
                    style="height: 500px; overflow-y: hidden"
                    v-model="editedItem.driver_biography"
                    :defaultConfig="editorConfig"
                    :mode="mode"
                    @onCreated="onCreated"
                  />
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="profiledialog = false">
            取消
          </v-btn>
          <v-btn
            color="blue darken-1"
            :loading="Preloading"
            text
            @click="saveProfile()"
          >
            保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  getreviewinfo,
  getDriverTrain,
  getDriverAchieve,
  getDriverDetail,
  getBackUserInfo,
  OssuploadNewsImg,
  addOrUpdateDriverdetail,
  insertProfileImg,
} from "@/plugins/http";
import { mapState } from "vuex";
import moment from "moment";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import * as echarts from "echarts";
export default {
  components: { Editor, Toolbar },
  data() {
    return {
      dialog: false,
      driverGrade: null,
      selectedItems: [],
      profiledialog: false,
      // editeddisabled:[],
      craftValue: [],
      craftItem: [],
      achieveValue: [],
      achieveItem: [],

      Preloading: false,
      isSnackbar: false,
      isSnackbarSuccess: false,
      //editor
      editor: null,
      toolbarConfig: {},
      editorConfig: {
        placeholder: "请输入内容...",
        MENU_CONF: {
          uploadImage: {
            customUpload: this.uploadImages,
          },
        },
      },
      mode: "default", // or 'simple'
      dialog: false,
      dialogDelete: false,
      search: "",
      selected: [],
      roleInfo: [],
      menu: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "role_id",
        },
        { text: "Role", value: "role_name" },
        { text: "Permission", value: "role_permission" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItems: {},
      editedItem: {},
      defaultItem: {
        role_id: "",
        role_name: "",
        role_permission: [],
        route_id: [],
      },
      profile1: null,
      profile2: null,
      profile3: null,
      profile4: null,
      profile5: null,
      profile6: null,

      profileUrlObj: {
        profile1Url: null,
        profile2Url: null,
        profile3Url: null,
        profile4Url: null,
        profile5Url: null,
        profile6Url: null,
        img1intro: "",
        img2intro: "",
        img3intro: "",
        img4intro: "",
        img5intro: "",
        img6intro: "",
      },

      valid: true,
      rules: [(v) => !!v || "此项是必填的"],
    };
  },
  computed: {
    snackbarTitle() {
      return this.isSnackbarSuccess === true ? "操作成功" : "操作失败";
    },
    ...mapState("Backuser", ["BackuserInfos"]),
  },
  watch: {
    "editedItem.country"(val) {
      console.log(val);
      this.editedItem.nation_icon = `https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/schedule/nation_icon/${val}.png`;
    },
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },

  methods: {
    async initialize() {
      const UserInfo = await getBackUserInfo();
      console.log(UserInfo.data.BackUserInfo.email);
      const userdetail = await getDriverDetail({
        user_email: this.BackuserInfos.email,
      });
      const DriverTrain = await getDriverTrain({
        user_email: UserInfo.data.BackUserInfo.email,
      });
      const DriverAchieve = await getDriverAchieve({
        user_email: UserInfo.data.BackUserInfo.email,
      });

      for (const key in DriverTrain.data.trainfo) {
        console.log(key);
        this.craftItem.push({ name: key, max: 100 });
        this.craftValue.push(DriverTrain.data.trainfo[key]);
      }
      for (const key in DriverAchieve.data.achieveinfo) {
        this.achieveItem.push(key);
        this.achieveValue.push(DriverAchieve.data.achieveinfo[key]);
      }

      this.editedItems = userdetail.data.DriverDetail;
      let driverGrade;
      var score = this.editedItems.licenseScore;
      switch (true) {
        case score >= 240:
          driverGrade = "S";
          break;
        case score >= 200:
          driverGrade = "A";
          break;
        case score >= 150:
          driverGrade = "B";
          break;
        case score >= 100:
          driverGrade = "C";
          break;
        case score >= 80:
          driverGrade = "D";
          break;
        default:
          driverGrade = "吊销";
      }
      this.driverGrade = driverGrade;
    },
    saveBirthday(date) {
      this.editedItem.birthday = moment(date).format("LL");
      this.menu = false;
    },
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    editprofile() {
      this.editedItem = this.editedItems;
      this.profileUrlObj.type = "driver";
      this.profileUrlObj.last_name = this.editedItem.last_name;

      this.profiledialog = true;
    },
    async saveProfile() {
      const res = await addOrUpdateDriverdetail(this.editedItem);
      const res2 = await insertProfileImg(this.profileUrlObj);
      console.log(res2);

      if (res.data.Operation == "success") {
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
          this.Preloading = false;
          this.profiledialog = false;
        }, 2500);
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
          this.profiledialog = false;
          this.Preloading = false;
        }, 2500);
      }
    },
    async profile1img() {
      if (!this.profile1) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.profile1);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      console.log(res);
      this.profileUrlObj.profile1Url = res.data.href;
    },
    async profile2img() {
      if (!this.profile2) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.profile2);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      console.log(res);
      this.profileUrlObj.profile2Url = res.data.href;
    },
    async profile3img() {
      if (!this.profile3) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.profile3);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      console.log(res);
      this.profileUrlObj.profile3Url = res.data.href;
    },
    async profile4img() {
      if (!this.profile4) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.profile4);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      console.log(res);
      this.profileUrlObj.profile4Url = res.data.href;
    },
    async profile5img() {
      if (!this.profile5) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.profile5);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      console.log(res);
      this.profileUrlObj.profile5Url = res.data.href;
    },
    async profile6img() {
      if (!this.profile6) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.profile6);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      console.log(res);
      this.profileUrlObj.profile6Url = res.data.href;
    },
    async save() {
      this.saveloading = true;
      this.setRouteId();
      if (this.editedIndex > -1) {
        this.InsertOrUpdateBackRole();
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.InsertOrUpdateBackRole();
        this.desserts.push(this.editedItem);
      }
    },
  },
  async mounted() {
    await this.initialize();
    let chart = echarts.init(document.getElementById("chart"));
    let charts = echarts.init(document.getElementById("charts"));
    // 配置图表
    let option = {
      title: {
        text: "车手技巧成绩",
        bottom: "bottom",
        left: "center",
        textStyle: {
          color: "white",
        },
      },
      legend: {
        data: ["成绩图"],
        left: "left",
        itemWidth: 10,
        textStyle: {
          color: "white",
        },
      },

      radar: {
        // shape: 'circle',
        indicator: this.craftItem,
      },
      series: [
        {
          name: "Budget vs spending",
          type: "radar",
          data: [
            {
              value: this.craftValue,
              name: "成绩图",
              lineStyle: {
                color: "#fc333d", // 更改线的颜色
              },
              itemStyle: {
                color: "#fc333d", // 更改点的颜色
              },
            },
          ],
        },
      ],
    };
    let options = {
      title: {
        text: "车手成就",
        left: "center",
        top: "top",
        textStyle: {
          color: "white",
        },
      },
      xAxis: {
        data: [
          "领奖台",
          "赛季积分",
          "赛季参加站数",
          "赛季冠军数",
          "最佳圈速次数",
          "最好位置",
          "车手生涯参加站数",
        ],
        axisLabel: {
          interval: 0, // 控制x轴标签的显示间隔，默认为0，即全部标签显示
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        z: 10,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#999",
        },
      },
      dataZoom: [
        {
          type: "inside",
        },
      ],
      series: [
        {
          type: "bar",
          showBackground: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#83bff6" },
              { offset: 0.5, color: "#188df0" },
              { offset: 1, color: "#188df0" },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#2378f7" },
                { offset: 0.7, color: "#2378f7" },
                { offset: 1, color: "#83bff6" },
              ]),
            },
          },
          data: this.achieveValue,
        },
      ],
    };
    // 使用刚指定的配置项和数据显示图表
    chart.setOption(option);
    charts.setOption(options);
  },
};
</script>

<style lang="scss" scoped>
.capacity {
  width: 100%;
  height: 400px;
  padding: 50px;
  background-color: rgb(16, 12, 42);
}
.achievement {
  width: 100%;
  height: 600px;
  padding: 50px;
  background-color: rgb(16, 12, 42);
}
.container {
  margin-top: 50px;
  flex-direction: column;
  align-items:normal !important;
}
.RaceInfo {
  display: flex;
  flex-direction: column;
  row-gap: 17px;
  padding: 30px;
  .column-info {
    display: flex;
    column-gap: 20px;
  }
  .cards-title {
    font-size: 12px !important;
    font-weight: 500;
    letter-spacing: 0.1px;
    line-height: 16px;
    white-space: nowrap;
    color: rgb(95, 99, 104);
    min-width: 250px !important;
  }
  .cards-content {
    font-size: 18px;
    font-weight: 300;
    word-break: break-word;
    word-wrap: break-word;
    color: rgb(32, 33, 36);
    flex-grow: 1;
  }
}
.basicinfo {
  display: flex;
  flex-direction: column;
  row-gap: 17px;
  padding: 30px;
  .column-info {
    display: flex;
    column-gap: 20px;
  }
  .cards-title {
    font-size: 12px !important;
    font-weight: 500;
    letter-spacing: 0.1px;
    line-height: 16px;
    white-space: nowrap;
    color: rgb(95, 99, 104);
    flex-grow: 0.5;
  }
  .cards-content {
    font-size: 18px;
    font-weight: 300;
    word-break: break-word;
    word-wrap: break-word;
    color: rgb(32, 33, 36);
    flex-grow: 1;
  }
}
</style>
<style src="@wangeditor/editor/dist/css/style.css"></style>