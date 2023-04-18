<template>
  <div class="detailcontent">
    <div class="detailcontent_container" ref="detailcontent" >
 
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    
  }),
  mounted(){
    this.$nextTick(()=>{
      this.$refs.detailcontent.innerHTML=this.$store.state.driver.driverdetailInfo.driver_biography;

    })
          console.log('子');

  }
};
</script>

<style lang="scss" scoped>

</style>