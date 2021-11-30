<template>
  <div id="wrapperModalTemplate">
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
    <div class="containerModal">
      <div id="headerContainer">
        <div name="headerTitle"><p>Registar usuario</p></div>
        <button id="closeModal" @click="closeModal()">X</button>
      </div>

      <form name="contentModal">
        <span>
          <label for="">Nombre de la institución</label>
          <input
            type="text"
            v-model="val_institucion"
            placeholder="Institución,Colegio..."
          />
        </span>
        <span>
          <label for="">Nombre completo</label>
          <input
            type="text"
            v-model="val_nombreCompleto"
            placeholder="Nombre Completo.."
          />
        </span>
        <span>
          <label for="">Codigo de usuario</label>
          <input type="text" v-model="val_codigo" placeholder="CDO2..." />
        </span>
        <span>
          <label for="">Fecha de Nacimiento:</label>
          <input type="date" v-model="val_fechaNacimiento" />
        </span>

        <span>
          <label for="">Grado escolar:</label>
          <select name="" id="" v-model="val_gradoEscolar">
            <option value="" selected disabled>
              Seleccione el grado escolar
            </option>
            <option
              v-for="(option, index) in listGradoEscolares"
              v-bind:key="index"
              v-bind:value="index + 1"
            >
              {{ option }}
            </option>
          </select>
        </span>
      </form>
      <ul id="errorList">
        <li v-for="(error, index) in errorList" v-bind:key="index">
          {{ error }}
        </li>
      </ul>
      <div name="optionsModal">
        <button @click="registraUsuario($event)">Registrar</button>
        <button @click="closeModal">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { headersadmin, VUE_APP_ADD_USER, VUE_APP_TIME } from "../store";
import { loader } from "vue-ui-preloader";
import moment from "moment";
import Vue from "vue";

export default {
  async mounted() {
    let url = process.env.VUE_APP_API_URL_DATAUSER + VUE_APP_TIME;
    await axios
      .get(url)
      .then((response) => {
        this.dateCurrent = response.data.fecha;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      stateLoading: false,
      val_institucion: "",
      val_nombreCompleto: "",
      val_codigo: "",
      val_fechaNacimiento: "",
      val_gradoEscolar: "",
      listGradoEscolares: [
        "Primaria - 1°",
        "Primaria - 2°",
        "Primaria - 3°",
        "Primaria - 4°",
        "Primaria - 5°",
        "Secundaria - 6°",
        "Secundaria - 7°",
        "Secundaria - 8°",
        "Secundaria - 9°",
        "Secundaria - 10°",
        "Secundaria - 11°",
        "Secundaria - 12°",
      ],
      errorList: [],
      dateCurrent: null,
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModalRegistrar");
    },
    async registraUsuario(event) {
      if (this.checkForm()) {
        let url = process.env.VUE_APP_API_URL_DATAUSER + VUE_APP_ADD_USER;
        let body = {
          NombreCompleto: this.val_nombreCompleto,
          codigo: this.val_codigo,
          fechaNacimiento: new Date(this.val_fechaNacimiento),
          edad: this.edadVal,
          gradoEscolar: this.val_gradoEscolar,
          estadoSesion: 1,
          permiso: 0,
          termino: 0,
        };
        this.stateLoading = true;
        await axios
          .post(url, body, { headers: headersadmin })
          .then(() => {
            this.stateLoading = false;
            Vue.$confirm({
              message: "Se ha creado el usuario correctamente",
              button: {
                yes: "Aceptar",
              },
              callback: () => {
                this.$emit("registroUsuario");
              },
            });
          })
          .catch((err) => {
            let status = err.response.status;
            let message = "";
            switch (status) {
              case 403:
                message = "Error al momento de crear el usuario";
                break;
              default:
                message = "Hay un error en la creación";
            }
            Vue.$confirm({
              message: message,
              button: {
                yes: "Aceptar",
              },
            });
          });
      } else {
        event.preventDefault();
      }
    },
    checkForm() {
      this.errorList = [];
      if (this.val_institucion.length === 0) {
        this.errorList.push("El nombre de la institución es obligatorio.");
      }
      if (this.val_nombreCompleto.length === 0) {
        this.errorList.push("El nombre del usuario es obligatorio.");
      }
      if (this.val_codigo.length === 0) {
        this.errorList.push("El codigo del usuario es obligatorio");
      }
      if (this.val_codigo.length > 8) {
        this.errorList.push(
          "El codigo del usuario no puede ser mayor a 8 caracteres"
        );
      }
      if (this.val_fechaNacimiento.length === 0) {
        this.errorList.push("La fecha de nacimiento es obligatoria");
      }
      if (this.val_gradoEscolar.length === 0) {
        this.errorList.push("El es obligatorio.");
      }

      return this.errorList.length > 0 ? false : true;
    },
  },
  computed: {
    edadVal: function () {
      var hoy = moment(this.dateCurrent, "DD-MM-YYYY").toDate();

      var cumpleanos =
        this.val_fechaNacimiento.length > 0
          ? moment(this.val_fechaNacimiento, "YYYY-MM-DD").toDate()
          : hoy;
      console.log(cumpleanos);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      console.log(edad);
      var m = hoy.getMonth() - cumpleanos.getMonth();
      console.log(m);
      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;

        return edad;
      }
      return edad;
    },
  },
  components: {
    loader,
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

.disableButton {
  background-color: var(--clr-primary-color-500);
}
#wrapperModalTemplate {
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
        }
        input {
          padding: 0.2em 0.2em;
          width: 90%;
          min-width: 40px;
          margin-left: 0.4em;
          outline: none;
          border-radius: 0.5em;
          font-size: 1.2em;
          background-color: var(--clr-primary-color-500);
          border: 4px solid var(--clr-primary-color-600);
        }
        select {
          width: fit-content;
          background-color: var(--clr-primary-color-500);
          border: 4px solid var(--clr-primary-color-600);
          font-size: 1.2em;
          border-radius: 0.5em;
          padding: 0.2em;
          margin: 0em 0.5em;
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
    ul#errorList {
      padding: 1em 0em;
      li {
        list-style-type: none;
        color: var(--clr-secondary-red);
        font-weight: bold;
      }
    }
  }
}
</style>