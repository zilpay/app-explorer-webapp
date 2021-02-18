<template>
  <main :class="b()">
    <RowLoading />
  </main>
</template>

<script>
import RowLoading from "@/components/RowLoading";

export default {
  name: "Apps",
  components: {
    RowLoading
  }
};
</script>

<style lang="scss">
.Apps {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
