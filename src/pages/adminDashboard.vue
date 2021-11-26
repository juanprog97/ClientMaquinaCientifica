<template>
  <div id="wrapperDashboard">
    <nav class="options">
      <button type="option-admin" id="logout">
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
      <button type="option-admin" id="crearUsuarioButton">Crear usuario</button>
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
                {{ data.nombre }}
              </td>
              <td>
                {{ data.sesionActual }}
              </td>
              <td>Editar</td>
              <td>Eliminar</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataUser: [
        {
          id: 1,
          nombre: "User1",
          sesionActual: "Session1",
        },
        {
          id: 2,
          nombre: "User2",
          sesionActual: "Session7",
        },
        {
          id: 1,
          nombre: "User3",
          sesionActual: "Session4",
        },
        {
          id: 1,
          nombre: "User3",
          sesionActual: "Session4",
        },
        {
          id: 1,
          nombre: "User3",
          sesionActual: "Session4",
        },
        {
          id: 1,
          nombre: "User3",
          sesionActual: "Session4",
        },
        {
          id: 1,
          nombre: "User3",
          sesionActual: "Session4",
        },
        {
          id: 1,
          nombre: "User3",
          sesionActual: "Session4",
        },
        {
          id: 1,
          nombre: "User3",
          sesionActual: "Session4",
        },
        {
          id: 1,
          nombre: "User3",
          sesionActual: "Session4",
        },
      ],
    };
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
  padding: 2em 0em;
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
          }
        }
      }
    }
  }
}
</style>