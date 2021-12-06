<template>
  <div id="wrapperModalInfo">
    <div class="containerModal">
      <div id="headerContainer">
        <div name="headerTitle"><p>Detalles Usario</p></div>
        <button id="closeModal" @click="closeModal()">X</button>
      </div>
      <div name="contentModal">
        <span>
          <label for="">Permiso para ingresar</label>
          <div class="containerToogle">
            <button
              id="buttonSlide"
              v-bind:class="[
                permisoJugar ? 'buttonSlideFalse' : 'buttonSlideTrue',
              ]"
              @click="
                () => {
                  permisoJugar = !permisoJugar;
                }
              "
            ></button>
            <label style="align-self: flex-end">{{
              permisoJugar ? "Tiene Permiso" : "No tiene permiso"
            }}</label>
          </div>
        </span>
        <span
          ><label style="font-size: 1.5em; font-weight: bold"
            >Detalles del usuario</label
          ></span
        >
        <span>
          <label for="">Nombre de la institución</label>
          <p>{{ userData.institucion }}</p>
        </span>
        <span>
          <label for="">Nombre completo</label>
          <p>{{ userData.nombreCompleto }}</p>
        </span>
        <span>
          <label for="">Codigo de usuario</label>
          <p>{{ userData.codigo }}</p>
        </span>
        <span>
          <label for="">Fecha de Nacimiento:</label>
          <p>{{ fechaNacimiento }}</p>
        </span>
        <span>
          <label for="">Edad:</label>
          <p>{{ userData.edad }}</p>
        </span>
        <span>
          <label for="">Grado escolar:</label>
          <p>{{ userData.gradoEscolar }}</p>
        </span>
      </div>

      <div name="optionsModal">
        <button
          v-if="permisoJugar !== estadoPermisoActual"
          @click="guardarCambio"
        >
          Guardar
        </button>
        <button @click="closeModal">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { VUE_INFO_USER, VUE_CHANGE_PASS } from "../store";
import axios from "axios";
import moment from "moment";
import Vue from "vue";

