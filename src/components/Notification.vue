<template>
  <div
    v-if="
      notification.forAllUsers == $route.params.id ||
        notification.forAllUsers == null
    "
    class="notification"
  >
    <div class="header">
      <span>{{ notification.body.header }}</span>
      <div class="icon" @click="onDelete(notification.id)">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fal"
          data-icon="times"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="svg-inline--fa fa-times fa-w-10 fa-2x"
        >
          <path
            fill="white"
            d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
          ></path>
        </svg>
      </div>
    </div>
    <div class="main">
      <p>{{ notification.body.text }}</p>
      <span>{{ $d(notification.createdAt, "long") }}</span>
      <div v-if="notification.body.button" class="blockForButton">
        <a v-bind:href="notification.body.buttonLink" target="_blank">{{
          notification.body.button
        }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import {
  NOTIFICATIONS_QUERY,
  UPDATE_NOTIFICATION_QUERY
} from "@/graphql/queries";
export default {
  name: "Notification",
  apollo: {
    notifications: {
      query: NOTIFICATIONS_QUERY
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
    toSaveEditNotification() {
      this.editNotification.isEdit = false;
      this.$apollo
        .mutate({
          mutation: UPDATE_NOTIFICATION_QUERY,
          variables: {
            name: this.editNotification.name,
            id: this.editNotification.id
          },
          update: (cache, { data: { updateNotification } }) => {
            let data = cache.readQuery({ query: NOTIFICATIONS_QUERY });
            console.log(data);
            data.notifications.find(
              el => el.id === this.editNotification.id
            ).name = this.editNotification.name;
            cache.writeQuery({ query: NOTIFICATIONS_QUERY, data });
            console.log(updateNotification);
          },
          optimisticResponse: {
            __typename: "Mutation"
          }
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    },
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
.notification {
  width: 15rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0px 2px 8px rgba(40, 41, 61, 0.08),
    0px 20px 32px rgba(96, 97, 112, 0.24);
}

.header {
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 2rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  background: #d2bbea;
  padding-right: 1rem;
  padding-left: 1rem;
}

.header span {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 1.15rem;
  /* line-height: 1.8rem; */
  color: #ffffff;
}

.icon {
  margin-left: 0.5rem;
  margin-right: -0.6rem;
  cursor: pointer;
  width: 1.7rem;
  height: 1.7rem;
}

.main {
  width: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
}
.main p {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 0.8rem;
  line-height: 0.95rem;
}

.blockForButton {
  text-align: center;
}
.blockForButton a {
  display: block;
  text-decoration: none;
  width: 7.5rem;
  height: 2.4rem;
  border-radius: 0.3rem;
  font-size: 0.9rem;
  line-height: 2.2rem;
  display: inline-block;
  background: rgba(138, 110, 167, 0.22);
  border: 1px solid #64507a;
  box-sizing: border-box;
  font-family: Montserrat;
  font-weight: 600;
  text-align: center;
  color: #514163;
  cursor: pointer;
  transition: all 0.2s ease-out;
}
.blockForButton a:hover {
  background: #fff;
}

span {
  color: #878787;
  font-size: 12px;
}
</style>
