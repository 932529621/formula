import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/front/Home/Home.vue'
//Home ——》standing
import Standingteam from '../components/front/homes/standingteam.vue'
import Standing from '../components/front/homes/standing.vue'
import store from '@/store/index';
import { getBackmenu, getBackmenuByRole, getBackUserInfo, getUserInfo } from "@/plugins/http";
Vue.use(VueRouter)

export const routes = [
  {
    path: "/",
    redirect: '/home',
  },
  {
    name: 'Home',
    path: '/home',
    component: Home,
    redirect: '/home/standingteam',
    children: [
      {
        name: 'StandingTeam',
        path: 'standingteam',
        component: Standingteam
      },
      {
        name: 'Standingdriver',
        path: 'Standingdriver',
        component: Standing
      }
    ]
  },
  {
    name: 'Latest',
    path: '/latest',
    component: () => import('../views/front/Latest/Latest.vue'),
  },
  {
    name: 'Latestdetail',
    path: '/latest/latestdetail',
    component: () => import('../views/front/Latest/LatestDetail.vue'),
    // children: [{
    //   name: 'latestdetailList',
    //   path: 'latestdetailList',
    //   component: () => import('../views/Latest/latestdetailList.vue'),
    // }]
  },
  {
    name: 'latestdetailList',
    path: '/latest/latestdetailList',
    component: () => import('../views/front/Latest/latestdetailList.vue'),
  },
  {
    name: 'Video',
    path: '/video',
    component: () => import('../views/front/Video/Video.vue')
  },
  {
    name: 'Videodetail',
    path: '/video/videodetail',
    component: () => import('../views/front/Video/Videodetail.vue')
  },
  {
    name: 'Schedule',
    path: '/schedule',
    component: () => import('../views/front/Schedule/Schedule.vue')
  },
  {
    name: 'Scheduledetail',
    path: '/schedule/scheduledetail',
    redirect: '/schedule/scheduledetail/detailpage',
    component: () => import('../views/front/Schedule/ScheduleDetail.vue'),
    children: [{
      name: 'ScheduledetailPage',
      path: 'detailpage',
      component: () => import('../views/front/Schedule/ScheduleDetailPage.vue')
    }, {
      name: 'Scheduledetailcircuit',
      path: 'circuit',
      component: () => import('../views/front/Schedule/schedulecircuit.vue')
    },]
  },

  {
    name: 'Standings',
    path: '/standing',
    component: () => import('../views/front/Standing/Standing.vue')
  },
  {
    name: 'Driver',
    path: '/driver',
    component: () => import('../views/front/Driver/Driver.vue')
  },
  {
    name: 'Driverdetail',
    path: '/driver/driverdetail',
    component: () => import('../views/front/Driver/driverdetail.vue')
  },
  {
    name: 'Team',
    path: '/team',
    component: () => import('../views/front/Team/Team.vue')
  },
  {
    name: 'Teamdetail',
    path: '/team/teamdetail',
    component: () => import('../views/front/Team/Teamdetail.vue')
  },
  {
    name: 'Ticket',
    path: '/ticket',
    component: () => import('../views/front/ticket/ticket.vue')
  },
  {
    name: 'Ticketdetail',
    path: '/ticket/ticketdetail',
    component: () => import('../views/front/ticket/ticketdetail.vue')
  },
  {
    name: 'Profile',
    path: '/profile',
    redirect: '/profile/favourite',
    component: () => import('../views/front/Profile/profile.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        name: 'favourite',
        path: 'favourite',
        component: () => import('../components/front/profile/favourite.vue')
      }, {
        name: 'security',
        path: 'security',
        component: () => import('../components/front/profile/security.vue')
      }, {
        name: 'notifications',
        path: 'notifications',
        component: () => import('../components/front/profile/notifications.vue')
      }, {
        name: 'tickets',
        path: 'tickets',
        component: () => import('../components/front/profile/tickets.vue')
      }, {
        name: 'apply',
        path: 'apply',
        redirect: '/profile/apply/applydriver',
        component: () => import('../components/front/profile/apply.vue'),
        children: [
          {
            name: 'applydriver',
            path: 'applydriver',
            component: () => import('../components/front/profile/applydriver.vue'),
          }, {
            name: 'applyteam',
            path: 'applyteam',
            component: () => import('../components/front/profile/applyteam.vue'),
          }
        ]
      },
    ]
  },
  {
    name: 'payment',
    path: '/payment',
    component: () => import('@/components/payment.vue'),
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('../views/front/Login/Login.vue'),
    redirect: '/login/sign',
    children: [{
      name: 'Sign',
      path: 'sign',
      component: () => import('../components/front/login/Sign.vue'),
    },
    {
      name: 'Register',
      path: 'register',
      component: () => import('../components/front/login/Register.vue'),
    }
    ]
  },
  {
    name: 'AdminLogin',
    path: '/Adminlogin',
    component: () => import('../views/back/login/login.vue'),
  },
  {
    name: 'AdminHome',
    path: '/AdminHome',
    component: () => import('../views/back/home/home.vue'),
    meta: { requiresAuth: true },

  },


]
const router = new VueRouter({
  routes
})
let hasRoute = false;
router.beforeEach(async (to, from, next) => {
  if (to.path.indexOf("/AdminHome")) {
    // console.log('font');
    const tok = localStorage.getItem('Token');
    if (tok) {
      var Fontstatus = await getUserInformation();// 判断token是否有效
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
      tok ? next() : next({ path: '/login/sign' })
    } else {
      next()
    }
  } else {
    if (to.matched.some(record => record.meta.requiresAuth) || !store.state.routeInfo.routesInfo.RolePermission) {
      var tok = localStorage.getItem('ServeToken');
      if (tok) {
        var Backstatus = await getBackUserInformation(); // 判断token是否有效
      }
      // console.log(Backstatus);
      if (tok) {
        const res = await getBackmenu();
        const result = await getBackmenuByRole();
        const MenusNode = res.data.MenusNode;
        const MenusChild = res.data.MenusChild;
        const permission = result.data.permission;
        const RolePermission = [];
        MenusChild.forEach((items, indexs) => {
          permission.forEach((item, index) => {
            MenusChild[indexs].id == permission[index].route_id ? RolePermission.push(items) : ""
          })
        })
        if (!hasRoute) {
          console.log('addroute');
          addRoute(RolePermission);
          store.dispatch("routeInfo/getrouteInfo", { MenusNode, MenusChild, RolePermission })
          hasRoute = true;
          next({ path: to.path });
        }
        next()
      } else {
        // sessionStorage.setItem('NextUrl','')
        next({ path: '/Adminlogin' })
      }
    }
  }
})
function addRoute(RolePermission) {
  RolePermission.forEach((item, index) => {
    var routeobj = {
      path: '/AdminHome/' + item.url.split('/')[2],
      name: item.name,
      component: () => import('@/components' + item.component)
    }
    router.addRoute('AdminHome', routeobj);
  })
}
async function getUserInformation() {
  if (store.state.user.userInfos) {
    const res = await getUserInfo();
    if (res.data.Operation == 'success') {
      const userInfo = res.data.userInfo;
      await store.dispatch("user/getuserInfo", userInfo);
      return true //success
    } else {
      return false //fail
    }
  }
}
async function getBackUserInformation() {
  if (store.state.Backuser.BackuserInfos) {
    const res = await getBackUserInfo();
    if (res.data.Operation == 'success') {
      const BackUserInfo = res.data.BackUserInfo;
      await store.dispatch("Backuser/getBackuserInfo", BackUserInfo);
      return true //success
    } else {
      return false //fail
    }
  }
}
export default router
