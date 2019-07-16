<template>
  <div class="m-editor">
    <div class="function">
      <span class="link" @click="formatSql">格式化</span>
    </div>
    <div class="content">
      <u-ide
        ref="editor"
        v-model="sql"
      ></u-ide>
      <div class="bar"></div>
    </div>
    <div class="console"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UIde from '../../components/ide/index.vue';

import sqlFormatter from 'sql-formatter';

@Component({
  components: {
    UIde
  }
})
export default class Editor extends Vue {
  sql: string = '';

  formatSql() {
    this.sql = sqlFormatter.format(this.sql);
  }
}
</script>

<style lang="scss">
.m-editor {
  display: flex;
  flex-direction: column;
  .function {
    line-height: 32px;
    padding: 0 10px;
    box-sizing: border-box;
    .link {
      cursor: pointer;
      &:hover {
        color: #3274e6;
      }
    }
  }
  .content {
    flex: 1;
    height: 0;
    width: 100%;
    padding-right: 35px;
    box-sizing: border-box;
    position: relative;
    .bar {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 35px;
    }
  }
}
</style>
