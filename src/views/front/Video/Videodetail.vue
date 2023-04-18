<template>
  <v-app>
    <racenav></racenav>
    <videomain v-if="hasinfo"></videomain>
    <videoAlsolike></videoAlsolike>
    <partner class="video_partner"></partner>
    <bottom></bottom>
    <Racefooter></Racefooter>
    <div class="btnbox">
      <div class="btncontainer">
        <v-btn @click="backTop()" class="mx-2" fab dark color="indigo">
          <v-icon dark> mdi-arrow-up </v-icon>
        </v-btn>
        <v-btn @click="favourate()" class="mx-2" fab dark color="rgb(51,51,51)">
          <v-icon dark :color="isFavo ? 'red' : 'white'"> mdi-heart </v-icon>
        </v-btn>
        <v-btn @click.stop="comment()" class="mx-2" fab dark color="blue-grey">
          <v-icon dark> mdi-comment-text </v-icon>
        </v-btn>
      </div>
    </div>

    <v-navigation-drawer
      height="100vh"
      width="400"
      class="overflow-hidden"
      v-model="drawer"
      fixed
      temporary
    >
      <!-- <v-spacer style="min-height: 20px"></v-spacer> -->
      <v-list-item-content class="ma-2">
        <v-list-item-title class="text-center text-subtitle-1"
          >评论({{ commentInfo.length / 2 }})</v-list-item-title
        >
      </v-list-item-content>

      <v-divider></v-divider>

      <v-list three-line dense>
        <template v-for="(item, index) in commentInfo">
          <v-subheader
            v-if="item.header"
            :key="item.header"
            v-text="item.header"
          ></v-subheader>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
          ></v-divider>

          <v-list-item v-else :key="item.title">
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                >{{ item.username }}
                <span style="color: grey; font-size: 0.5rem">{{
                  item.email
                }}</span></v-list-item-title
              >
              <v-spacer style="min-height: 5px"></v-spacer>
              <v-list-item-subtitle>
                {{ item.comment_date.split("T")[0] }}
              </v-list-item-subtitle>
              <v-spacer style="min-height: 5px"></v-spacer>
              <v-list-item-subtitle
                v-html="item.content"
              ></v-list-item-subtitle>
              <v-spacer style="min-height: 10px"></v-spacer>
              <div class="comment-btnbox">
                <div class="col">
                  <v-btn @click="replyTo(item)" text color="grey"
                    ><v-icon size="20">mdi-comment-outline</v-icon> 评论({{
                      item.reply.length / 2
                    }})
                  </v-btn>
                </div>
                <div class="col">
                  <v-btn
                    text
                    @click="
                      thumbstatusChange({
                        comment_id: item.comment_id,
                        thumb: 'thumb_up',
                        index,
                        type: 'node',
                      })
                    "
                    :color="item.thumbStatus === 'thumb_up' ? 'green' : 'grey'"
                    ><v-icon
                      :color="
                        item.thumbStatus === 'thumb_up' ? 'green' : 'grey'
                      "
                      >mdi-thumb-up-outline</v-icon
                    >{{ item.thumb_up }}</v-btn
                  >
                </div>
                <div class="col">
                  <v-btn
                    text
                    :color="
                      item.thumbStatus === 'thumb_down' ? 'green' : 'grey'
                    "
                    @click="
                      thumbstatusChange({
                        comment_id: item.comment_id,
                        thumb: 'thumb_down',
                        type: 'node',
                        index,
                      })
                    "
                    ><v-icon
                      :color="
                        item.thumbStatus === 'thumb_down' ? 'green' : 'grey'
                      "
                      >mdi-thumb-down-outline</v-icon
                    >{{ item.thumb_down }}</v-btn
                  >
                </div>
              </div>
              <v-list three-line dense v-if="item.reply">
                <template v-for="(reply, indexs) in item.reply">
                  <v-subheader
                    v-if="reply.header"
                    :key="reply.header"
                    v-text="reply.header"
                  ></v-subheader>

                  <v-divider
                    v-else-if="reply.divider"
                    :key="index"
                    :inset="reply.inset"
                  ></v-divider>

                  <v-list-item link v-else :key="reply.title">
                    <v-list-item-avatar>
                      <v-img :src="reply.avatar"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title
                        >{{ reply.username }}
                        <span style="color: grey; font-size: 0.5rem">{{
                          reply.email
                        }}</span></v-list-item-title
                      >
                      <v-spacer style="min-height: 5px"></v-spacer>
                      <v-list-item-subtitle>
                        {{ reply.comment_date.split("T")[0] }}
                      </v-list-item-subtitle>
                      <v-spacer style="min-height: 5px"></v-spacer>
                      <v-list-item-subtitle
                        v-html="reply.content"
                      ></v-list-item-subtitle>
                      <v-spacer style="min-height: 10px"></v-spacer>
                      <div class="comment-btnbox">
                        <div class="col">
                          <v-btn
                            @click="
                              thumbstatusChange({
                                comment_id: reply.comment_id,
                                thumb: 'thumb_up',
                                index,
                                indexs,
                                type: 'child',
                              })
                            "
                            text
                            :color="
                              reply.thumbStatus === 'thumb_up'
                                ? 'green'
                                : 'grey'
                            "
                            ><v-icon
                              :color="
                                reply.thumbStatus === 'thumb_up'
                                  ? 'green'
                                  : 'grey'
                              "
                              >mdi-thumb-up-outline</v-icon
                            >{{ reply.thumb_up }}</v-btn
                          >
                        </div>
                        <div class="col">
                          <v-btn
                            @click="
                              thumbstatusChange({
                                comment_id: reply.comment_id,
                                thumb: 'thumb_down',
                                index,
                                indexs,
                                type: 'child',
                              })
                            "
                            text
                            :color="
                              reply.thumbStatus === 'thumb_down'
                                ? 'green'
                                : 'grey'
                            "
                            ><v-icon
                              :color="
                                reply.thumbStatus === 'thumb_down'
                                  ? 'green'
                                  : 'grey'
                              "
                              >mdi-thumb-down-outline</v-icon
                            >{{ reply.thumb_down }}</v-btn
                          >
                        </div>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>

      <div class="commentText">
        <div class="comment-content"></div>
        <div class="comment-login" style="color: white" v-if="!haslogin">
          <div class="">
            请在<v-btn @click="$router.push('/login/sign')" text color="red"
              >登录</v-btn
            >后发表评论
          </div>
        </div>

        <div class="comment-login" style="color: white" v-if="haslogin">
          <div class="inputContainer">
            <div class="inputbox">
              <div class="inputemoji">
                <v-btn fab small @click="emojiSelector">
                  <v-icon>mdi-emoticon-happy-outline</v-icon>
                </v-btn>
              </div>
              <div class="inputtext" @keydown.enter="sendMessage()">
                <v-text-field
                  color="red"
                  v-model="replyform.content"
                  solo
                ></v-text-field>
              </div>
              <div class="inputsend">
                <v-btn class="btnsend" min-heihgt="40" @click="sendMessage">
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
    </v-navigation-drawer>
    <v-snackbar
      :value="snackbar"
      :color="snackbarColor"
      :timeout="5000"
      top
      class="ma-12"
      min-width="150px"
    >
      {{ snackbartext }}
    </v-snackbar>
  </v-app>
