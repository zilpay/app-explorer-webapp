<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/NavBar";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
$font-weight-normal: "Calibre-Medium", -apple-system, BlinkMacSystemFont,
  Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
$font-weight-bold: "Calibre-Semibold", -apple-system, BlinkMacSystemFont,
  Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;

:root {
  --primary-color: #384aff;
  --bg-color: #fff;
  --text-color: #586069;
  --link-color: #111;
  --heading-color: #111;
  --border-color: #d1d5da;
  --header-bg: #fff;
  --block-bg: transparent;
}

html,
body,
#app {
  padding: 0;
  margin: 0;
  background: var(--bg-color);
  color: var(--text-color);
  font-family: $font-weight-normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1,
h2,
h3,
h4 {
  color: var(--heading-color);
  font-family: $font-weight-bold;
}

@font-face {
  font-family: "Calibre-Medium";
  src: url("./assets/fonts/Calibre-Medium.eot");
  src: url("./assets/fonts/Calibre-Medium.eot?#iefix")
      format("embedded-opentype"),
    url("./assets/fonts/Calibre-Medium.woff") format("woff"),
    url("./assets/fonts/Calibre-Medium.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Calibre-Semibold";
  src: url("./assets/fonts/Calibre-Semibold.eot");
  src: url("./assets/fonts/Calibre-Semibold.eot?#iefix")
      format("embedded-opentype"),
    url("./assets/fonts/Calibre-Semibold.woff") format("woff"),
    url("./assets/fonts/Calibre-Semibold.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

::-webkit-scrollbar-thumb {
  background-color: var(--border-color);
  background-clip: padding-box;
  border: 0;
  border-radius: 0;

  &:hover {
    background-color: var(--border-color);
  }
}
</style>
