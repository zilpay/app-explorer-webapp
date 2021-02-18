<template>
  <h3 :class="b()">
    <slot />
  </h3>
</template>

<script>
export default {
  name: "Title"
};
</script>

<style lang="scss">
.Title {
  font-size: 24px;
}
</style>
