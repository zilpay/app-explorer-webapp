<template>
  <main :class="b()">
    <div :class="b('fold-table')">
      <div :class="b('table-head')">
        <div>
          #
        </div>
        <div
          v-for="(el, index) of filterList"
          :class="b('table-filter', { active: selected === index })"
          :key="index"
          @click="selected = index"
        >
          {{ el.name }}
        </div>
      </div>
      <div :class="b('table-body')">
        <div>dsad</div>
        <div>dasd</div>
        <div>asdasd</div>
        <div>dasdsa</div>
        <div>dsa</div>
      </div>
    </div>
    <RowLoading v-show="false" />
  </main>
</template>

<script>
import RowLoading from "@/components/RowLoading";

export default {
  name: "Apps",
  components: {
    RowLoading
  },
  data() {
    return {
      filterList: [
        {
          name: "Users (24h)"
        },
        {
          name: "Volume (7d)"
        },
        {
          name: "Dev activity (30d)"
        },
        {
          name: "User activity (30d)"
        }
      ],
      selected: null
    };
  }
};
</script>

<style lang="scss">
.Apps {
  display: flex;
  flex-direction: column;
  align-items: center;

  min-height: 50vh;

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
