<template>
  <div :class="b()">
    <div :class="b('wrapper')">
      <Card v-for="(el, index) of Array(5)" :key="index" />
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";

export default {
  name: "Home",
  components: {
    Card
  }
};
</script>

<style lang="scss">
.Home {
  height: 90vh;

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
