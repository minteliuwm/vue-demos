<template>
	<div class="u-editor" :style="editorStyle">
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator';

declare const CodeMirror: any;

const DEFAULT_OPTIONS: object = {
  mode: 'text/x-mysql',
  extraKeys: {
    'Tab': 'autocomplete'
  },
  lineNumbers: true,
  lineWrapping: true,
  autofocus: true
};

@Component
export default class UEditor extends Vue {
  @Model('change', {
    type: String
  })
  value!: string;

  @Prop()
  height!: string;

  @Prop()
  width!: string;

  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  options: object = DEFAULT_OPTIONS;

  codeMirror: any;

  get editorStyle() {
    return {
      height: this.height ? this._px(this.height) : '100%',
      width: this.width ? this._px(this.width) : '100%'
    };
  }

  mounted() {
    const codeMirror = this.codeMirror = CodeMirror(this.$el, this.options);
    codeMirror.setValue(this.value);
    this.codeMirror.on('change', () => {
      const v = codeMirror.getValue();
      this.$emit('update:value', v);
      this.$emit('change', v);
    });
  }

  _px(n: string) {
    return /^\d*$/.test(n) ? n + 'px' : n;
  }

  resize() {
    this.codeMirror && this.codeMirror.refresh();
  }
}
</script>

<style lang="scss">
.CodeMirror {
  height: 100%;
}
</style>
