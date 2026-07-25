const express = require("express");
const hljs = require("highlight.js");
const prettier = require("prettier");
const puppeteer = require("puppeteer");
const generateCodeOnlyHtmlTemplate = require("../templates/codeOnlyHtmlTemplate");

const router = express.Router();

const prettierParsers = {
  angular: "angular",
  css: "css",
  graphql: "graphql",
  html: "html",
  javascript: "babel",
  js: "babel",
  jsx: "babel",
  json: "json",
  json5: "json5",
  jsonc: "json-stringify",
  less: "less",
  markdown: "markdown",
  md: "markdown",
  mdx: "mdx",
  scss: "scss",
  typescript: "typescript",
  ts: "typescript",
  tsx: "typescript",
  vue: "vue",
  yaml: "yaml",
  yml: "yaml",
};

const formatCode = async (code, language) => {
  const normalizedLanguage =
    typeof language === "string" ? language.toLowerCase() : "";
  const parser = prettierParsers[normalizedLanguage];

  if (!parser) {
    return code;
  }

  try {
    return await prettier.format(code, {
      parser,
      printWidth: 48,
      tabWidth: 2,
      useTabs: false,
    });
  } catch (error) {
    console.warn(
      `Could not format code as ${normalizedLanguage}; using the original code.`,
      error.message
    );
    return code;
  }
};

router.post("/generate-code-image", async (req, res) => {
  const { code, language } = req.body;

  if (typeof code !== "string" || code.length === 0) {
    return res.status(400).send("Code is required");
  }

  let browser;

  try {
    const formattedCode = await formatCode(code, language);
    const highlightedCode =
      language && hljs.getLanguage(language)
        ? hljs.highlight(formattedCode, { language }).value
        : hljs.highlightAuto(formattedCode).value;

    const htmlContent = generateCodeOnlyHtmlTemplate(highlightedCode);
    const launchArgs =
      process.env.PUPPETEER_NO_SANDBOX === "true"
        ? ["--no-sandbox", "--disable-setuid-sandbox"]
        : [];

    browser = await puppeteer.launch({
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args: launchArgs,
    });

    const page = await browser.newPage();
    await page.setViewport({
      width: 600,
      height: 400,
      deviceScaleFactor: 1,
    });
    await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });

    const imageBuffer = await page.screenshot({
      type: "png",
      clip: {
        x: 0,
        y: 0,
        width: 600,
        height: 400,
      },
    });

    res.type("png").send(imageBuffer);
  } catch (error) {
    console.error("Could not generate the code-only image:", error);
    res.status(500).send("An error occurred");
  } finally {
    if (browser) {
      await browser.close().catch((error) => {
        console.error("Could not close the browser:", error);
      });
    }
  }
});

module.exports = router;
