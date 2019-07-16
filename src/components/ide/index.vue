<template>
  <div class="u-ide"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator';
import * as monaco from 'monaco-editor';
import { language as sqlLanguage } from '../../lib/sql';
import Bus from '../../bus';

import { debounce } from 'lodash';

@Component
export default class UIde extends Vue {
  @Model('change', {
    type: String
  })
  value!: string;

  @Prop()
  options!: object;

  editor: any;

  _resize: any;

  oldValue: string = '';

  @Watch('value')
  onValueChanged(val: string) {
    if (this.oldValue !== val && this.editor) {
      this.editor.setValue(val);
    }
  }

  created() {
    this._resize = debounce(this.resize, 500);
    window.addEventListener('resize', this._resize);
    Bus.$on('theme_change', this.handleChangeTheme);
  }

  beforeDestroy() {
    window.removeEventListener('resize', this._resize);
    Bus.$off('theme_change', this.handleChangeTheme);
  }

  /**
   * Monaco Editor
   * API： https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html
   * 主要配置： https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html
   */
  mounted() {
    const theme = localStorage.getItem('custom_theme') || 'dark';
    const editor = this.editor = monaco.editor.create(this.$el as HTMLElement, Object.assign({
      language: 'sql',
      theme: theme === 'dark' ? 'vs-dark' : 'vs',
      fontSize: 12,
      folding: true,
      autoIndent: true,
      renderLineHighlight: 'line',
      scrollBeyondLastLine: false,
      wordWrap: 'on'
    }, this.options));

    this._registerSql();

    editor.setValue(this.value);

    editor.onDidChangeModelContent(e => {
      const val = editor.getValue();
      this.$emit('update:value', val);
      this.$emit('change', val);
      this.oldValue = val;
    });
  }

  resize() {
    this.editor && this.editor.layout();
  }

  handleChangeTheme() {
    const theme = localStorage.getItem('custom_theme') || 'dark';
    monaco && monaco.editor.setTheme(theme === 'dark' ? 'vs-dark' : 'vs');
  }

  /**
   * sql 关键字提示
   */
  _registerSql() {
    monaco.languages.registerCompletionItemProvider('sql', {
      provideCompletionItems: (model, position, context, token) => {
        const textUntilPosition = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        });
        const match = textUntilPosition.match(/(\S+)$/);
        const suggestions: monaco.languages.CompletionItem[] = [];
        if (match) {
          const matchStr = match[0].toUpperCase();
          sqlLanguage.keywords.forEach((item: string) => {
            if (item.startsWith(matchStr)) {
              suggestions.push({
                label: item,
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: item
              } as monaco.languages.CompletionItem);
            }
          });
          sqlLanguage.operators.forEach((item: string) => {
            if (item.startsWith(matchStr)) {
              suggestions.push({
                label: item,
                kind: monaco.languages.CompletionItemKind.Operator,
                insertText: item
              } as monaco.languages.CompletionItem);
            }
          });
          sqlLanguage.builtinFunctions.forEach((item: string) => {
            if (item.startsWith(matchStr)) {
              suggestions.push({
                label: item,
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: item
              } as monaco.languages.CompletionItem);
            }
          });
        }
        return {
          suggestions: Array.from(new Set(suggestions))
        };
      }
    });
  }
}
</script>

<style lang="scss">
.u-ide {
  height: 100%;
}
</style>
