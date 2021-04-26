<template>
  <main :class="b()">
    <div :class="b('wrapper')">
      <router-link
        v-for="(el, index) of categories"
        :key="index"
        :to="{ name: 'Apps', params: { id: el.id } }"
      >
        <Card>
          <div :class="b('img-wrapper')">
            <img :src="el.img" height="150" width="150" />
            <Title>
              {{ el.title }}
            </Title>
          </div>
        </Card>
      </router-link>
    </div>
  </main>
</template>

<script>
import Card from "@/components/Card";
import Title from "@/components/Title";

export default {
  name: "Home",
  components: {
    Card,
    Title
  },
  data() {
    return {
      categories: [
        {
          img: require("@/assets/imgs/games.svg"),
          title: "Games",
          id: 0
        },
        {
          img: require("@/assets/imgs/finance.svg"),
          title: "Finance",
          id: 1
        },
        {
          img: require("@/assets/imgs/social.svg"),
          title: "Social",
          id: 2
        },
        {
          img: require("@/assets/imgs/high-risk.svg"),
          title: "Highrisk",
          id: 3
        },
        {
          img: require("@/assets/imgs/exchange.svg"),
          title: "Exchange",
          id: 4
        },
        {
          img: require("@/assets/imgs/gambling.svg"),
          title: "Gambling",
          id: 5
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.Home {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    max-width: 1024px;
  }

  &__img-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
