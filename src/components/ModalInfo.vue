<template>
  <div id="wrapperModalInfoDetails">
    <div class="containerModal">
      <div id="headerContainer">
        <div name="headerTitle"><p>La Maquina científica</p></div>
        <button id="closeModal" @click="closeModal()">X</button>
      </div>
      <div name="contentModal">
        <p>
          La “Máquina Científica” es una situación problema STEM que implica el
          uso de mecanismos físicos al construir Máquinas de Rube Goldberg. Esta
          situación lúdica se puede emplear para propiciar el pensamiento
          científico y la comprensión de mecanismos físicos y otros
          funcionamientos cognitivos. Este escenario puede resultar atractivo
          tanto para niños como para personas mayores. Diviértete y aprende con
          la “Máquina Científica”.
        </p>
        <label>Créditos</label>
        <p>Directora - Marlenny Guevara Guerrero</p>
        <p>Codirector - Jairo Andres Montes Gonzáles</p>
        <p>Estudiante - José Julián Kenji López Takegami</p>
        <p>Voz - Lina Maria Martínez Velasco</p>
        <p>Desarrollador Software - Desdev by Juan Miguel Cardona A</p>
        <p>Desarrollador Software - Desdev by Juan Miguel Cardona A</p>
        <p>
          Música -
          <a
            target="_blank"
            href="https://wowsound.com/product/w-o-w-sound-starter-pack/"
            >WOW Sound Starter Pack</a
          >
        </p>
      </div>

      <div name="optionsModal">
        <!-- <button @click="closeModal">Cerrar</button> -->
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
      this.$emit("closeModalInfo");
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
#wrapperModalInfoDetails {
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
      max-height: 400px;
      display: flex;
      flex-direction: column;
      height: auto;
      overflow-y: auto;
      label {
        font-weight: bold;
        padding: 0.5em;
        font-size: 1.2em;
      }
    }
    & > div[name="optionsModal"] {
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