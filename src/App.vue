<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  async mounted() {
    // Для глобального лоадера
    this.$store.commit("SET_AUTH_LOADING", true);

    // Запрашиваем токены при запуске приложения
    this.$store.dispatch("GET_TOKENS").then(
      () => {
        this.$store.commit("SET_AUTH_LOADING", false);
      },
      err => {
        this.$store.commit("SET_AUTH_LOADING", false);
        console.warn(err);
      }
    );
  }
};
</script>

<style lang="scss">
@import "@/styles/_variables.scss";
@import "@/styles/_classes.scss";

[v-cloak] {
  display: block;
  padding: 50px 0;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  &:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: #333;
    animation: spinner 0.6s linear infinite;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
  }

  & > div {
    display: none;
  }
}
.locales {
  display: flex;
  a {
    margin-right: 1rem;
    display: block;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
}

.side-bar__nav-list {
  &__nav-element {
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    padding-left: 0.8rem;
    display: flex;
    &__icon {
      height: 20px;
      width: 20px;
      margin-right: 0.8rem;
      svg {
        width: 100%;
        height: 100%;
      }
    }
    &__text {
      color: $white;
      text-decoration: none;
    }
  }
}

// .btn {
//   display: block;
//   font-weight: 400;
//   text-align: center;
//   white-space: nowrap;
//   vertical-align: middle;
//   border: 1px solid transparent;
//   padding: 0.375rem 0.75rem;
//   line-height: 1.5;
//   border-radius: 0.25rem;
//   transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
//     border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
//   cursor: pointer;
//   font-size: 1rem;
// }

// .btn-primary {
//   background: #572f81;
//   border: 1px solid #613490;
//   color: white;
// }

// .btn-secondary {
//   background: rgba(138, 110, 167, 0.2);
//   border: 1px solid #64507a;
//   color: #514163;
// }

// .btn-danger {
//   background: #472669;
//   border: 1px solid #472669;
//   color: white;
// }

// .btn-link {
//   background: white;
//   border: 0px solid #472669;
//   color: #613490;
//   text-decoration: underline;
// }

// .btn-block {
//   width: 100%;
// }

// .btn.disabled,
// .btn:disabled {
//   color: #e8d1ff;
//   background-color: #997aba;
//   cursor: auto !important;
// }

// .btn:hover {
//   filter: brightness(130%);
// }

// .btn.disabled:hover,
// .btn:disabled:hover {
//   filter: brightness(100%);
// }

// .form-control {
//   display: block;
//   width: 100%;
//   padding: 0.375rem 0.75rem;
//   line-height: 1.5;
//   color: #572f81;
//   background-color: #fff;
//   background-clip: padding-box;
//   border: 1px solid #aa87ce;
//   border-radius: 0.25rem;
//   transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
//   font-size: 1rem;
// }

// textarea.form-control {
//   font-size: 1rem;
//   height: 6rem;
// }

// .form-control::placeholder {
//   color: #997aba;
// }

// .form-control:focus {
//   outline: 0;
//   box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
// }

// .form-text {
//   display: block;
//   margin-top: 0.25rem;
//   color: #aa87ce;
// }

// .form-text.small {
//   font-size: 0.5rem;
// }

// .form-text {
//   font-size: 0.8rem;
// }

// .form-text.large {
//   font-size: 1.3rem;
// }


// .form-name {
//   color: #472669;
//   margin-bottom: 1rem;
// }

// .form-check {
//   position: relative;
//   display: block;
//   color: #aa87ce;
// }

// input[type="checkbox"] {
//   border-color: #aa87ce;
// }

// .form-control-file {
//   display: block;
//   width: 100%;
// }

// #modal {
//   position: fixed;
//   top: 20%;
//   right: 20%;
//   bottom: 0;
//   left: 20%;
//   z-index: 1050;
//   display: none;
//   overflow: hidden;
//   outline: 0;
//   width: 60%;
//   height: 60%;
//   background: white;
//   border-radius: 8px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
//   padding: 1%;
//   box-sizing: border-box;
// }

// .modal-title {
//   color: #613490;
//   font-weight: 900;
//   font-size: 1.5rem;
//   text-align: center;
// }

// #modal span {
//   position: absolute;
//   top: 1%;
//   right: 1%;
//   cursor: pointer;
//   font-size: 2rem;
//   color: #613490;
// }

// #dark-display {
//   display: none;
//   position: fixed;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background: rgba(0, 0, 0, 0.5);
//   overflow: hidden;
// }

// #mini-modal {
//   position: fixed;
//   right: 1%;
//   bottom: 1%;
//   z-index: 1050;
//   display: none;
//   overflow: hidden;
//   outline: 0;
//   width: 15%;
//   height: 25%;
//   background: white;
//   border-radius: 8px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
//   padding: 1%;
//   box-sizing: border-box;
// }

// #mini-modal span {
//   position: absolute;
//   top: 1%;
//   right: 2%;
//   cursor: pointer;
//   font-size: 2rem;
//   color: #613490;
// }

// .mini-modal-title {
//   color: #613490;
//   font-weight: 900;
//   font-size: 1rem;
//   text-align: center;
// }

// .modal-done {
//   background: rgba(13, 135, 88, 0.25);
//   text-align: center;
//   border-radius: 100%;
//   padding: 5%;
//   color: rgb(13, 135, 88);
//   font-size: 3rem;
//   margin-top: 1rem;
//   width: 5vw;
//   height: 5vw;
// }

// .modal-error {
//   background: rgba(244, 96, 94, 0.25);
//   text-align: center;
//   border-radius: 100%;
//   padding: 5%;
//   color: rgb(244, 96, 94);
//   font-size: 3rem;
//   margin-top: 1rem;
//   width: 5vw;
//   height: 5vw;
// }

// .mini-modal-body {
//   display: flex;
//   justify-content: center;
// }

// .small {
//   font-size: 0.7rem;
// }

// .large {
//   font-size: 1.5rem;
// }

// .palitre {
//   color: #8547c5;
// }
</style>
