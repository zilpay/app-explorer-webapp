<template>
  <input v-bind="$attrs" :class="b()" type="text" />
</template>

<script>
export default {
  name: "TextInput"
};
</script>

<style lang="scss">
.TextInput {
  color: var(--link-color);
  background-color: transparent;
  border: none;
  // border: 1px solid var(--border-color);
  border-radius: 10px;

  padding: 16px;
  width: 100%;

  font-size: 20px;
  line-height: 1.4em;
  outline: none;
  font-family: "Calibre-Medium";

  // &:focus {
  //   color: var(--link-color);
  //   border-color: var(--link-color);
  // }
}
</style>
