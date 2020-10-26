import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";

import Authentication from "@/views/Authentication.vue";
import Registration from "@/views/Registration.vue";

import AdminPanel from "@/views/AdminPanel.vue";
import Dashboard from "@/components/admin/Dashboard.vue";
import Users from "@/components/admin/Users.vue";
import Organization from "@/components/admin/Organization.vue";

import User from "@/components/account/User.vue";
import Account from "@/components/account/Account.vue";
import UserInOrganization from "@/components/account/UserInOrganization.vue";
import ListRequest from "@/components/account/ListRequest.vue";
import TeamMembers from "@/components/Manager/TeamMembers.vue";
import EditTeam from "@/components/Manager/EditTeam.vue";
import RequestsList from "@/components/Manager/RequestsList.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
        component: Account,
      },
      {
        path: "user_org",
        name: "UserInOrganization",
        component: UserInOrganization,
      },
      {
        path: "list_req",
        name: "ListReguest",
        component: ListRequest,
      },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminPanel,
    children: [
      {
        path: "",
        component: Dashboard,
      },
      {
        path: "users",
        component: Users,
      },
      {
        path: "organization",
        component: Organization,
      },
    ],
  },
  {
    path: "/auth",
    name: "Authentication",
    component: Authentication,
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },
    {
    path: "/manager/team_members",
    name: "TeamMembers",
    component: TeamMembers,
  },
        {
    path: "/manager/team_edit",
    name: "EditTeam",
    component: EditTeam,
  },
          {
    path: "/manager/requests",
    name: "RequestsList",
    component: RequestsList,
  },
    
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
  routes,
});

export default router;
