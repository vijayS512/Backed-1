
const fs = require("fs");
const path = require("path");

const imageToBase64Data = (filePath) => {
  try {
    const imageBuffer = fs.readFileSync(filePath);

    const ext = path.extname(filePath).toLowerCase();

    const mimeTypes = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".webp": "image/webp",
    };

    const mimeType = mimeTypes[ext];

    if (!mimeType) {
      throw new Error(`Unsupported image format: ${ext}`);
    }

    return `{data:${mimeType};base64,${imageBuffer.toString("base64")}`;
  } catch (error) {
    console.error("Error converting image:", error);
    throw new Error("Failed to convert image to base64");
  }
};

module.exports = imageToBase64Data;