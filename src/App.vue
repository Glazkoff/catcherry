<template>
  <div id="app">
    <div><top-bar></top-bar></div>
    <div class="locales">
      <a @click="setLocale('en')"><flag iso="us"></flag></a>
      <a @click="setLocale('ru')"><flag iso="ru"></flag></a>
    </div>
    <h1>{{ $t("welcomeMsg") }}</h1>
    <nav>
      <!-- FIXME: сделать id пользователя динамическим -->
      <router-link to="/user/1">Профиль</router-link>
    </nav>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
// import { UPDATE_TOKENS } from "@/graphql/queries.js";
export default {
  components: { TopBar },
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
    }
<<<<<<< HEAD
  },
=======
  }
>>>>>>> dev
  // async beforeMount() {
  //   const fp = await this.$fingerprint.load();
  //   const result = await fp.get();
  //   const visitorId = result.visitorId;
  //   this.fingerprint = visitorId;
  //   this.$apollo
  //     .mutate({
  //       mutation: UPDATE_TOKENS,
  //       variables: {
  //         fingerprint: this.fingerprint
  //       }
  //     })
  //     .then(resp => {
  //       console.log("UPD", resp);
  //       // Если сервер не вернул токен
  //       if (
  //         !resp.data.updateTokens ||
  //         resp.data.updateTokens.accessToken === null ||
  //         resp.data.updateTokens.error
  //       ) {
  //         if (this.$route.path !== "/auth") {
  //           this.$router.push("/auth");
  //         }
  //       } else {
  //         this.$store.commit(
  //           "SET_ACCESS_TOKEN",
  //           resp.data.updateTokens.accessToken
  //         );
  //       }
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }
};
</script>

<style lang="scss">
h1 {
  color: purple;
}
h1,
h4,
p {
  font-family: sans-serif;
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
.btn {
  display: block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background: #572f81;
  border: 1px solid #613490;
  color: white;
}

.btn-secondary {
  background: rgba(138, 110, 167, 0.2);
  border: 1px solid #64507a;
  color: #514163;
}

.btn-danger {
  background: #472669;
  border: 1px solid #472669;
  color: white;
}

.btn-link {
  background: white;
  border: 0px solid #472669;
  color: #613490;
  text-decoration: underline;
}

.btn-block {
  width: 100%;
}

.btn.disabled,
.btn:disabled {
  color: #e8d1ff;
  background-color: #997aba;
  cursor: auto !important;
}

.btn:hover {
  filter: brightness(130%);
}

.btn.disabled:hover,
.btn:disabled:hover {
  filter: brightness(100%);
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  color: #572f81;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #aa87ce;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-size: 1rem;
}

textarea.form-control {
  font-size: 1rem;
  height: 6rem;
}

.form-control::placeholder {
  color: #997aba;
}

.form-control:focus {
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.form-text {
  display: block;
  margin-top: 0.25rem;
  color: #aa87ce;
}

.form-text.small {
  font-size: 0.5rem;
}

.form-text {
  font-size: 0.8rem;
}

.form-text.large {
  font-size: 1.3rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-name {
  color: #472669;
  margin-bottom: 1rem;
}

.form-check {
  position: relative;
  display: block;
  color: #aa87ce;
}

input[type="checkbox"] {
  border-color: #aa87ce;
}

.form-control-file {
  display: block;
  width: 100%;
}

#modal {
  position: fixed;
  top: 20%;
  right: 20%;
  bottom: 0;
  left: 20%;
  z-index: 1050;
  display: none;
  overflow: hidden;
  outline: 0;
  width: 60%;
  height: 60%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 1%;
  box-sizing: border-box;
}

.modal-title {
  color: #613490;
  font-weight: 900;
  font-size: 1.5rem;
  text-align: center;
}

#modal span {
  position: absolute;
  top: 1%;
  right: 1%;
  cursor: pointer;
  font-size: 2rem;
  color: #613490;
}

#dark-display {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

#mini-modal {
  position: fixed;
  right: 1%;
  bottom: 1%;
  z-index: 1050;
  display: none;
  overflow: hidden;
  outline: 0;
  width: 15%;
  height: 25%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 1%;
  box-sizing: border-box;
}

#mini-modal span {
  position: absolute;
  top: 1%;
  right: 2%;
  cursor: pointer;
  font-size: 2rem;
  color: #613490;
}

.mini-modal-title {
  color: #613490;
  font-weight: 900;
  font-size: 1rem;
  text-align: center;
}

.modal-done {
  background: rgba(13, 135, 88, 0.25);
  text-align: center;
  border-radius: 100%;
  padding: 5%;
  color: rgb(13, 135, 88);
  font-size: 3rem;
  margin-top: 1rem;
  width: 5vw;
  height: 5vw;
}

.modal-error {
  background: rgba(244, 96, 94, 0.25);
  text-align: center;
  border-radius: 100%;
  padding: 5%;
  color: rgb(244, 96, 94);
  font-size: 3rem;
  margin-top: 1rem;
  width: 5vw;
  height: 5vw;
}

.mini-modal-body {
  display: flex;
  justify-content: center;
}

.small {
  font-size: 0.7rem;
}

.large {
  font-size: 1.5rem;
}

.palitre {
  color: #8547c5;
}
</style>
