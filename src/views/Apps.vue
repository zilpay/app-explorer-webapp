<template>
  <main :class="b()">
    <table :class="b('fold-table')">
      <thead>
        <tr>
          <th>
            #
          </th>
          <th />
          <th
            v-for="(el, index) of filterList"
            :class="b('table-filter', { active: selected === index })"
            :key="index"
            @click="selected = index"
          >
            {{ el.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1232</td>
          <td>dasdsa</td>
          <td>dasdsa</td>
          <td>dasdsa</td>
          <td>dasdas</td>
          <td>dasdas</td>
        </tr>
      </tbody>
    </table>
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
    padding: 16px;
    margin-top: 30px;
    border-radius: 8px;
    border: 1px solid var(--border-color);

    & > thead {
      border-bottom: 1px solid var(--border-color);;
    }
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
