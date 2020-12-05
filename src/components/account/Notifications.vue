<template>
  <div v-if="!this.$apollo.queries.notifications.loading">
    <bread-crumbs class="bread-crumbs"></bread-crumbs>
    <div class="container">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      >
        <div
          class="cardOfNotification"
          v-if="
            (notification.forAllUsers == $store.getters.decodedToken.id &&
              notification.checkNotification == false) ||
              (notification.forAllUsers == null &&
                notification.checkNotification == false)
          "
        >
          <h2>{{ notification.body.header }}</h2>
          <p>
            {{ notification.body.text }}
          </p>
          <div class="spaceForAuthor"></div>
          <div class="icon" @click="onCheckNotification(notification)">
            <Cross></Cross>
          </div>
          <small>Computer</small>
          <small class="date">{{ $d(notification.createdAt, "number") }}</small>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="wrapOfLoader"><loader></loader></div>
</template>

<script>
import {
  NOTIFICATIONS_USER_QUERY,
  UPDATE_NOTIFICATION_QUERY
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
    notifications: {
      query: NOTIFICATIONS_USER_QUERY
    }
  },
  data() {
    return {};
  },
  methods: {
    onCheckNotification(notification) {
      this.$apollo
        .mutate({
          mutation: UPDATE_NOTIFICATION_QUERY,
          variables: {
            id: notification.id,
            body: {
              header: notification.body.header,
              text: notification.body.text
            },
            teamId: notification.teamId,
            checkNotification: true
          },
          update: cache => {
            let data = cache.readQuery({ query: NOTIFICATIONS_USER_QUERY });
            data.notifications.find(
              el => el.id === notification.id
            ).checkNotification = true;
            cache.writeQuery({ query: NOTIFICATIONS_USER_QUERY, data });
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
@import "@/styles/_dimensions.scss";
@import "@/styles/_classes.scss";

.container {
  padding: 3rem;
  padding-top: 0.625rem;
}
.bread-crumbs {
  margin-bottom: 2.5rem;
}
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
