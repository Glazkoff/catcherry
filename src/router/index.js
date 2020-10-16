import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";
import AdminPanel from "../views/AdminPanel.vue";
import Dashboard from "@/components/admin/Dashboard.vue";
import Users from "@/components/admin/Users.vue";
import Organization from "@/components/admin/Organization.vue";
import Account from "../components/Account.vue";
import UserInOrganization from "../components/UserInOrganization.vue";
import ListRequest from "../components/ListRequest.vue";
import Authentication from "../components/Authentication.vue";
import Registration from "../components/Registration.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
      }]
    }
    path: "/account",
    name: "Account",
    component: Account,
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
