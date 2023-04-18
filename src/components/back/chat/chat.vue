<template>
  <div class="chat">
    <div class="chatbackground">
      <img
        src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/mountainback.jpg"
        alt=""
      />
    </div>
    <div class="chatContainer">
      <div class="chatTopbar">
        <v-avatar>
          <img :src="receiverAvatar" />
        </v-avatar>
        <!-- <v-btn @click="login((sender = 'lwb932529621@qq.com'))">用户a</v-btn>
        <v-btn @click="login((sender = 'lwb932529621@gmail.com'))">用户b</v-btn>

        <v-btn @click="receiver = 'lwb932529621@qq.com'">用户a</v-btn>
        <v-btn @click="receiver = 'lwb932529621@gmail.com'">用户b</v-btn> -->
        <div class="userinfo">
          <div class="userinfoTop">{{ receiverName }}</div>
          <div class="userinfoBottom">{{ receiver }}</div>
        </div>
      </div>
      <div class="chatContent" ref="chatContent">
        <div class="chatContentGroup">
          <span
            v-for="(Item, index) of chatlist"
            :key="index"
            class="chatItem"
            :class="[currentUser === Item.sender_id ? 'sender' : 'reciver']"
          >
            <v-list flat v-if="Item.type == 'file'" color="transparent">
              <v-list-item-group>
                <v-list-item
                  two-line
                  v-for="(item, index) of chatlist[index].fileInfo"
                  :key="index"
                  @click="filedownload(item)"
                >
                  <v-list-item-icon style="margin: 10px !important">
                    <div class="b-icon b-icon_type_file">
                      {{ item.filetype }}
                    </div>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.fileName }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ `${item.filesize} MB` }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <a class="downloadFiles" :href="uploadFileItem.fileLink" download></a>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <span style="word-break: break-all" v-if="Item.type == 'text'">{{
              Item.content
            }}</span>
            <span class="timeico" style="color: transparent">
              {{ Item.time }}
              <div class="timeico">{{ Item.time }}</div></span
            >
          </span>
        </div>
      </div>
      <div class="chatinput">
        <div class="inputContainer">
          <div class="inputbox">
            <div class="inputfile">
              <v-btn fab small @click="uploadFile()">
                <v-icon>mdi-paperclip</v-icon>
              </v-btn>
              <v-dialog v-model="dialogflag" width="520px" max-height="300px">
                <v-card>
                  <v-list flat>
                    <v-subheader>文件</v-subheader>
                    <v-list-item-group color="primary">
                      <v-list-item
                        two-line
                        v-for="(item, index) of uploadFileItem.fileInfo"
                        :key="index"
                      >
                        <v-list-item-icon style="margin: 10px !important">
                          <div class="b-icon b-icon_type_file">
                            {{ item.filetype }}
                          </div>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>{{
                            item.fileName
                          }}</v-list-item-title>
                          <v-list-item-subtitle>
                            {{ `${item.filesize} MB` }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red darken-1"
                      text
                      @click="dialogflag = false"
                    >
                      取消
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="
                        dialogflag = false;
                        sendUploadFile();
                      "
                    >
                      发送
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <input
                type="file"
                id="upload"
                multiple
                ref="upload"
                @change="uploadChange()"
              />
              <!-- accept=".jpg, .jpeg, .png" -->
            </div>
            <div class="inputemoji">
              <v-btn fab small @click="emojiSelector">
                <v-icon>mdi-emoticon-happy-outline</v-icon>
              </v-btn>
            </div>
            <div class="inputtext" @keydown.enter="sendMessage()">
              <v-text-field
                color="red"
                v-model="inputMessage"
                label="Message"
              ></v-text-field>
            </div>
            <div class="inputsend">
              <v-btn @click="sendMessage">
                <v-icon>mdi-subdirectory-arrow-left</v-icon>
              </v-btn>
            </div>
          </div>
          <div
            class="emojiSelector"
            :style="[
              {
                transform:
                  emojiSelectorflag == true ? 'Scale(1.1)' : 'Scale(0)',
              },
              { opacity: emojiSelectorflag == true ? '1' : '0' },
            ]"
          >
            <div class="emojiContainer" ref="emojiContainer">
              <div class="emojiSelectorface">
                <v-btn
                  @click="getEmoji($event)"
                  style="font-size: 1.2rem"
                  x-small
                  color="transparent"
                  elevation="0"
                  fab
                  v-for="(emoji, index) of faceEmoji"
                  :key="index"
                  v-html="emoji"
                >
                </v-btn>
              </div>
              <div class="emojiSelectoranimal">
                <v-btn
                  @click="getEmoji($event)"
                  style="font-size: 1.2rem"
                  x-small
                  color="transparent"
                  elevation="0"
                  fab
                  v-for="(emoji, index) of animalEmoji"
                  :key="index"
                  v-html="emoji"
                >
                </v-btn>
              </div>
            </div>
            <div class="emojiSelectorBottomContainer">
              <div class="emojiSelectorBottom">
                <v-btn
                  @click="emojiChange(0)"
                  color="transparent"
                  elevation="0"
                  fab
                  small
                >
                  <v-icon>mdi-emoticon-happy-outline</v-icon>
                </v-btn>
                <v-btn
                  @click="emojiChange(100)"
                  color="transparent"
                  elevation="0"
                  fab
                  small
                >
                  <v-icon>mdi-dog</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-expand-x-transition>
      <div class="chatfriends" v-show="friendListFlag">
        <div class="chatfriendsContainer">
          <div class="chatfriendsSerach">
            <v-btn fab small depressed color="transparent">
              <v-icon @click="friendListFlag = false">
                mdi-format-align-center
              </v-icon>
            </v-btn>
            <input
              type="text"
              placeholder="Search"
              v-model="friendSearch"
              class="friendinput"
            />
          </div>
          <div class="chatfriendslist">
            <v-list-item
              two-line
              v-for="(item, index) of friendsList"
              :key="index"
              link
              v-show="
                item.userName
                  .toLowerCase()
                  .includes(friendSearch.toLowerCase()) || friendSearch == ''
              "
              @click="talkTo(item)"
            >
              <v-list-item-icon style="margin: 10px !important">
                <v-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-avatar>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.userName }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.userID }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
      </div>
    </v-expand-x-transition>
    <div class="friendbtn" transition="fab-transition" v-show="!friendListFlag">
      <v-btn fab small depressed color="transparent">
        <v-icon @click="friendListFlag = !friendListFlag">
          mdi-format-align-center
        </v-icon>
      </v-btn>
    </div>
    <v-snackbar v-model="isSnackbar">
      {{ snackbarTitle }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="
            isSnackbar = false;
            notanyMore = false;
          "
        >
          不再提示
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  getBackuser,
  InsertChatInfo,
  getChatInfo,
  OssuploadNewsImg,
} from "@/plugins/http";
export default {
  data: () => ({
    isSnackbar: false,
    snackbarTitle: "",
    notanyMore: true,

    emojiSelectorflag: false,
    inputFileflag: false,
    dialogflag: false,
    friendListFlag: false,
    faceEmoji: [
      "&#128512;",
      "&#128513;",
      "&#128514;",
      "&#128515;",
      "&#128516;",
      "&#128517;",
      "&#128518;",
      "&#128519;",
      "&#128520;",
      "&#128521;",
      "&#128522;",
      "&#128523;",
      "&#128524;",
      "&#128525;",
      "&#128526;",
      "&#128527;",
      "&#128528;",
      "&#128529;",
      "&#128530;",
      "&#128531;",
      "&#128532;",
      "&#128533;",
      "&#128534;",
      "&#128535;",
      "&#128536;",
      "&#128537;",
      "&#128538;",
      "&#128539;",
      "&#128540;",
      "&#128541;",
      "&#128542;",
      "&#128543;",
      "&#128544;",
      "&#128545;",
      "&#128546;",
      "&#128547;",
      "&#128548;",
      "&#128549;",
      "&#128550;",
      "&#128551;",
      "&#128552;",
      "&#128553;",
      "&#128554;",
      "&#128555;",
      "&#128556;",
      "&#128557;",
      "&#128558;",
      "&#128559;",
      "&#128560;",
      "&#128561;",
      "&#128562;",
      "&#128563;",
      "&#128564;",
      "&#128565;",
      "&#128566;",
      "&#128567;",
      "&#128577;",
      "&#128578;",
      "&#128579;",
      "&#128580;",
      "&#129296;",
      "&#129297;",
      "&#129298;",
      "&#129299;",
      "&#129300;",
      "&#129301;",
      "&#129312;",
      "&#129313;",
      "&#129314;",
      "&#129315;",
      "&#129316;",
      "&#129320;",
      "&#129317;",
      "&#129319;",
      "&#129321;",
      "&#129322;",
      "&#129323;",
      "&#129324;",
      "&#129325;",
      "&#129326;",
      "&#129327;",
      "&#129488;",
    ],
    animalEmoji: [
      "&#128000;",
      "&#128001;",
      "&#128002;",
      "&#128003;",
      "&#128004;",
      "&#128005;",
      "&#128006;",
      "&#128007;",
      "&#128008;",
      "&#128009;",
      "&#128010;",
      "&#128011;",
      "&#128012;",
      "&#128013;",
      "&#128014;",
      "&#128015;",
      "&#128016;",
      "&#128017;",
      "&#128018;",
      "&#128019;",
      "&#128020;",
      "&#128021;",
      "&#128022;",
      "&#128023;",
      "&#128024;",
      "&#128025;",
      "&#128026;",
      "&#128027;",
      "&#128028;",
      "&#128029;",
      "&#128030;",
      "&#128031;",
      "&#128032;",
      "&#128033;",
      "&#128034;",
      "&#128035;",
      "&#128036;",
      "&#128037;",
      "&#128038;",
      "&#128039;",
      "&#128040;",
      "&#128041;",
      "&#128042;",
      "&#128043;",
      "&#128044;",
      "&#128045;",
      "&#128046;",
      "&#128047;",
      "&#128048;",
      "&#128049;",
      "&#128050;",
      "&#128051;",
      "&#128052;",
      "&#128053;",
      "&#128054;",
      "&#128055;",
      "&#128056;",
      "&#128057;",
      "&#128058;",
      "&#128059;",
      "&#128060;",
    ],
    //friends
    friendsList: [],
    friendSearch: "",
    //socket
    uploadFileItem: {},
    inputMessage: "",
    sender: "",
    receiver: "",
    receiverName: "",
    receiverAvatar: "",

    chatlist: [],
    currentUser: "",
  }),
  computed: {
    ...mapState("Backuser", ["BackuserInfos"]),
  },
  mounted() {
    this.getBackUserInfo();
    this.login();
  },
  methods: {
    // createRouter(){
    //   router.addRoute({
    //     path:'/about',
    //     name:'about',
    //     component:()=>import('../account/user.vue')
    //   })
    // },
    uploadFile() {
      let uploadbtn = this.$refs.upload;
      uploadbtn.click();
    },
    async getchatinfo() {
      const res = await getChatInfo({ email: this.BackuserInfos.email });
      console.log(res);
      this.chatlist = res.data.chatinfo.filter((item) => {
        if (
          item.sender_id === this.receiver ||
          item.receiver_id === this.receiver
        ) {
          return item;
        }
      });

      console.log(this.chatlist[0].sender_id === this.currentUser);
      console.log(this.chatlist[0].sender);
      console.log(this.currentUser);
    },
    async uploadChange() {
      let uploadbtn = this.$refs.upload;
      if (uploadbtn.value) {
        this.dialogflag = true;
        this.uploadFileItem = [];
        var formData = new FormData();
        var fileInfoList = [];
        for (let file of uploadbtn.files) {
          file.filetype = file.name.substring(file.name.indexOf("."));
          fileInfoList.push({
            fileName: file.name,
            filetype: file.filetype,
            filesize: Math.round((file.size / 1048576) * 100) / 100,
            file: file,
          });
          formData.append("file", file);
        }
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
            path: "/formula/another/avatar",
          },
        };
        const { data: res } = await OssuploadNewsImg(formData, config);
        console.log(res);
        
        let time = this.$moment().format("HH:mm");
        let date = this.$moment().format("ll");
        this.uploadFileItem = {
          sender_id: this.sender,
          receiver_id: this.receiver,
          content: "",
          time: date + " " + time,
          type: "file",
          fileInfo: fileInfoList,
          fileLink:res.data.href
        };
        console.log(this.uploadFileItem);
      }
    },
    async sendUploadFile() {
      this.$socket.emit("uploadFile", this.uploadFileItem, (status) => {
        console.log(status);
        if (status.message == "success") {
          let time = this.$moment().format("HH:mm");
          let date = this.$moment().format("ll");

          let obj = {
            sender_id: this.sender,
            receiver_id: this.receiver,
            content: this.inputMessage,
            time: date + " " + time,
            type: "file",
            fileInfo: this.uploadFileItem.fileInfo,
          };
          this.chatlist.push(obj);
          this.$nextTick(() => {
            this.$refs.chatContent.scrollTop =
              this.$refs.chatContent.scrollHeight;
          });
        }
      });
      console.log(this.uploadFileItem);
    },
    getEmoji($event) {
      console.log($event.target.innerText);
      this.inputMessage = this.inputMessage.concat($event.target.innerText);
    },
    emojiSelector() {
      this.emojiSelectorflag = !this.emojiSelectorflag;
    },
    emojiChange(transdistance) {
      this.$refs.emojiContainer.style.transform = `translateX(-${transdistance}%)`;
    },
    sendMessage() {
      let time = this.$moment().format("HH:mm");
      let date = this.$moment().format("ll");
      let obj = {
        sender_id: this.sender,
        receiver_id: this.receiver,
        content: this.inputMessage,
        time: date + " " + time,
        type: "text",
      };
      console.log("message:" + this.inputMessage);
      this.$socket.emit("sendMessage", obj);
      this.chatlist.push(obj);
      this.InsertChatInfo(obj);
      this.inputMessage = " ";
      this.$nextTick(() => {
        this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight;
      });
    },
    login() {
      this.currentUser = this.BackuserInfos.email;
      this.sender = this.BackuserInfos.email;
      this.$socket.connect();
      this.$socket.emit("login", { userID: this.BackuserInfos.email });
    },
    async getBackUserInfo() {
      const res = await getBackuser();
      res.data.users.forEach((item, index) => {
        this.friendsList.push({
          userID: item.email,
          userName: item.email.split("@")[0],
          avatar: item.avatar,
        });
      });
    },
    async InsertChatInfo(obj) {
      const res = await InsertChatInfo(obj);
      console.log(res);
    },
    talkTo(item) {
      this.receiver = item.userID;
      this.receiverName = item.userName;
      this.receiverAvatar = item.avatar;
      this.getchatinfo();
      this.friendListFlag=false;
    },
    filedownload(){
      const a=document.getElementsByClassName('downloadFiles');
      a[0].click();      
    }
  },
  sockets: {
    connect() {
      console.log("连接成功");
    },
    disconnect() {
      console.log("断开连接");
    },
    reconnect() {
      console.log("重新连接");
    },
    linkSuccess(val) {
      console.log("linkSuccess :", val);
    },
    ReceiverOffline(data) {
      if (this.notanyMore) {
        this.isSnackbar = true;
        this.snackbarTitle = data;
      }
    },
    serveMsg(data) {
      this.chatlist.push(data);
      this.$nextTick(() => {
        this.$refs.chatContent.scrollTop = this.$refs.chatContent.scrollHeight;
      });
    },
    uploadOutput(data) {
      this.chatlist.push(data);
    },
  },
};
</script>

