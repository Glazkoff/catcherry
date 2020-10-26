<template>
<div>
  <h1>Команда "Название"</h1>
  <div class="every">
    <NavBar class="navig" />
    <div class="partic">
      <h3>Заявки на вхождение</h3>
      <hr>
      <div v-for="request in requests" :key="request.id" class="request">
        <RequestsItem :request="request" />
      </div>

    </div>
  </div>
</div>
</template>

<script>
import NavBar from "@/components/Manager/NavBar";
import RequestsItem from "@/components/Manager/RequestsItem";
export default {
  components: {
    NavBar,
    RequestsItem
  },

  data() {
    return {
      requests: [{
          id: 1,
          name: "asdad"
        },
        {
          id: 2,
          name: "wiruoue"
        },
      ]
    }
  }

}
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
