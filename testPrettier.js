const prettier = require("prettier");

const code = `
const writeToClipboard = async () => {
                   try {
    await navigator.clipboard.writeText(userText);
                        console.log('Text copied to the clipboard');
  } catch (error) {
console.log(error);
  }
};

const readFromClipboard = async () => {
  try {
              const clipboardText = await navigator.clipboard.readText();
    console.log(clipboardText);
  }                  catch (error) {
console.log(error);
  }
};
`;

async function formatCode() {
  try {
    const formattedCode = await prettier.format(code, { parser: "babel" });
    console.log("Formatted code:", formattedCode);
  } catch (error) {
    console.error("Error formatting code with Prettier:", error);
  }
}

formatCode();
