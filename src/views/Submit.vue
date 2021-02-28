<template>
  <main :class="b()">
    <VueFileAgent
      v-model="fileRecords"
      ref="posterRef"
      :theme="'list'"
      :multiple="true"
      :deletable="true"
      :meta="true"
      :accept="'.png, .webp'"
      :maxSize="'10MB'"
      :maxFiles="5"
      helpText="Drop or select an poster images file (png, webp)"
      :errorText="{
        type: 'Invalid file type. Only (png, webp) Allowed',
        size: 'Files should not exceed 10MB in size'
      }"
      @select="filesSelected($event)"
      @beforedelete="onBeforeDelete($event)"
      @delete="fileDeleted($event)"
    />
    <div :class="b('wrapper')">
      <VueFileAgent
        :class="b('profile-pic-upload-block')"
        ref="iconPicRef"
        :multiple="false"
        :deletable="false"
        :meta="false"
        :compact="true"
        :accept="'.svg'"
        :helpText="'Drag an svg icon file here'"
        :errorText="{
          type: 'Please select an svg image'
        }"
        v-model="profilePic"
        @select="onSelect($event)"
      />
      <form :class="b('submit-form')" @submit.prevent="submit">
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
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";

export default {
  name: "Submit",
  components: {
    TextInput,
    Button
  },
  data() {
    return {
      fileRecords: [],
      uploadUrl: "https://www.mocky.io/v2/5d4fb20b3000005c111099e3",
      uploadHeaders: { "X-Test-Header": "vue-file-agent" },
      fileRecordsForUpload: [],
      description: null,
      domain: null,
      name: null
    };
  },
  methods: {
    submit() {
      console.log(this.description);
      console.log(this.domain);
      console.log(this.name);
    }
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

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    padding-top: 16px;
  }
}
</style>
