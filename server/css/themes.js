// themes.js
const themes = {
    monokai: `
      pre code.hljs {
        display: block;
        overflow-x: auto;
        padding: 1em;
      }
      code.hljs {
        padding: 3px 5px;
      }
      .hljs-comment,
      .hljs-quote {
        color: #75715e;
      }
      .hljs-keyword,
      .hljs-selector-tag,
      .hljs-subst {
        color: #f92672;
      }
      .hljs-number,
      .hljs-literal,
      .hljs-variable,
      .hljs-template-variable,
      .hljs-tag .hljs-attr {
        color: #ae81ff;
      }
      .hljs-string,
      .hljs-doctag,
      .hljs-title,
      .hljs-section,
      .hljs-selector-id,
      .hljs-selector-class {
        color: #a6e22e;
      }
      .hljs-attribute {
        color: #f4bf75;
      }
      .hljs-symbol,
      .hljs-bullet,
      .hljs-link,
      .hljs-meta,
      .hljs-deletion {
        color: #e6db74;
      }
      .hljs-addition {
        color: #e6db74;
      }
      .hljs-emphasis {
        font-style: italic;
      }
      .hljs-strong {
        font-weight: bold;
      }
      .hljs {
        display: block;
        overflow-x: auto;
        background: #272822;
        color: #f8f8f2;
        padding: 0.5em;
      }
    `,
    twilight: `
      pre code.hljs {
        display: block;
        overflow-x: auto;
        padding: 1em;
      }
      code.hljs {
        padding: 3px 5px;
      }
      .hljs-comment,
      .hljs-quote {
        color: #5f5a60;
      }
      .hljs-keyword,
      .hljs-selector-tag,
      .hljs-subst {
        color: #cda869;
      }
      .hljs-number,
      .hljs-literal,
      .hljs-variable,
      .hljs-template-variable,
      .hljs-tag .hljs-attr {
        color: #9b859d;
      }
      .hljs-string,
      .hljs-doctag,
      .hljs-title,
      .hljs-section,
      .hljs-selector-id,
      .hljs-selector-class {
        color: #8f9d6a;
      }
      .hljs-attribute {
        color: #fad07a;
      }
      .hljs-symbol,
      .hljs-bullet,
      .hljs-link,
      .hljs-meta,
      .hljs-deletion {
        color: #cf6a4c;
      }
      .hljs-addition {
        color: #f9ee98;
      }
      .hljs-emphasis {
        font-style: italic;
      }
      .hljs-strong {
        font-weight: bold;
      }
      .hljs {
        display: block;
        overflow-x: auto;
        background: #141414;
        color: #f7f7f7;
        padding: 0.5em;
      }
    `,
    terminal: `
      pre code.hljs {
        display: block;
        overflow-x: auto;
        padding: 1em;
      }
      code.hljs {
        padding: 3px 5px;
      }
      .hljs-comment,
      .hljs-quote {
        color: #969896;
      }
      .hljs-keyword,
      .hljs-selector-tag,
      .hljs-subst {
        color: #a71d5d;
      }
      .hljs-number,
      .hljs-literal,
      .hljs-variable,
      .hljs-template-variable,
      .hljs-tag .hljs-attr {
        color: #0086b3;
      }
      .hljs-string,
      .hljs-doctag,
      .hljs-title,
      .hljs-section,
      .hljs-selector-id,
      .hljs-selector-class {
        color: #ed6a43;
      }
      .hljs-attribute {
        color: #795da3;
      }
      .hljs-symbol,
      .hljs-bullet,
      .hljs-link,
      .hljs-meta,
      .hljs-deletion {
        color: #333333;
      }
      .hljs-addition {
        color: #a8ff60;
      }
      .hljs-emphasis {
        font-style: italic;
      }
      .hljs-strong {
        font-weight: bold;
      }
      .hljs {
        display: block;
        overflow-x: auto;
        background: #000;
        color: #fff;
        padding: 0.5em;
      }
    `,
    // Add other themes as needed...
  };
  
  module.exports = themes;
  