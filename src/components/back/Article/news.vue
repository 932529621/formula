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
                              v-model="editedItem.news_title"
                              label="标题"
                              :rules="TitleRules"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              v-model="editedItem.news_id"
                              label="ID"
                              disabled
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-combobox
                              v-model="editedItem.category"
                              :items="categoryItems"
                              label="类型"
                            ></v-combobox>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <p>应用位置</p>
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
                              label="Driver Market"
                              color="red"
                              value="Driver Market"
                              hide-details
                              @click="NewsTitleInfo()"
                            ></v-checkbox>
                          </v-col>
                          <v-col>
                            <p>&nbsp;</p>
                            <v-checkbox
                              v-model="NewsStatus"
                              label="Top News"
                              color="red"
                              value="Top News"
                              hide-details
                              @click="NewsTitleInfo()"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="NewsStatus"
                              label="Analysis"
                              color="red"
                              value="Analysis"
                              hide-details
                              @click="NewsTitleInfo()"
                            ></v-checkbox>
                          </v-col>
                          <v-col>
                            <p>&nbsp;</p>
                            <v-checkbox
                              v-model="NewsStatus"
                              label="More News"
                              color="red"
                              value="More News"
                              hide-details
                              @click="NewsTitleInfo()"
                            ></v-checkbox>
                            <v-checkbox
                              v-model="NewsStatus"
                              label="Technical"
                              color="red"
                              value="Technical"
                              hide-details
                              @click="NewsTitleInfo()"
                            ></v-checkbox>
                          </v-col>
                          <v-col>
                            <v-text-field
                              v-model="NewsStatusUsed['Banner']"
                              label="Banner"
                              outlined
                              readonly
                              :error="NewsStatusUsed.Banner <= 0 ? true : false"
                            ></v-text-field>
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
                              v-model="NewsStatusUsed['More News']"
                              label="More News"
                              outlined
                              readonly
                              :error="
                                NewsStatusUsed['More News'] <= 0 ? true : false
                              "
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-text-field
                              v-model="NewsStatusUsed['Driver Market']"
                              label="Driver Market"
                              outlined
                              readonly
                              :error="
                                NewsStatusUsed['Driver Market'] <= 0
                                  ? true
                                  : false
                              "
                            ></v-text-field>
                            <v-text-field
                              v-model="NewsStatusUsed['Analysis']"
                              label="Analysis"
                              outlined
                              readonly
                              :error="
                                NewsStatusUsed.Analysis <= 0 ? true : false
                              "
                            ></v-text-field>
                            <v-text-field
                              v-model="NewsStatusUsed['Technical']"
                              label="Technical"
                              outlined
                              readonly
                              :error="
                                NewsStatusUsed.Technical <= 0 ? true : false
                              "
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              v-model="editedItem.news_introdution"
                              label="简介"
                              :rules="IntroRules"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              v-model="editedItem.news_pic"
                              label="图片地址"
                            ></v-text-field>
                            <v-img :src="editedItem.news_pic" max-width="200px"></v-img>
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
                                  v-model="editedItem.createdate"
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
                            <div style="border: 1px solid #ccc">
                              <Toolbar
                                style="border-bottom: 1px solid #ccc"
                                :editor="editor"
                                :defaultConfig="toolbarConfig"
                                :mode="mode"
                              />
                              <Editor
                                style="height: 500px; overflow-y: hidden"
                                v-model="editedItem.news_content"
                                :defaultConfig="editorConfig"
                                :mode="mode"
                                @onCreated="onCreated"
                              />
                            </div>
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
                    <v-btn color="blue darken-1" text @click="validate()">
                      保存
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >你确定要删除吗?</v-card-title
                  >
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
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import moment from "moment";
import {
  getlatestAll,
  InsertOrUpdatelatest,
  Deletelatest,
  OssDeleteNewsImg,
  OssuploadNewsImg,
} from "@/plugins/http";
export default {
  components: { Editor, Toolbar },

  data() {
    return {
      isSnackbar: false,
      isSnackbarSuccess: null,

      NewsStatus: [],
      NewsStatusUsed: {},

      dialog: false,
      dialogDelete: false,
      search: "",
      selected: [],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "news_id",
        },
        { text: "标题", value: "news_title" },
        { text: "类型", value: "category" },
        { text: "简介", value: "news_introdution", width: "200px" },
        { text: "图片地址", value: "news_pic", width: "200px" },
        { text: "创建时间", value: "createdate" },
        { text: "应用位置", value: "news_status" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      desserts: [],
      categoryItems:['Driver Market','Lastest News','Analysis','technical'],
      editedIndex: -1,
      editedItem: {
        news_id: "",
        news_title: 0,
        category: 0,
        news_introdution: 0,
        news_pic: null,
        createdate: 0,
        news_status: 0,
      },
      defaultItem: {
        news_id: "",
        news_title: 0,
        category: 0,
        news_introdution: 0,
        news_pic: null,
        createdate: 0,
        news_status: 0,
      },

      DeletefileItem: [],

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
      OlduploadImagePath: [],

      menu: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),

      TitleRules: [(v) => !!v || "此项是必填的"],
      IntroRules: [(v) => !!v || "此项是必填的"],
      valid: true,
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    snackbarTitle() {
      return this.isSnackbarSuccess === true
        ? "操作成功"
        : "操作失败";
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
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
  methods: {
    initialize() {
      this.initialNews();
    },
    async uploadImages(file, insertFn) {
      var formData = new FormData();
      formData.append("file", file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/news_pic",
        },
      };
      // const { data: res } = await this.$axios.post(
      //   "http://127.0.0.1:8080/api/OssuploadNewsImg",
      //   formData,
      //   config
      // );
      const { data: res } = await OssuploadNewsImg(formData, config);
      if (res.data.href) {
        insertFn(res.data.href);
      } else {
        this.editor.alert("error", "error");
      }
      console.log(formData);
      console.log(res);
    },

    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },

    saveCreateday(date) {
      this.editedItem.createdate = moment(date).format("LL");
      this.menu = false;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      if (this.editedItem.news_pic != null) {
        this.OlduploadImagePath = this.editedItem.news_pic.split(" ");
      }
      this.NewsStatus.push(this.editedItem.news_status);
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
      this.editor.clear();
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
      this.editedItem.news_status = Status;
      this.getNewsTitleInfo();
      this.NewsStatusUsed[`${Status}`] = this.NewsStatusUsed[`${Status}`] - 1;
    },

    getNewsTitleInfo() {
      let obj = {
        'Banner': 6,
        "Driver Market": 2,
        'Analysis': 2,
        "More News": 4,
        "Top News": 4,
        'Technical': 5,
      };
      for (let i = 0; i < this.desserts.length; i++) {
        if (this.desserts[i].news_status) {
          var item = this.desserts[i].news_status;
          // obj[item] = obj[item] + 1 || 1;
          obj[item] = obj[item] - 1;
        }
      }
      this.NewsStatusUsed = obj;
    },

    async save() {
      const html = this.editor.getHtml();
      const imgs = this.editor.getElemsByType("image");
      const imgarr = [];
      await imgs.forEach((item) => {
        imgarr.push(item.src);
      });
      const _arr1 = imgarr.filter(
        (item1) => !this.OlduploadImagePath.includes(item1)
      );
      const _arr2 = this.OlduploadImagePath.filter(
        (item2) => !imgarr.includes(item2)
      );
      this.DeletefileItem = _arr1.concat(_arr2);
      //对比一下编辑器里的图片与数据库存储的图片地址，多则删除服务器上的图片，否则就修改一下数据库储存的地址
      // if (this.DeletefileItem) {
      //   if (imgs.length > this.OlduploadImagePath.length) {
      //     this.editedItem.news_pic = imgarr.join(" ");
      //   } else {
      //     this.editedItem.news_pic = imgarr.join(" ");
      //     this.DeleteOssNewsImg();
      //   }
      // }
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        console.log(html);
        this.InsertOrUpload(html);
      } else {
        this.InsertOrUpload(html);
      }
    },
    validate(){
      this.$refs.cardform.validate()
        ? this.save()
        : (this.valid = false);
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

    async InsertOrUpload(html) {
      this.editedItem.news_content = html;
      const params = this.editedItem;
      const res = await InsertOrUpdatelatest(params);
      console.log(res);

      if (res.data.Operation === "success") {
        this.editedItem.news_id = res.data.id;
        this.editedItem.createdate = res.data.createdate;
        if (res.data.id) {
          this.desserts.push(this.editedItem);
          console.log(this.editedItem);
        }
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
        }, 5000);
        this.close();
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
        }, 5000);
        this.close();
      }
    },

    async DeleteNews() {
      const res = await Deletelatest({ news_id: this.editedItem.news_id });
      const fileItem = this.editedItem.news_pic.split(" ");
      const fileItems = [];
      fileItem.forEach((item) => {
        fileItems.push(item.substring(item.indexOf("/formula/news_pic")));
      });
      const Deleteres = await OssDeleteNewsImg({ fileItems });
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

    async DeleteOssNewsImg() {
      const fileItems = [];
      this.DeletefileItem.forEach((item, index) => {
        const fileName = item.substring(item.indexOf("/formula/news_pic"));
        fileItems.push(fileName);
      });
      console.log(fileItems);
      const res = await OssDeleteNewsImg({ fileItems });
      console.log(res);
    },
  },
};
</script>
  
  <style >
.news table tbody tr {
  height: 150px !important;
}
</style>
<style src="@wangeditor/editor/dist/css/style.css"></style>