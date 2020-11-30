import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";
import Main from "@/views/Main.vue";

import Auth from "@/views/Auth.vue";
import SignUp from "@/components/auth/SignUp.vue";
import LogIn from "@/components/auth/LogIn.vue";

import AdminPanel from "@/views/AdminPanel.vue";
import Dashboard from "@/components/admin/Dashboard.vue";
import Users from "@/components/admin/Users.vue";
import User from "@/components/account/User.vue";
import Organization from "@/components/admin/Organization.vue";

import CreatePost from "@/components/CreatePost.vue";

import Account from "@/components/account/Account.vue";
import UserInOrganization from "@/components/account/UserInOrganization.vue";
import ListRequest from "@/components/account/ListRequest.vue";
import Tasks from "@/components/account/Tasks.vue";
import ListOfNotifications from "@/components/account/ListOfNotifications.vue";
import TeamMembers from "@/components/manager/TeamMembers.vue";
import RaitingList from "@/components/manager/RaitingList.vue";
import EditTeam from "@/components/manager/EditTeam.vue";
import RequestsList from "@/components/manager/RequestsList.vue";
import TasksTeam from "@/components/manager/TasksTeam.vue";
import TeamList from "@/components/manager/TeamList.vue";
import TeamSettings from "@/components/manager/TeamSettings.vue";

import DetailedPost from "@/components/DetailedPost.vue";
import FeedOfPosts from "@/components/account/FeedOfPosts.vue";
import PointsUser from "@/components/account/PointsUser.vue";
import UserStatistic from "@/components/account/UserStatistic.vue";

import SideBarDefault from "@/components/sidebar/SideBarDefault.vue";
import SideBarManager from "@/components/sidebar/SideBarManager.vue";

import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Main,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        name: "Home",
        components: {
          main: Home,
          sidebar: SideBarDefault
        }
      },
      {
        path: "/feed",
        name: "FeedOfPosts",
        components: {
          main: FeedOfPosts,
          sidebar: SideBarDefault
        }
      },
      {
        path: "/manager/teams",
        name: "TeamList",
        components: {
          main: TeamList,
          sidebar: SideBarDefault
        }
      },
      {
        path: "/manager/teams/:id",
        name: "TeamSettings",
        components: {
          main: TeamSettings,
          sidebar: SideBarManager
        },
        props: true,
        children: [
          {
            path: "team_members",
            name: "TeamMembers",
            component: TeamMembers
          },
          {
            path: "raiting",
            name: "RaitingList",
            component: RaitingList
          },
          {
            path: "team_edit",
            name: "EditTeam",
            component: EditTeam
          },
          {
            path: "requests",
            name: "RequestsList",
            component: RequestsList
          },
          {
            path: "tasks",
            name: "TasksTeam",
            component: TasksTeam
          }
        ]
      },
      {
        path: "/user/:id",
        components: {
          main: User,
          sidebar: SideBarDefault
        },
        children: [
          {
            path: "",
            name: "Account",
            component: Account
          },
          {
            path: "user_org",
            name: "UserInOrganization",
            component: UserInOrganization
          },
          {
            path: "list_req",
            name: "ListReguest",
            component: ListRequest
          },
          {
            path: "tasks",
            name: "Tasks",
            component: Tasks
          }
        ]
      },
      {
        path: "/admin",
        components: {
          main: AdminPanel,
          sidebar: SideBarDefault
        },
        meta: {
          requiresAuth: true
        },
        children: [
          {
            path: "",
            name: "Dashboard",
            component: Dashboard
          },
          {
            path: "users",
            name: "Users",
            component: Users
          },
          {
            path: "organizations",
            name: "Organization",
            component: Organization
          }
        ]
      },
      {
        path: "/createpost",
        name: "CreatePost",
        components: {
          main: CreatePost,
          sidebar: SideBarDefault
        }
      },
      {
        path: "/notification",
        name: "ListOfNotifications",
        components: {
          main: ListOfNotifications,
          sidebar: SideBarDefault
        }
      },
      {
        path: "/posts/:id",
        name: "Posts",
        components: {
          main: DetailedPost,
          sidebar: SideBarDefault
        }
      },
      {
        path: "/points",
        name: "PointsUser",
        components: {
          main: PointsUser,
          sidebar: SideBarDefault
        }
      },
            {
        path: "/statistic",
        name: "UserStatistic",
        components: {
          main: UserStatistic,
          sidebar: SideBarDefault
        }
      }
    ]
  },
  {
    path: "/login",
    components: {
      default: Auth
    },
    children: [
      {
        path: "",
        name: "LogIn",
        components: {
          form: LogIn
        }
      }
    ],
    meta: {
      guest: true
    }
  },
  {
    path: "/signup",
    components: {
      default: Auth
    },
    children: [
      {
        path: "",
        name: "SignUp",
        components: {
          form: SignUp
        }
      }
    ],
    meta: {
      guest: true
    }
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // Если авторизация обязательна
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Если присутствует токен, пропускаем
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    // Если отсутствует токен, редирект на страницу авторизации
    else {
      next("/login");
      return;
    }
  }
  // Иначе если путь для гостя
  else if (to.matched.some(record => record.meta.guest)) {
    // Если нет токена, пропускаем
    if (!store.getters.isAuthenticated) {
      next();
      return;
    }
    // Если есть токен, редирект на главную
    else {
      next("/feed");
      return;
    }
  }
  // Если авторизация НЕ обязательна, пропускаем
  else {
    next();
    return;
  }
});

export default router;
