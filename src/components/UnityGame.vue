<template>
  <div id="unity-container" class="unity-desktop">
    <canvas id="unity-canvas" width="1280" height="720"></canvas>
    <div id="unity-loading-bar">
      <div
        id="unity-logo"
        :style="{ background: backgroundLogo + 'no-repeat center' }"
      ></div>
      <div
        id="unity-progress-bar-empty"
        :style="{ background: backgroundProgressBarEmpty + 'no-repeat center' }"
      >
        <div
          id="unity-progress-bar-full"
          :style="{ background: backgroundProgressFull + 'no-repeat center' }"
        ></div>
      </div>
    </div>
    <div id="unity-mobile-warning">
      WebGL builds are not supported on mobile devices.
    </div>
    <div id="unity-footer">
      <div
        id="unity-webgl-logo"
        :style="{ background: backgroundWebGlLogo + 'no-repeat center' }"
      ></div>
      <div
        id="unity-fullscreen-button"
        :style="{ background: backgroundFullScreen + 'no-repeat center' }"
      ></div>
      <div id="unity-build-title">MaquinaCientifica</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backgroundLogo: `url(${require("@/assets/TemplateData/unity-logo-dark.png")})`,
      backgroundProgressBarEmpty: `url(${require("@/assets/TemplateData/progress-bar-empty-dark.png")})`,
      backgroundProgressFull: `url(${require("@/assets/TemplateData/progress-bar-full-dark.png")})`,
      backgroundWebGlLogo: `url(${require("@/assets/TemplateData/webgl-logo.png")})`,
      backgroundFullScreen: `url(${require("@/assets/TemplateData/fullscreen-button.png")})`,
    };
  },
  //   methods: {
  //     onClick() {
  //       //this.$refs.myInstance.message("object", "method", "param");
  //     },
  //   },

  mounted() {
    this.$nextTick(() => {
      var loaderUrl = "/Build/distJuego.loader.js";
      // var loaderUrl = "./static/Build/distJuego.loader.js";
      var config = {
        dataUrl: "/Build/distJuego.data",
        frameworkUrl: "/Build/distJuego.framework.js",
        codeUrl: "/Build/distJuego.wasm",
        companyName: "Desdev",
        productName: "MaquinaCientifica",
        productVersion: "1.0",
      };

      var container = document.querySelector("#unity-container");
      var canvas = document.querySelector("#unity-canvas");
      var loadingBar = document.querySelector("#unity-loading-bar");
      var progressBarFull = document.querySelector("#unity-progress-bar-full");
      var fullscreenButton = document.querySelector("#unity-fullscreen-button");
      var mobileWarning = document.querySelector("#unity-mobile-warning");

      console.log(canvas);
      // By default Unity keeps WebGL canvas render target size matched with
      // the DOM size of the canvas element (scaled by window.devicePixelRatio)
      // Set this to false if you want to decouple this synchronization from
      // happening inside the engine, and you would instead like to size up
      // the canvas DOM size and WebGL render target sizes yourself.
      // config.matchWebGLToCanvasSize = false;

      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        container.className = "unity-mobile";
        // Avoid draining fillrate performance on mobile devices,
        // and default/override low DPI mode on mobile browsers.
        config.devicePixelRatio = 1;
        mobileWarning.style.display = "block";
        setTimeout(() => {
          mobileWarning.style.display = "none";
        }, 5000);
      } else {
        canvas.style.width = "1280px";
        canvas.style.height = "720px";
      }
      loadingBar.style.display = "block";

      var script = document.createElement("script");
      script.src = loaderUrl;
      console.log(loaderUrl);
      script.onload = () => {
        createUnityInstance(canvas, config, (progress) => {
          progressBarFull.style.width = 100 * progress + "%";
        })
          .then((unityInstance) => {
            loadingBar.style.display = "none";
            fullscreenButton.onclick = () => {
              unityInstance.SetFullscreen(1);
            };
          })
          .catch((message) => {
            alert(message);
          });
      };
      document.body.appendChild(script);
    });
  },
};
</script>

<style lang="scss" scoped>
#unity-container {
  position: absolute;
}
#unity-container.unity-desktop {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
#unity-container.unity-mobile {
  width: 100%;
  height: 100%;
}
#unity-canvas {
  background: #231f20;
}
.unity-mobile #unity-canvas {
  width: 100%;
  height: 100%;
}
#unity-loading-bar {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: none;
}
#unity-logo {
  width: 154px;
  height: 130px;
  //   background: url("./src/assets/TemplateData/unity-logo-dark.png") no-repeat
  //     center;
}
#unity-progress-bar-empty {
  width: 141px;
  height: 18px;
  margin-top: 10px;
  //   background: url("./src/assets/TemplateData/progress-bar-empty-dark.png")
  //     no-repeat center;
}
#unity-progress-bar-full {
  width: 0%;
  height: 18px;
  margin-top: 10px;
  //   background: url("./src/assets/TemplateData/progress-bar-full-dark.png")
  //     no-repeat center;
}
#unity-footer {
  position: relative;
}
.unity-mobile #unity-footer {
  display: none;
}
#unity-webgl-logo {
  float: left;
  width: 204px;
  height: 38px;
  //   background: url("./src/assets/TemplateData/webgl-logo.png") no-repeat center;
}
#unity-build-title {
  float: right;
  margin-right: 10px;
  line-height: 38px;
  font-family: arial;
  font-size: 18px;
}
#unity-fullscreen-button {
  float: right;
  width: 38px;
  height: 38px;
  //   background: url("./src/assets/TemplateData/fullscreen-button.png") no-repeat
  //     center;
}
#unity-mobile-warning {
  position: absolute;
  left: 50%;
  top: 5%;
  transform: translate(-50%);
  background: white;
  padding: 10px;
  display: none;
}
</style>
