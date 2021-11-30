<template>
  <div id="wrapperDashboard">
    <loader
      v-if="stateLoading"
      object="#5286ff"
      color1="#ffffff"
      color2="#17fd3d"
      size="12"
      speed="2.1"
      bg="#586b7e"
      objectbg="#436ed0"
      opacity="80"
      disableScrolling="true"
      name="spinning"
    ></loader>
    <modal-component
      @closeModalRegistrar="modalOptionRegister"
      v-if="modalRegister"
    ></modal-component>
    <modal-detalles
      v-if="modalDetalles"
      @closeModalDetalles="modalOptionDetalles"
      v-bind:infoUser="userSelected"
    ></modal-detalles>
    <nav class="options">
      <button type="option-admin" @click="logout" id="logout">
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

      <button type="option-admin" id="donwloadInfo">Descargar info</button>
      <div class="searchUserSection">
        <input id="inputUser" type="text" />
        <button id="searchUser">
          <svg
            width="47"
            height="48"
            viewBox="0 0 47 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="22.9218"
              y="18"
              width="10"
              height="32.4163"
              rx="5"
              transform="rotate(45 22.9218 18)"
              fill="#7496BB"
            />
            <circle
              cx="29"
              cy="18"
              r="15.5"
              fill="#93C4FB"
              stroke="#7496BB"
              stroke-width="5"
            />
          </svg>
        </button>
      </div>
      <button
        type="option-admin"
        id="crearUsuarioButton"
        @click="modalOptionRegister"
      >
        Crear usuario
      </button>
    </nav>
    <div class="containerTable">
      <table class="headerTable" cellspacing="0" cellpadding="">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Sesion Actual</th>
            <th colspan="2">Codigo</th>
          </tr>
        </thead>
      </table>
      <div class="containerData">
        <table class="tableUser" cellspacing="0" cellpadding="0">
          <tbody>
            <tr v-for="(data, index) in dataUser" v-bind:key="index">
              <td>
                {{ data.codigo }}
              </td>
              <td>
                {{ "Sesion" + data.estadoSesion }}
              </td>
              <td>
                <button
                  type="buttonControl"
                  id="edit"
                  @click="selectedUser(index)"
                >
                  <svg
                    fill="#ffff"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24px"
                    height="24px"
                  >
                    <path
                      d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z"
                    />
                  </svg>
                </button>
              </td>
              <td>
                <button type="buttonControl">
                  <svg
                    fill="#ffff"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="30px"
                    height="30px"
                  >
                    <path
                      d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ModalRegistro from "../components/ModalRegistro.vue";
