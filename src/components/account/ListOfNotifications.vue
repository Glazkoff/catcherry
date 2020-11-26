<template>
  <div class="list">
    <notification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    ></notification>
  </div>
</template>

<script>
// import Notification from "@/components/Notification.vue";
import { NOTIFICATIONS_USER_QUERY } from "@/graphql/queries";
export default {
  name: "Notification",
  apollo: {
    notifications: {
      query: NOTIFICATIONS_USER_QUERY
    }
  },
  data() {
    return {
      newNotification: "",
      editNotification: {
        isEdit: false,
        name: "",
        id: -1
      }
    };
  },
  methods: {
    // toSaveEditNotification() {
    //   this.editNotification.isEdit = false;
    //   this.$apollo
    //     .mutate({
    //       mutation: UPDATE_NOTIFICATION_QUERY,
    //       variables: {
    //         name: this.editNotification.name,
    //         id: this.editNotification.id
    //       },
    //       update: (cache, { data: { updateNotification } }) => {
    //         let data = cache.readQuery({ query: NOTIFICATIONS_QUERY });
    //         console.log(data);
    //         data.notifications.find(
    //           el => el.id === this.editNotification.id
    //         ).name = this.editNotification.name;
    //         cache.writeQuery({ query: NOTIFICATIONS_QUERY, data });
    //         console.log(updateNotification);
    //       },
    //       optimisticResponse: {
    //         __typename: "Mutation"
    //       }
    //     })
    //     .then(data => {
    //       console.log(data);
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // },
    toEditNotification(id) {
      let editNotification = this.notifications.find(el => el.id === id);
      this.editNotification.name = editNotification.name;
      this.editNotification.id = editNotification.id;
      this.editNotification.isEdit = true;
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
