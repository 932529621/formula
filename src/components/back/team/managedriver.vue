<template>
  <v-card class="ma-4">
    <v-card-title>
      <v-col>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field
      ></v-col>
    </v-card-title>
    <v-data-table :headers="headers" :items="desserts" :search="search">
      <template v-slot:item.avatar="{ item }">
        <v-avatar>
          <img :src="item.avatar" />
        </v-avatar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div>
                  <v-file-input
                    v-model="helmetfile"
                    label="车手头盔"
                    hide-details
                    @change="previewhelmetImage"
                    accept="image/*"
                  ></v-file-input>
                  <v-img
                  v-if="!editedItem.driver_helmet"
                    :src="
                      helmetimageUrl
                        ? helmetimageUrl
                        : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                    "
                    width="128"
                    height="128"
                    class="ma-4"
                  ></v-img>
                  <v-img
                    v-if="editedItem.driver_helmet"
                    :src="editedItem.driver_helmet"
                    width="128"
                    height="128"
                    class="ma-4"
                  ></v-img>
                  <v-file-input
                    v-model="avatarfile"
                    label="车手头像"
                    hide-details
                    @change="previewavatarImage"
                    accept="image/*"
                  ></v-file-input>
                  <v-img
                  v-if="!editedItem.avatar"
                    :src="
                      avatarimageUrl
                        ? avatarimageUrl
                        : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                    "
                    width="128"
                    height="128"
                    class="ma-4"
                  ></v-img>
                  <v-img
                    v-if="editedItem.avatar"
                    :src="editedItem.avatar"
                    width="128"
                    height="128"
                    class="ma-4"
                  ></v-img>
                  <v-file-input
                    v-model="halfpicfile"
                    label="车手半身图"
                    hide-details
                    @change="previewhalfpicImage"
                    accept="image/*"
                  ></v-file-input>
                  <v-img
                  v-if="!editedItem.driver_pic"
                    :src="
                      halfpicimageUrl
                        ? halfpicimageUrl
                        : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                    "
                    width="128"
                    height="128"
                    class="ma-4"
                  ></v-img>
                  <v-img
                    v-if="editedItem.driver_pic"
                    :src="editedItem.driver_pic"
                    width="128"
                    height="128"
                    class="ma-4"
                  ></v-img>
                  <v-file-input
                    v-model="NumberIconfile"
                    label="车手号码标志"
                    hide-details
                    @change="previewNumberIconImage"
                    accept="image/*"
                  ></v-file-input>
                  <v-img
                  v-if="!editedItem.driver_number_icon"
                    :src="
                      NumberIconimageUrl
                        ? NumberIconimageUrl
                        : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                    "
                    width="128"
                    height="128"
                    class="ma-4"
                  ></v-img>
                  <v-img
                    v-if="editedItem.driver_number_icon"
                    :src="editedItem.driver_number_icon"
                    width="128"
                    height="128"
                    class="ma-4"
                  ></v-img>
                  <v-text-field
                    v-model="form.driver_number"
                    :counter="10"
                    label="车手号码"
                    outlined
                    required
                  ></v-text-field>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="light-green accent-4"  @click="autoComplete()">生成</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            取消
          </v-btn>
          <v-btn color="blue darken-1" text @click="save()"> 保存 </v-btn>
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
  </v-card>
</template>

