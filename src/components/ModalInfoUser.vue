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
          <input type="checkbox" />
        </span>
        <span><label>Detalles del usuario</label></span>
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
        <button>Guardar</button>
        <button @click="closeModal">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { headersadmin, VUE_INFO_USER } from "../store";
import axios from "axios";
import moment from "moment";
export default {
  props: ["infoUser"],
  async created() {
    let url = process.env.VUE_APP_API_URL_DATAUSER + VUE_INFO_USER;
    let body = {
      id: this.infoUser.idUsuario,
    };
    this.stateLoading = true;

    await axios
      .post(url, body, {
        headers: headersadmin,
      })
      .then((response) => {
        console.log(response);
        this.userData = response.data[0];
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      userData: null,
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModalDetalles");
    },
  },
  computed: {
    fechaNacimiento: function () {
      return moment(this.userData.fechaNacimiento).format("DD-MM-YYYY");
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