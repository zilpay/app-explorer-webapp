<template>
  <main :class="b()">
    <router-link
      v-for="(el, index) of list"
      :key="index"
      :to="{ name: 'App', params: { id: el.category, owner: el.owner } }"
      :class="b('link')"
    >
      <AppItem
        :icon="el.icon"
        :title="el.title"
        :url="el.url"
      />
    </router-link>
    <div :class="b('load-wrapper')">
      <RowLoading v-show="loading && list.length === 0" />
    </div>
    <h3 v-show="list.length === 0 && !loading">
      Have no Apps yet.
    </h3>
  </main>
</template>

<script>
import { mapState } from 'vuex';

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
      loading: true
    };
  },
  computed: {
    ...mapState([
      'list'
    ])
  },
  async beforeMount() {
    this.setAppList([]);
    this.loading = true;
    await this.__getAps(this.$route.params.id);
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

  &__link {
    display: flex;
    justify-content: center;
    min-width: 250px;
    width: 100%;
    z-index: 1;
  }

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