<script>
import {
  getDriverByTeam,
  OssuploadNewsImg,
  UploadDriverDetail,
  UploadDriverDetails,
} from "@/plugins/http";
export default {
  data: () => ({
    isSnackbar: false,
    isSnackbarSuccess: null,
    saveloading: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "",
        align: "start",
        sortable: false,
        value: "avatar",
      },
      { text: "姓名", value: "name" },
      { text: "email", value: "email" },
      { text: "", value: "actions", sortable: false },
    ],
    search: "",
    desserts: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    helmetimageUrl: null,
    halfpicimageUrl: null,
    NumberIconimageUrl: null,
    helmetfile: null,
    halfpicfile: null,
    NumberIconfile: null,
    avatarimageUrl:null,
    avatarfile:null,
    form: {
      avatarUrl:"",
      helmetUrl: "",
      halfpicUrl: "",
      NumberIconUrl: "",
      driver_number: "",
    },
  }),

  computed: {
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
  mounted() {
    this.initialize();
  },
  methods: {
    autoComplete(){
      this.editedItem.avatar='http://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/driver_brief/half_driver_pic/GUANYU.png'
      this.editedItem.driver_number_icon='http://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/driver_detail/driver_number_icon/GUANYU.png';
      this.editedItem.driver_helmet='http://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/driver_detail/driver_helmet/GUANYU.png'
      this.editedItem.driver_pic='http://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/driver_detail/driver_pic/GUANYU.jpg'
      this.form.driver_number='24';
      this.form.avatarUrl=this.editedItem.avatar;
      this.form.helmetUrl=this.editedItem.driver_helmet;
      this.form.halfpicUrl=this.editedItem.driver_pic
      this.form.NumberIconUrl=this.editedItem.driver_number_icon
    },
    async initialize() {
      const Driverinfo = await getDriverByTeam();
      console.log(Driverinfo);

      if (Driverinfo.data.Operation === "success") {
        Driverinfo.data.driverinfo.forEach((element) => {
          this.desserts.push(element);
        });
      }
    },
      
    async previewhelmetImage() {
      if (!this.helmetfile) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.helmetfile);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_detail/driver_helmet",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      console.log(res);

      this.form.helmetUrl = res.data.href;
      const reader = new FileReader();
      reader.readAsDataURL(this.helmetfile);
      reader.onload = () => {
        this.helmetimageUrl = reader.result;
      };
    },
    async previewavatarImage() {
      if (!this.avatarfile) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.avatarfile);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_brief/half_driver_pic",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      console.log(res);

      this.form.avatarUrl = res.data.href;
      const reader = new FileReader();
      reader.readAsDataURL(this.avatarfile);
      reader.onload = () => {
        this.avatarimageUrl = reader.result;
      };
    },
    async previewhalfpicImage() {
      if (!this.halfpicfile) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.halfpicfile);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/driver_detail/driver_pic/",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      this.form.halfpicUrl = res.data.href;
      const reader = new FileReader();
      reader.readAsDataURL(this.halfpicfile);
      reader.onload = () => {
        this.halfpicimageUrl = reader.result;
      };
    },
    async previewNumberIconImage() {
      if (!this.NumberIconfile) {
        return;
      }
      var formData = new FormData();
      formData.append("file", this.NumberIconfile);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/driver_detail/driver_number_icon",
        },
      };
      const { data: res } = await OssuploadNewsImg(formData, config);
      this.form.NumberIconUrl = res.data.href;
      const reader = new FileReader();
      reader.readAsDataURL(this.NumberIconfile);
      reader.onload = () => {
        this.NumberIconimageUrl = reader.result;
      };
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.form.NumberIconUrl=this.editedItem.driver_number_icon;
      this.form.avatarUrl=this.editedItem.avatar;
      this.form.driver_number=this.editedItem.driver_number;
      this.form.halfpicUrl=this.editedItem.driver_half_pic;
      this.form.helmetUrl=this.editedItem.driver_helmet;
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
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

    async save() {
      // const res = await UploadDriverDetail({
      //   driver_email: this.editedItem.email,
      // });

      const res2 = await UploadDriverDetails({
        helmetUrl: this.form.helmetUrl,
        halfpicUrl: this.form.halfpicUrl,
        NumberIconUrl: this.form.NumberIconUrl,
        driver_number: this.form.driver_number,
        driver_email: this.editedItem.email,
        avatarUrl:this.form.avatarUrl
      });
      if (res2.data.Operation == "success") {
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        this.close();
        setTimeout(() => {
          this.isSnackbar = false;
          this.saveloading = false;
        }, 2500);
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        this.close();

        setTimeout(() => {
          this.isSnackbar = false;
          this.saveloading = false;
        }, 2500);
      }
    },
  },
};
</script>