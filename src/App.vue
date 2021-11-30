<template>
  <div id="app">
    <vue-confirm-dialog></vue-confirm-dialog>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@use "assets/scss/utils/colors" as color;

@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

* {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}

:root {
  @each $color, $types in color.$colors {
    @each $type, $value in $types {
      --clr-#{$color}-#{$type}: #{$value};
    }
  }
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: var(--clr-primary-color-400);
}
</style>
