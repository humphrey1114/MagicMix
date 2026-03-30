const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");

const rootFiles = ["index.html", "app.js", "styles.css"];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyRootFile(fileName) {
  const sourcePath = path.join(rootDir, fileName);
  const targetPath = path.join(publicDir, fileName);

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Missing source file: ${fileName}`);
  }

  fs.copyFileSync(sourcePath, targetPath);
}

function copyDirectory(sourceDir, targetDir) {
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }

  if (fs.existsSync(sourceDir)) {
    fs.cpSync(sourceDir, targetDir, { recursive: true });
  }
}

ensureDir(publicDir);
rootFiles.forEach(copyRootFile);

copyDirectory(path.join(rootDir, "media"), path.join(publicDir, "media"));

console.log("MagicMix Vercel build output synced to /public");
