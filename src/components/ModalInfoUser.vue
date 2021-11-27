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
          <p>ETC</p>
        </span>
        <span>
          <label for="">Nombre completo</label>
          <p>ETC</p>
        </span>
        <span>
          <label for="">Codigo de usuario</label>
          <p>ETC</p>
        </span>
        <span>
          <label for="">Fecha de Nacimiento:</label>
          <p>ETC</p>
        </span>
        <span>
          <label for="">Edad:</label>
          <p>ETC</p>
        </span>
        <span>
          <label for="">Grado escolar:</label>
          <p>ETC</p>
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
export default {
  props: ["infoUser"],
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit("closeModalDetalles");
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