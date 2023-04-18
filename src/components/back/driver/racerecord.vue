<template>
  <v-card class="ma-4">
    <v-card-title>
      <v-col><v-btn color="primary">查看详细记录</v-btn></v-col>
      <v-col>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field
      ></v-col>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
import {
  getRaceRecordByDriver,
} from "@/plugins/http";
export default {
  data() {
    return {
      search: "",
      headers: [
      {
          text: "赛季",
          align: "start",
          sortable: false,
          value: "season",
        },
        { text: "站点", value: "grand_prix" },
        { text: "参赛车手", value: "driver_name" },
        { text: "位次", value: "position" },
        { text: "分数", value: "points" },
        { text: "圈数", value: "laps" },
      ],
      desserts: [
      ],
    };
  },
 async mounted(){
    const RaceRecord = await getRaceRecordByDriver();
    console.log(RaceRecord);
    
      if (RaceRecord.data.Operation === "success") {
        RaceRecord.data.driverReocrdinfo.forEach((element) => {
          this.desserts.push(element);
        });
      }
  }
};
</script>

<style lang="scss" scoped>
</style>