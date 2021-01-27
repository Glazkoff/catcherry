<template>
  <div class="mainTopBar">
    <div id="topbar">
      <nav class="navtopbar d-block w-100">
        <a class="icon right">☰</a>
        <ul class="m-0">
          <input type="checkbox" id="gepleasurprised" style="display: none;" />
          <li class="nav-logo d-block h-100">
            <h1 class="centerAlignTopBar">{{ routeTitle }}</h1>
          </li>
          <li class="right ">
            <a class="userFoto"></a>
            <a class="nav-name"
              ><p>{{ this.$store.getters.decodedToken.name }}</p>
              <small v-if="roleUser == null">-</small>
              <small v-if="roleUser != null">{{ roleUser }}</small>
            </a>
          </li>
          <li class="right icon-notificationTopBar">
            <div class="notificationTopBar">
              <router-link
                to="/notifications"
                :exact="true"
                active-class="nav-checked"
                class="centerAlignTopBar"
              >
                <div class="notBtnNotification" href="#">
                  <!--Number supports double digets and automaticly hides itself when there is nothing between divs -->
                  <div class="number" v-if="lengthNotifocations >= 1">
                    .
                  </div>
                  <NotificationIcon></NotificationIcon>
                  <div class="box">
                    <div class="display">
                      <div class="nothing">
                        <div class="cent">Оповещений нет! Ура!</div>
                      </div>
                      <div class="cont">
                        <div
                          class="sec new"
                          v-for="notification in notificationsForUser"
                          :key="notification.id"
                        >
                          <div>
                            <a href="#">
                              <div class="profCont">
                                <img
                                  class="profile"
                                  src="https://c1.staticflickr.com/5/4007/4626436851_5629a97f30_b.jpg"
                                />
                              </div>
                              <div class="txt">
                                <h3>{{ notification.body.header }}</h3>
                                <p>{{ notification.body.text }}</p>
                              </div>
                              <div class="txt sub">
                                {{ $d(notification.createdAt, "number") }}
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </li>
          <li class="right">
            <p class="emailCard centerAlignTopBar">
              <MailIcon></MailIcon>
            </p>
          </li>
          <li class="right">
            <router-link to="/points" class="centerAlignTopBar">
              <p class="nav-point">
                {{ $tc("pointsMsg", pointQuantity) }}
                <StarIcon></StarIcon></p
            ></router-link>
          </li>
          <li class="clearfix"></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
// import { directive as onClickaway } from "vue-clickaway";
import MailIcon from "@/assets/svg/topbar/mail_top-bar.svg?inline";
import StarIcon from "@/assets/svg/topbar/star_top-bar.svg?inline";
import NotificationIcon from "@/assets/svg/topbar/notification_top-bar.svg?inline";
import {
  GET_POINTS_USER_QUERY,
  ONE_USER_IN_TEAMS_QUERY,
  NOTIFICATIONS_FOR_USER_QUERY
} from "@/graphql/queries";
export default {
  name: "top-bar",
  components: {
    MailIcon,
    StarIcon,
    NotificationIcon
  },
  directives: {
    // onClickaway: onClickaway
  },
  // data: {
  //   open: false
  // },
  apollo: {
    getPointsUser: {
      query: GET_POINTS_USER_QUERY,
      variables() {
        return {
          userId: this.$store.getters.decodedToken.id
        };
      }
    },
    oneUserInTeams: {
      query: ONE_USER_IN_TEAMS_QUERY,
      variables() {
        return {
          userId: this.$store.getters.decodedToken.id
        };
      }
    },
    notificationsForUser: {
      query: NOTIFICATIONS_FOR_USER_QUERY,
      variables() {
        return {
          userId: this.$store.getters.decodedToken.id
        };
      }
    }
  },
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
    }
    // openMenu: function() {
    //   this.open = !this.open;
    // },
    // away: function() {
    //   this.open = !this.open;
    // },
  },
  computed: {
    routeTitle() {
      let matchedLength =
        this.$route.matched.length != 0 ? this.$route.matched.length : 0;
      return this.$route.matched[matchedLength - 1].meta.breadCrumb;
    },
    pointQuantity() {
      if (this.getPointsUser == undefined) {
        return "-";
      } else {
        return this.getPointsUser.pointQuantity;
      }
    },
    lengthNotifocations() {
      if (this.notificationsForUser == undefined) {
        return 0;
      } else {
        return this.notificationsForUser.length;
      }
    },
    roleUser() {
      if (this.role == undefined) {
        return "-";
      } else {
        return this.oneUserInTeams.role.name;
      }
    },
    UserID() {
      if (this.userId == undefined) {
        return "-";
      } else {
        return this.$store.getters.decodedToken.id;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_classes.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";

.centerAlignTopBar {
  display: flex;
  align-items: center;
  height: $topBarHeight;
}

.mainTopBar h1 {
  margin-block-start: 0em;
  margin-block-end: 0em;
}
#topbar,
#comptacagatin,
#luepgoposion {
  width: 100%;
  height: $topBarHeight;
}

#topbar ul {
  list-style-type: none;
}

#topbar ul li {
  float: left;
  // transition: 0.7s;
  // moz-transition: 0.7s;
  // o-transition: 0.7s;
  // webkit-transition: 0.7s;
}

