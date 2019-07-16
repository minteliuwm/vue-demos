<template>
	<div class="header">
		<div class="methods">
			<div class="item" @click="clickToChangeSkin">换肤</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Bus from '../../bus';

@Component
export default class HomeHeader extends Vue {
  clickToChangeSkin(): void {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('custom_theme', newTheme);

    Bus.$emit('theme_change', newTheme);
  }
}
</script>

<style lang="scss">
.header {
	min-width: 1360px;
  flex: 0 0 56px;
  position: relative;
  height: 56px;
  .item {
    float: left;
    width: 152px;
    height: 100%;
    line-height: 56px;
    text-align: center;
		cursor: pointer;
		user-select: none;
		font-size: 14px;
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
