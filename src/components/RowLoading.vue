<template>
  <div :class="b()">
    <div :class="b('row-0')" />
    <div :class="b('row-1')" />
  </div>
</template>

<script>
export default {
  name: "RowLoading"
};
</script>

<style lang="scss">
.RowLoading {
  display: flex;
  flex-direction: column;

  width: 100%;

  border-color: var(--border-color);
  padding-top: 16px;
  padding-bottom: 16px;
  border-top: 1px solid var(--border-color);

  &__row-0,
  &__row-1 {
    background-color: var(--text-color);

    border-radius: 4px;

    animation-name: pulse;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  &__row-0 {
    width: 60%;
    height: 28px;
  }

  &__row-1 {
    margin-top: 5px;
    width: 40%;
    height: 28px;
  }
}
</style>
