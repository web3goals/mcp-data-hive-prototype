import * as dotenv from "dotenv";
dotenv.config();

import { v4 as uuidv4 } from "uuid";
import { Hex } from "viem";
import { generatePrivateKey, privateKeyToAddress } from "viem/accounts";
import { logger } from "./lib/logger";
import { loadJsonData, saveJsonData } from "./lib/recall";
import { findDatasets } from "./mongodb/services/dataset-service";

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

  const data = { message: "Hello world!" };
  const bucket = process.env.RECALL_BUCKET as Hex;
  const key = uuidv4();
  await saveJsonData(data, bucket, key);
  logger.info(`Data saved with key: ${key} in bucket: ${bucket}`);

  const loadedData = await loadJsonData(bucket, key);
  logger.info(`Data loaded: ${JSON.stringify(loadedData)}`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function useDatasets() {
  logger.info("Using datasets...");

  const datasets = await findDatasets({
    type: "CANDLES",
  });
  logger.info(`Datasets: ${JSON.stringify(datasets, null, 2)}`);
}

async function main() {
  logger.info("Starting playground...");
}

main().catch((error) => {
  logger.error(error);
  process.exitCode = 1;
});