import ModalDetalles from "../components/ModalInfoUser.vue";
import { loader } from "vue-ui-preloader";
import {
  headersadmin,
  VUE_APP_LOGOUT_ADMIN,
  VUE_APP_API_REFRESH,
  VUE_APP_LIST_USER,
  timeRefreshToken,
} from "../store";
import axios from "axios";
export default {
  data() {
    return {
      modalRegister: false,
      modalDetalles: false,
      dataUser: [],
      userSelected: null,
      intervalTimer: null,
      stateLoading: false,
    };
  },
  async created() {
    this.intervalTimer = setInterval(() => timer(), 1000);

    async function timer() {
      let time = sessionStorage.getItem("timeExpire");
      if (time == 1) {
        sessionStorage.setItem("timeExpire", timeRefreshToken);
        let url = process.env.VUE_APP_API_URL + VUE_APP_API_REFRESH;
        let body = {
          token: localStorage.getItem("refreshtokenAdmin"),
        };
        await axios
          .post(url, body)
          .then((response) => {
            localStorage.tokenAdmin = response.data.accessToken;
          })
          .catch((err) => {
            switch (err.response.status) {
              case 503:
                console.log("error servidor");
                break;
              case 403:
                console.log("token Invalido");
            }
          });
      } else {
        time = time - 1;
        sessionStorage.setItem("timeExpire", time);
      }
    }
    let url = process.env.VUE_APP_API_URL_DATAUSER + VUE_APP_LIST_USER;
    this.stateLoading = true;
    await axios
      .get(url, { headers: { "x-access-token": localStorage.tokenAdmin } })
      .then((response) => {
        this.dataUser = response.data;
      })
      .catch((err) => {
        switch (err.response.status) {
          case 503:
            console.log("error SERVER");
            break;
          default:
            console.log("error interno");
            break;
        }
      })
      .finally(() => {
        this.stateLoading = false;
      });
  },
  methods: {
    async updateList() {
      let url = process.env.VUE_APP_API_URL_DATAUSER + VUE_APP_LIST_USER;
      this.stateLoading = true;
      await axios
        .get(url, { headers: headersadmin })
        .then((response) => {
          this.dataUser = response.data;
        })
        .catch((err) => {
          switch (err.response.status) {
            case 503:
              console.log("error SERVER");
              break;
            default:
              console.log("error interno");
              break;
          }
        })
        .finally(() => {
          this.stateLoading = false;
        });
    },

    modalOptionRegister() {
      this.modalRegister = !this.modalRegister;
      if (this.modalRegister == false) {
        this.updateList();
      }
    },
    modalOptionDetalles() {
      this.modalDetalles = !this.modalDetalles;
    },
    selectedUser(index) {
      this.userSelected = this.dataUser[index];
      this.modalOptionDetalles();
    },
    async logout() {
      let url = process.env.VUE_APP_API_URL + VUE_APP_LOGOUT_ADMIN;

      await axios
        .delete(url)
        .then(() => {
          localStorage.removeItem("tokenAdmin");
          localStorage.removeItem("refreshtokenAdmin");
          sessionStorage.removeItem("timeExpire");
          clearInterval(this.intervalTimer);
          this.$router.push({
            path: "/admin",
          });
        })
        .catch((error) => {
          console.log(error);
          switch (error.response.status) {
            case 503:
              this.noteError = "Error en el servidor";
              break;
          }
        });
    },
  },
  components: {
    "modal-component": ModalRegistro,
    "modal-detalles": ModalDetalles,
    loader,
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 15px; /* width of the entire scrollbar */
}

::-webkit-scrollbar-track {
  background: var(--clr-primary-color-500); /* color of the tracking area */
}

::-webkit-scrollbar-thumb {
  background-color: var(--clr-secondary-white); /* color of the scroll thumb */
  /* roundness of the scroll thumb */
  border: 3px solid var(--clr-primary-color-500); /* creates padding around scroll thumb */
}
#wrapperDashboard {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  background-color: var(--clr-primary-color-400);
  padding: 1em 0em;
  overflow-y: hidden;
  nav.options {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    gap: 2em;
    & > * {
      flex: 1;
    }
    button[type="option-admin"] {
      background-color: var(--clr-primary-color-800);
      outline: none;
      border: none;
      border-radius: 1em/50%;
      width: fit-content;
      color: var(--clr-secondary-white);
      font-size: 1.2em;
      cursor: pointer;
      box-shadow: 0px 4px 0px 1px var(--clr-primary-color-700);
      transition: 0.15s ease-in background-color;
      cursor: pointer;
      &:active {
        transition: 0.15s ease-out background-color;
        background-color: var(--clr-primary-color-700);
      }

      &#logout {
        flex: 0 0 70px;
      }
      &#donwloadInfo {
        flex: 0 0 auto;
        padding: 0.8em 1em;
      }
      &#crearUsuarioButton {
        flex: 0 0 auto;
        padding: 1em;
      }
    }
    .searchUserSection {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex: 0 0 200px;
      justify-content: center;
      gap: 0.8em;
      button#searchUser {
        background-color: transparent;
        border: none;
        outline: none;
        transform: scale(0.8);
        svg {
          cursor: pointer;
          rect {
            transition: 0.15s ease-out fill;
          }
          circle {
            transition: 0.15s ease-out stroke;
          }
          &:active {
            rect {
              transition: 0.15s ease-out fill;
              fill: var(--clr-secondary-grey);
            }
            circle {
              stroke: var(--clr-secondary-grey);
            }
          }
        }
      }
      input#inputUser {
        padding: 0.5em;
        border-radius: 0.5em;
        border: 3px solid var(--clr-primary-color-600);
        width: 50%;
        min-width: 400px;
        background-color: var(--clr-primary-color-500);
        outline: none;
        font-size: 1.2em;
        color: var(--clr-secondary-grey);
      }
    }
  }

  .containerTable {
    margin-top: 2em;
    width: 50%;
    min-width: 400px;
    align-self: center;
    background-color: var(--clr-primary-color-500);
    .headerTable {
      width: 100%;
      table-layout: fixed;
      tr:first-child {
        background-color: var(--clr-primary-color-700);
        color: var(--clr-secondary-white);
        table-layout: fixed;

        th {
          padding: 1em;
          &:first-child {
            border-radius: 0px 0px 0px 10px;
          }
          &:last-child {
            border-radius: 0px 0px 10px 0px;
          }
        }
      }
    }
  }
  .containerData {
    display: block;
    height: auto;
    max-height: 650px;
    min-height: 100px;
    overflow-y: auto;
    .tableUser {
      border: none;
      width: 100%;
      table-layout: fixed;

      tbody {
        color: var(--clr-secondary-white);

        tr {
          background-color: var(--clr-primary-color-600);
          cursor: pointer;
          &:hover {
            background-color: var(--clr-primary-color-800);
          }
          td {
            border: 15px solid var(--clr-primary-color-500);
            border-right: 0;
            border-left: 0;
            padding: 0.6em;
            button[type="buttonControl"] {
              transform: scale(1);
              cursor: pointer;
              background: var(--clr-primary-color-700);
              border-radius: 5px;
              border: none;
              padding: 0.2em;
              transition: 0.18s ease-in background-color;
              &:active {
                background-color: var(--clr-primary-color-800);
                transition: 0.18s ease-out background-color;
              }
              &#edit {
                transform: scale(1.2);
              }
              svg {
              }
            }
          }
        }
      }
    }
  }
}
</style>