<template>
  <div id="wrapperLogin">
    <div class="containerLogin">
      <span class="logo"><logo-image /></span>
      <label style="font-weight: bold">Acceso Administrador</label>
      <form class="loginForm" action="">
        <p for="textUser">Usuario</p>
        <input id="textUser" type="text" v-model="user" />
        <p for="textUser">Contraseña</p>
        <input id="textUser" type="password" v-model="password" />
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
  </div>
</template>

<script>
import logoImage from "../components/svg/logoImage.vue";
import { VUE_APP_LOGIN_ADMIN, timeRefreshToken } from "../store";
import axios from "axios";

export default {
  data() {
    return {
      user: "",
      password: "",

      errorForm: [],
    };
  },

  async created() {
    let eventListenerKey = window.addEventListener("keypress", (e) => {
      if (e.key == "Enter") {
        document.getElementById("buttonA").click();
        e.preventDefault();
      }
    });
    return () => window.removeEventListener(eventListenerKey);
  },

  methods: {
    async login() {
      this.errorForm = [];
      if (this.checkForms()) {
        let url = process.env.VUE_APP_API_URL + VUE_APP_LOGIN_ADMIN;

        let body = {
          username: this.user,
          password: this.password,
        };
        await axios
          .post(url, body)
          .then((response) => {
            localStorage.tokenAdmin = response.data.accessToken;
            localStorage.refreshtokenAdmin = response.data.refreshToken;
            this.$router.push({
              path: "/dashboard",
            });

            sessionStorage.timeExpire = timeRefreshToken;
          })
          .catch((error) => {
            switch (error.response.status) {
              case 403:
                this.errorForm.push("Credenciales incorrectas");

                break;

              case 503:
                this.errorForm.push("Error en el servidor");
                break;
            }
          });
      }
    },
    checkForms() {
      let formsCorrect = true;
      if (this.user.length == 0) {
        formsCorrect = false;
        this.errorForm.push("El campo usuario esta vacio");
      }
      if (this.password.length == 0) {
        formsCorrect = false;
        this.errorForm.push("El campo de contraseña esta vacio");
      }
      return formsCorrect;
    },
  },
  components: {
    "logo-image": logoImage,
  },
};
</script>

<style lang="scss" scoped>
#wrapperLogin {
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
      padding: 0em 0.2em;
      height: 14em;
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
}
</style>