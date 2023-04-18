<template>
  <v-app>
    <div class="news">
      <v-card class="rounded-lg" :elevation="8">
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
          :items="desserts"
          class="elevation-1"
          :search="search"
          loading="false"
          loading-text="Loading... Please wait"
          show-select
          v-model="selected"
          item-key="news_id"
          fixed-header
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-dialog v-model="dialog">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    @click="getNewsTitleInfo()"
                  >
                    添加
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <!-- <span class="text-h5">{{ formTitle }}</span> -->
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-form ref="cardform" v-model="valid" lazy-validation>
                        <v-row>
                          <v-col>
                            <v-text-field
                              v-model="editedItem.video_title"
                              label="标题"
                              :rules="notnull"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
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
                                  v-model="editedItem.created_time"
                                  label="创建时间"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="date" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="menu = false"
                                >
                                  取消
                                </v-btn>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="saveCreateday(date)"
                                >
                                  确定
                                </v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              v-model="editedItem.video_id"
                              label="ID"
                              disabled
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-combobox
                              v-model="editedItem.video_category"
                              :items="categoryItems"
                              label="类型"
                            ></v-combobox>
                          </v-col>
                          <v-col>
                            <v-text-field
                              v-model="editedItem.video_label"
                              label="站点"
                              v-if="editedItem.video_category === 'Hight light'"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <p>应用位置</p>
                            <v-checkbox
                              v-model="NewsStatus"
                              label="Hight Light"
                              color="red"
                              value="Hight Light"
                              hide-details
                              @click="NewsTitleInfo()"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="NewsStatus"
                              label="Onboard"
                              color="red"
                              value="Onboard"
                              hide-details
                              @click="NewsTitleInfo()"
                            ></v-checkbox>
                          </v-col>
                          <v-col>
                            <p>&nbsp;</p>
                            <v-checkbox
                              v-model="NewsStatus"
                              label="Interview"
                              color="red"
                              value="Interview"
                              hide-details
                              @click="NewsTitleInfo()"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="NewsStatus"
                              label="Top News"
                              color="red"
                              value="Top News"
                              hide-details
                              @click="NewsTitleInfo()"
                            ></v-checkbox>
                          </v-col>
                          <v-col>
                            <p>&nbsp;</p>
                            <v-checkbox
                              v-model="NewsStatus"
                              label="Banner"
                              color="red"
                              value="Banner"
                              hide-details
                              @click="NewsTitleInfo()"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="NewsStatus"
                              label="Ticket Banner"
                              color="red"
                              value="Ticket Banner"
                              hide-details
                              @click="NewsTitleInfo()"
                            ></v-checkbox>
                          </v-col>
                          <v-col>
                            <v-text-field
                              v-model="NewsStatusUsed['Hight Light']"
                              label="Hight Light"
                              outlined
                              readonly
                              :error="
                                NewsStatusUsed['Hight Light'] <= 0
                                  ? true
                                  : false
                              "
                            ></v-text-field>
                            <v-text-field
                              v-model="NewsStatusUsed['Onboard']"
                              label="Onboard"
                              outlined
                              readonly
                              :error="
                                NewsStatusUsed['Onboard'] <= 0 ? true : false
                              "
                            ></v-text-field>
                            <v-text-field
                              v-model="NewsStatusUsed['Interview']"
                              label="Interview"
                              outlined
                              readonly
                              :error="
                                NewsStatusUsed['Interview'] <= 0 ? true : false
                              "
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              v-model="NewsStatusUsed['Top News']"
                              label="Top News"
                              outlined
                              readonly
                              :error="
                                NewsStatusUsed['Top News'] <= 0 ? true : false
                              "
                            ></v-text-field>
                            <v-text-field
                              v-model="NewsStatusUsed['Banner']"
                              label="Banner"
                              outlined
                              readonly
                              :error="NewsStatusUsed.Banner <= 0 ? true : false"
                            ></v-text-field>
                            <v-text-field
                              v-model="NewsStatusUsed['Ticket Banner']"
                              label="Ticket Banner"
                              outlined
                              readonly
                              :error="
                                NewsStatusUsed['Ticket Banner'] <= 0
                                  ? true
                                  : false
                              "
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              v-model="editedItem.video_introdution"
                              label="简介"
                              :rules="notnull"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              v-model="editedItem.video_pic"
                              label="封面图片"
                              :rules="notnull"
                            ></v-text-field>
                            <input
                              type="file"
                              id="upload"
                              ref="uploadAvatar"
                              @change="changeAvatar()"
                              accept="image/*"
                            />
                            <img
                              style="max-width: 500px"
                              ref="Avatar"
                              @click="uploadAvatar()"
                              :src="
                                editedItem.video_pic
                                  ? editedItem.video_pic
                                  : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                              "
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-file-input
                              v-model="videofile"
                              label="视频上传"
                              @change="videoUpload"
                              accept="video/*"
                            ></v-file-input>
                            <v-progress-linear
                              indeterminate
                              v-show="hasuploadfile"
                              color="yellow darken-2"
                            ></v-progress-linear>

                            <video
                              :src="
                                editedItem.video_path
                                  ? editedItem.video_path
                                  : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                              "
                              style="max-width: 500px"
                              controls
                            ></video>
                            <v-text-field
                              v-model="editedItem.video_path"
                              :rules="notnull"
                              label="视频地址"
                              required
                              disabled
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      取消
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save()">
                      保存
                    </v-btn>
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
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-card>
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
  </v-app>
</template>

