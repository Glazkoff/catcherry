<template>
  <div class="wrapOfList">
    <div class="spaceForNotifications"></div>
    <div class="list">
      <notification
        @delete="onDelete"
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      ></notification>
    </div>
  </div>
</template>

<script>
import Notification from "@/components/NotificationCard.vue";
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
      let index = this.notifications.findIndex(el => el.id === object.id);
      this.notifications.splice(index, 1);
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";
@import "@/styles/_classes.scss";
.spaceForNotifications {
  width: 24rem;
}

.wrapOfList {
  margin-top: -20px;
}

.list {
  height: calc(100vh - #{$topBarHeight});
  width: 24rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: $topBarHeight;
  bottom: -$topBarHeight;
  background: $violet;
  position: sticky;
  overflow-x: hidden;
  overflow-y: scroll;
  right: 0;
  padding-top: 1.4rem;
  padding-bottom: 1.4rem;
  padding-right: 1.6rem;
  padding-left: 1.6rem;
  box-shadow: -4px 0px 4px rgba(0, 0, 0, 0.1);
  &::-webkit-scrollbar-track {
    background-color: $white;
    border-radius: 5px;
  }
  &::-webkit-scrollbar {
    width: 10px;
    background-color: $white;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: $violet_3;
    border-radius: 5px;
  }
}
</style>
