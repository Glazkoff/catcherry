<template>
  <div>
    <div class="side-bar__nav-list">
      <router-link to="/feed" :exact="true" active-class="nav-checked">
        <div
          class="side-bar__nav-list__nav-element side-bar__nav-list__back-btn"
        >
          <div class="side-bar__nav-list__nav-element__icon">
            <BackIcon></BackIcon>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            {{ $t("back") }}
          </div>
        </div>
      </router-link>
      <router-link
        :to="{
          name: 'RaitingList',
          params: {
            id: $route.params.id,
            userId: $store.getters.decodedToken.id
          }
        }"
        :exact="true"
        active-class="nav-checked"
      >
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <RaitingIcon></RaitingIcon>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            Рейтинг участников
          </div>
        </div>
      </router-link>
      <router-link
        :to="{ name: 'TeamMembers', params: { id: $route.params.id } }"
        :exact="true"
        active-class="nav-checked"
      >
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <TeamMembersIcon></TeamMembersIcon>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            Участники
          </div>
        </div>
      </router-link>
      <router-link
        :to="{ name: 'RequestsList', params: { id: $route.params.id } }"
        :exact="true"
        active-class="nav-checked"
      >
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <RequestsIcon></RequestsIcon>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            Заявки на вхождение
          </div>
        </div>
      </router-link>
      <router-link
        :to="{
          name: 'EditTeam',
          params: { id: $route.params.id }
        }"
        :exact="true"
        active-class="nav-checked"
      >
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <EditIcon></EditIcon>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            Редактирование
          </div>
        </div>
      </router-link>

      <router-link
        :to="{
          name: 'TasksTeam',
          params: { id: $route.params.id }
        }"
        :exact="true"
        active-class="nav-checked"
      >
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <TasksIcon></TasksIcon>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            Задания
          </div>
        </div>
      </router-link>
      <router-link
        :to="{ name: 'NewTask', params: { id: $route.params.id } }"
        active-class="nav-checked"
      >
        <div class="side-bar__nav-list__nav-element">
          <div class="side-bar__nav-list__nav-element__icon">
            <OrganizationIcon></OrganizationIcon>
          </div>
          <div class="side-bar__nav-list__nav-element__text">
            Конструктор заданий
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import RaitingIcon from "@/assets/svg/sidebar/raiting_icon.svg?inline";
import TeamMembersIcon from "@/assets/svg/sidebar/team_members_icon.svg?inline";
import RequestsIcon from "@/assets/svg/sidebar/requests_icon.svg?inline";
import EditIcon from "@/assets/svg/sidebar/edit_icon.svg?inline";
import TasksIcon from "@/assets/svg/sidebar/tasks_icon.svg?inline";
import OrganizationIcon from "@/assets/svg/sidebar/organization_icon.svg?inline";
import BackIcon from "@/assets/svg/sidebar/back.svg?inline";
export default {
  name: "SideBarManager",
  components: {
    BackIcon,
    RaitingIcon,
    TeamMembersIcon,
    RequestsIcon,
    EditIcon,
    TasksIcon,
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
