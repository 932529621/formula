<template>
  <div class="race_footer">
    <div class="race_footer_container">
      <img
        class="race_footer_logo"
        src="https://vue2-express.oss-cn-fuzhou.aliyuncs.com/formula/Web_Logo/logo_white.svg"
      />
      <div class="race_footer_content">
        © 2003-2022 Formula One World Championship Limited
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.race_footer {
  width: 100%;
  height: 60px;
  background-color: rgba(21, 21, 30, 1);
  display: flex;
  justify-content: center;
  .race_footer_container {
    width: 90%;
    display: flex;
    justify-content: space-between;
    .race_footer_logo {
      width: 5%;
      height: 95%;
      min-width: 5%;
      min-height: 95%;
    }
    .race_footer_content {
      width: 70%;
      height: auto;
      align-self: center;
      color: #d0d0d2;
      font-size: 12px;
      font-family: Medium;
      white-space: nowrap;
    }
  }
}
</style>