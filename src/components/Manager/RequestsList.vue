<template>
  <div>
    <h1>Команда "Название"</h1>
    <div class="every">
      <NavBar class="navig" />
      <div class="partic">
        <h3>Заявки на вхождение</h3>
        <hr />
        <div v-for="request in requests" :key="request.id" class="request">
          <RequestsItem :request="request" @accept="toAccept" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/manager/NavBar";
import RequestsItem from "@/components/manager/RequestsItem";

import { REQUESTS_QUERY, ACCEPT_REQUEST_QUERY } from "@/graphql/queries";

export default {
  apollo: {
    requests: {
      query: REQUESTS_QUERY
    }
  },

  components: {
    NavBar,
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
              query: REQUESTS_QUERY
            });
            data.requests.find(el => el.id === id).status = "Принят";
            let index = data.requests.findIndex(el => el.id == id);
            data.requests.splice(index, 1);
            cache.writeQuery({
              query: REQUESTS_QUERY,
              data
            });
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

.every {
  display: flex;
  justify-content: baseline;
}

.navig {
  width: 15%;
}

.partic {
  width: 50%;
}

.partic form {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}

.partic form input,
textarea {
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.partic form button {
  padding: 0.5rem;
}
</style>
