<template>
  <div class="detail_alsolike">
    <div class="detail_alsolike_title">You Maybe Also Like</div>
    <div class="alsolike_container">
      <div
        class="alsolike_items"
        v-for="(item, index) in AlsoLikelist"
        :key="index"
      >
        <img :src="AlsoLikelist[index].driver_pic" />
        <div class="alsolike_content">
          <div class="alsolike_title">
            {{ AlsoLikelist[index].team }} / DRIVERS
          </div>
          <div class="alsolike_name">
            {{
              AlsoLikelist[index].first_name +
              "  " +
              AlsoLikelist[index].last_name
            }}
          </div>
        </div>
        <div class="alsolike_mask"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getdriverAlsoLike } from "@/plugins/http";
export default {
  data: () => ({
    AlsoLikelist: [],
  }),
  async mounted() {
    console.log("idididid" + this.$route.query.driverId);

    // this.$axios
    //   .get(
    //     `http://127.0.0.1:8080/api/driverdetail/getdriverAlsoLike/?driverlastName=${this.$route.query.driverlastName}
    //       &team=${this.$route.query.team}&driverId=${this.$route.query.driverId}`
    //   )
    //   .then((res) => {
    const res = await getdriverAlsoLike({
      driverlastName: this.$route.query.driverlastName,
      team: this.$route.query.team,
      driverId: this.$route.query.driverId,
    });
    if (res.status === 200) {
      for (let key in res.data) {
        this.AlsoLikelist.push(res.data[key]);
        const last_name = this.AlsoLikelist[key].name.split(" ")[1];
        const first_name = this.AlsoLikelist[key].name.split(" ")[0];
        this.AlsoLikelist[key].last_name = last_name;
        this.AlsoLikelist[key].first_name = first_name;
      }
      console.log(this.AlsoLikelist);
    }
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  },
};
</script>

<style lang="scss" scoped>
.detail_alsolike {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .detail_alsolike_title {
    font-family: Heavy;
    font-size: 2.5rem;
    color: black;
    align-self: flex-start;
    padding: 20px 50px;
  }
  .alsolike_container {
    width: 93%;
    height: 80%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 5px;
    .alsolike_items {
      width: 320px;
      height: 320px;
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 0.7s ease;
      }
      .alsolike_content {
        position: absolute;
        bottom: 0;
        padding: 15px 20px;
        width: 100%;

        .alsolike_title {
          font-size: 1rem;
          font-family: Medium;
          color: rgb(255, 255, 255);
        }
        .alsolike_name {
          font-size: 1.2rem;
          font-family: Heavy;
          color: rgb(255, 255, 255);
        }
      }
      .alsolike_mask {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        position: absolute;
        top: 0;
        transition: all 0.5s ease;
        pointer-events: none;
      }
    }
    .alsolike_items:hover {
      .alsolike_mask {
        height: 0;
        background-color: rgba(0, 0, 0, 0.1);
      }
      img {
        transform: scale(1.1);
      }
    }
  }
}
</style>