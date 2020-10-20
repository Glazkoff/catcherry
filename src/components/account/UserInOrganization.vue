<template>
  <div class="search_organization account-view">
    <h1>Поиск организации</h1>
    <div class="tabs">
      <input
        type="radio"
        name="tab-btn"
        id="tab-btn-1"
        value=""
        @click="tabFirst = true"
        checked
      />
      <label for="tab-btn-1">По названию</label>
      <input
        type="radio"
        name="tab-btn"
        id="tab-btn-2"
        value=""
        @click="tabFirst = false"
      />
      <label for="tab-btn-2">По номеру</label>

      <div id="content-1">
        <h3>Введите название организации</h3>
        <form @submit.prevent="checkForm">
          <input
            type="text"
            placeholder="Название организации"
            v-model="search"
            class="form-control"
          /><br />
          <button class="btn btn-primary">Найти</button>
        </form>
      </div>
      <div id="content-2">
        <h3>Введите номер организации</h3>
        <form @submit.prevent="checkForm">
          <input
            type="number"
            placeholder="Номер организации"
            v-model="search"
            class="form-control"
          /><br />
          <button class="btn btn-primary">Найти</button>
        </form>
      </div>
    </div>
    <div class="result_organization">
      <h2>Список организаций</h2>
      <hr>
      <div v-if="tabFirst">
        <div v-for="(item, index) in searchOrgName" :key="index">
          <div class="result_card">
            <h4>Заявка на вступление в команду {{ item.name }}</h4>
            <span>Номер: {{ item.id }}</span
            ><br />
            <span>Владелец: {{ item.owner }}</span
            ><br />
            <button class="btn-link">Подробнее</button>
          </div>
        </div>
      </div>
      <div v-else style="color: gray;">
        <div v-for="(item, index) in searchOrgIndex" :key="index">
          <div class="result_card">
            <h4>Заявка на вступление в команду {{ item.name }}</h4>
            <span>Номер: {{ item.id }}</span
            ><br />
            <span>Владелец: {{ item.owner }}</span
            ><br />
            <button class="btn-link">Подробнее</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInOrganization",
  data() {
    return {
      search: "",
      tabFirst: true,
      organizations: [
        { id: "13223", name: "Лютики", owner: "Иванов" },
        { id: "24311", name: "Цветочки", owner: "Петров" },
        { id: "38909", name: "Ад", owner: "Сидоров" },
      ],
    };
  },
  computed: {
    searchOrgName() {
      let obj = this.organizations;
      let newArray = [];
      const search = this.search.toLowerCase();
      for (let key in obj) {
        let el = obj[key];
        if (el.name.toLowerCase().indexOf(search) != -1) newArray.push(el);
      }
      return newArray;
    },
    searchOrgIndex() {
      let obj = this.organizations;
      let newArray = [];
      const search = this.search;
      for (let key in obj) {
        let el = obj[key];
        if (el.id.toLowerCase().indexOf(search) != -1) newArray.push(el);
      }
      return newArray;
    },
  },
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  background-color: #fff;
}

.tabs {
  font-size: 0;
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
}

.tabs > input[type="radio"] {
  display: none;
}

.tabs > div {
  /* скрыть контент по умолчанию */
  display: none;
  border: 1px solid #e0e0e0;
  padding: 10px 15px;
  font-size: 16px;
}

/* отобразить контент, связанный с вабранной радиокнопкой (input type="radio") */
#tab-btn-1:checked ~ #content-1,
#tab-btn-2:checked ~ #content-2,
#tab-btn-3:checked ~ #content-3 {
  display: block;
}

.tabs > label {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  padding: 2px 8px;
  font-size: 16px;
  line-height: 1.5;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  cursor: pointer;
  position: relative;
  top: 1px;
}

.tabs > label:not(:first-of-type) {
  border-left: none;
}

.tabs > input[type="radio"]:checked + label {
  background-color: #fff;
  border-bottom: 1px solid #fff;
}
</style>
