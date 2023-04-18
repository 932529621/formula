<template>
  <div>
    <div class="notification" v-if="hasItem ==true">
      <v-card class="v-cards pa-5" elevation="10">
        <!-- <div class="card-title">Notification</div> -->
        <v-list three-line>
          <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header">
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>

            <v-list-item
              v-else
              :key="item.id"
              link
              @click.stop="MessageDetail(index)"
            >
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle v-html="item.content"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon @click.stop="DeleteEmailinfo(index)" color="grey lighten-1"
                    >mdi-delete</v-icon
                  >
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
      <v-dialog v-model="dialog" width="650">
        <v-card>
          <v-card-title
            style="column-gap: 15px; background-color: rgb(145, 85, 253)"
            class="text-h5 lighten-2"
          >
            <v-avatar>
              <img :src="msgdetail.avatar" alt="" />
            </v-avatar>
            {{ msgdetail.username }}
          </v-card-title>
          <v-card-subtitle> {{ msgdetail.title }} </v-card-subtitle>
          <v-card-text>
            {{ msgdetail.content }}
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click.stop="DeleteEmailinfo()">
              <v-icon> mdi-delete</v-icon>
            </v-btn>
            <v-btn color="primary" text @click="dialog = false"> OK </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div class="noneContent" v-if="hasItem == false">
      <div class="iconbox">
        <v-icon x-large color="red darken-2"> mdi-bell </v-icon>
      </div>
      <div class="content">There's nothing here ~</div>
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
  </div>
</template>

<script>
import { getEmailinfo, DeleteEmailinfo } from "@/plugins/http";
export default {
  data: () => ({
    hasItem: true,
    dialog: false,
    items: [],
    msgdetail: {},
    isSnackbar: false,
    isSnackbarSuccess: false,
  }),
  computed: {
    snackbarTitle() {
      return this.isSnackbarSuccess === true
        ? "Successful Operation"
        : "Fail Operation";
    },
  },
  methods: {
    async getEmailinfo() {
      const res = await getEmailinfo();
      console.log(res);
      
      if (res.data.Operation == "success") {
        res.data.chatinfos.forEach((item, index) => {
          res.data.avatarinfo.forEach((items, indexs) => {
            if (item.sender_id == items.email) {
              item.avatar = items.avatar;
            }
          });
          this.items.push(item);
          this.items.push({
            divider: true,
            inset: true,
          });
        });
        console.log(this.items);
      }
    },
    MessageDetail(index) {
      this.msgdetail = this.items[index];
      this.msgdetail.index=index;
      this.dialog = true;
    },
    async DeleteEmailinfo(index) {
      if (index != undefined) {
        const res = await DeleteEmailinfo({ id: this.items[index].id });
        if (res.data.Operation == "success") {
          this.isSnackbarSuccess = true;
          this.isSnackbar = true;
          this.items.splice(index, 1);
          setTimeout(() => {
            this.isSnackbar = false;
          }, 500);
        } else {
          this.isSnackbarSuccess = false;
          this.isSnackbar = true;
          setTimeout(() => {
            this.isSnackbar = false;
          }, 500);
        }
      } else {
        const res = await DeleteEmailinfo({ id: this.msgdetail.id });
        if (res.data.Operation == "success") {
          this.items.splice(this.msgdetail.index, 1);
          this.isSnackbarSuccess = true;
          this.isSnackbar = true;
          setTimeout(() => {
            this.isSnackbar = false;
          }, 500);
        } else {
          this.isSnackbarSuccess = false;
          this.isSnackbar = true;
          setTimeout(() => {
            this.isSnackbar = false;
          }, 500);
        }
      }
    },
  },
  mounted() {
    this.getEmailinfo();
  },
};
</script>

<style lang="scss" scoped>
.notification {
  .card-title {
    display: inline-block;
    font-size: 1.25rem;
    font-weight: 500;
    letter-spacing: 0.0125em;
    line-height: 2rem;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.noneContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  .content {
    font-size: 1.2rem;
    font-family: Heavy;
  }
}
.v-card__subtitle {
  margin-top: 0 !important;
  padding-top: 10px !important;
  font-weight: 600 !important;
  font-size: 0.95rem;
}
</style>