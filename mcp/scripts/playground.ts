import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { generatePrivateKey, privateKeyToAddress } from "viem/accounts";
import { logger } from "./lib/logger";
import { loadJsonData, saveJsonData } from "./lib/recall";

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createWallet() {
  logger.info("Creating a new wallet...");
  const privateKey = generatePrivateKey();
  const address = privateKeyToAddress(privateKey);
  logger.info(`New Wallet Address: ${address}`);
  logger.info(`Private Key: ${privateKey}`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function useRecall() {
  logger.info("Using Recall...");

  const key = uuidv4();
  const data = { message: "Hello world!" };
  await saveJsonData(data, key);
  logger.info(`Data saved with key: ${key}`);

  const loadedData = await loadJsonData(key);
  logger.info(`Data loaded: ${JSON.stringify(loadedData)}`);
}

async function main() {
  logger.info("Starting playground...");
}

main().catch((error) => {
  logger.error(error);
  process.exitCode = 1;
});
