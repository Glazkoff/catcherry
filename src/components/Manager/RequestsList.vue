<template>
<div>
  <h3>Заявки на вхождение</h3>
  <hr />
  <div v-for="request in requests" :key="request.id" class="request">
    <RequestsItem :request="request" @accept="toAccept" />
  </div>
</div>
</template>

<script>
import RequestsItem from "@/components/Manager/RequestsItem";

import {
  REQUESTS_QUERY,
  ACCEPT_REQUEST_QUERY,
  USERS_IN_TEAMS_QUERY
} from "@/graphql/queries";

export default {
  data() {
    return {
      teamId: this.$route.params.id
    };
  },

  apollo: {
    requests: {
      query: REQUESTS_QUERY,
      variables() {
        return {
          teamId: this.teamId
        };
      }
    },
    usersInTeams: {
      query: USERS_IN_TEAMS_QUERY,
      variables() {
        return {
          teamId: this.teamId
        };
      }
    }
  },

  components: {
    RequestsItem
  },

  methods: {
    toAccept(id) {
      this.$apollo
        .mutate({
          mutation: ACCEPT_REQUEST_QUERY,
          variables: {
            id
          },
          update: cache => {
            let data = cache.readQuery({
              query: REQUESTS_QUERY,
              variables: {
                teamId: this.teamId
              }
            });
            let data_user = cache.readQuery({
              query: USERS_IN_TEAMS_QUERY,
              variables: {
                teamId: this.teamId
              }
            });
            data.requests.find(el => el.id === id).status = "Принят";
            let index = data.requests.findIndex(el => el.id == id);
            data_user.usersInTeams.push(data.requests.find(el => el.id === id));
            data.requests.splice(index, 1);
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
.request {
  border: 1px solid black;
  padding: 1rem;
  margin: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}

form input,
textarea {
  padding: 0.5rem;
  margin-bottom: 1rem;
}

form button {
  padding: 0.5rem;
}
</style>
