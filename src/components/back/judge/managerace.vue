<template>
  <v-app>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="reserveDessert"
        class="elevation-1"
        :search="search"
        loading="false"
        loading-text="Loading... Please wait"
        show-select
        v-model="selected"
        item-key="name"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-dialog v-model="dialog" max-width="800px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  添加
                </v-btn>
                <div class="selectbox">
                  <v-checkbox
                    v-model="checkSelected"
                    label="全部"
                    value="ALL"
                    @click="filterReview({ className: 'ALL' })"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="checkSelected"
                    label="待举办"
                    value="holding"
                    color="orange"
                    @click="filterReview({ className: 'holding' })"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="checkSelected"
                    label="已举办"
                    value="held"
                    color="red"
                    @click="filterReview({ className: 'held' })"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="checkSelected"
                    label="未举办"
                    value="will"
                    color="green"
                    @click="filterReview({ className: 'will' })"
                  ></v-checkbox>
                </div>
              </template>
              <v-card>
                <v-card-title> </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row><span class="text-h5">基础信息</span></v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.prix_fullname"
                          label="站点名"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-select
                          :items="['will', 'holding', 'held']"
                          label="站点状态"
                          v-model="editedItem.prix_status"
                          required
                        ></v-select>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.round"
                          label="站数"
                        ></v-text-field>
                      </v-col>
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
                          v-model="editedItem.nation_name"
                          required
                        ></v-select>
                      </v-col>
                      <v-col>
                        <v-img
                          label="国家"
                          max-width="150px"
                          :src="`https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/schedule/nation_icon/${editedItem.nation_name}.png`"
                        ></v-img>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-row><span class="text-h5">赛道信息</span></v-row>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.race_name"
                          label="赛道名"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.race_name"
                          label="赛道长度"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.circuit_record"
                          label="赛道记录"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.circuit_laps"
                          label="赛道建成时间"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.circuit_laps"
                          label="赛道圈数"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.circuit_distance"
                          label="赛道单圈长度"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.record_holder"
                          label="赛道记录保持者"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-file-input
                          v-model="nation_map_file"
                          label="赛道简图"
                          hide-details
                          @change="profile1img()"
                          accept="image/*"
                        ></v-file-input>
                        <v-img
                          :src="
                            editedItem.nation_map
                              ? editedItem.nation_map
                              : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                          "
                          width="128"
                          height="128"
                          class="ma-4"
                        ></v-img>
                      </v-col>
                      <v-col>
                        <v-file-input
                          v-model="nation_map_circuit_file"
                          label="赛道图"
                          hide-details
                          @change="profile2img()"
                          accept="image/*"
                        ></v-file-input>
                        <v-img
                          :src="
                            editedItem.nation_map_circuit
                              ? editedItem.nation_map_circuit
                              : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                          "
                          width="128"
                          height="128"
                          class="ma-4"
                        ></v-img>
                      </v-col>
                      <v-col>
                        <v-file-input
                          v-model="nation_banner_pic_file"
                          label="赛道背景图"
                          hide-details
                          @change="profile3img()"
                          accept="image/*"
                        ></v-file-input>
                        <v-img
                          :src="
                            editedItem.nation_banner_pic
                              ? editedItem.nation_banner_pic
                              : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                          "
                          width="128"
                          height="128"
                          class="ma-4"
                        ></v-img>
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
                            v-model="editedItem.circuit_introduction"
                            :defaultConfig="editorConfig"
                            :mode="mode"
                            @onCreated="onCreated"
                          />
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-row><span class="text-h5">赛事信息</span></v-row>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.first_driver_no"
                          label="冠军车手号码"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.second_driver_no"
                          label="亚军车手号码"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.third_driver_no"
                          label="季军车手号码"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.practice1_date"
                          label="第一节练习赛"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.practice2_date"
                          label="第二节练习赛"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.practice3_date"
                          label="第三节练习赛"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.race_date"
                          label="比赛日期范围"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.qualifying_date"
                          label="排位赛"
                        ></v-text-field>
                      </v-col>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.race_time"
                          label="比赛时间"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    取消
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    :loding="Preloading"
                    text
                    @click="save"
                  >
                    保存
                  </v-btn>
                  <v-btn color="light-green accent-4" @click="autoComplete()"
                    >生成</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">你确定要删除吗?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >取消</v-btn
                  >
                  <v-btn color="red darken-1" text @click="deleteItemConfirm"
                    >确定</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.prix_status`]="{ item }">
          <v-chip :color="getColor(item.prix_status)" dark>
            {{ item.prix_status }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-card>
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
  getcalendar,
  InsertOruploadschedule,
  Deleteschedule,
  OssuploadNewsImg,
} from "@/plugins/http";
import moment from "moment";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
  components: { Editor, Toolbar },
  data: () => ({
    Preloading: false,
    isSnackbar: false,
    isSnackbarSuccess: false,

    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "站数",
        align: "start",
        sortable: false,
        value: "round",
      },
      { text: "站点", value: "prix_fullname" },
      { text: "比赛时间", value: "race_date" },
      { text: "站点状态", value: "prix_status" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editor: null,
    toolbarConfig: {},
    editorConfig: {
      placeholder: "请输入内容...",
    },
    mode: "default",
    selected: null,
    nation_map_circuit_file: null,
    nation_map_file: null,
    nation_banner_pic_file: null,
    desserts: [],
    reserveDessert: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    checkSelected: "ALL",
  }),
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    snackbarTitle() {
      return this.isSnackbarSuccess === true ? "操作成功" : "操作失败";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    "editedItem.race_date"(val) {
      console.log(val);
      if (val) {
        this.editedItem.month = `${val.split(" ")[1]}`;
        this.editedItem.day = `${val.split(" ")[0]}`;
      }
    },
    "editedItem.nation_name"(val) {
      console.log(val);
      this.editedItem.nation_icon = `https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/schedule/nation_icon/${val}.png`;
    },
    "editedItem.round"(val) {
      if (val) {
        this.editedItem.sortBy = `${val.split(" ")[1]}`;
      }
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    autoComplete() {
      this.editedItem = {
        circuit_distance: "5.842km",
        circuit_first_grand: "1971",
        circuit_introduction: `<h2>Le Castellet</h2><h3>When was the track built?</h3><p>Work began on pastis magnate Paul Ricard’s track in 1969, with French racers Jean-Pierre Beltoise and Henri Pescarolo acting as consultants on the layout. Racing began at the circuit a year later.</p><h3>When was its first Grand Prix?</h3><p>Formula 1 hit the Circuit Paul Ricard in 1971, with Jackie Stewart winning the inaugural race in his Tyrrell 003.</p><h3>What’s the circuit like?</h3><p>The Circuit Paul Ricard’s even distribution of high-, medium- and low-speed corners is a key reason why it’s one of the most used test circuits in the world (the typically good weather is another). F1 drivers love the 290km/h right-hander at Signes and the 5g joyride of the following Beausset bend, while the circuit’s 2018 return to the F1 calendar showed that the French Grand Prix track is a bit of an overtaking gem.</p><h3>Why go?</h3><p>Drive just 10km south of the circuit and you’ll find yourself on the French Riviera, one of the most revered coastlines in the world thanks to its beautiful beaches, pretty harbourside towns, great food and, if you fancy it, incredible local wines. Apart from the racing action, that’s why you go!</p><h3>Where is the best place to watch?</h3><p>The Chicane series of grandstands put you at the best overtaking point on the track (as Sebastian Vettel proved during his <a href=\"https://www.youtube.com/watch?v=s69BMma7kPE\" target=\"\">2018 fightback from 17th to fifth</a>), while if you want to be closer to the fun and friendly Paul Ricard paddock, bag seats in the Virage du Pont stands to watch cars making their way through the final corner before blasting away down the main straight.</p>`,
        circuit_lap: "53",
        circuit_length: "309.69 km",
        circuit_record: "1:32.740",
        day: "22",
        first_driver_no: "1",
        introduction:
          '"<div class=""f1-race-hub--body-text f1-race-hub--content container""><p>Get up to speed with everything you need to know about the 2023 French Grand Prix, which takes place over 53 laps of the 5.842-kilometre Circuit Paul Ricard in Le Castellet on Sunday, July 24.</p>\n<p>Using the links above you can find the full weekend schedule, including details of practice and qualifying sessions, support races, press conferences and special events, plus the latest news headlines, circuit information and F1 race results.</p>\n<p>You can also find broadcast information, with details of how and where you can watch the race on TV, or download the 2023 French Grand Prix schedule to your mobile device.</p></div>"\r\n',
        month: "Jul",
        nation_banner_pic:
          "http://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/tickets/ticket_back/BRITISH.jpg",
        nation_icon:
          '"https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/schedule/nation_icon/BAHRAIN.png"',
        nation_map:
          "http://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/schedule/nation_map/Bahrain.png",
        nation_map_circuit:
          "http://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/schedule/nation_map_circuit/Bahrain.png       ",
        nation_name: "BAHRAIN",
        practice1_date: "15:00–16:00",
        practice2_date: "18:00–19:00",
        practice3_date: "15:00–16:00",
        prix_fullname: "FORMULA 1 BAHRAIN GRAND PRIX 2023",
        prix_status: "held",
        qualifying_date: "18:00–19:00",
        race_date: "18 Mar 2023-20 Mar 2023",
        race_name: "Sakhir Circuit",
        race_time: "18:00",
        record_holder: " Pedro de la Rosa (2005)",
        round: "ROUND 1",
        season: "2023",
        second_driver_no: "55",
        sortBy: "1",
        third_driver_no: "44",
        ticket_map:
          "http://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/tickets/maps/BAHRAIN%20.svg",
      };
    },
    async initialize() {
      const res = await getcalendar();
      this.desserts = res.data.schedules;
      this.reserveDessert = res.data.schedules;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      const res = await Deleteschedule({ id: this.editedItem.id });
      if (res.data.Operation == "success") {
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
          this.Preloading = false;
        }, 2500);
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
          this.Preloading = false;
        }, 2500);
      }
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async InsertOruploadschedule() {
      const res = await InsertOruploadschedule(this.editedItem);
      if (res.data.Operation == "success") {
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
          this.Preloading = false;
          this.close();
        }, 2500);
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
          this.close();
          this.Preloading = false;
        }, 2500);
      }
    },

    save() {
      if (this.editedIndex > -1) {
        this.InsertOruploadschedule();
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.InsertOruploadschedule();
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },

    getColor(state) {
      if (state == "held") return "red";
      else if (state == "holding") return "orange";
      else return "green";
    },

    filterReview(a) {
      console.log(a.className);
      this.reserveDessert = JSON.parse(JSON.stringify(this.desserts));
      if (a.className == "ALL") {
        this.reserveDessert = this.desserts.filter((item) => {
          return item;
        });
      } else {
        this.reserveDessert = this.desserts.filter((item) => {
          return item.prix_status == a.className;
        });
      }
    },
    async profile1img() {
      if (!this.nation_map_file) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.nation_map_file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      console.log(res);
      this.editedItem.nation_map = res.data.href;
    },
    async profile2img() {
      if (!this.nation_map_circuit_file) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.nation_map_circuit_file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      console.log(res);
      this.editedItem.nation_map_circuit = res.data.href;
    },
    async profile3img() {
      if (!this.nation_banner_pic_file) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.nation_banner_pic_file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      console.log(res);
      this.editedItem.nation_banner_pic = res.data.href;
    },
  },
};
</script>
<style lang="scss" scoped>
.selectbox {
  display: flex;
  padding: 5px;
  column-gap: 10px;
}
.row {
  margin: 0 !important;
}
</style>
<style src="@wangeditor/editor/dist/css/style.css"></style>
