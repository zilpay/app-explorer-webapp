<template>
  <main :class="b()">
    <DropAnImage>
      Drop an poster
    </DropAnImage>
    <div :class="b('wrapper')">
      <DropAnImage :class="b('icon-uploader')" :height="300" :width="300">
        Drop an icon
      </DropAnImage>
      <form :class="b('submit-form')">
        <TextInput v-model="domain" placeholder="App Domain like zilliqa.com" />
        <TextInput v-model="name" placeholder="App name" />
        <TextareaAutosize
          v-model="description"
          :class="b('description-editor')"
          maxlength="10240"
          placeholder="What is your description?"
        />
        <Button>
          Submit
        </Button>
      </form>
    </div>
  </main>
</template>

<script>
import DropAnImage from "@/components/DropAnImage";
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";

export default {
  name: "Submit",
  components: {
    DropAnImage,
    TextInput,
    Button
  },
  data() {
    return {
      description: null,
      domain: null,
      name: null
    };
  }
};
</script>

<style lang="scss">
.Submit {
  &__submit-form {
    display: flex;
    flex-direction: column;

    max-width: 900px;
    min-width: 300px;
    width: 100%;
    padding-top: 30px;
    padding-bottom: 30px;

    & > button {
      width: 250px;
      align-self: flex-end;
    }
  }

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