#topbar ul .right {
  float: right;
}

#topbar ul li a {
  display: inline-block;
  padding: 0.8em;
  text-decoration: none;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: #ffffff;
  cursor: pointer;
}

.icon {
  display: none;
  font-size: 0.95em;
}

#topbar {
  width: 100%;
  display: flex;
  align-items: center;
  height: $topBarHeight;
  // height: auto;
  background: $dark_blue;
  justify-content: center;
  // padding-top: 1rem;
  // padding-bottom: 60px;
  border-bottom: 2px solid $violet_3;
}

.nav-logo {
  text-align: left;
  font-style: normal;
  color: #ffffff;
}
#topbar ul li .nav-name {
  color: #ffffff;
  padding: 0em;
  padding-right: 52px;
}

#topbar ul li .nav-name p {
  margin-block-start: 0em;
  margin-block-end: 0.1em;
}

#topbar ul li .nav-point {
  margin-block-start: 0em;
  font-style: normal;
  color: #ffffff;
  // padding-left: 30px;
}
#topbar ul li .nav-point svg {
  margin-left: 12px;
}
.emailCard {
  visibility: hidden;
}
#topbar ul li .emailCard svg {
  margin-left: 50px;
}
.icon-notificationTopBar {
  display: inline;
  float: right;
}
.box::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
  border-radius: 5px;
}

.box::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.box::-webkit-scrollbar-thumb {
  background-color: black;
  border: 2px solid black;
  border-radius: 5px;
}
.notificationTopBar {
  position: relative;
  display: inline-block;
}

.number {
  height: 7px;
  width: 7px;
  background-color: $red;
  border-radius: 20px;
  color: white;
  text-align: center;
  position: absolute;
  top: 12px;
  left: 65px;
}
.userFoto {
  height: 48px;
  width: 48px;
  background-color: $gray;
  border-radius: 25px;
  border: 2px solid $bright_violet;
  color: $gray;
  margin-right: 1em;
  margin-left: 7em;
}

.number:empty {
  display: none;
}

.notBtnNotification {
  transition: 0.5s;
  cursor: pointer;
}

.fas {
  font-size: 25pt;
  color: white;
  margin-right: 40px;
  margin-left: 40px;
}

.box {
  width: 400px;
  height: 0px;
  border-radius: 10px;
  transition: 0.5s;
  position: absolute;
  overflow-y: scroll;
  padding: 0px;
  left: -300px;
  margin-top: 5px;
  background-color: #f4f4f4;
  -webkit-box-shadow: 10px 10px 23px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 10px 10px 23px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 10px 10px 23px 0px rgba(0, 0, 0, 0.1);
  cursor: context-menu;
}

.fas:hover {
  color: #f4f4f4;
}

.notBtnNotification:hover > .box {
  height: 60vh;
}

.content {
  padding: 20px;
  color: black;
  vertical-align: middle;
  text-align: left;
}

.gry {
  background-color: #f4f4f4;
}

.top {
  color: black;
  padding: 10px;
}

.display {
  position: relative;
}

.cont {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
}

.cont:empty {
  display: none;
}

.stick {
  text-align: center;
  display: block;
  font-size: 50pt;
  padding-top: 70px;
  padding-left: 80px;
}

.stick:hover {
  color: black;
}

.cent {
  padding-top: 0.5em;
  text-align: center;
  display: block;
  color: $dark_blue;
}

.sec {
  padding: 25px 10px;
  background-color: #f4f4f4;
  transition: 0.5s;
}

.profCont {
  padding-left: 15px;
}

.profile {
  -webkit-clip-path: circle(50% at 50% 50%);
  clip-path: circle(50% at 50% 50%);
  width: 75px;
  float: left;
}

.txt {
  color: black;
  vertical-align: top;
  font-size: 1.25rem;
  padding: 5px 10px 0px 115px;
}

.sub {
  font-size: 1rem;
  color: grey;
}

.new {
  border-style: none none solid none;
  border-color: $dark_blue;
}

.sec:hover {
  background-color: $gray;
}
@media screen and (max-width: 1090px) {
  nav ul li:not(:nth-child(1)) {
    display: none;
  }
  nav ul .nav-logo {
    display: inline-block !important;
  }
  nav ul li.icon {
    display: inline-block;
  }
  label {
    cursor: pointer;
  }
  #gepleasurprised:checked ~ li {
    float: none;
    display: block;
  }
  .nav-exit {
    margin-left: 0.8em;
  }
  #gepleasurprised:checked ~ li a.nav-name {
    display: none;
  }
  .fas {
    margin: 0px;
  }
  .number {
    left: 20px;
  }
  .box {
    left: 50px;
  }
}
@media screen and (max-width: 350px) {
  .nav-logo {
    font-size: 24px;
  }
}
@media screen and (max-width: 660px) {
  .box {
    width: 200px;
    height: 0px;
    padding: 0px;
    left: 50px;
    margin-top: 5px;
  }
  .profCont {
    display: none;
  }
  .txt {
    color: black;
    vertical-align: top;
    font-size: 0.75rem;
    padding: 5px 10px 0px 15px;
  }
}
</style>
