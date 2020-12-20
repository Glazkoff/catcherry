import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";
import Main from "@/views/Main.vue";

import Auth from "@/views/Auth.vue";
import LogIn from "@/components/auth/LogIn.vue";

import User from "@/components/account/User.vue";

import CreatePost from "@/components/CreatePost.vue";

import Account from "@/components/account/Account.vue";
import UserInOrganization from "@/components/account/UserInOrganization.vue";
import ListRequest from "@/components/account/ListRequest.vue";
import Tasks from "@/components/account/Tasks.vue";
import TeamsList from "@/components/manager/TeamsList.vue";

import DetailedPost from "@/components/DetailedPost.vue";
import FeedOfPosts from "@/components/account/FeedOfPosts.vue";
import PointsUser from "@/components/account/PointsUser.vue";
import UserStatistic from "@/components/account/UserStatistic.vue";

import SideBarDefault from "@/components/sidebar/SideBarDefault.vue";

import store from "@/store/index";
import { i18n } from "@/i18n/i18n.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Main,
    meta: {
      requiresAuth: true,
      breadCrumb: i18n.t("router.main")
    },
    children: [
      {
        path: "",
        name: "Home",
        components: {
          main: Home,
          sidebar: SideBarDefault
        },
        meta: {
          breadCrumb: i18n.t("router.home")
        }
      },
      {
        path: "/feed",
        name: "FeedOfPosts",
        components: {
          main: FeedOfPosts,
          sidebar: SideBarDefault
        },
        meta: {
          breadCrumb: i18n.t("router.feed")
        }
      },
      {
        path: "/teamslist",
        name: "TeamsList",
        components: {
          main: TeamsList,
          sidebar: SideBarDefault
        },
        meta: {
          // TODO: проверка менеджер ли
          breadCrumb: i18n.t("router.listTeams")
        }
      },
      {
        path: "/manager",
        name: "Manager",
        components: {
          main: () =>
            import(/* webpackChunkName: "manager" */ "../views/Manager.vue"),
          sidebar: () =>
            import(
              /* webpackChunkName: "sideBarManager" */ "../components/sidebar/SideBarManager.vue"
            )
        },
        meta: {
          // TODO: проверка менеджер ли
          // TODO: хлебные крошки
          breadCrumb: "manager"
        },
        children: [
          {
            path: "teams",
            name: "TeamSettings",
            component: () =>
              import(
                /* webpackChunkName: "managerTeamSettings" */ "../components/manager/TeamSettings.vue"
              )
          },
          {
            path: "new_task",
            name: "NewTask",
            component: () =>
              import(
                /* webpackChunkName: "managerNewTask" */ "../components/manager/NewTask.vue"
              )
          },
          {
            path: "team_members",
            name: "TeamMembers",
            component: () =>
              import(
                /* webpackChunkName: "managerTeamMembers" */ "../components/manager/TeamMembers.vue"
              )
          },
          {
            // TODO: rating
            path: "raiting",
            name: "RaitingList",
            component: () =>
              import(
                /* webpackChunkName: "managerRatingList" */ "../components/manager/RaitingList.vue"
              )
          },
          {
            path: "team_edit",
            name: "EditTeam",
            component: () =>
              import(
                /* webpackChunkName: "managerEditTeam" */ "../components/manager/EditTeam.vue"
              )
          },
          {
            path: "requests",
            name: "RequestsList",
            component: () =>
              import(
                /* webpackChunkName: "managerRequestsList" */ "../components/manager/RequestsList.vue"
              )
          },
          {
            path: "tasks",
            name: "TasksTeam",
            component: () =>
              import(
                /* webpackChunkName: "managerTasksTeam" */ "../components/manager/TasksTeam.vue"
              )
          }
        ]
      },
      {
        path: "/user",
        meta: {
          breadCrumb: i18n.t("router.user")
        },
        components: {
          main: User,
          sidebar: SideBarDefault
        },
        children: [
          {
            path: "",
            name: "Account",
            component: Account,
            meta: {
              breadCrumb: i18n.t("router.account")
            }
          },
          {
            path: "user_org",
            name: "UserInOrganization",
            component: UserInOrganization,
            meta: {
              breadCrumb: i18n.t("router.userInOrg")
            }
          },
          {
            path: "list_req",
            name: "ListReguest",
            component: ListRequest,
            meta: {
              breadCrumb: i18n.t("router.listRequest")
            }
          },
          {
            path: "tasks",
            name: "Tasks",
            component: Tasks,
            meta: {
              breadCrumb: i18n.t("router.tasks")
            }
          }
        ]
      },
      {
        path: "/admin",
        components: {
          main: () =>
            import(
              /* webpackChunkName: "adminPanel" */ "../views/AdminPanel.vue"
            ),
          sidebar: () =>
            import(
              /* webpackChunkName: "sideBarAdmin" */ "../components/sidebar/SideBarAdmin.vue"
            )
        },
        meta: {
          requiresAuth: true,
          breadCrumb: i18n.t("router.adminpanel")
        },
        children: [
          {
            path: "",
            name: "Dashboard",
            component: () =>
              import(
                /* webpackChunkName: "adminDashboard" */ "../components/admin/Dashboard.vue"
              ),
            meta: {
              breadCrumb: i18n.t("router.dashboard")
            }
          },
          {
            path: "users",
            name: "Users",
            component: () =>
              import(
                /* webpackChunkName: "adminUsers" */ "../components/admin/Users.vue"
              ),
            meta: {
              breadCrumb: i18n.t("router.users")
            }
          },
          {
            path: "organizations",
            name: "Organization",
            component: () =>
              import(
                /* webpackChunkName: "adminOrganization" */ "../components/admin/Organization.vue"
              ),
            meta: {
              breadCrumb: i18n.t("router.organizations")
            }
          }
        ]
      },
      {
        path: "/createpost",
        name: "CreatePost",
        components: {
          main: CreatePost,
          sidebar: SideBarDefault
        },
        meta: {
          breadCrumb: i18n.t("router.createpost")
        }
      },
      {
        path: "/notifications",
        name: "Notifications",
        components: {
          main: () =>
            import(
              /* webpackChunkName: "notifications" */ "../components/account/Notifications.vue"
            ),
          sidebar: SideBarDefault
        },
        meta: {
          breadCrumb: i18n.t("router.notifications")
        }
      },
      {
        path: "/posts/:id",
        name: "Posts",
        components: {
          main: DetailedPost,
          sidebar: SideBarDefault,
          meta: {
            breadCrumb: i18n.t("router.post")
          }
        }
      },
      {
        path: "/points",
        name: "PointsUser",
        components: {
          main: PointsUser,
          sidebar: SideBarDefault
        },
        meta: {
          breadCrumb: i18n.t("router.points")
        }
      },
      {
        path: "/statistic",
        name: "UserStatistic",
        components: {
          main: UserStatistic,
          sidebar: SideBarDefault
        },
        meta: {
          breadCrumb: i18n.t("router.statistic")
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
          form: () =>
            import(
              /* webpackChunkName: "signup" */ "../components/auth/SignUp.vue"
            )
        }
      }
    ],
    meta: {
      guest: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name !== null && from.name === null && to.name !== "LogIn") {
    localStorage.setItem("first-route", to.name);
  }

  let lang = localStorage.getItem("lang");
  if (!lang) {
    lang = process.env.VUE_APP_I18N_LOCALE;
    localStorage.setItem("lang", lang);
  }
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
