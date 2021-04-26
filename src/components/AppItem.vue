<template>
  <div :class="b()">
    <img
        :class="b('icon')"
        :src="iconURL"
        height="50"
      >
    <div :class="b('info')">
      <div :class="b('title')">
        {{ title }}
      </div>
      <div :class="b('domain')">
        {{ domain }}
      </div>
    </div>
    <a
      :class="b('link')"
      :href="url"
      target="_blank">
      Launch
    </a>
  </div>
</template>

<script>
import { IPFS } from '@/config'

export default {
  name: 'AppItem',
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  computed: {
    iconURL() {
      return `${IPFS}/${this.icon}`;
    },
    domain() {
      const { hostname } = new URL(this.url);
      return hostname;
    }
  }
}
</script>

<style lang="scss">
.AppItem {
  cursor: pointer;

  display: flex;
  align-items: center;

  min-width: 250px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  width: 50%;
  margin: 5px;
  padding-right: 16px;;

  &__link {
    z-index: 99;
    cursor: pointer;
    border: 1px solid var(--border-color);
    background-color: transparent;
    color: var(--link-color);
    border-radius: 23px;
    padding: 0 24px;
    outline: none;
    line-height: 46px;
    height: 46px;
    font-size: 18px;
    font-family: inherit;

    &:hover {
      border-color: var(--link-color);
    }
  }

  &__icon {
    border-radius: 100%;
    margin: 8px;
    margin-left: 16px;
  }

  &__info {
    width: 100%;
    padding-left: 30px;
  }

  &__title {
    font-weight: bold;
    font-size: 21px;
    color: var(--link-color);
  }

  &__domain {
    color: var(--border-color);
  }

  &:hover {
    border-color: var(--link-color);
  }
}
</style>