<template>
  <div class="home-nav">
    <div class="list">
      <div v-for="(nav, index) in navList" :key="index">
        <hr v-if="nav.split">
        <router-link v-else :title="nav.title" :to="{path: '/home' + nav.path}">
          {{nav.title}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface Nav {
  path: string;
  title: string;
}

@Component
export default class HomeNav extends Vue {
  navList: Array<Nav> = [{
    path: "/demo1",
    title: "示例1"
  }, {
    path: "/demo2",
    title: "示例2"
  }]
}
</script>

<style lang="scss">
.home-nav {
  width: 200px;
  background-color: #484c5e;
  .list {
    padding-top: 10px;
    a {
      display: block;
      padding: 10px 0 10px 28px;
      color: #fff;
      &.router-link-active {
        background-color: #5594dc;
      }
      &:hover {
        background-color: #5594dc;
      }
    }
    hr {
      margin: 10px 16px;
      border: 1px solid;
      border-bottom-width: 0;
      color: #646878;
    }
  }
}
</style>
