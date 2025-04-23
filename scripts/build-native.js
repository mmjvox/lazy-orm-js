const { execSync } = require("childprocess");
const path = require("path");
const fs = require("fs");

const buildDir = path.join(__dirname, "..", "native-lib", "build");

if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir);

try {
  execSync(`cmake .. && cmake --build .`, {
    cwd: buildDir,
    stdio: "inherit",
  });
} catch (err) {
  console.error("❌ Failed to build native lib:", err);
  process.exit(1);
}
