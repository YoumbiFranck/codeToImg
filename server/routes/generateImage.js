const express = require("express");
const puppeteer = require("puppeteer");
const hljs = require("highlight.js");
const prettier = require("prettier");
const { languages, getBase64Icon } = require("../utils/utilities");
const themes = require("../css/themes");
const generateHtmlTemplate = require("../templates/htmlTemplate");
const presets = require("../presets/presets");

const router = express.Router();

// Mapping the language to a Prettier parser
const prettierParsers = {
  javascript: "babel", // JavaScript
  html: "html", // HTML
  css: "css", // CSS
  json: "json", // JSON
  typescript: "typescript", // TypeScript
  markdown: "markdown", // Markdown
  yaml: "yaml", // YAML
  graphql: "graphql", // GraphQL
  vue: "vue", // Vue.js components
  // Add more mappings as needed
};

router.post("/generate-image", async (req, res) => {
  const {
    code,
    language,
    theme,
    background,
    padding,
    filename,
    fontSize,
    fontFamily,
    watermark,
    heading,
    description,
    headingColor,
    descriptionColor,
    headingFontSize,
    descriptionFontSize,
    headingPadding,
    descriptionPadding,
    preset, // Accept a preset from the request body
  } = req.body;

  if (!code || !language) {
    return res.status(400).send("Code and language are required");
  }

  let browser;

  try {
    // Ensure the code is a string
    const codeToFormat = typeof code === "string" ? code : String(code);

    // Determine the appropriate parser for Prettier
    const parser = prettierParsers[language.toLowerCase()] || "babel";

    console.log("Formatting code with Prettier using parser:", parser);

    // Format the code using Prettier asynchronously
    let formattedCode;
    try {
      formattedCode = await prettier.format(codeToFormat, { parser });
      console.log("Formatted code:", formattedCode); // Debugging log
    } catch (formatError) {
      console.error("Error formatting code with Prettier:", formatError);
      formattedCode = codeToFormat; // Fallback to original code if formatting fails
    }

    // Ensure the formatted code is a string
    if (typeof formattedCode !== "string") {
      console.error(
        "Formatted code is not a string. Type:",
        typeof formattedCode
      );
      throw new TypeError("Formatted code is not a string");
    }

    const languageConfig = languages.find(
      (lang) => lang.name.toLowerCase() === language.toLowerCase()
    );
    const logoUrl = languageConfig ? getBase64Icon(languageConfig.icon) : "";

    const selectedPreset = preset ? presets[preset] : {};

    const selectedFontSize = selectedPreset.fontSize || fontSize || "16px";
    const selectedHeadingFontSize =
      selectedPreset.headingFontSize || headingFontSize || "24px";
    const selectedDescriptionFontSize =
      selectedPreset.descriptionFontSize || descriptionFontSize || "14px";

    const selectedBackground = background || "#2e2e2e";
    const headerBackground = "#333";
    const selectedPadding = padding || "1rem";
    const selectedFilename = filename || "file.ts";
    const selectedFontFamily = fontFamily || "Fira Code, monospace";
    const selectedTheme = themes[theme] || themes.monokai;
    const selectedWatermark = watermark || "";
    const selectedHeading = heading || "Code Snippet";
    const selectedDescription =
      description || "Description of the code snippet.";
    const selectedHeadingColor = headingColor || "#fff";
    const selectedDescriptionColor = descriptionColor || "#bbb";
    const selectedHeadingPadding = headingPadding || "10px 0";
    const selectedDescriptionPadding = descriptionPadding || "0 0 20px";

    // Highlight the formatted code
    const highlightedCode = hljs.highlight(formattedCode, { language }).value;

    const htmlContent = generateHtmlTemplate(
      highlightedCode,
      selectedBackground,
      headerBackground,
      selectedPadding,
      selectedFilename,
      selectedTheme,
      selectedFontSize,
      selectedFontFamily,
      selectedWatermark,
      selectedHeading,
      selectedDescription,
      selectedHeadingColor,
      selectedDescriptionColor,
      selectedHeadingFontSize,
      selectedDescriptionFontSize,
      selectedHeadingPadding,
      selectedDescriptionPadding,
      logoUrl
    );

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
      width: selectedPreset.viewportWidth || 375,
      height: selectedPreset.viewportHeight || 812,
      deviceScaleFactor: 3, // High device scale factor for better resolution
    });

    await page.setContent(htmlContent);

    const imageBuffer = await page.screenshot({
      fullPage: true,
      type: "png",
      omitBackground: true,
    });

    res.set("Content-Type", "image/png");
    res.send(imageBuffer);
  } catch (error) {
    console.error("An error occurred:", error);
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
