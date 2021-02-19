<template>
  <main :class="b()">
    <DropAnImage>
      Drop an poster
    </DropAnImage>
    <div :class="b('wrapper')">
      <DropAnImage :class="b('icon-uploader')" :height="300" :width="300">
        Drop an icon
      </DropAnImage>
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
    width: 100%;

    padding: 16px;

    font-size: 20px;
    line-height: 1.4em;
    outline: none;
  }

  &__icon-uploader {
    width: 300px;

    margin: 16px;
    border-radius: 100%;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
}
</style>
