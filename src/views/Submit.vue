<template>
  <main :class="b()">
    <DropAnImage />
    <div :class="b('wrapper')">
      <TextareaAutosize
        v-model="description"
        :class="b('description-editor')"
        maxlength="10240"
        placeholder="What is your description?"
      />
    </div>
  </main>
</template>

<script>
import DropAnImage from "@/components/DropAnImage";

export default {
  name: "Submit",
  components: {
    DropAnImage
  },
  data() {
    return {
      description: null
    };
  }
};
</script>

<style lang="scss">
.Submit {
  &__description-editor {
    color: var(--link-color);
    background-color: transparent;
    border: none;

    min-height: 20vh;

    padding: 16px;

    font-size: 20px;
    line-height: 1.4em;
    outline: none;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>
