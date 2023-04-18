<template>
  <div class="schedule">
    <div class="schedule_title_container">
      <div class="shedule_title_left">
        <div class="schedule_main_title">2023 赛季车手排行榜</div>
        <div class="shedule_sub_title">
          Check out this season's official F1 line-up. Full breakdown of
          drivers, points and current positions. Follow your favourite F1
          drivers on and off the track.
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {};
</script>
  
  <style lang="scss" scoped>
.schedule {
  margin-top: 70px;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  .schedule_title_container {
    width: 90%;
    height: 100%;
    border-top: 10px solid rgb(0, 0, 0);
    border-right: 10px solid rgb(0, 0, 0);
    border-top-right-radius: 15px;
    display: flex;
    .shedule_title_left {
      width: 60%;
      height: 100%;
      .schedule_main_title {
        font-family: Heavy;
        font-size: 4rem;
      }
      .shedule_sub_title {
        font-family: medium;
        font-size: 1rem;
        background-color: rgb(249, 249, 249);
        border-radius: 10px;
        padding: 20px;
      }
    }
  }
}

</style>