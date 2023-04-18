<template>
    <div class="detailTop">
      <div class="detailTop_container">
        <div class="detailTop_container_left">
          <div class="detailTop_driverpic_container" :style="{backgroundImage:`url(${driverdetailInfo.driver_pic})`}">
            <!-- <img
              class="detailTop_driverpic"
              src="http://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/driver_detail/driver_pic/VERSTAPPEN.jpg"
              alt=""
            /> -->
          </div>
          <div class="detailTop_driverinfo_container">
            <img
              class="detailTop_drivernumbericon"
              :src="driverdetailInfo.driver_number_icon"
              alt=""
            />
            <img
              class="detailTop_drivernationicon"
              :src="driverdetailInfo.nation_icon"
              alt=""
            />
          </div>
          <span class="detailTop_driverName">{{driverdetailInfo.name.split(" ")[0]+' '+driverdetailInfo.name.split(" ")[1]  }}</span>
        </div>
        <div class="detailTop_container_right">
          <img
            :src="driverdetailInfo.driver_helmet"
            alt=""
            class="detailTop_helmet"
          />
          <div class="detailTop_container_right_column">
            <span class="detailTop_right_title">车队</span>
            <span class="detailTop_right_content">{{driverdetailInfo.team}}</span>
          </div>
          <div class="detailTop_container_right_column">
            <span class="detailTop_right_title">国家</span>
            <span class="detailTop_right_content">{{driverdetailInfo.country}}</span>
          </div>
          <div class="detailTop_container_right_column">
            <span class="detailTop_right_title">领奖台</span>
            <span class="detailTop_right_content">{{driverdetailInfo.podiums}}</span>
          </div>
          <div class="detailTop_container_right_column">
            <span class="detailTop_right_title">积分</span>
            <span class="detailTop_right_content">{{driverdetailInfo.points}}</span>
          </div>
          <div class="detailTop_container_right_column">
            <span class="detailTop_right_title">总参赛次数</span>
            <span class="detailTop_right_content">{{driverdetailInfo.prix_entered}}</span>
          </div>
          <div class="detailTop_container_right_column">
            <span class="detailTop_right_title">冠军次数</span>
            <span class="detailTop_right_content">{{driverdetailInfo.season_champion}}</span>
          </div>
          <div class="detailTop_container_right_column">
            <span class="detailTop_right_title">最佳圈速次数</span>
            <span class="detailTop_right_content">{{driverdetailInfo.highest_race_finish}}</span>
          </div>
          <div class="detailTop_container_right_column">
            <span class="detailTop_right_title">最好完赛名次</span>
            <span class="detailTop_right_content">{{driverdetailInfo.highest_grid_position}}</span>
          </div>
          <div class="detailTop_container_right_column">
            <span class="detailTop_right_title">生日</span>
            <span class="detailTop_right_content">{{driverdetailInfo.birth}}</span>
          </div>
          <div class="detailTop_container_right_column">
            <span class="detailTop_right_title">出生地</span>
            <span class="detailTop_right_content">{{driverdetailInfo.place_of_birth}}</span>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import {mapState} from 'vuex';
export default {
  computed:{
    ...mapState('driver',['driverdetailInfo'])
  }
};
</script>

<style lang="scss" scoped>
.detailTop {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  background-color: #f7f4f1;
  margin-top: 70px;
  .detailTop_container {
    width: 93%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: rgb(255, 255, 255);
    column-gap: 30px;
    .detailTop_container_left {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .detailTop_driverpic_container {
        width: 100%;
        height: 70%;
        min-width: 100%;
        min-height: 330px;
        background-image: url("http://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/driver_detail/driver_pic/VERSTAPPEN.jpg");
        background-size: cover;
        background-position: 50% 10%;
          //    .detailTop_driverpic {
          //   width: 100%;
          //   height: 100%;
          //   object-fit: cover;
          // }
      }
      .detailTop_driverinfo_container {
        padding: 20px 40px;
        .detailTop_drivernumbericon {
          width: 55px;
          height: 50px;
          margin-right: 10px;
        }
        .detailTop_drivernationicon {
          width: 48px;
          height: 32px;
          border-radius: 5px;
        }
      }

      .detailTop_driverName {
        padding: 0px 40px;
        font-family: Heavy;
        font-size: 3.2rem;
        color: rgb(0, 0, 0);
        white-space: nowrap;
      }
    }
    .detailTop_container_right {
      width: 45%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .detailTop_helmet {
        width: 190px;
        height: 125px;
        margin-bottom: 50px;
      }
      .detailTop_container_right_column {
        width: 100%;
        height: 5.5%;
        display: flex;
        justify-content: space-between;
        
        .detailTop_right_title {
          font-family: Heavy;
          font-size: 1.8rem;
          color: rgb(0, 0, 0);
          
        }
        .detailTop_right_content {
          font-family: Medium;
          font-size: 1.2rem;
          color: rgb(0, 0, 0);
          width: 40%;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>