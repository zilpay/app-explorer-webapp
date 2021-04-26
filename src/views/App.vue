<template>
  <main :class="b()">
    <carousel
      v-if="app"
      :per-page="1"
      :mouse-drag="true"
    >
      <slide
        v-for="(hash, index) of app.images"
        :key="index"
        :class="b('preview-slide')"
      >
        <img
          :src="`${IPFS}/${hash}`"
          :class="b('preview')"
        >
      </slide>
    </carousel>
    <p
      v-if="description"
      :class="b('description')"
    >
      {{ description }}
    </p>
    <a
      v-if="app"
      :href="app.url"
      target="_blank"
    >
      <Button>
        Launch
      </Button>
    </a>
    <RowLoading v-show="!app" />
  </main>
</template>

<script>
import { mapState } from "vuex";

import Button from "@/components/Button";
import RowLoading from "@/components/RowLoading";

import ZilPayMixin from "@/mixins/zilpay";
import { IPFS } from "@/config";

export default {
  name: "App",
  mixins: [ZilPayMixin],
  components: {
    Button,
    RowLoading
  },
  data() {
    return {
      IPFS,
      app: null,
      description: null
    };
  },
  computed: {
    ...mapState([
      "list"
    ])
  },
  async beforeMount() {
    if (!this.list || this.list.length === 0) {
      await this.__getAps(
        this.$route.params.id,
        this.$route.params.owner
      );
    }

    this.app = this.list.find(
      (el) => el.owner === this.$route.params.owner && el.category === this.$route.params.id
    );
    const res = await fetch(`${IPFS}/${this.app.description}`);
    this.description = await res.text();
  }
}
</script>

<style lang="scss">
.App {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-top: 30px;
  padding-right: 16px;
  padding-left: 16px;

  &__preview-slide {
    display: flex;
    justify-content: center;
  }

  &__description {
    text-align: center;
    font-size: 17px;
  }

  &__preview {
    border-radius: 16px;
    max-width: 900px;
    height: fit-content;
    width: 100%;
  }
}
</style>
