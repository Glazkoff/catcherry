<template>
  <div>
    <div class="side-bar__logo">
      <h1>Logo</h1>
    </div>
    <div class="side-bar__nav-list">
      <div class="side-bar__nav-list__nav-element">
        <router-link to="/">Профиль</router-link>
      </div>
      <div class="side-bar__nav-list__nav-element">
        <router-link to="/">Организация</router-link>
      </div>
      <div class="side-bar__nav-list__nav-element">
        <router-link to="/">Лента новостей</router-link>
      </div>
      <div class="side-bar__nav-list__nav-element">
        <router-link to="/">Личная статистика</router-link>
      </div>
      <div class="side-bar__nav-list__nav-element">
        <router-link to="/">Баллы</router-link>
      </div>
      <div class="side-bar__nav-list__nav-element">
        <router-link to="/">Задания</router-link>
      </div>
    </div>
    <div class="side-bar__locales">
      <h5>{{ $t("welcomeMsg") }}</h5>
      <div class="locales">
        <a @click="setLocale('en')"><flag iso="us"></flag></a>
        <a @click="setLocale('ru')"><flag iso="ru"></flag></a>
      </div>
    </div>
    <div class="side-bar__nav-list__nav-element">
      <router-link to="/">Настройки</router-link>
    </div>
    <button>Выйти</button>
  </div>
</template>

<script>
export default {
  name: "SideBarDefault"
};
</script>

<style lang="scss" scoped></style>
