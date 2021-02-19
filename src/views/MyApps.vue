<template>
  <main :class="b()">
    <div :class="b('actions-wrapper')">
      <router-link :to="{ name: 'Submit' }">
        <Button>
          Submit
        </Button>
      </router-link>
    </div>
  </main>
</template>

<script>
import Button from "@/components/Button";

export default {
  name: "MyApps",
  components: {
    Button
  }
};
</script>

<style lang="scss">
.MyApps {
  padding-top: 16px;

  &__actions-wrapper {
    display: flex;
    justify-content: flex-end;

    width: 100%;

    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
