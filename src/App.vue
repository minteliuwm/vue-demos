<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  created() {
    const theme = localStorage.getItem('custom_theme');
    document.documentElement.setAttribute('data-theme', theme || 'dark');
    if (!theme) {
      localStorage.setItem('custom_theme', 'dark');
    }
  }
}
</script>

<style lang="scss">
@import './scss/index.scss';

#app {
  width: 100%;
  height: 100%;
  [data-theme='dark'] & {
    background-color: $background-color-dark;
    color: $font-color-dark;
    .header {
      background-color: #292c38;
      .item {
        &:hover {
          background-color: #1a1d2a;
        }
      }
    }
    .nav {
      background-color: #484c5e;
      .item {
        &.router-link-active {
          background-color: #2c213a;
        }
        &:hover {
          background-color: #292d35;
        }
      }
      .hr {
        color: #646878;
      }
    }
  }

  [data-theme='light'] & {
    .body {
      background-color: $background-color-light;
      color: $font-color-light;
    }
    .header {
      background-color: #ddd;
      .item {
        &:hover {
          background-color: #4b89d7;
        }
      }
    }
    .nav {
      background-color: #f3f3f3;
      .item {
        &.router-link-active {
          background-color: #3274e6;
        }
        &:hover {
          background-color: #4b89d7;
        }
      }
      .hr {
        color: #646878;
      }
    }
  }
}
</style>
