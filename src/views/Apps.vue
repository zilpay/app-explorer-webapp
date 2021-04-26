<template>
  <main :class="b()">
    <AppItem
      v-for="(el, index) of list"
      :key="index"
      :icon="el.icon"
      :title="el.title"
      :url="el.url"
    />
    <div :class="b('load-wrapper')">
      <RowLoading v-show="loading" />
    </div>
    <h3 v-show="list.length === 0 && !loading">
      Have no Apps yet.
    </h3>
  </main>
</template>

<script>
import RowLoading from "@/components/RowLoading";
import AppItem from "@/components/AppItem";

import ZilPayMixin from "@/mixins/zilpay";

export default {
  name: "Apps",
  mixins: [ZilPayMixin],
  components: {
    RowLoading,
    AppItem
  },
  data() {
    return {
      list: [],
      loading: true
    };
  },
  async beforeMount() {
    this.loading = true;
    this.list = await this.__getAps(this.$route.params.id);
    this.loading = false;
  }
};
</script>

<style lang="scss">
.Apps {
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 50vh;

  padding-top: 30px;

  &__load-wrapper {
    width: 50%;
  }

  &__fold-table {
    margin-top: 30px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
  }

  &__table-head {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border-color);

    padding: 16px;
  }

  &__table-body {
    display: flex;
    align-items: center;
  }

  &__table-filter {
    cursor: pointer;

    user-select: none;
    padding: 5px;

    &_active,
    &:hover {
      color: var(--link-color);
    }
  }
}
</style>
