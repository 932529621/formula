<!-- <template>

   <div class="bottom_banner"  v-if="isshow">
      <div class="bottom_banner_lastestnews">
        <div class="bottom_banner_title">{{navNewsinfo[0].nav_title}}</div>
        <div class="bottom_banner_content" :class="{'navactive':isNavnewsActive===index}" @mouseenter="changenavNewsindex(index)" @mouseleave="isNavnewsActive=null" v-for="(item,index) in navNewsinfo" :key="index">{{navNewsinfo[index].nav_name}}</div>
      </div>
      <div class="bottom_banner_standing">
        <div class="bottom_banner_title">{{navVideosinfo[0].nav_title}}</div>
        <div class="bottom_banner_content" :class="{'navactive':isNavvideosActive===index}" @mouseenter="changenavVideosindex(index)" @mouseleave="isNavvideosActive=null" v-for="(item,index) in navVideosinfo" :key="index">{{navVideosinfo[index].nav_name}}</div>
      </div>
      <div class="bottom_banner_driver">
        <div class="bottom_banner_title">{{navDriversinfo[0].nav_title}}</div>
        <div class="bottom_banner_content" :class="{'navactive':isNavdriversActive===index}" @mouseenter="changenavDriversindex(index)" @mouseleave="isNavdriversActive=null" v-for="(item,index) in navDriversinfo" :key="index">{{navDriversinfo[index].nav_name}}</div>
      </div>
      <div class="bottom_banner_team">
        <div class="bottom_banner_title">{{navTeamsinfo[0].nav_title}}</div>
        <div class="bottom_banner_content" :class="{'navactive':isNavteamsActive===index}" @mouseenter="changenavTeamsindex(index)" @mouseleave="isNavteamsActive=null" v-for="(item,index) in navTeamsinfo" :key="index">{{navTeamsinfo[index].nav_name}}</div>
      </div>
    </div>


</template>

<script>
export default {
  data:()=>({
    isshow:false,
    navNewsinfo:[],
    navVideosinfo:[],
    navDriversinfo:[],
    navTeamsinfo:[],
    isNavnewsActive:null,
    isNavvideosActive:null,
    isNavdriversActive:null,
    isNavteamsActive:null,
  }),
  methods:{
    changenavNewsindex(index){
      this.isNavnewsActive=index
    },
    changenavVideosindex(index){
      this.isNavvideosActive=index
    },
    changenavDriversindex(index){
      this.isNavdriversActive=index
    },
    changenavTeamsindex(index){
      this.isNavteamsActive=index
    }
  },
  mounted() {
    this.$axios
      .get("http://127.0.0.1:8080/api/home/getnavinfoinfo")
      .then((res) => {
        if (res.status === 200) {
          for (let key in res.data) {
            if(res.data[key].nav_title==="News"){
              this.navNewsinfo.push(res.data[key]);
            } 
            else if(res.data[key].nav_title==="Video"){
              this.navVideosinfo.push(res.data[key]);
            }
            else if(res.data[key].nav_title==="Driver"){
              this.navDriversinfo.push(res.data[key]);
            }else{
              this.navTeamsinfo.push(res.data[key]);
            }
          } 
          this.isshow=true  
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
}
</script>

<style lang="scss">

.bottom_banner{
  width: 100%;
  background-color: rgba(21, 21, 30, 1);
  border-bottom: 1px solid rgba(56, 56, 63, 1);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  .bottom_banner_lastestnews{
    width: 15%;
    height: auto;
    text-align: center;
    .bottom_banner_title{
      color:rgba(255, 255, 255, 1);
      font-family: Heavy;
      font-size:1.5rem;
    }
    .bottom_banner_content{
      color:rgba(255, 255, 255, 1);
      font-family: Medium;
      font-size:1rem;
      transition: all .5s ease;
    }
  }
  .bottom_banner_standing{
    width: 15%;
    height: auto;
    text-align: center;
    .bottom_banner_title{
      color:rgba(255, 255, 255, 1);
      font-family: Heavy;
      font-size:1.5rem;
    }
    .bottom_banner_content{
      color:rgba(255, 255, 255, 1);
      font-family: Medium;
      font-size:1rem;
      transition: all .5s ease;

    }
  }
  .bottom_banner_driver{
    width: 30%;
    height: auto;
    text-align: center;
    display: grid;
    grid-template-columns: 1fr 1fr;
    .bottom_banner_title{
      color:rgba(255, 255, 255, 1);
      font-family: Heavy;
      font-size:1.5rem;
    }
    .bottom_banner_content{
      color:rgba(255, 255, 255, 1);
      font-family: Medium;
      font-size:1rem;
      transition: all .5s ease;

    }
  }
  .bottom_banner_team{
    width: 15%;
    height: auto;
    text-align: center;
    .bottom_banner_title{
      color:rgba(255, 255, 255, 1);
      font-family: Heavy;
      font-size:1.5rem;
    }
    .bottom_banner_content{
      color:rgba(255, 255, 255, 1);
      font-family: Medium;
      font-size:1rem;
      transition: all .5s ease;

    }
  }
}
.navactive{
 color: red !important;
}
</style> -->