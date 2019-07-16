<template>
  <div class="content">
    <div class="page">
      <router-view class="page-content"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HomeContent extends Vue {}
</script>

<style lang="scss">
.content {
  flex: 1;
  overflow-x: auto;
  .page {
    min-width: 1160px;
    height: 100%;
    box-sizing: border-box;
		overflow: auto;
		&-content {
			height: 100%;
		}
  }
}
</style>