export default {
  props: ["infoUser"],
  async created() {
    let url = process.env.VUE_APP_API_URL_DATAUSER + VUE_INFO_USER;
    let params = {
      id: this.infoUser.idUsuario,
    };
    this.stateLoading = true;

    await axios
      .get(url, {
        params: params,
        headers: { "x-access-token": localStorage.getItem("tokenAdmin") },
      })
      .then((response) => {
        this.userData = response.data[0];
        this.permisoJugar = this.userData.permiso == 1 ? true : false;
        this.estadoPermisoActual = this.userData.permiso == 1 ? true : false;
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => {});
  },
  data() {
    return {
      userData: null,
      permisoJugar: false,
      estadoPermisoActual: null,
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModalDetalles");
    },
    async guardarCambio() {
      let url = process.env.VUE_APP_API_URL_DATAUSER + VUE_CHANGE_PASS;
      let body = {
        id: this.infoUser.idUsuario,
        permiso: this.estadoPermisoGuardar,
      };
      await axios
        .put(url, body, {
          headers: { "x-access-token": localStorage.getItem("tokenAdmin") },
        })
        .then(() => {
          Vue.$confirm({
            message: "Se ha cambiado el permiso de ingreso al usuario",
            button: {
              yes: "Aceptar",
            },
            callback: () => {
              this.$emit("closeModalDetalles");
            },
          });
        })
        .catch((err) => {
          let status = err.response.status;
          let message = "";
          this.stateLoading = false;
          switch (status) {
            case 403:
              message = "Error al momento editar permiso de usuario";
              break;
            case 503:
              message = "Error en el servidor";
              break;
            default:
              message = "Hay un error en la creación";
              break;
          }
          Vue.$confirm({
            message: message,
            button: {
              yes: "Aceptar",
            },
            callback: () => {
              this.$emit("closeModalDetalles");
            },
          });
        });
    },
  },
  computed: {
    fechaNacimiento: function () {
      return moment(this.userData.fechaNacimiento).format("DD-MM-YYYY");
    },
    estadoPermisoGuardar: function () {
      return this.permisoJugar ? 1 : 0;
    },
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 15px; /* width of the entire scrollbar */
}

::-webkit-scrollbar-track {
  background: var(--clr-primary-color-700); /* color of the tracking area */
}

::-webkit-scrollbar-thumb {
  background-color: var(--clr-secondary-white); /* color of the scroll thumb */
  /* roundness of the scroll thumb */
  border: 3px solid var(--clr-primary-color-700); /* creates padding around scroll thumb */
}
#wrapperModalInfo {
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  position: absolute;

  height: 100%;
  inset: 0;
  display: grid;
  place-items: center;

  .containerModal {
    background-color: var(--clr-primary-color-200);

    width: 30vw;
    max-height: 600px;
    height: auto;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    #headerContainer {
      color: white;
      background-color: var(--clr-primary-color-700);
      padding: 1em 0em;
      display: flex;
      flex-direction: row;
      justify-content: end;

      & > [name="headerTitle"] {
        flex: 1;
        font-size: 1.2em;
      }
      #closeModal {
        color: white;
        margin-right: 1em;
        background-color: var(--clr-primary-color-700);
        border: none;
        font-size: 1.2em;
        cursor: pointer;
      }
    }
    & > [name="contentModal"] {
      padding: 1.5em 1.2em;
      color: white;
      max-height: 300px;
      display: flex;
      flex-direction: column;
      height: auto;
      overflow-y: auto;
      span {
        display: flex;
        flex-direction: column;
        text-align: start;
        padding: 0.5em 0em;
        label {
          margin-bottom: 0.5em;
          font-size: 1.2em;
          margin-left: 0.3em;
          font-weight: bold;
        }
        p {
          margin-bottom: 0.5em;
          font-size: 1.2em;
          margin-left: 0.3em;
        }
        input[type="checkbox"] {
          width: 12px;
          margin-left: 10px;
        }

        div.containerToogle {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
          -ms-flex-direction: row;
          flex-direction: row;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: start;
          -ms-flex-pack: start;
          justify-content: start;
          gap: 0.1em;

          #buttonSlide {
            --width-toogle: 5vw;
            --space-ofsset-circle: 0.5em;
            --scale-slide: 0.7;
            position: relative;
            width: var(--width-toogle);
            height: 2em;
            padding: 1.4em 0em;
            background-color: var(--colorSelector);
            border: none;
            outline: none;
            -webkit-transform: scale(var(--scale-slide));
            transform: scale(var(--scale-slide));
            border-radius: 50px;
            -moz-border-radius: 50;
            -webkit-border-radius: 50px;
            background-color: var(--clr-secondary-redState);
            &::after {
              display: block;
              position: absolute;
              outline: none;
              inset: 0%;
              margin: auto 0;
              content: "";
              width: 2em;
              height: 2em;
              border-radius: 50%;
              -moz-border-radius: 50%;
              -webkit-border-radius: 50%;
              background-color: #fff;
            }
            &.buttonSlideTrue::after {
              -webkit-transition: -webkit-transform 0.15s ease-in-out;
              transition: -webkit-transform 0.15s ease-in-out;
              transition: transform 0.15s ease-in-out;
              transition: transform 0.15s ease-in-out,
                -webkit-transform 0.15s ease-in-out;
              -webkit-transform: translateX(var(--space-ofsset-circle));
              transform: translateX(var(--space-ofsset-circle));
            }
            &.buttonSlideFalse {
              background-color: var(--clr-secondary-greenState);
              -webkit-transition: left 0.15s ease-in-out;
              transition: left 0.15s ease-in-out;
              &::after {
                -webkit-transition: -webkit-transform 0.15s ease-in-out;
                transition: -webkit-transform 0.15s ease-in-out;
                transition: transform 0.15s ease-in-out;
                transition: transform 0.15s ease-in-out,
                  -webkit-transform 0.15s ease-in-out;
                -webkit-transform: translateX(
                  calc(var(--width-toogle) - 100% - var(--space-ofsset-circle))
                );
                transform: translateX(
                  calc(var(--width-toogle) - 100% - var(--space-ofsset-circle))
                );
              }
            }
          }
        }
      }
    }
    & > [name="optionsModal"] {
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding-bottom: 1.5em;
      padding-top: 0.7em;
      gap: 2em;
      button {
        padding: 0.8em;
        border-radius: 1em/50%;
        border: none;
        color: var(--clr-secondary-white);
        background-color: var(--clr-primary-color-800);
        box-shadow: 0px 3px 1px 0px var(--clr-primary-color-700);
        font-size: clamp(0.7em, 1.5vw, 1.2em);
        cursor: pointer;
        transition: 0.15s ease-in background-color;

        &:active {
          transition: 0.15s ease-out background-color;
          background-color: var(--clr-primary-color-700);
        }
      }
    }
  }
}
</style>