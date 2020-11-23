import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";

import Authentication from "@/views/Authentication.vue";
import Registration from "@/views/Registration.vue";

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
import ListOfNotifications from "@/components/ListOfNotifications.vue";
import TeamMembers from "@/components/manager/TeamMembers.vue";
import RaitingList from "@/components/manager/RaitingList.vue";
import EditTeam from "@/components/manager/EditTeam.vue";
import RequestsList from "@/components/manager/RequestsList.vue";
import TasksTeam from "@/components/manager/TasksTeam.vue";
import TeamList from "@/components/manager/TeamList.vue";
import TeamSettings from "@/components/manager/TeamSettings.vue";

import DetailedPost from "@/components/DetailedPost.vue";
import FeedOfPosts from "@/components/FeedOfPosts.vue";
import PointsUser from "@/components/account/PointsUser.vue";

import store from "@/store/index";

Vue.use(VueRouter);

// import { ifAuthenticated, ifNotAuthenticated } from "@/router/guards.js";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
    // beforeEnter: ifAuthenticated
  },
  // FIXME: [Фёдор]
  /*
    * Возможно, стоит рассмотреть следующий вариант:
    path: "/users",
    name: "User",
    component: User,
    children: [
      {
        path: "/:id",
        name: "Account",
        component: Account,
      },
  */
  {
    path: "/user/:id",
    name: "User",
    component: User,
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
      },
      {
        path: "points",
        name: "PointsUser",
        component: PointsUser
      }
    ]
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminPanel,
    meta: {
      requiresAuth: true
    },
    // TODO: добавить защиту для администратора
    children: [
      {
        path: "",
        component: Dashboard
      },
      {
        path: "users",
        component: Users
      },
      {
        path: "organizations",
        component: Organization
      }
    ]
  },
  {
    path: "/account",
    name: "Account",
    component: Account
  },
  {
    path: "/user_org",
    name: "UserInOrganization",
    component: UserInOrganization
  },
  {
    path: "/list_req",
    name: "ListReguest",
    component: ListRequest
  },
  {
    path: "/auth",
    name: "Authentication",
    component: Authentication,
    meta: {
      guest: true
    }
    // beforeEnter: ifNotAuthenticated
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
    meta: {
      guest: true
    }
    // beforeEnter: ifNotAuthenticated
  },

  {
    path: "/createpost",
    name: "CreatePost",
    component: CreatePost
  },
  {
    path: "/notification",
    name: "ListOfNotifications",
    component: ListOfNotifications
  },
  {
    path: "/manager/teams",
    name: "TeamList",
    component: TeamList
  },
  {
    path: "/manager/teams/:id",
    name: "TeamSettings",
    component: TeamSettings,
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
    path: "/posts/:id",
    name: "Posts",
    component: DetailedPost
  },
  {
    path: "/feed",
    name: "FeedOfPosts",
    component: FeedOfPosts
  },
  {
    path: "/points",
    name: "PointsUser",
    component: PointsUser
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
      next("/auth");
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
      next("/");
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
