<template>
    <div class="list">
        <notification @ping="onPing" v-for="notification in notifications" :key="notification.id" :notification="notification" ></notification>
    </div>
</template>

<script>
import Notification from "../components/Notification.vue";
export default {
  name: 'ListOfNotifications',
  components: {
        Notification
    },
  data() {
    return {
    notifications: [
      {
        id: 1,
        name: "Закрытие спринта",
        text: "В зум-конференции планируется к проведению закрытие спринта, в состав данного мероприятия войдут следующие части: очищение обзора, просмотр задач в работе ...",
        button: "Zoom-link",
        buttonLink: "https://us04web.zoom.us/j/8118194172?pwd=UmpJTnAzbFZQUjZLYUJZU2VwN0pPUT09"
      },

      {
        id: 2,
        name: "Внимание!",
        text: "Важная информация, важная информация, важная информация, важная информация, важная информация, важная информация, важная информация, важная информация, важная информация, важная информация, важная информация, важная информация, важная информация, важная информация...",
        button: false
      }, 

      {
        id: 3,
        name: "Закрытие спринтаммм",
        text: "В зум-конференции в субботу планируется к проведению закрытие спринта. Ссылка будет прислана в следующем оповещении. В состав данного мероприятия войдут следующие части: очищение обзора, просмотр задач в работе ...",
        button: false
      },
      {
        id: 4,
        name: "Внимание!",
        text: "Важная информация.",
        button: false
      }, 

      {
        id: 5,
        name: "Закрытие спринта",
        text: "В зум-конференции в субботу планируется к проведению закрытие спринта. Ссылка будет прислана в следующем оповещении. В состав данного мероприятия войдут следующие части: очищение обзора, просмотр задач в работе ...",
        button: false
      }
    ],
    }
  },
  methods: {
    onPing(message){
      console.log(message);
    }
  }
}
</script>

<style>
.list{
    height: 100%;
    width: 20rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed; 
    z-index: 10;
    top: 0; 
    right: 0;
    background: #f7f7f7;
    overflow-x: hidden; 
    padding-top: 30px;
}
</style>