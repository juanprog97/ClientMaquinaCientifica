<template>
  <div id="wrapperDashUser">
    <nav>
      <button type="buttonStyle" @click="logout">
        <svg
          width="34"
          height="36"
          viewBox="0 0 34 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.1797 25.7344H7.51387C7.67325 25.7344 7.82266 25.8082 7.92227 25.9383C8.15469 26.2371 8.40372 26.5254 8.66602 26.7996C9.74844 27.9422 11.0068 28.8422 12.408 29.468C13.8557 30.1148 15.3963 30.4453 16.9867 30.4453C18.5771 30.4453 20.1178 30.1148 21.5654 29.468C22.9666 28.8422 24.225 27.9422 25.3074 26.7996C26.3898 25.657 27.2365 24.3246 27.8309 22.8445C28.4451 21.3117 28.7539 19.684 28.7539 18C28.7539 16.316 28.4418 14.6883 27.8309 13.1555C27.2398 11.6754 26.3898 10.343 25.3074 9.20039C24.225 8.05781 22.9666 7.15781 21.5654 6.53202C20.1178 5.88515 18.5771 5.55468 16.9867 5.55468C15.3963 5.55468 13.8557 5.88163 12.408 6.53202C11.0068 7.15781 9.74844 8.05781 8.66602 9.20039C8.40372 9.47812 8.15801 9.7664 7.92227 10.0617C7.82266 10.1918 7.66993 10.2656 7.51387 10.2656H5.1797C4.97052 10.2656 4.84102 10.0195 4.95724 9.8332C7.50391 5.64257 11.9598 2.86874 17.0232 2.8828C24.9787 2.9039 31.357 9.74179 31.2773 18.1547C31.1977 26.434 24.8293 33.1172 16.9867 33.1172C11.9365 33.1172 7.50059 30.3469 4.95724 26.1668C4.84435 25.9805 4.97052 25.7344 5.1797 25.7344Z"
            fill="white"
          />
          <path
            d="M2.22793 17.7785L6.93945 13.841C7.11543 13.6934 7.37109 13.827 7.37109 14.0625V16.7344H17.7969C17.943 16.7344 18.0625 16.8609 18.0625 17.0156V18.9844C18.0625 19.1391 17.943 19.2656 17.7969 19.2656H7.37109V21.9375C7.37109 22.173 7.11211 22.3066 6.93945 22.159L2.22793 18.2215C2.0918 18.109 2.0918 17.891 2.22793 17.7785Z"
            fill="white"
          />
        </svg>
      </button>
    </nav>
    <template v-if="skipVid == false">
      <div class="cointainerVideo">
        <label for="">Video tutorial </label>
        <video
          width="1024"
          height="520"
          id="videoTutorial"
          controls
          autoplay
          loop="true"
        >
          <source v-bind:src="srcVideo" />
          Your browser does not support the video tag.
        </video>
        <button type="buttonStyle" @click="skipVideoFunction">
          Saltar Video
        </button>
      </div>
    </template>
    <UnityGame v-if="skipVid" />
  </div>
</template>

<script>
import {
  VUE_APP_API_REFRESH_USER,
  timeRefreshToken,
  VUE_APP_LOGOUT_USER,
} from "../store";
import UnityGame from "../components/UnityGame.vue";
import axios from "axios";

export default {
  data() {
    return {
      srcVideo: "./TutorialVideoGame.mp4",
      skipVid: sessionStorage.getItem("skipTutorial") === "true" ? true : false,
    };
  },
  async created() {
    this.intervalTimer = setInterval(() => timer(), 1000);

    async function renovateToken() {
      let url = process.env.VUE_APP_API_URL + VUE_APP_API_REFRESH_USER;
      let body = {
        token: localStorage.getItem("tokenRefreshUser"),
        idUser: localStorage.idUser,
      };
      await axios
        .post(url, body)
        .then((response) => {
          localStorage.tokenUser = response.data.accessToken;
        })
        .catch((err) => {
          switch (err.response.status) {
            case 503:
              console.log("error servidor");
              break;
            case 403:
              console.log("token Invalido");
              break;
          }
        });
    }

    async function timer() {
      if (sessionStorage.timeExpireUser) {
        let time = sessionStorage.getItem("timeExpireUser");
        if (time == 1) {
          sessionStorage.setItem("timeExpireUser", timeRefreshToken);
          renovateToken();
        } else {
          time = time - 1;
          sessionStorage.setItem("timeExpireUser", time);
        }
      } else {
        renovateToken();
        sessionStorage.setItem("timeExpireUser", timeRefreshToken);
      }

      return () => clearInterval(this.intervalTimer);
    }
  },

  methods: {
    async logout() {
      let url = process.env.VUE_APP_API_URL + VUE_APP_LOGOUT_USER;

      await axios
        .delete(url, {
          params: { idUsuario: localStorage.getItem("idUser") },
          headers: { "x-access-token": localStorage.tokenUser },
        })
        .then(() => {
          localStorage.removeItem("tokenUser");
          localStorage.removeItem("tokenRefreshUser");
          sessionStorage.removeItem("timeExpireUser");
          sessionStorage.removeItem("skipTutorial");
          clearInterval(this.intervalTimer);
          this.$router.push({
            path: "/",
          });
        })
        .catch((error) => {
          console.log(error.response.data);
          switch (error.response.status) {
            case 503:
              this.noteError = "Error en el servidor";
              break;
          }
        });
    },
    skipVideoFunction() {
      sessionStorage.setItem("skipTutorial", true);
      this.skipVid = sessionStorage.skipTutorial === "true" ? true : false;
    },
  },
  components: {
    UnityGame,
  },
};
</script>

<style lang="scss" scoped>
button[type="buttonStyle"] {
  background-color: var(--clr-primary-color-800);
  outline: none;
  border: none;
  border-radius: 1em/50%;
  width: fit-content;
  color: var(--clr-secondary-white);
  font-size: 1.2em;
  cursor: pointer;
  padding: 0.8em;
  box-shadow: 0px 4px 0px 1px var(--clr-primary-color-700);
  transition: 0.15s ease-in background-color;
  cursor: pointer;
  &:active {
    transition: 0.15s ease-out background-color;
    background-color: var(--clr-primary-color-700);
  }
}
#wrapperDashUser {
  nav {
    display: flex;

    padding: 1em;
    justify-content: flex-start;
  }
  .cointainerVideo {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    & > * {
      padding: 1em 0em;
    }
    label {
      font-size: 1.5em;
      color: white;
      background-color: var(--clr-primary-color-700);
      padding: 1em;
      border-radius: 1em;
    }
    button {
      padding: 1em;
    }
  }
}
</style>