<template>
  <nav :class="b()">
    <div :class="b('wrapper')">
      <div :class="b('nav')">
        <router-link :to="{ name: 'Home' }">
          <Title>
            ZIlPay Explorer
          </Title>
        </router-link>
        <span v-show="currentRoute" :class="b('seporate')">/</span>
        <router-link :to="{ name: currentRoute }">
          <Title>
            {{ currentRoute }}
          </Title>
        </router-link>
      </div>
      <router-link :to="{ name: 'MyApps' }">
        <Button>
          My Apps
        </Button>
      </router-link>
    </div>
  </nav>
</template>

<script>
import Title from "@/components/Title";
import Button from "@/components/Button";

export default {
  name: "NavBar",
  components: {
    Title,
    Button
  },
  computed: {
    currentRoute() {
      const { name } = this.$route;

      if (name !== "Home") {
        return name;
      }

      return null;
    }
  }
};
</script>

<style lang="scss">
.NavBar {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  border-bottom: 1px solid var(--border-color);
  background-color: var(--bg-color);

  font-size: 18px;
  line-height: 1.4;

  &__nav {
    display: flex;
    align-items: center;
  }

  &__seporate {
    color: var(--text-color);
    margin-left: 10px;
    margin-right: 10px;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    max-width: 964px;
    width: 100%;

    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
