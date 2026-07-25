
# CodeToImg

CodeToImg is a web application that generates high-quality images from code snippets. The images can be customized with various themes, fonts, and other styling options.

## Features

- Supports multiple programming languages with syntax highlighting.
- Customizable themes, fonts, and background colors.
- Ability to add headings, descriptions, and watermarks.
- Generates images suitable for sharing on social media or embedding in documentation.

## Project Structure

```
server/
├── css/
├── icons/
├── routes/
│   └── generateImage.js
├── templates/
│   └── htmlTemplate.js
├── utils/
│   └── utilities.js
└── index.js
```

## Installation

### Docker (recommended)

Build and start the complete application, including Chromium:

```bash
docker compose up --build -d
```

The API is then available at `http://localhost:3000`, and its health endpoint is
`http://localhost:3000/health`.

If port 3000 is already in use, select another host port:

```bash
CODETOIMG_PORT=3001 docker compose up --build -d
```

In that example, the API is available at `http://localhost:3001`.

Useful commands:

```bash
docker compose logs -f
docker compose down
```

### Local Node.js installation

1. Clone the repository:

```bash
git clone https://github.com/YoumbiFranck/codeToImg.git
cd CodeToImg
```

2. Install dependencies from the server directory:

```bash
cd server
npm install
```

## Usage

1. Start the server from the `server` directory:

```bash
npm start
```

2. Send a POST request to `http://localhost:3000/generate-image` with the following JSON payload:

```json
{
    "code": "console.log('Hello, World!');",
    "language": "javascript",
    "theme": "monokai",
    "background": "#2e2e2e",
    "padding": "1rem",
    "filename": "example.js",
    "fontSize": "16px",
    "fontFamily": "Fira Code, monospace",
    "watermark": "CodeToImg",
    "heading": "Example Code",
    "description": "This is a sample code snippet.",
    "headingColor": "#fff",
    "descriptionColor": "#bbb",
    "headingFontSize": "24px",
    "descriptionFontSize": "14px",
    "headingPadding": "10px 0",
    "descriptionPadding": "0 0 20px"
}
```

## API Endpoints

### `POST /generate-code-image`

Generates an exact 600×400 PNG containing only the submitted code. The
successful response body is the PNG itself, with the `Content-Type: image/png`
header.

Example:

```bash
curl -X POST http://localhost:3000/generate-code-image \
  -H "Content-Type: application/json" \
  -d '{"code":"const answer = 42;","language":"javascript"}' \
  --output code.png
```

Request body:

- `code` (string, required): code displayed in the image.
- `language` (string, optional): Highlight.js language used for syntax
  highlighting. When omitted or unknown, the language is detected
  automatically.

### `POST /generate-image`

Generates an image from the provided code snippet and customization options.

#### Request Body

- `code` (string): The code snippet to be highlighted and rendered.
- `language` (string): The programming language of the code snippet.
- `theme` (string): The theme for syntax highlighting (e.g., `monokai`).
- `background` (string): The background color of the image.
- `padding` (string): Padding around the code snippet.
- `filename` (string): The name of the file displayed in the header.
- `fontSize` (string): Font size for the code snippet.
- `fontFamily` (string): Font family for the code snippet.
- `watermark` (string): Watermark text displayed on the image.
- `heading` (string): Heading text displayed above the code snippet.
- `description` (string): Description text displayed below the heading.
- `headingColor` (string): Color of the heading text.
- `descriptionColor` (string): Color of the description text.
- `headingFontSize` (string): Font size of the heading text.
- `descriptionFontSize` (string): Font size of the description text.
- `headingPadding` (string): Padding around the heading text.
- `descriptionPadding` (string): Padding around the description text.

## Example

Here is an example of a request and the resulting image:

### Request

```json
{
    "code": "console.log('Hello, World!');",
    "language": "javascript",
    "theme": "monokai",
    "background": "#2e2e2e",
    "padding": "1rem",
    "filename": "example.js",
    "fontSize": "16px",
    "fontFamily": "Fira Code, monospace",
    "watermark": "CodeToImg",
    "heading": "Example Code",
    "description": "This is a sample code snippet.",
    "headingColor": "#fff",
    "descriptionColor": "#bbb",
    "headingFontSize": "24px",
    "descriptionFontSize": "14px",
    "headingPadding": "10px 0",
    "descriptionPadding": "0 0 20px"
}
```


