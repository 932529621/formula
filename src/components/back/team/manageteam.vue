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
                  Team Info
                </div>
                <div class="basicinfo">
                  <v-divider></v-divider>
                  <div class="column-info">
                    <p class="font-weight-blod cards-title">车队名：</p>
                    <p class="cards-content">
                      {{ editedItems.full_teamname }}
                    </p>
                    <v-img
                      max-width="100px"
                      :src="editedItems.team_icon"
                    ></v-img>
                  </div>
                  <v-divider></v-divider>
                  <div class="column-info">
                    <p class="font-weight-blod cards-title">地址：</p>
                    <p class="cards-content">
                      {{ editedItems.base }}
                    </p>
                  </div>
                  <v-divider></v-divider>
                  <div class="column-info">
                    <p class="font-weight-blod cards-title">车队队长:</p>
                    <p class="cards-content">
                      {{ editedItems.team_chief }}
                    </p>
                  </div>
                  <v-divider></v-divider>
                  <div class="column-info">
                    <p class="font-weight-blod cards-title">邮箱：</p>
                    <p class="cards-content">
                      {{ editedItems.email }}
                    </p>
                  </div>
                  <v-divider></v-divider>
                  <div class="column-info">
                    <p class="font-weight-blod cards-title">第一次参赛时间：</p>
                    <p class="cards-content">
                      {{ editedItems.first_team_entry }}
                    </p>
                  </div>
                  <v-divider></v-divider>
                  <div class="column-info">
                    <p class="font-weight-blod cards-title">冠军次数：</p>
                    <p class="cards-content">
                      {{ editedItems.world_champion }}
                    </p>
                  </div>
                  <v-divider></v-divider>
                  <div class="column-info">
                    <p class="font-weight-blod cards-title">车队简介</p>
                    <p
                      class="cards-content"
                      v-html="editedItems.team_biography"
                    ></p>
                  </div>
                  <v-divider></v-divider>
                  <v-btn @click="editprofile()" text color="green">编辑</v-btn>
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
                  Car Info
                </div>
                <div class="basicinfo">
                  <div class="column-info">
                    <p class="font-weight-blod cards-title">动力引擎：</p>
                    <p class="cards-content">
                      {{ editedItems.power_unit }}
                    </p>
                  </div>
                  <v-divider></v-divider>
                  <div class="column-info">
                    <p class="font-weight-blod cards-title">车辆型号：</p>
                    <p class="cards-content">
                      {{ editedItems.chassis }}
                    </p>
                  </div>
                  <v-divider></v-divider>
                  <div class="column-info">
                    <p class="font-weight-blod cards-title">车辆图片</p>
                  </div>
                  <v-divider></v-divider>
                  <div class="column-info">
                    <v-img
                      max-width="500px"
                      :src="editedItems.car_pic"
                      class="cards-content"
                    ></v-img>
                  </div>
                  <v-divider></v-divider>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-container>
      </v-card-text>
    </v-card>
    <v-dialog v-model="profiledialog" persistent max-width="800px" >
      <v-card>
        <v-card-text>
          <v-container class="pa-8">
            <v-row>
              <v-col>
                <v-text-field
                  label="队名"
                  required
                  v-model="editedItem.full_teamname"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="地址"
                  required
                  v-model="editedItem.base"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="车队队长"
                  required
                  v-model="editedItem.team_chief"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="技术领队"
                  required
                  v-model="editedItem.technical_chief"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="一号车手"
                  required
                  v-model="editedItem.driver_one"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="二号车手"
                  required
                  v-model="editedItem.driver_two"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="车辆型号"
                  required
                  v-model="editedItem.chassis"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="车辆引擎"
                  required
                  v-model="editedItem.power_unit"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-select
                  :items="[
                    '#2293D1',
                    '#358C75',
                    '#3671C6',
                    '#37BEDD',
                    '#37BEDD',
                    '#5E8FAA',
                    '#6CD3BF',
                    '#B6BABD',
                    '#C92D4B',
                    '#F58020',
                    '#F91536',
                    '#F50057',
                    '#D500F9'
                  ]"
                  label="车队颜色"
                  v-model="editedItem.team_color"
                  required
                ></v-select>
              </v-col>

              <v-col
                ><v-chip label :color="editedItem.team_color"></v-chip
              ></v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-file-input
                  v-model="profile1"
                  label="车队简介图"
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
                  label="车队简介图"
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
                  label="车队简介图"
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
                  label="车队简介图"
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
                  label="车队简介图"
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
                  label="车队简介图"
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
                    v-model="editedItem.team_biography"
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
  getTeamdetail,
  OssuploadNewsImg,
  addOrUpdateTeamdetail,
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

  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },

  methods: {
    async initialize() {
      const userdetail = await getTeamdetail({
        user_email: this.BackuserInfos.email,
      });
      console.log(userdetail);

      this.editedItems = userdetail.data.teaminfo;
    },

    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    editprofile() {
      this.editedItem = this.editedItems;
      this.profileUrlObj.type = "team";
      this.profileUrlObj.last_name = this.editedItem.full_teamname;

      this.profiledialog = true;
    },
    async saveProfile() {
      const res = await addOrUpdateTeamdetail(this.editedItem);
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
    // let chart = echarts.init(document.getElementById("chart"));
    // let charts = echarts.init(document.getElementById("charts"));
    // // 配置图表
    // let option = {
    //   title: {
    //     text: "车手技巧成绩",
    //     bottom: "bottom",
    //     left: "center",
    //     textStyle: {
    //       color: "white",
    //     },
    //   },
    //   legend: {
    //     data: ["成绩图"],
    //     left: "left",
    //     itemWidth: 10,
    //     textStyle: {
    //       color: "white",
    //     },
    //   },

    //   radar: {
    //     // shape: 'circle',
    //     indicator: this.craftItem,
    //   },
    //   series: [
    //     {
    //       name: "Budget vs spending",
    //       type: "radar",
    //       data: [
    //         {
    //           value: this.craftValue,
    //           name: "成绩图",
    //           lineStyle: {
    //             color: "#fc333d", // 更改线的颜色
    //           },
    //           itemStyle: {
    //             color: "#fc333d", // 更改点的颜色
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // };
    // let options = {
    //   title: {
    //     text: "车手成就",
    //     left: "center",
    //     top: "top",
    //     textStyle: {
    //       color: "white",
    //     },
    //   },
    //   xAxis: {
    //     data: [
    //       "领奖台",
    //       "赛季积分",
    //       "赛季参加站数",
    //       "赛季冠军数",
    //       "最佳圈速次数",
    //       "最好位置",
    //       "车手生涯参加站数",
    //     ],
    //     axisLabel: {
    //       interval: 0, // 控制x轴标签的显示间隔，默认为0，即全部标签显示
    //     },
    //     axisTick: {
    //       show: false,
    //     },
    //     axisLine: {
    //       show: false,
    //     },
    //     z: 10,
    //   },
    //   yAxis: {
    //     axisLine: {
    //       show: false,
    //     },
    //     axisTick: {
    //       show: false,
    //     },
    //     axisLabel: {
    //       color: "#999",
    //     },
    //   },
    //   dataZoom: [
    //     {
    //       type: "inside",
    //     },
    //   ],
    //   series: [
    //     {
    //       type: "bar",
    //       showBackground: true,
    //       itemStyle: {
    //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //           { offset: 0, color: "#83bff6" },
    //           { offset: 0.5, color: "#188df0" },
    //           { offset: 1, color: "#188df0" },
    //         ]),
    //       },
    //       emphasis: {
    //         itemStyle: {
    //           color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //             { offset: 0, color: "#2378f7" },
    //             { offset: 0.7, color: "#2378f7" },
    //             { offset: 1, color: "#83bff6" },
    //           ]),
    //         },
    //       },
    //       data: this.achieveValue,
    //     },
    //   ],
    // };
    // // 使用刚指定的配置项和数据显示图表
    // chart.setOption(option);
    // charts.setOption(options);
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
  flex-direction: column;
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