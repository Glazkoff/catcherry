<template>
  <div>
    <h1>Команда "Название"</h1>
    <div class="every">
      <NavBar class="navig" />
      <div class="partic">
        <h3>Редактирование</h3>
        <hr />
        <span>Последнее редактирование: </span>
        <form action="">
          <label for="name">Название</label>
          <input type="text" placeholder="Название" />
          <label for="description">Описание</label>
          <textarea
            name="description"
            id=""
            cols="10"
            rows="5"
            placeholder="Описание"
          ></textarea>
          <button type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/manager/NavBar";
export default {
  components: {
    NavBar
  }
};
</script>

<style lang="scss" scoped>
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
