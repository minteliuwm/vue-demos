<template>
  <div class="m-editor">
    <!-- 右边侧边栏 -->
    <div class="bar"></div>
    <!-- console分割线 -->
    <div class="line" v-show="consoleVisible" :style="lineStyle" @mousedown="_onMouseDown"></div>
    <div class="function">
      <span class="link" @click="formatSql">格式化</span>
      <span class="link" @click="toggleConsole">{{consoleVisible ? '隐藏控制台' : '显示控制台'}}</span>
    </div>
    <div class="middle">
      <u-ide
        ref="editor"
        v-model="sql"
        @editor-format="_onEditorFormat"
      ></u-ide>
    </div>
    <div class="console" v-show="consoleVisible" :style="consoleStyle">
      这是控制台
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UIde from '../../components/ide/index.vue';

import { debounce } from 'lodash';

@Component({
  components: {
    UIde
  }
})
export default class Editor extends Vue {
  sql: string = '';

  height: number = 350;

  consoleVisible: boolean = false;

  lineElm?: HTMLElement;

  debounceResize: any;

  get consoleStyle() {
    return {
      height: this.height + 'px'
    };
  }

  get lineStyle() {
    return {
      bottom: this.height + 'px'
    };
  }

  mounted() {
    this.lineElm = this.$el.getElementsByClassName('line')[0] as HTMLElement;
    this.debounceResize = debounce(this._resizeEditor, 300);
  }

  _onMouseDown(e: MouseEvent) {
    e.preventDefault();
    document.addEventListener('mouseup', this._onMouseUp);
    document.addEventListener('mousemove', this._onMouseMove);
  }

  _onMouseUp() {
    document.removeEventListener('mouseup', this._onMouseUp);
    document.removeEventListener('mousemove', this._onMouseMove);
  }

  _onMouseMove(e: MouseEvent) {
    e.preventDefault();
    const clientY = e.clientY;
    const el = this.$el as HTMLElement;
    const elTop = el.offsetTop;
    const elHeight = el.clientHeight;
    const height = elHeight - (clientY - elTop);
    this.height = height < 250 ? 250 : (height > Math.ceil(elHeight * 0.6) ? Math.ceil(elHeight * 0.6) : height);
    this.debounceResize();
  }

  _resizeEditor() {
    const editor = this.$refs.editor as UIde;
    editor && editor.resize();
  }

  _onEditorFormat() {
    this.formatSql();
  }

  formatSql() {
    const editor = this.$refs.editor as UIde;
    editor && editor.executeCommand('format');
  }

  toggleConsole() {
    this.consoleVisible = !this.consoleVisible;
    this.$nextTick(() => {
      this._resizeEditor();
    });
  }
}
</script>

<style lang="scss">
.m-editor {
  display: flex;
  flex-direction: column;
  position: relative;
  .bar {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 35px;
  }
  .line {
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    height: 4px;
    border-bottom: 1px solid #fff;
    cursor: row-resize;
    z-index: 10;
  }
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
    .link + .link {
      margin-left: 16px;
    }
  }
  .middle {
    flex: 1;
    height: 0;
    width: 100%;
    padding-right: 35px;
    box-sizing: border-box;
  }
  .console {
    min-height: 250px;
    z-index: 9;
  }
}
</style>
