import { logger } from "./lib/logger";

async function main() {
  logger.info("Starting server...");
}

main().catch((error) => {
  logger.error(error);
  process.exitCode = 1;
});