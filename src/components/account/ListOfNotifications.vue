<template>
  <div class="wrapOfList">
    <div class="list">
      <notification
        v-for="notification in notificationsForUser"
        :key="notification.id"
        :notification="notification"
        @check="onCheckNotification"
      ></notification>
    </div>
  </div>
</template>

<script>
import Notification from "@/components/NotificationCard.vue";
import {
  NOTIFICATIONS_FOR_USER_QUERY,
  UPDATE_NOTIFICATION
} from "@/graphql/queries";
export default {
  name: "ListOfNotifications",
  components: {
    Notification
  },
  apollo: {
    notificationsForUser: {
      query: NOTIFICATIONS_FOR_USER_QUERY,
      variables() {
        return {
          userId: this.$store.getters.decodedToken.id
        };
      }
    }
  },
  methods: {
    onCheckNotification(object) {
      this.$apollo
        .mutate({
          mutation: UPDATE_NOTIFICATION,
          variables: {
            notificationId: object.id,
            userId: this.$store.getters.decodedToken.id,
            checkNotification: true
          },
          update: cache => {
            let data = cache.readQuery({
              query: NOTIFICATIONS_FOR_USER_QUERY,
              variables: {
                userId: this.$store.getters.decodedToken.id
              }
            });
            let index = data.notificationsForUser.findIndex(
              el => el.id === object.id
            );
            data.notificationsForUser.splice(index, 1);
            cache.writeQuery({
              query: NOTIFICATIONS_FOR_USER_QUERY,
              variables: {
                userId: this.$store.getters.decodedToken.id
              },
              data
            });
          }
        })
        .then(() => {})
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";
@import "@/styles/_classes.scss";

.wrapOfList {
  width: 24rem;
}

.list {
  height: calc(100vh - #{$topBarHeight});
  width: 24rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: $topBarHeight;
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
