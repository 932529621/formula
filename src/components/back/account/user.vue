<template>
  <div>
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
        item-key="name"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="getallRoleName()"
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
                        <v-col cols="12" sm="6" md="4">
                          <v-avatar
                            fab
                            depressed
                            color="transparent"
                            size="80"
                            @click="uploadAvatar()"
                          >
                            <img
                              ref="Avatar"
                              :src="
                                editedItem.avatar
                                  ? editedItem.avatar
                                  : 'https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/gray.png'
                              "
                            />
                          </v-avatar>
                          <input
                            type="file"
                            id="upload"
                            ref="uploadAvatar"
                            @change="changeAvatar()"
                            accept="image/*"
                          />
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.id"
                            label="ID"
                            outlined
                            disabled
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.email"
                            :rules="emailRules"
                            label="Email"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.password"
                            label="密码"
                            :rules="Passwordrules"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            :items="roleInfo"
                            v-model="editedItem.role_name"
                            label="角色名"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    :disabled="saveloading"
                    text
                    @click="close"
                  >
                    取消
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    :loading="saveloading"
                    :disabled="saveloading"
                    text
                    @click="validate()"
                  >
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
        <template v-slot:item.avatar="{ item }">
          <v-avatar>
            <img :src="item.avatar" />
          </v-avatar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
  </div>
</template>

<script>
import {
  getBackuser,
  getallRoleName,
  DeleteBackuser,
  InsertOrUpdateBackuser,
  OssuploadNewsImg,
  OssDeleteNewsImg,
} from "@/plugins/http";
export default {
  data() {
    return {
      isSnackbar: false,
      isSnackbarSuccess: null,
      snackbarTitle: "",
      saveloading: false,

      dialog: false,
      dialogDelete: false,
      search: "",
      selected: [],
      roleInfo: [],
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "", value: "avatar" },
        { text: "角色", value: "role_name" },
        { text: "Email", value: "email" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      DeletefileItem: [],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        id: "",
        email: "",
        password: 0,
        avatar: 0,
        role_name: 0,
      },
      defaultItem: {
        id: "",
        email: "",
        password: 0,
        avatar: 0,
        role_name: 0,
      },

      valid: true,
      Passwordrules: [(v) => !!v || "密码是必填的"],
      emailRules: [
        (v) => !!v || "邮箱是必填的",
        (v) => /.+@.+\..+/.test(v) || "请输入正确的邮箱",
      ],
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
      const res = await getBackuser();
      if (res.status === 200) {
        for (let key of res.data.users) {
          this.desserts.push(key);
        }
      }
    },

    async getallRoleName() {
      const res = await getallRoleName();
      if (res.status === 200) {
        for (let key of res.data.roleInfo) {
          this.roleInfo.push(key.role_name);
        }
      }
    },

    validate() {
      this.$refs.cardform.validate() ? this.save() : (this.valid = false);
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
      this.DeletefileItem[1] = file.name;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.getallRoleName();
      this.DeletefileItem[0] = this.editedItem.avatar;
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      this.DeleteBackuserItem();
    },

    async DeleteBackuserItem() {
      const res = await DeleteBackuser({ id: this.editedItem.id });
      const fileItem = this.editedItem.avatar.split(" ");
      const fileItems = [];
      fileItem.forEach((item) => {
        fileItems.push(item.substring(item.indexOf("/formula/another/avatar")));
      });
      const Deleteres = await OssDeleteNewsImg({ fileItems });
      if (res.data.Operation === "success") {
        this.desserts.splice(this.editedIndex, 1);
        this.closeDelete();
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        this.snackbarTitle = "操作成功";
        setTimeout(() => {
          this.isSnackbar = false;
        }, 500);
        this.close();
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        this.snackbarTitle = "操作失败";
        setTimeout(() => {
          this.isSnackbar = false;
        }, 500);
        this.close();
      }
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
      this.saveloading = true;
      let uploadbtn = this.$refs.uploadAvatar;
      const file = uploadbtn.files[0];
      var formData = new FormData();
      formData.append("file", file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          path: "/formula/another/avatar",
        },
      };
      console.log(file);
      if (file == undefined) {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem);
          this.InsertOrUpdateBackuser();
        } else {
          this.InsertOrUpdateBackuser();
          this.desserts.push(this.editedItem);
        }
      } else {
        const { data: res } = await OssuploadNewsImg(formData, config);
        console.log(res);
        if (res.data.href) {
          this.editedItem.avatar = res.data.href;
          if (this.editedIndex > -1) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem);
            this.InsertOrUpdateBackuser();
          } else {
            this.InsertOrUpdateBackuser();
            this.desserts.push(this.editedItem);
          }
        } else {
          this.isSnackbarSuccess = false;
          this.isSnackbar = true;
          this.snackbarTitle = "头像上传失败!";
          setTimeout(() => {
            this.isSnackbar = false;
          }, 2500);
          return false;
        }
      }
    },

    async InsertOrUpdateBackuser() {
      const res = await InsertOrUpdateBackuser(this.editedItem);
      console.log(res);

      if (res.data.Operation === "success") {
        this.editedItem.id = res.data.id;
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        this.snackbarTitle = "操作成功";
        setTimeout(() => {
          this.isSnackbar = false;
        }, 5000);
        this.DeleteOssAvatar();
        this.saveloading = false;
        this.close();
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        this.snackbarTitle = "操作失败";
        setTimeout(() => {
          this.isSnackbar = false;
        }, 5000);
        this.close();
      }
    },

    async DeleteOssAvatar() {
      const fileItems = [];
      this.DeletefileItem.forEach((item, index) => {
        const fileName = item.substring(
          item.indexOf("/formula/another/avatar")
        );
        fileItems.push(fileName);
      });
      console.log(fileItems);
      const res = await OssDeleteNewsImg({ fileItems });
      console.log(res);
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