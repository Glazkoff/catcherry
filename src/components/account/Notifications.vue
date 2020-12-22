<template>
  <div v-if="!this.$apollo.queries.notificationsForUser.loading">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <BreadCrumbs></BreadCrumbs>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div
          class="col-12"
          v-for="notification in notificationsForUser"
          :key="notification.id"
          :notification="notification"
        >
          <div class="cardOfNotification">
            <h2>{{ notification.body.header }}</h2>
            <p>
              {{ notification.body.text }}
            </p>
            <div class="spaceForAuthor"></div>
            <div class="icon" @click="onCheckNotification(notification.id)">
              <Cross></Cross>
            </div>
            <small>{{ fullName(notification) }}</small>
            <small class="date">{{
              $d(notification.createdAt, "number")
            }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="wrapOfLoader">
    <Loader></Loader>
  </div>
</template>

<script>
import {
  NOTIFICATIONS_FOR_USER_QUERY,
  UPDATE_NOTIFICATION
} from "@/graphql/queries";
import Loader from "@/components/Loader.vue";
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import Cross from "@/assets/cross.svg?inline";
export default {
  name: "Notifications",
  components: {
    Loader,
    BreadCrumbs,
    Cross
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
  data() {
    return {};
  },
  methods: {
    fullName(notification) {
      if (
        notification != undefined &&
        notification.notificationAuthor != undefined
      ) {
        return (
          notification.notificationAuthor.surname +
          " " +
          notification.notificationAuthor.name +
          " " +
          notification.notificationAuthor.patricity
        );
      } else return "-";
    },
    onCheckNotification(id) {
      this.$apollo
        .mutate({
          mutation: UPDATE_NOTIFICATION,
          variables: {
            notificationId: id,
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
            let index = data.notificationsForUser.findIndex(el => el.id === id);
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

<style lang="scss" scoped>
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";
@import "@/styles/_classes.scss";
@import "@/styles/_grid.scss";

.cardOfNotification {
  background: $violet;
  position: relative;
  border-radius: 10px;
  margin-bottom: 1.125rem;
  min-height: 7.5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 1rem 2.4rem;
  & h2 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  & p {
    margin-top: 0;
    margin-bottom: 0.5em;
  }
  & .spaceForAuthor {
    height: 0.875rem;
  }
  & small {
    color: $gray_3;
    position: absolute;
    bottom: 1rem;
    &.date {
      right: 2.4rem;
    }
  }
  & .icon {
    position: absolute;
    top: 1rem;
    right: 2.4rem;
    cursor: pointer;
  }
}
</style>
