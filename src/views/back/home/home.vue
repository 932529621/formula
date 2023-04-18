<template>
    <v-app>
 <div class="adminhome">
    <div class="adminhomeleft">
       <v-card class="mx-auto" min-height="100%" color="rgb(255, 255, 255)" >
        <v-toolbar style="position:sticky;top:0;z-index: 10;" color="rgba(255, 255, 255,.85)">
          <v-toolbar-title > <svg
            width="120px"
            height="30px"
            viewBox="0 0 120 30"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <!-- Generator: Sketch 49.1 (51147) - http://www.bohemiancoding.com/sketch -->
            <title>Logos / F1-logo red</title>
            <desc>Created with Sketch.</desc>
            <defs>
              <path
                d="M101.086812,30 L101.711812,30 L101.711812,27.106875 L101.722437,27.106875 L102.761812,30 L103.302437,30 L104.341812,27.106875 L104.352437,27.106875 L104.352437,30 L104.977437,30 L104.977437,26.25125 L104.063687,26.25125 L103.055562,29.18625 L103.044937,29.18625 L102.011187,26.25125 L101.086812,26.25125 L101.086812,30 Z M97.6274375,26.818125 L98.8136875,26.818125 L98.8136875,30 L99.4699375,30 L99.4699375,26.818125 L100.661812,26.818125 L100.661812,26.25125 L97.6274375,26.25125 L97.6274375,26.818125 Z M89.9999375,30 L119.999937,0 L101.943687,0 L71.9443125,30 L89.9999375,30 Z M85.6986875,13.065 L49.3818125,13.065 C38.3136875,13.065 36.3768125,13.651875 31.6361875,18.3925 C27.2024375,22.82625 20.0005625,30 20.0005625,30 L35.7324375,30 L39.4855625,26.246875 C41.9530625,23.779375 43.2255625,23.52375 48.4068125,23.52375 L75.2405625,23.52375 L85.6986875,13.065 Z M31.1518125,16.253125 C27.8774375,19.3425 20.7530625,26.263125 16.9130625,30 L-6.25e-05,30 C-6.25e-05,30 13.5524375,16.486875 21.0849375,9.0725 C28.8455625,1.685 32.7143125,0 46.9486875,0 L98.7643125,0 L87.5449375,11.21875 L48.0011875,11.21875 C37.9993125,11.21875 35.7518125,11.911875 31.1518125,16.253125 Z"
                id="path-1"
              ></path>
            </defs>
            <g
              id="Logos-/-F1-logo-red"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g id="Page-1">
                <mask id="mask-2" fill="white">
                  <use xlink:href="#path-1"></use>
                </mask>
                <use id="Fill-1" fill="#EE0000" xlink:href="#path-1"></use>
              </g>
            </g>
          </svg><span style="font-size:.5rem;font-family: Heavy;">FORMULA</span> </v-toolbar-title>
        </v-toolbar>

        <v-list dense  shaped  color="rgb(255, 255, 255)">
          <v-list-group
            v-for="item in items"
            :key="item.id"
            v-model="item.active"
            :prepend-icon="item.icon"
            no-action
            color="red"           
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item-group
               color="red"
               class="ml-15"
             >

            <v-list-item v-for="child in item.childs" :key="child.id" @click="$router.push(`${child.url}`)">
              <v-list-item-content>
                <v-list-item-title  >{{ child.name }}</v-list-item-title>
                <!-- <v-list-item-title v-text="child.name" @click="$router.push(`${child.url}`)">{{ item }}</v-list-item-title> -->
              </v-list-item-content>
            </v-list-item>

        </v-list-item-group>
          </v-list-group>
        </v-list>
      </v-card> 
    </div>
    <div class="adminhomeright" ref="adminhomeright" @scroll=handleScroll()>
      <v-card
        class="mx-auto avatarCard"
        id="avatarCard"
        :style="[{transform:(avatarCard == true ? 'Scale(1.1)' : 'Scale(0)' )},{opacity:(avatarCard == true ? '1' : '0' )}]"
        tile
        tabindex="-1"
        @blur="changeavatarcard()"
      >
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title @click="logout()">退出</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
      </v-card>
      <v-card
        class="mx-auto bellCard"
        :style="[{transform:(bellCard == true ? 'Scale(1.1)' : 'Scale(0)' )},{opacity:(bellCard == true ? '1' : '0' )}]"
        tile
        id="bellCards"
      >

      <!-- <v-list three-line max-width="475px">
      <template v-for="(item, index) in Carditems">
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

        <v-list-item
          v-else
          :key="item.title"
          link
        >
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item> 
      </template>
      </v-list>-->
      </v-card>
        <div class="adminhomerightContainer">
          <div class="topbarContainer">
            <div class="topbar" ref="topbar">
              <div class="barLeft">
                <v-btn fab depressed color="transparent"  small>
                  <v-icon
                size="30px"
                color="black darken-2"
                >
                mdi-magnify
                </v-icon>
                </v-btn>
              
                <span style="font-size:1.1rem;color: rgb(180, 180, 180);">Search</span>
              </div>
              <div class="barRight">
                <v-badge
                  bordered
                  bottom
                  color="red"
                  dot
                  offset-x="15"
                  offset-y="30"
                >
                <v-btn id="bellbtns" ref="bellbtn" fab depressed color="transparent" elevation="1" small  >
                  <v-icon>mdi-bell-outline</v-icon>
                </v-btn>
                </v-badge>
                <v-avatar fab depressed color="transparent"  small >
                  <img
                    :src="BackuserInfos.avatar"
                    id="avatarImgs"
                    @click="changeavatarcard()"
                  >
                </v-avatar>
              </div>
            </div>
          </div>
          <div class="maincontent">
            <router-view></router-view>
          </div>
      </div>
    </div>
  </div>
    </v-app>
 
