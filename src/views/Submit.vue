<template>
  <main :class="b()">
    <DropAnImage />
  </main>
</template>

<script>
import DropAnImage from "@/components/DropAnImage";

export default {
  name: "Submit",
  components: {
    DropAnImage
  }
};
</script>

<style lang="scss">
.Submit {
  margin: 0;
}
</style>