<style lang="scss">
.chat {
  width: 100%;
  height: 90vh;
  display: flex;
  position: relative;
  background-color: transparent;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  .chatbackground {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;

    img {
      width: 100%;
      height: 100%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }
  .chatContainer {
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    background-color: transparent;
    z-index: 11;
    transition: width 0.7s;
    .chatTopbar {
      background-color: rgba(195, 193, 193, 0.7);
      backdrop-filter: blur(5px);
      height: 10%;
      display: flex;
      align-items: center;
      column-gap: 15px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      padding: 0 20px;
      .userinfo {
        font-family: "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
          "Helvetica Neue", sans-serif;
      }
      .userinfoTop {
        font-size: 16px;
      }
      .userinfoBottom {
        font-size: 14px;
        color: #ffffff;
      }
    }
    .chatContent {
      width: 100%;
      background-color: transparent;
      height: 80%;
      z-index: 11;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: scroll;
      .chatContentGroup {
        width: 70%;
        height: fit-content;
        background-color: transparent;
        display: inline-flex;
        flex-direction: column;
        row-gap: 15px;

        .chatItem {
          width: fit-content;
          padding: 10px;
          border-radius: 15px;
          max-width: 65%;
        }
        .reciver {
          align-self: flex-start;
          background-color: white;
        }
        .sender {
          align-self: flex-end;
          background-color: rgba(145, 255, 0, 0.7);
        }
        .timeico {
          color: rgb(161, 154, 154);
          font-weight: 400;
          font-size: 10px;
          vertical-align: bottom;
          text-align: end;
        }
        .chatservice_msg {
          width: fit-content;
          padding: 10px;
          border-radius: 20px;
          align-self: center;
          background-color: rgba(233, 233, 233, 0.4);
          font-weight: 550;
          color: #ffffff;
          user-select: none;
        }
      }
    }
    .chatinput {
      width: 100%;
      background-color: transparent;
      height: 10%;
      z-index: 11;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      .inputContainer {
        position: relative;
        width: 60%;
        height: 85%;
        .inputbox {
          width: 100%;
          height: 100%;
          background-color: white;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          column-gap: 10px;
          padding: 0 10px;
          .inputtext {
            flex: 1 1 auto;
            align-self: flex-start;
          }
          #upload {
            height: 0;
            width: 0;
            visibility: hidden;
          }
        }
        .emojiSelector {
          position: absolute;
          bottom: 150%;
          width: 300px;
          height: 320px;
          background-color: transparent;
          border-radius: 5px;
          transition: all 0.3s;
          overflow: scroll;
          .emojiContainer {
            display: flex;
            transition: all 0.3s;
            .emojiSelectorface,
            .emojiSelectoranimal {
              min-width: 100%;
              min-height: 90%;
              background-color: rgb(244, 244, 244);
              display: grid;
              grid-template-columns: repeat(8, 12.5%);
              row-gap: 10px;
              padding: 25px;
            }
          }
          .emojiSelectorBottomContainer {
            position: sticky;
            bottom: 0;
            .emojiSelectorBottom {
              width: 100%;
              height: 10%;
              background-color: rgb(244, 244, 244);
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
      }
    }
  }
  .chatfriends {
    width: 350px;
    height: 100%;
    background-color: #ffffff;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999;
    .chatfriendsContainer {
      display: flex;
      flex-direction: column;
      .chatfriendsSerach {
        padding: 10px;
        display: flex;
        box-shadow: 0px 5px 10px 0 #bababa;
      }
      .chatfriendslist {
        max-height: 80vh;
        overflow: scroll;
      }
      .chatfriendsSerach .friendinput {
        border: 0;
        outline: 0;
        border: 1px solid #e5dede;
        padding: 5px 20px;
        border-radius: 20px;
        width: 80%;
      }
    }
  }
  .friendbtn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    background-color: #ffffff;
    border-radius: 50%;
    z-index: 999;
  }
}
.b-icon {
  font-size: 1rem;
}
.b-icon_type_file {
  width: 2.5em;
  height: 3em;
  line-height: 3em;
  text-align: center;
  border-radius: 0.25em;
  color: #fff;
  overflow: hidden;
  background-color: #7e70ee;
}
.chatContent::-webkit-scrollbar {
  display: none !important;
}
.emojiSelector::-webkit-scrollbar {
  display: none !important;
}
</style>