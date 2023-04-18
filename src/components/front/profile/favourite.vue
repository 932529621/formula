<template>
  <div>
    <div class="favourite" v-if="hasItem">
      <v-card v-for="(card, index) of cards" :key="index">
        <v-img
          :src="card.type=='news' ? card.news_pic : card.video_pic"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="200px"
        >
          <v-card-title class="card-title">{{
            card.type=='news' ? card.news_introdution : card.video_title 
          }}</v-card-title>
        </v-img>
        <v-card-actions>
          
          <v-card-title >{{  card.type }}</v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon
              :color="card.isfavourite ? 'red' : ''"
              @click="Changefavourite(index)"
              >mdi-heart</v-icon
            >
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div class="noneContent" v-if="!hasItem">
      <div class="iconbox">
        <v-icon x-large color="red darken-2"> mdi-heart </v-icon>
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
import {
  getUserFavourite,
  Deletefavourite,
  addfavourite,
} from "@/plugins/http";
export default {
  data: () => ({
    hasItem: true,
    cards: [],
    isSnackbar: false,
    isSnackbarSuccess: false,
  }),
  computed: {
    snackbarTitle() {
      return this.isSnackbarSuccess === true
        ? "Successful Operation"
        : "Fail Operation";
    },
  },
  methods: {
    async getfavoInfo() {
      const res = await getUserFavourite();
      console.log(res);
      
      if (res.data.Operation == "success") {
        this.cards = [...res.data.VideofavoArr,...res.data.NewsfavoArr];
        console.log(this.cards.length);
      }
      this.cards.length > 0 ? this.hasItem=true : this.hasItem=false;
    },
    async Changefavourite(index) {
      if (this.cards[index].isfavourite == false) {
        this.addfavourite(index);
      }else{
        this.Deletefavourite(index);
      }
    },
    async Deletefavourite(index) {
      const res = await Deletefavourite({ news_id: this.cards[index].news_id });
      console.log(res.data);
      console.log("dete");
      if (res.data.Operation == "success") {
        this.cards[index].isfavourite = false;
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
        }, 500);
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
        }, 500);
      }
    },
    async addfavourite(index) {
      const res = await addfavourite({ news_id: this.cards[index].news_id });
      if (res.data.Operation == "success") {
        this.cards[index].isfavourite = true;
        this.isSnackbarSuccess = true;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
        }, 2500);
      } else {
        this.isSnackbarSuccess = false;
        this.isSnackbar = true;
        setTimeout(() => {
          this.isSnackbar = false;
        }, 2500);
      }
    },
  },
  mounted() {
    this.getfavoInfo();
  },
};
</script>

<style lang="scss">
.favourite {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  grid-auto-flow: dense;
  grid-template-rows: auto;
  align-items: flex-start;
  padding: 0px;
  .favouriteItem {
    background-color: red;
    border-radius: 5px;
  }
  .card-title {
    display: inline-block;
    font-size: 1.25rem;
    font-weight: 500;
    letter-spacing: 0.0125em;
    line-height: 2rem;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.noneContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  .content {
    font-size: 1.2rem;
    font-family: Heavy;
  }
}
</style>