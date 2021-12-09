<template>
  <div id="wrapperLoginUser">
    <modal-info v-if="modalInfo" @closeModalInfo="changeModal"></modal-info>
    <div class="containerLogin">
      <span class="logo"><logo-image /></span>

      <form class="loginForm" action="">
        <p for="textUser">Usuario</p>
        <input id="textUser" type="text" v-model="user" />

        <p
          style="color: #800000; font-size: 0.8em"
          v-for="(error, index) in errorForm"
          v-bind:key="index"
        >
          {{ error }}
        </p>
      </form>

      <button id="buttonA" @click="login">Entrar</button>
    </div>
    <button class="infoButton" @click="changeModal">
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 4.6871C16.03 4.6871 4.687 16.0301 4.687 30.0001C4.6871 43.9701 16.03 55.3131 30 55.3131C43.97 55.3131 55.313 43.9701 55.313 30.0001C55.313 16.0301 43.97 4.6871 30 4.6871Z"
          stroke="#3C5878"
          stroke-width="8.125"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M30 4.6871C16.03 4.6871 4.687 16.0301 4.687 30.0001C4.6871 43.9701 16.03 55.3131 30 55.3131C43.97 55.3131 55.313 43.9701 55.313 30.0001C55.313 16.0301 43.97 4.6871 30 4.6871Z"
          fill="#3C5878"
          stroke="#93C4FB"
          stroke-width="3.125"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M30.014 10.198C31.242 10.198 32.269 10.63 33.139 11.5C34.009 12.37 34.441 13.41 34.441 14.653C34.441 15.943 34.009 17.039 33.139 17.893C32.269 18.748 31.242 19.166 30.014 19.166C28.803 19.166 27.76 18.734 26.89 17.864C26.02 16.994 25.559 15.912 25.559 14.653C25.559 13.441 26.02 12.415 26.89 11.529C27.76 10.643 28.803 10.198 30.014 10.198V10.198ZM30.014 23.592C31.118 23.592 31.992 23.975 32.676 24.72C33.375 25.451 33.717 26.366 33.717 27.469V45.896C33.717 47 33.375 47.912 32.676 48.674C31.992 49.419 31.118 49.802 30.014 49.802C28.927 49.802 28.023 49.419 27.324 48.674C26.64 47.912 26.283 47 26.283 45.896V27.469C26.283 26.366 26.64 25.451 27.324 24.72C28.023 23.975 28.927 23.592 30.014 23.592V23.592Z"
          fill="#93C4FB"
          stroke="#93C4FB"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import logoImage from "../components/svg/logoImage.vue";
import ModalInfo from "../components/ModalInfo.vue";
import { VUE_APP_LOGIN_USER, timeRefreshToken } from "../store";
import axios from "axios";

export default {
  data() {
    return {
      modalInfo: false,
      errorForm: [],
      user: "",
    };
  },
  methods: {
    changeModal() {
      this.modalInfo = !this.modalInfo;
    },

    checkForm() {
      let checkForm = true;

      if (this.user.length == 0) {
        checkForm = false;
        this.errorForm.push("El campo es obligatorio");
      }
      return checkForm;
    },
    async login() {
      this.errorForm = [];
      if (this.checkForm()) {
        let url = process.env.VUE_APP_API_URL + VUE_APP_LOGIN_USER;

        let body = {
          codigo: this.user,
        };
        await axios
          .post(url, body)
          .then((response) => {
            localStorage.tokenUser = response.data.accessToken;
            localStorage.tokenRefreshUser = response.data.refreshToken;
            localStorage.user = JSON.stringify({
              idUser: response.data.idUser,
              session: response.data.sesion,
            });

            this.$router.push({ path: "/usergame" });
            sessionStorage.timeExpireUser = timeRefreshToken;
            sessionStorage.skipTutorial = false;
          })
          .catch((error) => {
            switch (error.response.status) {
              case 403:
                this.errorForm.push(error.response.data.message);
                break;
              case 503:
                this.errorForm.push("Error en el servidor");
                break;
            }
          });
      }
    },
  },
  components: {
    "logo-image": logoImage,
    "modal-info": ModalInfo,
  },
};
</script>

<style lang="scss" scoped>
#wrapperLoginUser {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100vh;
  background-color: var(--clr-primary-color-400);
  .containerLogin {
    display: grid;
    place-items: center;
    background-color: var(--clr-primary-color-500);
    padding: 5em;
    border-radius: 1em;
    box-shadow: 0px 1px 3px 1px var(--clr-primary-color-700, 0.2);

    .logo {
      position: relative;
      top: -80px;
    }

    .loginForm {
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: var(--clr-primary-color-600);
      padding: 0.5em 0.2em;
      height: auto;
      border-radius: 1.2em;
      justify-self: center;
      width: 17em;
      border: 3px solid var(--clr-primary-color-700);
      p:first-child {
        padding-top: 0.4em;
      }
      &:last-child {
        padding-bottom: 0.2em;
      }
      & > input {
        margin: 0.5em;
      }
      p {
        color: var(--clr-secondary-white);
        font-size: 1.3em;

        text-align: center;
      }
      input {
        align-self: center;
        flex-basis: 30px;
        width: 50%;
        min-width: 100px;
        border-radius: 0.5em;
        border: none;
        outline: none;
        padding: 0em 0.5em;
        font-size: 1.2em;
      }
    }
    #buttonA {
      align-self: center;
      margin-top: 1em;
      width: 100px;
      background-color: var(--clr-primary-color-600);
      border: none;
      padding: 0.5em;
      border-radius: 1em;
      color: var(--clr-secondary-white);
      font-size: 1.2em;
      cursor: pointer;
      transition: 0.12s ease-in background-color;
      box-shadow: 0px 5px 1px 0px var(--clr-primary-color-700);
      &:active {
        transition: 0.12s ease-out background-color;
        background-color: var(--clr-primary-color-700);
      }
    }
  }
  .infoButton {
    width: auto;
    background-color: transparent;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    justify-self: end;
    margin-right: 4em;
  }
}
</style>