const generateCodeOnlyHtmlTemplate = (highlightedCode) => `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      * {
        box-sizing: border-box;
      }

      html,
      body {
        width: 600px;
        height: 400px;
        margin: 0;
        overflow: hidden;
      }

      body {
        padding: 32px;
        background: #272822;
      }

      pre {
        width: 100%;
        height: 100%;
        margin: 0;
        overflow: hidden;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
      }

      code {
        display: block;
        color: #f8f8f2;
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
        font-size: 20px;
        line-height: 1.5;
        white-space: pre-wrap;
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
      .hljs-deletion,
      .hljs-addition {
        color: #e6db74;
      }

      .hljs-emphasis {
        font-style: italic;
      }

      .hljs-strong {
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <pre><code>${highlightedCode}</code></pre>
  </body>
</html>
`;

module.exports = generateCodeOnlyHtmlTemplate;
