<template>
  <div>
    <div class="side-bar__nav-list">
      <router-link
        :to="{
          name: 'Account',
          params: { id: $store.getters.decodedToken.id }
        }"
        :exact="true"
        active-class="nav-checked"
      >
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <ProfileIcon></ProfileIcon>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            {{ $t("sideBar.profile") }}
          </div>
        </div>
      </router-link>
      <router-link
        :to="{
          name: 'UserInOrganization',
          params: { id: $store.getters.decodedToken.id }
        }"
        :exact="true"
        active-class="nav-checked"
      >
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <OrganizationIcon></OrganizationIcon>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            {{ $t("sideBar.organization") }}
          </div>
        </div>
      </router-link>
      <router-link to="/feed" :exact="true" active-class="nav-checked">
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <FeedIcon></FeedIcon>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            {{ $t("sideBar.newsFeed") }}
          </div>
        </div>
      </router-link>
      <router-link
        :to="{
          name: 'UserStatistic',
          params: { id: $store.getters.decodedToken.id }
        }"
        :exact="true"
        active-class="nav-checked"
      >
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <PersonalStatisticsIcon></PersonalStatisticsIcon>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            {{ $t("sideBar.personalStatistics") }}
          </div>
        </div>
      </router-link>
      <router-link
        :to="{
          name: 'PointsUser'
        }"
        :exact="true"
        active-class="nav-checked"
      >
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <PointsIcon></PointsIcon>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            {{ $t("sideBar.points") }}
          </div>
        </div>
      </router-link>
      <router-link
        :to="{
          name: 'Tasks',
          params: {
            id: $store.getters.decodedToken.id
          }
        }"
        :exact="true"
        active-class="nav-checked"
      >
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <TasksIcon></TasksIcon>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            {{ $t("sideBar.tasks") }}
          </div>
        </div>
      </router-link>
      <router-link
        v-if="roleInSystem == 'Manager'"
        :to="{
          name: 'TeamsList',
          params: { id: $store.getters.decodedToken.id }
        }"
        :exact="true"
        active-class="nav-checked"
      >
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <ProfileIcon></ProfileIcon>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            {{ $t("sideBar.managersPanel") }}
          </div>
        </div>
      </router-link>
      <router-link
        v-if="roleInSystem == 'Administrator'"
        :to="{
          name: 'Dashboard',
          params: { id: $store.getters.decodedToken.id }
        }"
        active-class="nav-checked"
      >
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <ProfileIcon></ProfileIcon>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            {{ $t("sideBar.adminPanel") }}
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ROLE_IN_SYSTEM_QUERY } from "@/graphql/queries";
import ProfileIcon from "@/assets/svg/sidebar/profile_icon.svg?inline";
import OrganizationIcon from "@/assets/svg/sidebar/organization_icon.svg?inline";
import FeedIcon from "@/assets/svg/sidebar/feed_icon.svg?inline";
import PersonalStatisticsIcon from "@/assets/svg/sidebar/personal_statistics_icon.svg?inline";
import TasksIcon from "@/assets/svg/sidebar/tasks_icon.svg?inline";
import PointsIcon from "@/assets/svg/sidebar/points_icon.svg?inline";

export default {
  name: "SideBarDefault",
  apollo: {
    // Массив команд организации
    roleInSystem: {
      query: ROLE_IN_SYSTEM_QUERY,
      error(error) {
        this.queryError = JSON.stringify(error.message);
      },
      variables() {
        return {
          id: this.$store.getters.decodedToken.id
        };
      }
    }
  },
  components: {
    ProfileIcon,
    OrganizationIcon,
    FeedIcon,
    PersonalStatisticsIcon,
    TasksIcon,
    PointsIcon
  }
};
</script>

<style lang="scss" scoped></style>
