<template>
  <button :class="b()">
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button"
};
</script>

<style lang="scss">
.Button {
  cursor: pointer;
  border: 1px solid var(--border-color);
  background-color: transparent;
  color: var(--link-color);
  border-radius: 23px;
  padding: 0 24px;
  outline: none;
  line-height: 46px;
  height: 46px;
  font-size: 18px;
  font-family: inherit;

  &:hover {
    color: var(--link-color);
    border-color: var(--link-color);
  }
}
</style>
