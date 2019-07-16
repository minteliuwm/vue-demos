<template>
	<div class="home">
		<home-header />
		<div class="main">
			<home-nav />
			<home-content />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeHeader from './header.vue';
import HomeNav from './nav.vue';
import HomeContent from './content.vue';

@Component({
  components: {
    HomeHeader,
    HomeNav,
    HomeContent
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .main {
    min-width: 1360px;
    min-height: 700px;
    display: flex;
    flex: 1;
    height: 0;
  }
}
</style>
