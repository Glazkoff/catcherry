<template>
  <div>
    <div class="side-bar__nav-list">
      <router-link
        :to="{
          name: 'Dashboard'
        }"
        :exact="true"
        active-class="nav-checked"
      >
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <PersonalStatisticsIcon></PersonalStatisticsIcon>
          </div>
          <div
            class="side-bar__nav-list__nav-element__text"
            v-html="$t('systemStatisticsBr')"
          ></div>
        </div>
      </router-link>
      <router-link
        :to="{ name: 'Users' }"
        :exact="true"
        active-class="nav-checked"
      >
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <ProfileIcon></ProfileIcon>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            {{ $t("listUser") }}
          </div>
        </div>
      </router-link>
      <router-link
        :to="{ name: 'Organization' }"
        :exact="true"
        active-class="nav-checked"
      >
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <OrganizationIcon></OrganizationIcon>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            {{ $t("listOrganization") }}
          </div>
        </div>
      </router-link>

      <router-link to="/feed" :exact="true" active-class="nav-checked">
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <ProfileIcon></ProfileIcon>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            Назад
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import ProfileIcon from "@/assets/svg/sidebar/profile_icon.svg?inline";
import PersonalStatisticsIcon from "@/assets/svg/sidebar/personal_statistics_icon.svg?inline";
import OrganizationIcon from "@/assets/svg/sidebar/organization_icon.svg?inline";
export default {
  name: "SideBarAdmin",
  components: {
    ProfileIcon,
    PersonalStatisticsIcon,
    OrganizationIcon
  }
};
</script>

<style lang="scss" scoped>
nav {
  margin: 1rem;
  margin-right: 5rem;
}

nav p {
  background-color: wheat;
  margin: 0;
  border: 1px solid rgb(247, 77, 77);
  padding: 1rem;
}

.router-link-exact-active {
  font-weight: 700;
}
</style>
