const express = require("express");
const hljs = require("highlight.js");
const puppeteer = require("puppeteer");
const generateCodeOnlyHtmlTemplate = require("../templates/codeOnlyHtmlTemplate");

const router = express.Router();

router.post("/generate-code-image", async (req, res) => {
  const { code, language } = req.body;

  if (typeof code !== "string" || code.length === 0) {
    return res.status(400).send("Code is required");
  }

  let browser;

  try {
    const highlightedCode =
      language && hljs.getLanguage(language)
        ? hljs.highlight(code, { language }).value
        : hljs.highlightAuto(code).value;

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
