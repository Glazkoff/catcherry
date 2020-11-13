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
import TeamMembers from "@/components/Manager/TeamMembers.vue";
import RaitingList from "@/components/Manager/RaitingList.vue";
import EditTeam from "@/components/Manager/EditTeam.vue";
import RequestsList from "@/components/Manager/RequestsList.vue";
import TasksTeam from "@/components/Manager/TasksTeam.vue";
import TeamList from "@/components/Manager/TeamList.vue";
import TeamSettings from "@/components/Manager/TeamSettings.vue";

import DetailedPost from "@/components/DetailedPost.vue";
import FeedOfPosts from "@/components/FeedOfPosts.vue";

Vue.use(VueRouter);

import { ifAuthenticated, ifNotAuthenticated } from "@/router/guards.js";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: ifAuthenticated
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
      }
    ]
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminPanel,
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
        path: "organization",
        component: Organization
      }
    ],
    beforeEnter: ifAuthenticated
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
    beforeEnter: ifNotAuthenticated
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration
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

export default router;
