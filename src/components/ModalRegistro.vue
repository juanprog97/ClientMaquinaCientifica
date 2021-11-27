<template>
  <div id="wrapperModalTemplate">
    <div class="containerModal">
      <div id="headerContainer">
        <div name="headerTitle"><p>Registar usuario</p></div>
        <button id="closeModal" @click="closeModal()">X</button>
      </div>
      <form name="contentModal">
        <span>
          <label for="">Nombre de la institución</label>
          <input type="text" v-model="val_institucion" />
        </span>
        <span>
          <label for="">Nombre completo</label>
          <input type="text" v-model="val_nombreCompleto" />
        </span>
        <span>
          <label for="">Codigo de usuario</label>
          <input type="text" v-model="val_codigo" />
        </span>
        <span>
          <label for="">Fecha de Nacimiento:</label>
          <input type="date" v-model="val_fechaNacimiento" />
        </span>
        <span>
          <label for="">Edad:</label>
          <input
            min="1"
            oninput="this.value = Math.abs(this.value)"
            type="number"
            v-model="val_edad"
          />
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

      <div name="optionsModal">
        <button>Registrar</button>
        <button @click="closeModal">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val_institucion: "",
      val_nombreCompleto: "",
      val_codigo: "",
      val_fechaNacimiento: "",
      val_edad: "",
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
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModalRegistrar");
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
          font-size: 1em;
          border-radius: 0.5em;
          padding: 0.2em;
          margin: 0em 0.2em;
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