<template>
  <div>
    <div class="apply">
      <v-card class="v-cards" elevation="10">
          <div class="card-title">Apply</div>
          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
          >
            <v-tab v-for="(item,index) of items" :key="index" @click="$router.push({path:item.url})">
                <v-icon class="ma-2">{{ item.icon }}</v-icon>
              {{ item.name }}
            </v-tab>
          </v-tabs>
        <div class="apply-main">
          <router-view></router-view>
        </div>
        <!-- <div class="card-form">
          <div class="form-field">
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="New PassWord"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            >
            </v-text-field>
            <v-text-field
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min, rules.PasswordMatch]"
              :type="show2 ? 'text' : 'password'"
              name="input-10-2"
              label="Confirm Password"
              hint="At least 8 characters"
              :value="confirmPassword"
              v-model="confirmPassword"
              class="input-group--focused"
              @click:append="show2 = !show2"
            ></v-text-field>
          </div>
          <div class="form-btn">
            <v-btn color="#9155fd" style="color: white">Save</v-btn>
          </div>
        </div> -->
      </v-card>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      show1: false,
      show2: false,
      password: "",
      confirmPassword: "",
      RealName: "",
      id: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        PasswordMatch: (v) =>
          v == this.password ||
          `The email and password you entered don't match`,
      },
      tab: null,
      items: [{name:"车手申请",icon:'mdi-account',url:'/profile/apply/applydriver'},{name:"车队申请",icon:'mdi-account-group',url:'/profile/apply/applyteam'} ],
    };
  },
};
</script>
  
  <style lang="scss" scoped>
.apply {
  display: flex;
  flex-direction: column;
  row-gap: 50px;
  .v-cards {
    display: flex;
    flex-direction: column;
    padding: 20px;
    row-gap: 20px;
    .card-title {
      font-family: Heavy;
      font-size: 1.4rem;
    }
    .card-text {
      padding: 10px;
      display: flex;
      flex-direction: column;
      font-size: 1rem;
      font-weight: 500;
      color: #ffb400;
      background-color: rgb(255, 246, 225);
      letter-spacing: 0.15px;
      line-height: 1.75rem;
      overflow-wrap: normal;
      text-transform: none;
      word-break: normal;
      word-wrap: break-word;
    }
    .card-form {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>