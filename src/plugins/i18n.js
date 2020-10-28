import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: "ru",
  fallbackLocale: "en",
  messages: {
    en: {
      welcomeMsg: "Hello, PolyWeb!",
      startMsg: "The start of the {title} project",
      projectTitle: "FISHKA",
      editUser: "Edit user",
      listUser: "A list of users",
      listOrganization: "A list of organization",
      profileUser: "Profile",
      systemStatistics: "System statistics",
      surname: "Surname",
      name: "Name",
      patricity: "Patricity",
      gender: "Gender",
      birthday: "Birthday",
      login: "Login",
      password: "Password",
      save: "Save",
      cancel: "Cancel",
      close: "Close",
      edit: "Edit",
      delete: "Delete",
      deleteQuestion: "Are you sure you want to delete user",
      placeholderSearchByUsers: "Search by users"
    },
    ru: {
      welcomeMsg: "Привет, Поливеб!",
      startMsg: "Старт проекта {title}",
      projectTitle: "ФИШКА",
      editUser: "Редактировать пользователя",
      listUser: "Список пользователей",
      profileUser: "Профиль",
      listOrganization: "Список организаций",
      systemStatistics: "Статистика системы",
      surname: "Фамилия",
      name: "Имя",
      patricity: "Отчество",
      gender: "Пол",
      birthday: "Дата рождения",
      login: "Логин",
      password: "Пароль",
      save: "Сохранить",
      cancel: "Отменить",
      close: "Закрыть",
      edit: "Редактировать",
      delete: "Удалить",
      deleteQuestion: "Вы действительно хотите удалить пользователя",
      placeholderSearchByUsers: "Поиск по пользователям"
    }
  }
});
