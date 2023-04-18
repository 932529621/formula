<template>
  <v-app>
    <div class="paybox">
      <div class="payment">
        <v-progress-circular
          indeterminate
          color="green"
          v-show="payloding"
        ></v-progress-circular>
        <v-icon color="green" size="64" v-show="!payloding">
          mdi-check-circle-outline</v-icon
        >
        <v-card-title>订单支付成功，请返回系统继续事务！</v-card-title>
      </div>
    </div>
  </v-app>
</template>

<script>
import {
  InsertOrUpdateBackRole,
  addOrderinfo,
  UpdateSysTicket,
  InsertUserTicket,
} from "@/plugins/http";
export default {
  data() {
    return {
      payloding: true,
    };
  },
  async mounted() {
    console.log(this.$route.query);
    switch (this.$route.query.type) {
      case "sysTicket":
        await UpdateSysTicket({ id: this.$route.query.id });
        break;
      case "order":
        const insetObj = {
          role_name: this.$route.query.role_name,
          payment: "success",
        };
        const addOrderObj = {
          id: this.$route.query.orderId,
          order_status: "paid",
        };
        if (this.$route.query.orderType === "线下审核费用") {
          addOrderinfo(addOrderObj);
        } else {
          await Promise.all(
            [InsertOrUpdateBackRole(insetObj), addOrderinfo(addOrderObj)].map(
              (v) => v.catch((e) => console.log(e))
            )
          );
        }

        break;
      case "ticket":
        var res = await InsertUserTicket({
          ticket_id: this.$route.query.ticket_id,
          ticket_prix: this.$route.query.ticket_prix,
          user_email: this.$route.query.user_email,
        });
        break;
    }
    console.log(res);

    // const role_name=window.localStorage.getItem('role_name');
    // const orderId=window.localStorage.getItem('orderId');
    // const insetObj = {
    //   role_name: role_name,
    //   payment:'success',
    // };
    // const addOrderObj = {
    //   id: orderId,
    //   order_status: "paid",
    // };
    // const [InsertRes, addOrderres] = await Promise.all(
    //   [InsertOrUpdateBackRole(insetObj), addOrderinfo(addOrderObj)].map((v) =>
    //     v.catch((e) => console.log(e))
    //   )
    // );
    // if (
    //   InsertRes.data.Operation == "success" &&
    //   addOrderres.data.Operation == "success"
    // ) {
    //   setTimeout(() => {
    //     this.payloding = false;
    //   }, 2500);
    //   localStorage.removeItem('orderId');
    //   localStorage.removeItem('role_name');
    // }
  },
};
</script>

<style lang="scss" scoped>
.payment {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.paybox {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>