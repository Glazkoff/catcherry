import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Account from "../components/Account.vue";
import UserInOrganization from "../components/UserInOrganization.vue";
import ListRequest from "../components/ListRequest.vue";
import Authentication from "../components/Authentication.vue";
import Registration from "../components/Registration.vue";
import TeamRequestList from "../components/Manager/TeamRequestList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
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
  {
    path: "/manager/team_req",
    name: "TeamRequestList",
    component: TeamRequestList,
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