<script>
import {
  getVideos,
  OssuploadNewsImg,
  Deletevideo,
  InsertOrUpdateVideo,
} from "@/plugins/http";
import moment from "moment";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    saveloading: false,
    isSnackbar: false,
    isSnackbarSuccess: null,
    hasuploadfile: false,
    search: "",
    selected: [],
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "video_id",
      },
      { text: "类型", value: "video_category" },
      { text: "视频标题", value: "video_title" },
      { text: "视频简介", value: "video_introdution" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      video_id: null,
      video_category: "",
      video_title: "",
      video_introdution: "",
      video_pic: "",
      video_path: null,
      video_label: "",
      video_status: "",
      created_time: "",
    },
    defaultItem: {
      video_id: null,
      video_category: "",
      video_title: "",
      video_introdution: "",
      video_pic: "",
      video_path: null,
      video_label: "",
      video_status: "",
      created_time: "",
    },
    menu: false,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    NewsStatus: [],
    NewsStatusUsed: {},
    videofile: null,
    categoryItems: ["Lastest", "interview", "onboard", "Hight light", "Banner"],
    valid: true,
    videoimgfile: null,
    videoimgUrl: null,
    notnull: [(v) => !!v || "此项是必填的"],
  }),

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
  },

  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      const res = await getVideos();
      console.log(res);

      if (res.data.Homestatus === 208) {
        this.desserts = res.data.videos;
      }
    },

    saveCreateday(date) {
      this.editedItem.created_time = moment(date).format("LL");
      this.menu = false;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      if (this.editedItem.video_pic != null) {
        this.OlduploadImagePath = this.editedItem.video_pic.split(" ");
      }
      this.NewsStatus.push(this.editedItem.video_status);
      this.getNewsTitleInfo();
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.DeleteNews();
    },

    close() {
      this.NewsStatus = [];
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

    NewsTitleInfo() {
      if (this.NewsStatus.length > 1) {
        this.NewsStatus.shift();
      }
      const Status = this.NewsStatus.join("");
      this.editedItem.video_status = Status;
      this.getNewsTitleInfo();
      this.NewsStatusUsed[`${Status}`] = this.NewsStatusUsed[`${Status}`] - 1;
    },
    uploadAvatar() {
      this.$refs.uploadAvatar.click();
    },

    changeAvatar() {
      let uploadbtn = this.$refs.uploadAvatar;
      const file = uploadbtn.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.$refs.Avatar.src = reader.result;
      };
    },
    async videoUpload() {
      if (!this.videofile) {
        return;
      }
      this.hasuploadfile = true;
      var formData = new FormData();
      formData.append("file", this.videofile);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/videos",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      console.log(res);
      this.hasuploadfile = false;
      this.editedItem.video_path = res.data.href;
    },

    getNewsTitleInfo() {
      let obj = {
        "Hight Light": 6,
        Interview: 4,
        Onboard: 4,
        "Ticket Banner": 1,
        "Top News": 1,
        Banner: 1,
      };
      for (let i = 0; i < this.desserts.length; i++) {
        if (this.desserts[i].video_status) {
          var item = this.desserts[i].video_status;
          // obj[item] = obj[item] + 1 || 1;
          obj[item] = obj[item] - 1;
        }
      }
      this.NewsStatusUsed = obj;
    },
    async InsertOrUpdateVideo(){
      const res=await InsertOrUpdateVideo(this.editedItem);
      console.log(res);
      
      if (res.data.Operation === "success") {
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
        }, 2500);
        this.close();
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
        }, 2500);
        this.close();
      }
    },

    async save() {
      this.saveloading = true;
      let uploadbtn = this.$refs.uploadAvatar;
      const file = uploadbtn.files[0];
      var formData = new FormData();
      formData.append("file", file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/news",
        },
      };
      console.log(file);
      if (file == undefined) {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem);
          this.InsertOrUpdateVideo();
        } else {
          this.InsertOrUpdateVideo();
          this.desserts.push(this.editedItem);
        }
      } else {
        const { data: res } = await OssuploadNewsImg(formData, config);
        console.log(res);
        if (res.data.href) {
          this.editedItem.video_pic = res.data.href;
          if (this.editedIndex > -1) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem);
            this.InsertOrUpdateVideo();
          } else {
            this.InsertOrUpdateVideo();
            this.desserts.push(this.editedItem);
          }
        } else {
          this.isSnackbarSuccess = false;
          this.isSnackbar = true;
          this.snackbarTitle = "图片上传失败!";
          setTimeout(() => {
            this.isSnackbar = false;
          }, 2500);
          return false;
        }
      }
    },
    validate() {
      this.$refs.cardform.validate() ? this.save() : (this.valid = false);
    },

    async initialNews() {
      // this.$axios
      //   .get("http://127.0.0.1:8080/api/getlatestAll")
      //   .then((res) => {
      //     if (res.status === 200) {
      //       for (let key of res.data.newsItem) {
      //         this.desserts.push(key);
      //       }
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      const res = await getlatestAll();
      if (res.status === 200) {
        for (let key of res.data.newsItem) {
          this.desserts.push(key);
        }
      }
    },

    async DeleteNews() {
      const res = await Deletevideo({ video_id: this.editedItem.video_id });
      if (res.data.Operation === "success") {
        this.desserts.splice(this.editedIndex, 1);
        this.closeDelete();
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
        }, 500);
        this.close();
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
        }, 500);
        this.close();
      }
    },
  },
};
</script>


<style scoped lang="scss">
#upload {
  height: 0;
  width: 0;
  display: none;
}
</style>