<template>
  <div id="wrapperNotFound">
    <div class="containerLogin">
      <span class="logo"><logo-image /></span>
      <p style="font-weight: bold; font-size: 2em">Esta pagina no existe</p>
      <LottieAnimation
        path="./notfound.json"
        :loop="true"
        :autoPlay="true"
        :width="256"
        :height="256"
      />
    </div>
  </div>
</template>

<script>
import logoImage from "../components/svg/logoImage.vue";
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";

export default {
  data() {},

  components: {
    LottieAnimation,
    "logo-image": logoImage,
  },
};
</script>

<style lang="scss" scoped>
#wrapperNotFound {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100vh;
  background-color: var(--clr-primary-color-400);
  .containerLogin {
    display: grid;
    place-items: center;
    background-color: var(--clr-primary-color-500);
    padding: 5em;
    border-radius: 1em;
    box-shadow: 0px 1px 3px 1px var(--clr-primary-color-700, 0.2);

    .logo {
      position: relative;
      top: -80px;
    }
  }
}
</style>