<template>
  <div>
    <div class="ticket" v-if="hasItem">
      <v-card
        class="v-ticket-cards pa-5"
        elevation="10"
        v-for="(item, index) of ticketInfos"
        :key="index"
      >
        <div class="ticket-text">
          <v-img
            width="64px"
            style="border-radius: 5px"
            :src="item.nation_icon"
          ></v-img>
          <div class="ticket-title">{{ item.title }}</div>
          <div class="ticket-eyebtn">
            <div class="ticket-order">
              {{ ordersId[index].order_id }}
            </div>
            <v-btn icon @click="seeOderId(index)"
              ><v-icon>mdi-eye-outline</v-icon></v-btn
            >
          </div>
        </div>
        <div class="ticket-grow"></div>
        <div class="ticket-end">
          <div class="ticket-seat">{{ item.type }}</div>
          <div class="ticket-price">{{ "￥" + " " + item.ticket_price }}</div>
          <div>
            <div class="ticket-date">{{ "持票人 :" + " " + item.username }}</div>
            <div class="ticket-date">
              {{ "下单时间 :" + " " + item.order_time }}
            </div>
            <div class="ticket-date">
              {{ "比赛时间 :" + " " + item.ticket_time }}
            </div>
            <div class="ticket-date">
              {{ "比赛日期 :" + " " + item.ticket_section }}
            </div>
          </div>
        </div>
      </v-card>
    </div>
    <div class="noneContent" v-if="!hasItem">
      <div class="iconbox">
        <v-icon x-large color="red darken-2"> mdi-ticket </v-icon>
      </div>
      <div class="content">There's nothing here ~</div>
    </div>
    <v-snackbar
      :timeout="2500"
      :value="isSnackbar"
      fixed
      bottom
      tile
      :color="isSnackbarSuccess ? 'success' : 'red'"
      ref="snackbar"
    >
      {{ snackbarTitle }}
    </v-snackbar>
  </div>
</template>

<script>
import { getUserTicketInfo } from "@/plugins/http";
export default {
  data() {
    return {
      hasItem: true,
      isSnackbar: false,
      isSnackbarSuccess: false,
      ticketInfos: [],
      ordersId: [],
    };
  },
  computed: {
    snackbarTitle() {
      return this.isSnackbarSuccess === true
        ? "操作成功"
        : "操作失败";
    },
  },
  methods: {
    async getUserTicketInfo() {
      const res = await getUserTicketInfo();
      console.log(res.data);
      if (res.data.Operation == "success") {
        this.ticketInfos = res.data.UserTicketInfo;
        this.ticketInfos.forEach((i, index) => {
          this.ordersId.push({
            order_id: "**** **** **** " + i.order_id.substr(12, 4),
            orderflag: false,
          });
        });
      }
    },
    seeOderId(index) {
      this.ordersId[index].orderflag=!this.ordersId[index].orderflag;
      if(this.ordersId[index].orderflag){
        this.ordersId[index].order_id =this.ticketInfos[index].order_id.replace(/\s/g, "").replace(/(.{4})/g, "$1 ");
      }else{
        this.ordersId[index].order_id="**** **** **** " + this.ticketInfos[index].order_id.substr(12, 4);
      }
    },
  },
  mounted() {
    this.getUserTicketInfo();
  },
};
</script>

<style lang="scss">
.ticket {
  display: flex;
  flex-direction: column;
  row-gap: 25px;
}
.v-ticket-cards:hover {
  transform: scale(1.05);
}
.v-ticket-cards {
  transition: all 0.8s;
  display: flex;
  .ticket-text {
    display: flex;
    flex-direction: column;
    .ticket-eyebtn {
      display: flex;
      align-items: center;
    }
    .ticket-title {
      margin-top: 12px !important;
      margin-bottom: 12px !important;
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 500 !important;
      font-family: Heavy;
    }

    .ticket-order {
      font-size: 1rem !important;
      font-weight: 300;
      line-height: 1.5rem;
      letter-spacing: 0.0094rem !important;
      color: rgb(205, 202, 202);
      text-transform: none !important;
    }
  }
  .ticket-grow {
    flex-grow: 1;
  }
  .ticket-end {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    row-gap: 5px;
    .ticket-btn {
      align-self: flex-end;
    }
    .ticket-seat {
      font-size: 1.95rem !important;
      line-height: 1.5rem;
      letter-spacing: 0.0094rem !important;
      text-transform: none !important;
      font-family: Heavy;
      align-self: flex-end;
    }
    .ticket-price {
      align-self: flex-end;
      font-size: 1rem !important;
      line-height: 1.5rem;
      letter-spacing: 0.0094rem !important;
      text-transform: none !important;
      font-family: Heavy;
    }
    .ticket-date {
      font-weight: 500;
      font-size: 0.5rem;
    }
  }
}
</style>