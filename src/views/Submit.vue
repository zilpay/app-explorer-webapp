<template>
  <main :class="b()">
    <div :class="b('wrapper')">
      <router-link :to="{ name: 'SubmitAd' }">
        <Card>
          <div :class="b('img-wrapper')">
            <img
              :src="require('@/assets/imgs/banner.svg')"
              height="150"
              width="150"
            />
            <Title>
              Banner
            </Title>
          </div>
        </Card>
      </router-link>
      <router-link :to="{ name: 'SubmitApp' }">
        <Card>
          <div :class="b('img-wrapper')">
            <img
              :src="require('@/assets/imgs/app.svg')"
              height="120"
              width="120"
            />
            <Title>
              Application
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
  name: "Submit",
  components: {
    Title,
    Card
  }
};
</script>

<style lang="scss">
.Submit {
  padding-top: 16px;

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__img-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
  }
}
</style>
