<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <breadcrumbs></breadcrumbs>
        </div>
      </div>
    </div>
    <div class="container" v-if="!this.$apollo.loading">
      <div v-for="t in team" :key="t.id">
        <div v-if="t.id == id">
          <EditForm :t="t" @update="toSaveEditTeam" />
        </div>
      </div>
    </div>
    <div v-else class="container"><loader></loader></div>
  </div>
</template>

<script>
import { TEAM_IN_ORG_QUERY, UPDATE_TEAMS_QUERY } from "@/graphql/queries";
import breadcrumbs from "@/components/BreadCrumbs.vue";
import EditForm from "@/components/manager/EditForm";
import loader from "@/components/Loader.vue";
export default {
  apollo: {
    // Массив команд организации
    team: {
      query: TEAM_IN_ORG_QUERY,
      variables() {
        return {
          organizationId: +this.$route.params.id
        };
      }
    }
  },
  data() {
    return {
      id: this.$route.params.id // id команды
    };
  },
  components: {
    EditForm,
    breadcrumbs,
    loader
  },
  methods: {
    // Метод для редактирования команды; сохраняет внесенные пользователем изменения
    toSaveEditTeam(name, description, maxUsersLimit) {
      this.$apollo
        .mutate({
          mutation: UPDATE_TEAMS_QUERY,
          variables: {
            id: this.id,
            name: name,
            description: description,
            maxUsersLimit: maxUsersLimit
          },
          update: cache => {
            // Записываем в переменную массив команд организации
            let data = cache.readQuery({
              query: TEAM_IN_ORG_QUERY,
              variables() {
                return {
                  organizationId: 1
                };
              }
            });
            // Меняем поля определенной команды
            data.team.find(el => el.id === this.id).name = name;
            data.team.find(el => el.id === this.id).description = description;
            data.team.find(
              el => el.id === this.id
            ).maxUsersLimit = maxUsersLimit;
          }
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_colors.scss";
@import "@/styles/_grid.scss";
@import "@/styles/_classes.scss";
h3 {
  margin-bottom: 0.5rem;
}
</style>
