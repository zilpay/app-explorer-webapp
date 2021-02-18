<template>
  <div :class="b()">
    <div :class="b('wrapper')">
      <Card v-for="(el, index) of categories" :key="index">
        <div :class="b('img-wrapper')">
          <img :src="el.img" height="150" width="150" />
          <Title>
            {{ el.title }}
          </Title>
        </div>
      </Card>
    </div>
  </div>
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
          img: require("@/assets/imgs/exchange.svg"),
          title: "Exchange"
        },
        {
          img: require("@/assets/imgs/finance.svg"),
          title: "Finance"
        },
        {
          img: require("@/assets/imgs/gambling.svg"),
          title: "Gambling"
        },
        {
          img: require("@/assets/imgs/games.svg"),
          title: "Games"
        },
        {
          img: require("@/assets/imgs/high-risk.svg"),
          title: "Highrisk"
        },
        {
          img: require("@/assets/imgs/social.svg"),
          title: "Social"
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
