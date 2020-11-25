<template>
  <div class="list">
    <notification
      @delete="onDelete"
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    ></notification>
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import { NOTIFICATIONS_USER_QUERY } from "@/graphql/queries";
export default {
  name: "ListOfNotifications",
  components: {
    Notification
  },
  data() {
    return {
      notifications: [
        {
          id: 22,
          body: {
            header: "Закрытие спринта",
            text:
              "В зум-конференции планируется к проведению закрытие спринта, в состав данного мероприятия войдут следующие части: очищение обзора, просмотр задач в работе ...",
            button: "Zoom-link",
            buttonLink:
              "https://us04web.zoom.us/j/8118194172?pwd=UmpJTnAzbFZQUjZLYUJZU2VwN0pPUT09"
          }
        },

        {
          id: 23,
          body: {
            header: "Внимание!",
            text:
              "Важная информация, важная информация, важная информация, важная информация, важная информация, важная информация, важная информация, важная информация, важная информация, важная информация, важная информация, важная информация, важная информация, важная информация...",
            button: null
          }
        }
      ]
    };
  },
  apollo: {
    // массив пользователей команды с рейтиногм по баллам
    notifications: {
      query: NOTIFICATIONS_USER_QUERY,
      variables() {
        return {
          teamId: this.$route.params.id
        };
      }
    }
  },
  methods: {
    onDelete(object) {
      // console.log(object);
      // console.log(object.id);
      let index = this.notifications.findIndex(el => el.id === object.id);
      // console.log(index);
      this.notifications.splice(index, 1);
    }
  }
};
</script>

<style>
.list {
  height: 100%;
  width: 18rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  float: right;
  background: #f7f7f7;
  overflow-x: hidden;
  padding-top: 30px;
}
</style>
