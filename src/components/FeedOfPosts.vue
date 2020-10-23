<template>
  <div class="flexbox">
      <one-post-list @like="onLike" @comment="onComment" @share="onShare" v-for="post in posts" :key="post.id" :post="post"></one-post-list>
  </div>
</template>

<script>
import OnePostList from "../components/OnePostList.vue";
export default {
  name: "FeedOfPosts",
  components: {
        OnePostList
    },
  data() {
    return {
     posts: [
         {
             id: 1,
             header: "Новая срочная новость из отдела техподдержки",
             date: "29.09.2020 17:00",
             body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae suscipit voluptate nemo. Perferendis, impedit! Quaerat nemo nulla soluta sunt accusamus in quae sed. Nam perferendis ratione totam autem minus quibusdam?"
         },
         {
             id: 2,
             header: "Очень важная информация!",
             date: "23.10.2020 17:00",
             body: "Одним из последствий коронавирусной инфекции наряду с нарушением обоняния, кашлем и утомляемостью может быть и выпадение волос. К такому выводу пришли сотрудники японского Национального центра глобального здравоохранения и медицины."
         },
         {
             id: 3,
             header: "Депутат Госдумы предложил способ заставить всех граждан носить маски",
             date: "23.10.2020 17:00",
             body: "«Что касается антисептиков, то должна быть постоянная социальная реклама с призывом чаще мыть руки и пользоваться индивидуальными средствами защиты», — добавил Нилов. Он обратил внимание на то, что в группе риска находятся пожилые люди, поэтому нужно усилить социальную рекламу."
         }
     ]
     };
  },
  methods: {
    onLike(object) {
      console.log("Нажата кнопка лайка для поста с id " + object.id);
    },
    onComment(object) {
      console.log("Нажата кнопка комментария для поста с id " + object.id);
    },
    onShare(object) {
      console.log("Нажата кнопка репоста для поста с id " + object.id);
    },
  },
};
</script>

<style >
.flexbox{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
