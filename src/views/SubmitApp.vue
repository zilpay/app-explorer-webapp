<template>
  <main :class="b()">
    <p :class="b('error')">
      {{ error }}
    </p>
    <VueFileAgent
      ref="posterRef"
      :theme="'list'"
      :multiple="true"
      :deletable="true"
      :meta="true"
      :accept="'.png, .jpg'"
      :maxSize="'2MB'"
      :maxFiles="5"
      helpText="Drop or select an poster images file (png, jpg)"
      :errorText="{
        type: 'Invalid file type. Only (png, jpg) Allowed',
        size: 'Files should not exceed 1MB in size'
      }"
      @select="filesSelected($event)"
    />
    <div :class="b('wrapper')">
      <VueFileAgent
        :class="b('profile-pic-upload-block')"
        ref="iconPicRef"
        :multiple="false"
        :deletable="false"
        :meta="false"
        :compact="false"
        :accept="'.png,.jpg'"
        :helpText="'Drag an icon file here'"
        :errorText="{
          type: 'Please select an icon'
        }"
        @select="onSelectIcon($event)"
      />
      <div :class="b('drop-wrapper')">
        <dropdown-menu>
          <Button slot="trigger">
            {{ category.name }}
          </Button>
          <ul
            slot="body"
            :class="b('drop-list')"
          >
            <li
              v-for="(el, index) of categories"
              :key="index"
              @click.prevent="category = el"
            >
              {{ el.name }}
            </li>
          </ul>
        </dropdown-menu>
      </div>
      <form
        :class="b('submit-form')"
        @submit.prevent="submit"
      >
        <TextInput
          v-model="domain"
          :disabled="loading"
          placeholder="App URL like https://zilpay.io"
          type="url"
          @input="error = null"
        />
        <TextInput
          v-model="name"
          :disabled="loading"
          placeholder="App name"
          @input="error = null"
        />
        <TextareaAutosize
          v-model="description"
          :class="b('description-editor')"
          :disabled="loading"
          maxlength="10240"
          placeholder="What is your description?"
          @input="error = null"
        />
        <Button v-show="!loading">
          Submit
        </Button>
        <Loader v-show="loading"/>
      </form>
    </div>
    <modal
      name="result-modal"
      height="auto"
    >
      <div :class="b('modal-wrapper')">
        <img
          :src="require('@/assets/icons/ok.svg')"
          height="100"
          width="100"
        >
        <h2>
          Transaction sent success
        </h2>
        <a
          :href="`https://viewblock.io/zilliqa/tx/${hash}?network=${net}`"
          target="_blank"
        >
          Check on Viewblock
        </a>
        <p>
          Your Application sent to moderate and review.
        </p>
      </div>
    </modal>
  </main>
</template>

<script>
import TextInput from "@/components/TextInput";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import DropdownMenu from "v-dropdown-menu";

import ZilPayMixin from "@/mixins/zilpay";
import "v-dropdown-menu/dist/v-dropdown-menu.css";

export default {
  name: "SubmitApp",
  mixins: [ZilPayMixin],
  components: {
    TextInput,
    Button,
    Loader,
    DropdownMenu
  },
  data() {
    return {
      loading: false,
      description: null,
      domain: null,
      name: null,
      category: {
        name: "Category",
        value: -1
      },
      imgsRecords: new FormData(),
      icon: new FormData(),
      error: null,
      hash: '',
      categories: [
        {
          name: "Games",
          value: 0
        },
        {
          name: "Finance",
          value: 1
        },
        {
          name: "Social",
          value: 2
        },
        {
          name: "High-Risk",
          value: 3
        },
        {
          name: "Exchange",
          value: 4
        },
        {
          name: "Gambling",
          value: 5
        }
      ]
    };
  },
  computed: {
    net() {
      const zilpay = window["zilPay"];
      return zilpay.wallet.net;
    }
  },
  methods: {
    async uploadingPreview() {
      const options = {
        method: 'POST',
        body: this.imgsRecords
      };

      const res = await fetch('http://localhost:3000/api/v1/upload/imgs', options);

      return res.json();
    },
    async uploadingIcon() {
      const options = {
        method: 'POST',
        body: this.icon
      };

      const res = await fetch('http://localhost:3000/api/v1/upload/img', options);
      const { hash } = await res.json();

      return hash;
    },
    async submit() {
      if (!this.description) {
        this.error = "Description cannot be empety.";
      }
      if (this.description.length > 10240) {
        this.error = "Description cannot less than 10240 chars.";
      }
      if (!this.domain) {
        this.error = "Domain cannot empty.";
      }
      if (!this.name) {
        this.error = "Name cannot empty.";
      }
      if (this.imgsRecords.getAll('images').length < 2) {
        this.error = "Preview images should min 2x";
      }
      if (this.icon.getAll('img').length === 0) {
        this.error = "Icon image is required.";
      }
      if (this.error) {
        return null;
      }
      this.loading = true;
      try {
        const hashSet = await this.uploadingPreview();
        const iconHash = await this.uploadingIcon();

        const tx = await this.__addApplication(
          this.name,
          this.description,
          this.domain,
          hashSet,
          iconHash,
          this.category.value
        );
        this.hash = tx.ID;
        this.$modal.show('result-modal');
      } catch (err) {
        this.error = err.message;
      }
      this.loading = false;
    },
    onSelectIcon([event]) {
      this.error = null;
      this.icon.append('img', event.file);
    },
    async filesSelected(event) {
      this.error = null;
      event.forEach((e) => {
        this.imgsRecords.append('images', e.file);
      });
    }
  }
};
</script>

<style lang="scss">
.v-dropdown-menu__container {
  border-radius: 8px;
  min-width: 130px !important;
}
.SubmitApp {
  &__drop-wrapper {
    margin: 30px;
  }

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

  &__drop-list {
    padding: 0;
    margin: 0;
    list-style: none;

    & > li {
      cursor: pointer;
      padding: 5px;
      border-radius: 8px;
      
      &:hover {
        color: var(--link-color);
      }
    }
  }

  &__modal-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 16px;
    height: 30vh;
    width: 100%;
  }

  &__error {
    text-align: center;
    font-size: 21px;
    color: #E4453A;
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
