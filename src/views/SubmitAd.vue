<template>
  <main :class="b()">
    <VueFileAgent
      :class="b('profile-pic-upload-block')"
      ref="iconPicRef"
      :multiple="false"
      :deletable="false"
      :meta="false"
      :compact="false"
      :accept="'.png,.jpg'"
      :helpText="'Drag an image preview file here'"
      :errorText="{
        type: 'Please select an image'
      }"
      v-model="preview"
      @select="onUpload($event)"
    />
    <div :class="b('wrapper')">
      <form :class="b('submit-form')" @submit.prevent="onSubmit">
        <TextInput
          v-model="url"
          placeholder="URL"
          type="url"
        />
        <label>
          ZLP Amount
          <vue-number-input
            v-model="amount"
            :min="1"
            controls
          />
        </label>
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
import VueNumberInput from "@chenfengyuan/vue-number-input";

export default {
  name: "SubmitAd",
  components: {
    TextInput,
    Button,
    VueNumberInput
  },
  data() {
    return {
      url: null,
      preview: null,
      ipfs: null,
      amount: 1
    }
  },
  methods: {
    async onUpload([event]) {
      const formData = new FormData();

      formData.append('img', event.file);

      const options = {
        method: 'POST',
        body: formData
      };

      const res = await fetch('http://localhost:3000/api/v1/upload/img', options);
      const result = await res.json();

      this.ipfs = result.hash;
    },
    onSubmit() {

    }
  }
}
</script>

<style lang="scss">
.SubmitAd {
  &__submit-form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 300px;
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
