<template>
<div>
  <h3>Редактирование</h3>
  <hr />
  <div v-for="t in team" :key="t.id">
    <div v-if="t.id == id">
      <EditForm :t="t" @update="toSaveEditTeam" />
    </div>
  </div>
</div>
</template>

<script>
import {
  TEAM_IN_ORG_QUERY,
  UPDATE_TEAMS_QUERY
} from "@/graphql/queries";
import EditForm from "@/components/manager/EditForm";
export default {
  apollo: {
    // Массив команд организации
    team: {
      query: TEAM_IN_ORG_QUERY,
      variables() {
        return {
          organizationId: 1
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
    EditForm
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

<style lang="scss" scoped></style>
