<template>
	<div class="home-header">
		<div class="methods">
			<div class="item" @click="clickToChangeSkin">换肤</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HomeHeader extends Vue {
  clickToChangeSkin(): void {

  }
}
</script>

<style lang="scss">
.home-header {
	min-width: 1360px;
  flex: 0 0 56px;
  position: relative;
  height: 56px;
  background-color: #2f3240;
  color: #fff;
  .item {
    float: left;
    width: 152px;
    height: 100%;
    line-height: 56px;
    text-align: center;
		cursor: pointer;
		user-select: none;
		font-size: 14px;
		&-active,
    &:hover {
      background-color: #1a1d2a;
    }
  }
  .methods {
    float: right;
    margin-right: 18px;
    .item {
      width: auto;
      padding: 0 18px;
    }
  }
}
</style>
