<template>
  <nav :class="b()">
    <div :class="b('wrapper')">
      <Title>
        zilpay explorer
      </Title>
      <Button>
        Submit app
      </Button>
    </div>
  </nav>
</template>

<script>
import Title from "@/components/Title";
import Button from "@/components/Button";

export default {
  name: "NavBar",
  components: {
    Title,
    Button
  }
};
</script>

<style lang="scss">
.NavBar {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  border-bottom-width: 5px;
  border-color: red;

  border-color: var(--border-color);
  background-color: var(--bg-color);

  font-size: 18px;
  line-height: 1.4;

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    max-width: 964px;
    width: 100%;
  }
}
</style>
