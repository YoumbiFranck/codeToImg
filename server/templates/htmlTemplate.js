const generateHtmlTemplate = (
  highlightedCode,
  selectedBackground,
  headerBackground,
  selectedPadding,
  selectedFilename,
  selectedTheme,
  selectedFontSize,
  selectedFontFamily,
  watermark,
  heading,
  description,
  headingColor,
  descriptionColor,
  headingFontSize,
  descriptionFontSize,
  headingPadding,
  descriptionPadding,
  logoUrl
) => `
    <html>
    <head>
        <style>
            body {
                margin: 0;
                background: ${selectedBackground};
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-height: 100vh; /* Ensure the body takes the full height */
                font-family: ${selectedFontFamily};
                color: white;
                padding: 20px;
                box-sizing: border-box; /* Include padding in width/height calculations */
            }
            .container {
                text-align: center;
                margin-bottom: 20px;
                width: 100%; /* Ensure the container takes full width */
                max-width: 1000px; /* Set a max width to prevent overflow */
            }
            .heading {
                font-size: ${headingFontSize};
                font-weight: bold;
                margin-bottom: 10px;
                color: ${headingColor};
                padding: ${headingPadding};
            }
            .description {
                font-size: ${descriptionFontSize};
                margin-bottom: 20px;
                color: ${descriptionColor};
                padding: ${descriptionPadding};
            }
            .window {
                width: 100%;
                max-width: 900px; /* Max width to ensure content does not overflow */
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                background: ${headerBackground};
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 10px; /* Add padding inside the window */
                box-sizing: border-box;
            }
            .header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.5rem 1rem;
                background-color: ${headerBackground};
                color: white;
                font-family: ${selectedFontFamily};
                width: 100%;
                box-sizing: border-box;
            }
            .header .buttons {
                display: flex;
                gap: 0.5rem;
            }
            .header .buttons .button {
                width: 12px;
                height: 12px;
                border-radius: 50%;
            }
            .button.close {
                background-color: #ff5f56;
            }
            .button.minimize {
                background-color: #ffbd2e;
            }
            .button.maximize {
                background-color: #27c93f;
            }
            .filename {
                flex-grow: 1;
                text-align: center;
                font-weight: bold;
            }
            .language-logo {
                width: 24px;
                height: 24px;
            }
            .content {
                width: 100%;
                max-width: 900px; /* Adjust the width to fit the content */
                padding: ${selectedPadding};
                background: ${headerBackground};
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            pre {
                font-family: ${selectedFontFamily};
                font-size: ${selectedFontSize};
                line-height: 1.5;
                color: #eaeaea;
                margin: 0;
                white-space: pre-wrap;
                word-wrap: break-word;
                width: 100%;
                box-sizing: border-box;
            }
            code {
                display: block;
                white-space: pre-wrap;
                word-wrap: break-word;
                text-align: left; /* Align code content to the left for readability */
            }
            .watermark {
                position: absolute;
                bottom: 10px;
                right: 10px;
                font-family: ${selectedFontFamily};
                font-size: 12px;
                color: rgba(255, 255, 255, 0.5);
            }
            ${selectedTheme}
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap" rel="stylesheet">
    </head>
    <body>
        <div class="container">
            <div class="heading">${heading}</div>
            <div class="description">${description}</div>
        </div>
        <div class="window">
            <div class="header">
                <div class="buttons">
                    <div class="button close"></div>
                    <div class="button minimize"></div>
                    <div class="button maximize"></div>
                </div>
                <div class="filename">${selectedFilename}</div>
                <img src="${logoUrl}" alt="Logo" class="language-logo" />
            </div>
            <div class="content">
                <pre><code class="hljs">${highlightedCode}</code></pre>
            </div>
            <div class="watermark">${watermark}</div>
        </div>
    </body>
    </html>
    `;

module.exports = generateHtmlTemplate;