</template>

<script>
import {
  getUserFavourite,
  Deletefavourite,
  addfavourite,
  getAllcomment,
  commentThumbDownOrUp,
  addcomment,
} from "@/plugins/http";
import { mapState } from "vuex";
import videomain from "../../../components/front/video/videodetailmain.vue";
import racenav from "../../../components/front/homes/nav.vue";
import partner from "../../../components/front/homes/partner.vue";
import bottom from "../../../components/front/homes/bottom.vue";
import Racefooter from "../../../components/front/homes/Racefooter.vue";
import videoAlsolike from "../../../components/front/video/videoAlsolike.vue";
export default {
  components: {
    videomain,
    racenav,
    videoAlsolike,
    partner,
    bottom,
    Racefooter,
  },
  data: () => ({
    hasinfo: false,
    isFavo: false,
    drawer: false,
    haslogin: null,
    thumbstatus: null,
    commentChild: [],
    commentNode: [],
    commentuser: [],
    commentInfo: [],
    snackbar: false,
    snackbartext: "",
    snackbarColor: "",
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
    emojiSelectorflag: false,
    replyform: {
      content: "",
      article_id: "",
      parent_id: null,
    },
  }),
  computed: {
    ...mapState("videos", ["video"]),
    ...mapState("user", ["userInfos"]),
  },
  async mounted() {
    window.scrollTo(0, 0);
    this.hasfavo();
    await this.$store.dispatch(
      "videos/getvideoDetailByid",
      this.$route.query.video_id
    );
    this.initComment();
    if (this.video) {
      this.hasinfo = true;
    }
    if (this.userInfos) {
      this.haslogin = true;
    }
  },

  methods: {
    backTop() {
      window.scrollTo(0, 0);
    },
    favourate() {
      this.isFavo ? this.Deletefavourite() : this.addfavourite();
    },
    comment() {
      this.drawer = !this.drawer;
    },
    getEmoji($event) {
      console.log($event.target.innerText);
      this.replyform.content = this.replyform.content.concat(
        $event.target.innerText
      );
    },
    emojiSelector() {
      this.emojiSelectorflag = !this.emojiSelectorflag;
    },
    emojiChange(transdistance) {
      this.$refs.emojiContainer.style.transform = `translateX(-${transdistance}%)`;
    },
    async sendMessage() {
      const res = await addcomment({
        article_id: this.$route.query.video_id,
        content: this.replyform.content,
        parent_id: this.replyform.parent_id ? this.replyform.parent_id : null,
      });
      if (res.data.Operation === "success") {
        this.replyform = {};
        this.snackbar = true;
        this.snackbartext = "评论成功 ";
        this.snackbarColor = "success";
        setTimeout(() => {
          this.snackbar = false;
        }, 3000);
      } else {
        this.snackbar = true;
        setTimeout(() => {
          this.snackbar = false;
        }, 3000);
        this.snackbartext = "评论失败 ";
        this.snackbarColor = "error";
      }
    },
    replyTo(data) {
      console.log(data);
      this.replyform.content = this.replyform.content =
      this.replyform.parent_id = data.comment_id;
    },
    async hasfavo() {
      const res = await getUserFavourite();
      res.data.VideofavoArr.forEach((item, index) => {
        item.video_id === this.$route.query.video_id
          ? (this.isFavo = true)
          : (this.isFavo = false);
      });
    },
    async Deletefavourite() {
      const res = await Deletefavourite({
        news_id: this.$route.query.video_id,
        type: "videos",
      });
      if (res.data.Operation == "success") {
        this.isFavo = false;
      }
    },
    async addfavourite() {
      const res = await addfavourite({
        news_id: this.$route.query.video_id,
        type: "videos",
      });
      if (res.data.Operation == "success") {
        this.isFavo = true;
      }
    },
    async initComment() {
      const res = await getAllcomment({
        article_id: this.$route.query.video_id,
      });
      console.log(res);
      //后台给三个数组：评论父与子、用户信息
      if (res.data.Operation == "success") {
        res.data.commentNode.forEach((item, index) => {
          res.data.userinfo.forEach((user) => {
            if (item.author_id === user.user_id) {
              item["avatar"] = user.avatar;
              item["email"] = user.user_email;
              item["username"] = user.username;
            }
          });
          this.commentNode.push(item);
          this.commentNode.push({ divider: true, inset: true });
        });
        res.data.commentChild.forEach((item, index) => {
          res.data.userinfo.forEach((user) => {
            if (item.author_id === user.user_id) {
              item["avatar"] = user.avatar;
              item["email"] = user.user_email;
              item["username"] = user.username;
            }
          });
          this.commentChild.push(item);
          this.commentChild.push({ divider: true, inset: true });
        });

        this.commentNode.forEach((Node, index) => {
          Node.reply = [];
          Node["thumbStatus"] = null;
          this.commentChild.forEach((Child, indexs) => {
            if (Node.comment_id == Child.parent_id) {
              Node.reply.push({ divider: true, inset: true });

              Child["thumbStatus"] = null;
              Node.reply.push(Child);
            }
          });
          this.commentInfo.push(Node);
        });
      }
    },
    async thumbstatusChange(data) {
      console.log(data);
      if (data.type === "node") {
        if (this.commentInfo[data.index].thumbStatus == "thumb_up") {
          this.commentInfo[data.index].thumb_up =
            this.commentInfo[data.index].thumb_up - 1;
        } else if (this.commentInfo[data.index].thumbStatus == "thumb_down") {
          this.commentInfo[data.index].thumb_down =
            this.commentInfo[data.index].thumb_down - 1;
        }
        this.commentInfo[data.index].thumbStatus = data.thumb;

        if (data.thumb === "thumb_up") {
          this.commentInfo[data.index].thumb_up =
            this.commentInfo[data.index].thumb_up + 1;
        } else {
          this.commentInfo[data.index].thumb_down =
            this.commentInfo[data.index].thumb_down + 1;
        }

        const res = await commentThumbDownOrUp({
          thumbupNum: this.commentInfo[data.index].thumb_up,
          thumbdownNum: this.commentInfo[data.index].thumb_down,
          comment_id: data.comment_id,
        });
      } else {
        if (
          this.commentInfo[data.index].reply[data.indexs].thumbStatus ==
          "thumb_up"
        ) {
          this.commentInfo[data.index].reply[data.indexs].thumb_up =
            this.commentInfo[data.index].reply[data.indexs].thumb_up - 1;
        } else if (
          this.commentInfo[data.index].reply[data.indexs].thumbStatus ==
          "thumb_down"
        ) {
          this.commentInfo[data.index].reply[data.indexs].thumb_down =
            this.commentInfo[data.index].reply[data.indexs].thumb_down - 1;
        }
        this.commentInfo[data.index].reply[data.indexs].thumbStatus =
          data.thumb;

        if (data.thumb === "thumb_up") {
          this.commentInfo[data.index].reply[data.indexs].thumb_up =
            this.commentInfo[data.index].reply[data.indexs].thumb_up + 1;
        } else {
          this.commentInfo[data.index].reply[data.indexs].thumb_down =
            this.commentInfo[data.index].reply[data.indexs].thumb_down + 1;
        }

        const res = await commentThumbDownOrUp({
          thumbupNum: this.commentInfo[data.index].reply[data.indexs].thumb_up,
          thumbdownNum:
            this.commentInfo[data.index].reply[data.indexs].thumb_down,
          comment_id: data.comment_id,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1300px) {
}
@media screen and (max-width: 1050px) {
}
@media screen and (max-width: 780px) {
  .videodetail_video_container {
    width: 100% !important;
    height: 40% !important;
    video {
      object-fit: contain !important;
      width: 100% !important;
      height: auto !important;
    }
  }

  .videodetail_title {
    font-size: 2rem !important;
  }
  .videodetail_intro {
    font-size: 1rem !important;
  }
  .morenews_title {
    height: 5% !important;
    .morenews_title_content {
      font-size: 2rem !important;
    }
  }
}
.btnbox {
  position: fixed;
  right: 0;
  bottom: 50px;
  .btncontainer {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
}
.v-size--small {
  min-height: 40px !important;
}
.v-text-field {
  margin-top: 0px !important;
}
.inputContainer {
  position: relative;
  width: 100%;
  height: 100%;
  .inputbox {
    width: 100%;
    height: 100%;
    background-color: white;
    box-shadow: -4px -2px 20px -5px #000000;
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
.commentText {
  width: 100%;
  height: auto;
  position: fixed;
  bottom: 0;
  backdrop-filter: blur(3px);
  background-color: rgba(35, 40, 40, 0.55);
  .comment-login {
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    .v-btn {
      padding: 0 !important;
      height: 40px !important;
    }
  }
}
.comment-btnbox {
  display: flex;
}
div::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
div::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
div::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
</style>