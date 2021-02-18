<template>
  <div :class="b()">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Card"
};
</script>

<style lang="scss">
.Card {
  border: 1px solid #e1e4e8;
  height: 250px;
  width: 100%;
  margin: 10px;
  border-radius: 8px;

  &:hover {
    color: var(--link-color);
    border-color: var(--link-color);
  }
}

@media (min-width: 1012px) {
  .Card {
    width: 250px;
  }
}
</style>
