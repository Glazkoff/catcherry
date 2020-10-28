import store from "../store/index";

// Для перехода к компоненту
export const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
  } else {
    next("/");
  }
};

// Для перехода в защищённые компоненты
export const ifAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next("auth");
  } else {
    next();
  }
};

// // Для перехода в компоненты администратора
// const ifAdmin = (to, from, next) => {
//   if (!store.getters.isAuthenticated) {
//     console.log(`Пользователь неавторизован. Закрыт роут "${to.path}"`);
//     next("login");
//   } else {
//     let token = store.state.token;
//     let data = JWT.read(token);
//     if (data.claim.role === "admin") {
//       next();
//     } else {
//       next("/");
//     }
//   }
// };

// // Для перехода в компоненты администратора или специалиста IT-отдела
// const ifAdminOrEmployee = (to, from, next) => {
//   if (!store.getters.isAuthenticated) {
//     console.log(`Пользователь неавторизован. Закрыт роут "${to.path}"`);
//     next("login");
//   } else {
//     let token = store.state.token;
//     let data = JWT.read(token);
//     if (data.claim.role === "admin" || data.claim.role === "employee") {
//       next();
//     } else {
//       next("/");
//     }
//   }
// };
