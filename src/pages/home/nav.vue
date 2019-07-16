<template>
  <div class="nav">
    <div class="list">
      <div v-for="(nav, index) in navList" :key="index">
        <hr class="hr" v-if="nav.split">
        <router-link class="item" v-else :title="nav.title" :to="{path: '/home' + nav.path}">
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
    path: '/editor',
    title: '编辑器'
  }, {
    path: '/demo2',
    title: '示例2'
  }]
}
</script>

<style lang="scss">
.nav {
  width: 200px;
  .list {
    padding-top: 10px;
    .item {
      display: block;
      padding: 10px 0 10px 28px;
    }
    .hr {
      margin: 10px 16px;
      border: 1px solid;
      border-bottom-width: 0;
    }
  }
}
</style>