</template>

<script>
import { mapState } from 'vuex';
export default {
  data: () => ({
    items: [],
    Carditems: [
        { header: 'NOTIFICATIONS' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
    ],
    selectedItem:0,
    avatarCard:false,
    bellCard:false,
  }),


  methods:{
    logout(){
      this.$router.push('/Adminlogin');
      localStorage.removeItem('ServeToken');
    },
    changeavatarcard(){
      this.avatarCard=!this.avatarCard; 
    },
    handleScroll() {
      if (this.$refs.adminhomeright.scrollTop > 0) {
        this.$refs.topbar.style.backgroundColor = "rgba(255, 255, 255,.5)";
        this.$refs.topbar.style.backdropFilter = `blur(5px)`;
        this.$refs.topbar.style.padding = `15px 50px`;
        
        // padding: 15px 30px;
      } else {
        this.$refs.topbar.style.backgroundColor = "rgba(255,255,255,0)";
        this.$refs.topbar.style.backdropFilter = `blur(0px)`;
        this.$refs.topbar.style.padding = `15px 30px`;
      }
    },
    handleClick(e){
      let bellCards =document.getElementById('bellCards');
      let bellbtns =document.getElementById('bellbtns');
      let avatarImgs =document.getElementById('avatarImgs');
      let avatarCard =document.getElementById('avatarCard');
     if(bellbtns.contains(e.target) || bellCards.contains(e.target)){
      this.bellCard=true;
      }else{
        this.bellCard=false;
      }
      if(avatarImgs.contains(e.target) || avatarCard.contains(e.target)){
      this.avatarCard=true;
      }else{
        this.avatarCard=false;
      }
    },
    MenuInit(){
      this.routesInfo.MenusNode.forEach((items,indexs)=>{
        this.routesInfo.RolePermission.forEach((item,index)=>{
         if(items.id == item.pid){
          items.childs ? '' : items.childs=[]
          items.childs.push(item);
         }
        })
      })
      this.items=this.routesInfo.MenusNode.filter((i)=>{
        return i.childs !==undefined
      })
      // this.items=this.routesInfo.MenusNode;
    },

  },
  computed:{
    ...mapState('routeInfo',['routesInfo']),
    ...mapState('Backuser',['BackuserInfos'])
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, false);
    window.addEventListener("click", this.handleClick, false);
    this.MenuInit();
    console.log( this.BackuserInfos);

  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, false);
    window.removeEventListener("click", this.handleClick, false);
  },
};
</script>

<style lang="scss">
.adminhome {
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: rgb(255, 255, 255);
  .adminhomeleft {
    width: 18%;
    height: 100vh;
    background-color: rgb(255, 255, 255);
    overflow-y: scroll;
    font-family: Medium;
  }
  .adminhomeright {
    width: 100%;
    height: 100%;
    background-color: rgb(255, 255, 255);
    position: relative;
    overflow-y: scroll;
    .avatarCard{
      position: fixed;
      top: 64px;
      right: 0;
      z-index: 999;
      transition: all .4s;
      transform-origin:top right; 
    }
     .bellCard{
      position: fixed;
      top: 64px;
      right: 50px;
      z-index: 999;
      transition: all .4s;
      transform-origin:top right; 
    }
    .adminhomerightContainer{
      display: flex;
      flex-direction: column;
      align-items: center;
      .topbarContainer{
      width: 95%;
      position: sticky;
      top: 0;
      left: 10px;
      z-index: 9999;
      .topbar {
      width: 100%;
      height: 64px;
      display: flex;
      justify-content: space-between;
      padding: 15px 30px;
      border: 1px solid rgb(232, 232, 232);
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
      transition: all .3s;
      .barRight {
        display: flex;
        align-items: center;
        column-gap: 10px;
      }
      .barLeft {
        display: flex;
        align-items: center;
      }
    }
    }
    
    .maincontent {
      width: 100%;
      height: 90%;
      background-color: rgb(255, 255, 255);
    }
    }
    
  }
}
.colors {
  background-color: white;
}
.v-sheet{
  box-shadow: none;
}
div::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  transition:all .3s;
}
div::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgb(229, 229, 233);
  background: rgb(229, 229, 233);
}
div::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgb(245, 245, 250);
  border-radius: 10px;
  background: rgb(245, 245, 250);
}
</style>