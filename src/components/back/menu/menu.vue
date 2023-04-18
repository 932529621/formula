<template>
  <v-app>
    <div>
      <v-card class="rounded-lg" :elevation="3">
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
          item-key="id"
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
                          <v-text-field
                            v-model="editedItem.id"
                            label="ID"
                            outlined
                            disabled
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.name"
                            label="路由名"
                            :rules="Namerules"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.type"
                            label="类型(0:父路由 1:子路由)"
                            :rules="Typerules"
                            @input="typecheck()"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.icon"
                            label="图标"
                            :disabled="editedItem.type == 1"
                            :rules="editedItem.type == 0 ? Iconrules : Nullrules"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.order_num"
                            label="排序"
                            :rules="OderNumrules"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.url"
                            label="路由地址"
                            :disabled="editedItem.type == 0"
                            :rules="editedItem.type == 1 ? Urlrules : Nullrules"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.pid"
                            label="父路由ID"
                            :disabled="editedItem.type == 0"
                            :rules="editedItem.type == 1 ? Pidrules : Nullrules"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.component"
                            label="组件位置"
                            :disabled="editedItem.type == 0"
                            :rules="editedItem.type == 1 ? Componentrules : Nullrules"
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
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >删除</v-btn
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
import { getBackmenu, insertmenus, deleteBackmenu } from "@/plugins/http";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    saveloading: false,
    isSnackbar: false,
    isSnackbarSuccess: null,

    search: "",
    selected: [],
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "路由名", value: "name" },
      { text: "路由地址", value: "url" },
      { text: "父路由ID", value: "pid" },
      { text: "类型", value: "type" },
      { text: "图标", value: "icon" },
      { text: "排序位置", value: "order_num" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: null,
      name: "",
      url: "",
      pid: "",
      type: "",
      icon: "",
      order_num: null,
      component: null,
    },
    defaultItem: {
      id: null,
      name: "",
      url: "/AdminHome/",
      pid: "",
      type: "",
      icon: "mdi-",
      order_num: null,
      component: "/back/",
    },

    valid:true,
    Nullrules:{
      min: (v) => v.length >= 0 || "类型是必选的",
    },
    Namerules: [(v) => !!v || "名字是必填的"],
    Typerules: {
      min: (v) => v.length >= 1 || "类型是必填的",
    },
    Iconrules: [(v) => !!v || "图标是必填的"],
    OderNumrules: [(v) => !!v || "排序位置是必填的"],
    Urlrules: [(v) => !!v || "路由地址是必填的"],
    Pidrules: [(v) => !!v || "父路由是必填的"],
    Componentrules: [(v) => !!v || "组件位置是必填的"],
  }),

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

  methods: {
    async initialize() {
      const res = await getBackmenu();
      if (res.status === 200) {
        const Menus = res.data.MenusNode.concat(res.data.MenusChild);
        for (let key of Menus) {
          this.desserts.push(key);
        }
      }
    },

    typecheck(){
      console.log('12233');
      if(this.editedItem.type == '0'){
        console.log('123');
        this.editedItem.icon='mdi-'
        this.editedItem.url='';
        this.editedItem.component='';
      }else{
        this.editedItem.url='/AdminHome/';
        this.editedItem.component='/back/';
        this.editedItem.icon=''
      }
    },
    validate() {
      this.$refs.cardform.validate() ? this.save() : (this.valid = false);
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.DeleteAxios();
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

    save() {
      this.saveloading = true;
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
        this.InsertAxios();
      } else {
        this.InsertAxios();
      }
    },

    async InsertAxios() {
      const res = await insertmenus(this.editedItem);
      if (res.data.Operation === "success") {
        this.editedItem.id = res.data.id;
        if (res.data.id) {
          this.desserts.push(this.editedItem);
        }
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
        }, 2500);
        this.close();
        this.saveloading = false;
        window.location.reload()
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
    async DeleteAxios() {
      this.saveloading = true;
      const res = await deleteBackmenu({ id: this.editedItem.id });
      if (res.data.Operation === "success") {
        this.desserts.splice(this.editedIndex, 1);
        this.closeDelete();
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
        }, 2500);
        this.close();
        this.saveloading = false;
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
};
</script>

<style>
</style>