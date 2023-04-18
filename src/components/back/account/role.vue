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
                  @click="getallpermissionName()"
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
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.role_id"
                          label="ID"
                          outlined
                          disabled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.role_name"
                          label="角色名"
                          :rules="Rolerules"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-combobox
                          v-model="editedItem.role_permission"
                          :items="PermissionsName"
                          :rules="Permissionrules"
                          label="权限"
                          multiple
                          chips
                        ></v-combobox>
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
                <v-card-title class="text-h5 text-center"
                  >你确定要删除吗?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >取消</v-btn
                  >
                  <v-btn color="red darken-1" text @click="deleteItemConfirm"
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
  getallRoleName,
  DeleteBackRole,
  InsertOrUpdateBackRole,
  getallpermission,
} from "@/plugins/http";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isSnackbar: false,
      isSnackbarSuccess: null,
      snackbarTitle: "",
      saveloading: false,

      selectedItems: [],
      // editeddisabled:[],
      PermissionsName: [],

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
          value: "role_id",
        },
        { text: "角色", value: "role_name" },
        { text: "权限", value: "role_permission" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        role_id: "",
        role_name: "",
        role_permission: [],
        route_id: [],
      },
      defaultItem: {
        role_id: "",
        role_name: "",
        role_permission: [],
        route_id: [],
      },

      valid: true,
      Permissionrules: [
        (v) => !!v || "权限是必填的",
      ],
      Rolerules: [
        (v) => !!v || "角色名是必填的",
      ]
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapState("routeInfo", ["routesInfo"]),
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
      const RoleName = await getallRoleName();
      if (RoleName.status === 200) {
        for (let key of RoleName.data.roleInfo) {
          this.desserts.push(key);
        }
        const res = await getallpermission();
        if (res.status === 200) {
          this.desserts.forEach((items, indexs) => {
            items.role_permission = [];
            items.route_id = [];
            res.data.PermissionInfo.forEach((item, index) => {
              if (items.role_id == item.role_id) {
                items.role_permission.push(item.name);
              }
            });
          });
        }
      }
      this.setPermissionName();
    },

    validate(){
      this.$refs.cardform.validate()
        ? this.save()
        : (this.valid = false);
    } ,

    setPermissionName() {
      this.routesInfo.MenusChild.forEach((item) => {
        this.PermissionsName.push(item.name);
      });
    },

    setRouteId() {
      this.editedItem.role_permission.forEach((items, indexs) => {
        this.routesInfo.MenusChild.forEach((item, index) => {
          if (items == item.name) {
            this.editedItem.route_id.push(item.id);
          }
        });
      });
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

    async deleteItemConfirm() {
      this.DeleteBackRole();
    },

    async DeleteBackRole() {
      const res = await DeleteBackRole({ role_id: this.editedItem.role_id });
      if (res.data.Operation === "success") {
        this.desserts.splice(this.editedIndex, 1);
        this.closeDelete();
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        this.snackbarTitle = "操作成功";
        setTimeout(() => {
          this.isSnackbar = false;
        }, 500);
        this.dialogDelete = false;
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        this.snackbarTitle = "操作失败";
        setTimeout(() => {
          this.isSnackbar = false;
        }, 500);
        this.dialogDelete = false;
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
      this.setRouteId();
      if (this.editedIndex > -1) {
        this.InsertOrUpdateBackRole();
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.InsertOrUpdateBackRole();
        this.desserts.push(this.editedItem);
      }
    },

    async InsertOrUpdateBackRole() {
      const res = await InsertOrUpdateBackRole(this.editedItem);
      if (res.data.Operation === "success") {
        this.editedItem.role_id = res.data.role_id;
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        this.snackbarTitle = "操作成功";
        setTimeout(() => {
          this.isSnackbar = false;
        }, 5000);
        this.saveloading = false;
        this.close();
        window.location.reload();
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
  },
};
</script>
  
  <style scoped lang="scss">
</style>