import { fileURLToPath } from "url";
import path from "path";

const GH_REPO = "https://github.com/John-Daniels/tapbot-cli/issues";
export const getDirname = (url) => {
  const __filename = fileURLToPath(url);
  const __dirname = path.dirname(__filename);
  return __dirname;
};

// Global error handler
export function handleError(error) {
  console.error("An error occurred:", error.message);
  console.error(`Please report this issue at: ${GH_REPO}`);
  process.exit(1);
}
