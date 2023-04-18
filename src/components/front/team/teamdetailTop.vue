<template>
  <div class="teamdetail_Top">
    <div class="teamdetail_Top_container">
      <div class="teamdetail_left">
        <img
          class="teamdetail_teamIcon"
          :src="teamDetailInfo.team_detail_icon"
          alt=""
        />
        <div class="teamdetail_column">
          <span class="detailTop_left_title">车队名</span>
          <span class="detailTop_left_content">{{teamDetailInfo.full_teamname}}</span>
        </div>
        <div class="teamdetail_column">
          <span class="detailTop_left_title">地址</span>
          <span class="detailTop_left_content">{{teamDetailInfo.base}}</span>
        </div>
        <div class="teamdetail_column">
          <span class="detailTop_left_title">车队领队</span>
          <span class="detailTop_left_content">{{teamDetailInfo.team_chief}}</span>
        </div>
        <div class="teamdetail_column">
          <span class="detailTop_left_title">工程领队</span>
          <span class="detailTop_left_content"
            >{{teamDetailInfo.technical_chief}}
          </span>
        </div>
        <div class="teamdetail_column">
          <span class="detailTop_left_title">赛车型号</span>
          <span class="detailTop_left_content">{{teamDetailInfo.chassis}}</span>
        </div>
        <div class="teamdetail_column">
          <span class="detailTop_left_title">动力引擎</span>
          <span class="detailTop_left_content">{{teamDetailInfo.power_unit}}</span>
        </div>
        <div class="teamdetail_column">
          <span class="detailTop_left_title">第一次参赛</span>
          <span class="detailTop_left_content">{{teamDetailInfo.first_team_entry}}</span>
        </div>
        <div class="teamdetail_column">
          <span class="detailTop_left_title">冠军次数</span>
          <span class="detailTop_left_content">{{teamDetailInfo.world_champion}}</span>
        </div>
        <div class="teamdetail_column">
          <span class="detailTop_left_title">最好完赛位次</span>
          <span class="detailTop_left_content">{{teamDetailInfo.highest_race_finish}}</span>
        </div>
        <div class="teamdetail_column">
          <span class="detailTop_left_title">杆位次数</span>
          <span class="detailTop_left_content">{{teamDetailInfo.pole_position}}</span>
        </div>
        <div class="teamdetail_column">
          <span class="detailTop_left_title">最快圈次数</span>
          <span class="detailTop_left_content">{{teamDetailInfo.fastest_laps}}</span>
        </div>
      </div>
      <div class="teamdetail_right">
        <div class="teamdetail_drivercolumn driver1">
          <img
            :src="teamDetailInfo.driver_one_halfpic"
            alt=""
          />
          <div class="teamdetail_mask"></div>
          <div class="teamdetail_content">
            <div class="teamdetail_title">{{$route.query.teamName}} / DRIVERS</div>
            <div class="teamdetail_name">{{$route.query.driverOne}}</div>
          </div>
        </div>
        <div class="teamdetail_drivercolumn driver2">
          <img
          :src="teamDetailInfo.driver_two_halfpic"
            alt=""
          />
          <div class="teamdetail_mask"></div>
          <div class="teamdetail_content">
            <div class="teamdetail_title">{{$route.query.teamName}} / DRIVERS</div>
            <div class="teamdetail_name">{{$route.query.driverTwo}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed:{
    ...mapState('team',['teamDetailInfo'])
  }
};
</script>

<style lang="scss" scoped>
.teamdetail_Top {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  margin: 70px 0;
  background-color: #f7f4f1;
  .teamdetail_Top_container {
    width: 93%;
    height: auto;
    display: flex;
    justify-content: center;
    background-color: #ffffff;
    .teamdetail_left {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 20px;
      .teamdetail_teamIcon {
        width: 20rem;
        height: 10rem;
      }
      .teamdetail_column {
        display: flex;
        justify-content: space-evenly;
        .detailTop_left_title {
          font-family: Heavy;
          font-size: 1.8rem;
          color: rgb(0, 0, 0);
          width: 60%;
        }
        .detailTop_left_content {
          font-family: Medium;
          font-size: 1rem;
          color: rgb(0, 0, 0);
          width: 40%;
        }
      }
    }
    .teamdetail_right {
      width: 50%;
      height: 100%;
      display: flex;
      column-gap: 0.5%;
      align-items: flex-end;
      .teamdetail_drivercolumn {
        width: 320px;
        height: 400px;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.7s ease;
        }
        .teamdetail_mask {
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          position: absolute;
          top: 0;
          transition: all 0.5s ease;
          pointer-events: none;
        }
        .teamdetail_content {
          position: absolute;
          bottom: -50%;
          padding: 15px 20px;
          width: 100%;
          transition: all 0.4s ease;
          .teamdetail_title {
            font-size: 1rem;
            font-family: Medium;
            color: rgb(255, 255, 255);
          }
          .teamdetail_name {
            font-size: 1.2rem;
            font-family: Heavy;
            color: rgb(255, 255, 255);
          }
        }
      }

      .driver1:hover {
        img {
          transform: scale(1.05);
        }
        .teamdetail_mask {
          height: 0%;
          background-color: rgba(0, 0, 0, 0.1);
        }
        .teamdetail_content {
          bottom: 0%;
          background-color: rgba(0, 0, 0, 0.4);
        }
      }
      .driver2:hover {
        img {
          transform: scale(1.05);
        }
        .teamdetail_mask {
          height: 0%;
          background-color: rgba(0, 0, 0, 0.1);
        }
        .teamdetail_content {
          bottom: 0%;
          background-color: rgba(0, 0, 0, 0.4);
        }
      }
    }
  }
}
</style>