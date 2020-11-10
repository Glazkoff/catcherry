import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";
import AdminPanel from "@/views/AdminPanel.vue";
import Dashboard from "@/components/admin/Dashboard.vue";
import Users from "@/components/admin/Users.vue";
import Organization from "@/components/admin/Organization.vue";

import Account from "@/components/account/Account.vue";
import UserInOrganization from "@/components/account/UserInOrganization.vue";
import ListRequest from "@/components/account/ListRequest.vue";
import User from "@/components/account/User.vue";

import Authentication from "@/views/Authentication.vue";
import Registration from "@/views/Registration.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
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
    path: "/user_org",
    name: "UserInOrganization",
    component: UserInOrganization,
  },
  {
    path: "/list_req",
    name: "ListReguest",
    component: ListRequest,
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
