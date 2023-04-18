import Vue from 'vue'
import Vuex from 'vuex'
import { getlatestAll,getlatestByid,getVideos,getVideosByid } from "@/plugins/http";

Vue.use(Vuex)
const user = {
  namespaced: true,
  actions: {
    getuserInfo(context, value) {
      context.commit('getuserInfoDetail', value)
    }
  },
  mutations: {
    getuserInfoDetail(state, values) {
      state.userInfos = values;
      console.log('====getuserInfoDetail====' + state.userInfos);
    }
  },
  state: {
    userInfos: {

    }
  },


}
const Backuser = {
  namespaced: true,
  actions: {
    getBackuserInfo(context, value) {
      context.commit('getBackuserDetail', value)
    }
  },
  mutations: {
    getBackuserDetail(state, values) {
      state.BackuserInfos = values;
      console.log('====getBackuserDetail====' + state.BackuserInfos);
      console.log(state.BackuserInfos);
      
    }
  },
  state: {
    BackuserInfos: {

    }
  },


}
const standingDetail = {
  namespaced: true,
  state: {
    HomelodingValue: 0,

    SingleDriver: [],
    SingleFastLap: [],
    SinglePratice1: [],
    SinglePratice2: [],
    SinglePratice3: [],
    SingleQualify: [],
    SingleRace: [],
    SingleTeam: [],
    TotalDriver: [],
    TotalTeam: [],
    Totalrace: [],
    TotalFastLap: [],
    singleTableYear: null,
    singleTableitems: null,


  },
  getters: {
  },
  mutations: {
    getStandingData(state, values) {
      state.TotalDriver = [];
      state.TotalTeam = [];
      state.Totalrace = [];
      state.TotalFastLap = [];
      state.SingleRace = [];
      state.SingleTeam = [];
      state.SingleDriver = [];
      state.SingleFastLap = [],
        state.SinglePratice1 = [],
        state.SinglePratice2 = [],
        state.SinglePratice3 = [],
        state.SingleQualify = [],
        console.log(values[values.length - 1]);
      values.forEach((value, index, array) => {
        if (values[values.length - 1] === 'total_race') {
          state.Totalrace.push(values[index])
        } else if (values[values.length - 1] === 'total_driver') {
          state.TotalDriver.push(values[index])
        } else if (values[values.length - 1] === 'total_team') {
          state.TotalTeam.push(values[index])
        } else if (values[values.length - 1] === 'total_fastlap') {
          state.TotalFastLap.push(values[index])
        } else if (values[values.length - 1] === 'single_race') {
          state.SingleRace.push(values[index])
        } else if (values[values.length - 1] === 'single_team') {
          state.SingleTeam.push(values[index])
        } else if (values[values.length - 1] === 'single_driver') {
          state.SingleDriver.push(values[index])
        }
      }
      );
      console.log(state.Totalrace);
      console.log(state.TotalDriver);
      console.log(state.TotalTeam);
      console.log(state.TotalFastLap);
      console.log(state.SingleRace);
      console.log(state.SingleDriver);
      console.log(state.SingleTeam);

    },
    getStandingRaceData(state, values) {
      state.SingleFastLap = [],
        state.SinglePratice1 = [],
        state.SinglePratice2 = [],
        state.SinglePratice3 = [],
        state.SingleQualify = [],
        values.forEach((value, index, array) => {
          if (values[values.length - 1] === 'single_fastlap') {
            state.SingleFastLap.push(values[index])
          } else if (value.type === "pratice1") {
            state.SinglePratice1.push(values[index])
          } else if (value.type === "pratice2") {
            state.SinglePratice2.push(values[index])
          } else if (value.type === "pratice3") {
            state.SinglePratice3.push(values[index])
          } else if (values[values.length - 1] === 'single_qualifying') {
            state.SingleQualify.push(values[index])
          }
        });
      console.log(values);
      console.log('------------');
      console.log(state.SingleRace);
      console.log(state.SingleFastLap);
      console.log(state.SinglePratice1);
      console.log(state.SinglePratice2);
      console.log(state.SinglePratice3);
      console.log(state.SingleQualify);
    },
    getStandingSingleRaceData(state, values) {
      state.singleTableYear = '';
      state.singleTableitems = '';
      state.singleTableYear = values.year;
      state.singleTableitems = values.items;
    },
    gethomeloadingvalue(state, values) {

      state.HomelodingValue = state.HomelodingValue + values;
    }

  },
  actions: {

  },
  modules: {
  }
}
const latest = {
  namespaced: true,
  actions: {
   async getlatestDetail(context, value) {
      const res = await getlatestAll();
      if (res.status === 200) {
        const desserts=[];
        for (let key of res.data.newsItem) {
          desserts.push(key);
        }
       await context.commit('getlatestDetailInfo', desserts);
      }
    },
    async getlatestByid(context, value) {
      const res = await getlatestByid({news_id:value});
      if (res.status === 200) {
        const desserts=[];
        for (let key of res.data.newsItem) {
          desserts.push(key);
        }
       await context.commit('getlatestByidInfo', desserts);
      }
    }
  },
  mutations: {
    getlatestDetailInfo(state, values) {
      state.latesInfo = values;
      console.log(state.latesInfo );
    },
    getlatestByidInfo(state, values) {
      state.latest = values;
      console.log(state.latest );
    },
  },
  state: {
    latesInfo: {

    },
    latest:{

    }
  }

}
const videos = {
  namespaced: true,
  actions: {
   async getvideoDetail(context, value) {
      const res = await getVideos();
      if (res.status === 200) {
        const desserts=[];
        for (let key of res.data.videos) {
          desserts.push(key);
        }
       await context.commit('getvideoDetailInfo', desserts);
      }
    },
    async getvideoDetailByid(context, value) {
      const res = await getVideosByid({video_id:value});
      if (res.status === 200) {
        const desserts=[];
        for (let key of res.data.videos) {
          desserts.push(key);
        }
       await context.commit('getvideoDetailInfoByid', desserts);
      }
    }
  },
  mutations: {
    getvideoDetailInfo(state, values) {
      state.videoInfo = values;
      console.log(state.videoInfo );
    },
    getvideoDetailInfoByid(state, values) {
      state.video = values;
      console.log(state.video );
    }
  },
  state: {
    videoInfo: {

    },
    video:{

    }
  }

}
const driver = {
  namespaced: true,
  actions: {
    getdriverDetail(context, value) {
      context.commit('getdriverDetailInfo', value)
    }
  },
  mutations: {
    getdriverDetailInfo(state, values) {
      state.driverdetailInfo = values;
      console.log('====driverdetailInfo====' + state.driverdetailInfo.season_points);
    }
  },
  state: {
    driverdetailInfo: {

    },
  }
}
const team = {
  namespaced: true,
  actions: {
    getteamDetail(context, value) {
      context.commit('getteamDetailInfo', value)
    }
  },
  mutations: {
    getteamDetailInfo(state, values) {
      state.teamDetailInfo = values;
      console.log('====teamDetailInfo====' + state.teamDetailInfo.season_points);
    }
  },
  state: {
    teamDetailInfo: {

    },
  }

}
const schedule = {
  namespaced: true,
  actions: {
    getScheduleInfo(context, value) {
      context.commit('getScheduleDetail', value)
    }
  },
  mutations: {
    getScheduleDetail(state, values) {
      state.ScheduleInfos = values;
      console.log('====getScheduleInfos====');
    }
  },
  state: {
    ScheduleInfos: {

    },
  },


}
const ticket = {
  namespaced: true,
  actions: {
    getticketDetail(context, value) {
      context.commit('getticketDetailInfo', value)
    },
    getcheapestinfo(context, value) {
      context.commit('getcheapestdetailinfo', value)
    },
    getsingleticketinfo(context, value) {
      context.commit('getsingleticketsinfo', value)
    }
  },
  mutations: {
    getticketDetailInfo(state, values) {
      state.ticketDetailInfo = values;
      console.log('====getticketDetailInfo====' + state.ticketDetailInfo[0].ticket_prix);
    },
    getcheapestdetailinfo(state, values) {
      state.cheapestinfo = values;
      console.log(state.cheapestinfo);
    },
    getsingleticketsinfo(state, values) {
      state.singleticketinfo = values;
      console.log('====getsingleticketsinfo====' + state.singleticketinfo);
    }
  },
  state: {
    ticketDetailInfo: {

    },
    cheapestinfo: {

    },
    singleticketinfo: {

    }
  },

}
const routeInfo = {
  namespaced: true,
  actions: {
    getrouteInfo(context, value) {
      context.commit('getroutesInfo', value)
    }
  },
  mutations: {
    getroutesInfo(state, values) {
      state.routesInfo = values;
    }
  },
  state: {
    routesInfo: {}
  }
}

export default new Vuex.Store({
  modules: {
    standingDetail,
    latest,
    videos,
    driver,
    team,
    ticket,
    routeInfo,
    schedule,
    user,
    Backuser
  }

})
// state: {
// },
// getters: {
// },
// mutations: {
// },
// actions: {
// },
// modules: {
// }