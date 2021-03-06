<template>
  <main :class="b()">
    <p :class="b('warn')">
      {{ error }}
    </p>
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
          Your banner sent to moderate and review.
        </p>
      </div>
    </modal>
  </main>
</template>

<script>
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import VueNumberInput from "@chenfengyuan/vue-number-input";

import ZilPayMixin from "@/mixins/zilpay";

export default {
  name: "SubmitAd",
  mixins: [ZilPayMixin],
  components: {
    TextInput,
    Button,
    Loader,
    VueNumberInput
  },
  data() {
    return {
      url: null,
      ipfs: null,
      amount: 1,
      error: '',
      loading: false,
      approved: false,
      hash: ''
    }
  },
  computed: {
    net() {
      const zilpay = window["zilPay"];
      return zilpay.wallet.net;
    }
  },
  methods: {
    async onUpload([event]) {
      this.error = null;

      try {
        this.loading = true;
        const formData = new FormData();

        formData.append('img', event.file);

        const options = {
          method: 'POST',
          body: formData
        };

        const res = await fetch('http://localhost:3000/api/v1/upload/img', options);
        const result = await res.json();

        this.ipfs = result.hash;
      } catch (err) {
        this.error = err.message;
      }

      this.loading = false;
    },
    async onSubmit() {
      this.error = null;
      this.loading = true;

      this.approved = await this.__isUnlocked(this.amount);

      if (this.amount <= 0) {
        this.error = "ZLP amount cannot be zero!";

        return null;
      }

      if (!this.ipfs) {
        this.error = "IPFS hash cannot be empety.";

        return null;
      }

      if (!this.url) {
        this.error = "URL cannot be empety.";

        return null;
      }

      if (!this.approved) {
        await this.__increaseAllowance(this.DISTRIBUTOR);
      }

      try {
        this.loading = true;
        const tx = await this.__addAd(
          this.amount,
          this.url,
          this.ipfs
        );
        this.hash = tx.ID;
        this.$modal.show('result-modal');
      } catch (err) {
        this.error = err.message;
      }
      this.loading = false;
    }
  }
}
</script>

<style lang="scss">
.SubmitAd {
  &__submit-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 300px;
  }

  &__modal-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 16px;
    height: 30vh;
    width: 100%;
  }

  &__warn {
    text-align: center;
    font-size: 21px;
    color: #E4453A;
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
