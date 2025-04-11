/* eslint-disable @typescript-eslint/no-unused-vars */

import * as dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Hex } from "viem";
import { generatePrivateKey, privateKeyToAddress } from "viem/accounts";
import { loadAkaveJsonData, saveAkaveJsonData } from "./lib/akave";
import { logger } from "./lib/logger";
import { loadRecallJsonData, saveRecallJsonData } from "./lib/recall";
import { findDatasets } from "./mongodb/services/dataset-service";

function createWallet() {
  logger.info("Creating a new wallet...");
  const privateKey = generatePrivateKey();
  const address = privateKeyToAddress(privateKey);
  logger.info(`New Wallet Address: ${address}`);
  logger.info(`Private Key: ${privateKey}`);
}

async function useRecall() {
  logger.info("Using Recall...");

  const data = { message: "Hello world!" };
  const bucket = process.env.RECALL_BUCKET as Hex;
  const key = uuidv4();
  await saveRecallJsonData(data, bucket, key);
  logger.info(`Data saved with key: ${key} in bucket: ${bucket}`);

  const loadedData = await loadRecallJsonData(bucket, key);
  logger.info(`Data loaded: ${JSON.stringify(loadedData)}`);
}

async function useAkave() {
  logger.info("Using Akave...");

  const data = { message: "Hello world!" };
  const bucket = process.env.AKAVE_BUCKET as string;
  const name = uuidv4();
  await saveAkaveJsonData(data, bucket, name);
  logger.info(`Data saved with name: ${name} in bucket: ${bucket}`);

  const loadedData = await loadAkaveJsonData(bucket, name);
  logger.info(`Data loaded: ${JSON.stringify(loadedData)}`);
}

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
  if (axios.isAxiosError(error)) {
    logger.error(`Axios error: ${error.message}`);
    if (error.response) {
      logger.error(`Status: ${error.response.status}`);
      logger.error(`Data: ${JSON.stringify(error.response.data)}`);
    }
  } else {
    logger.error(error);
  }
  process.exitCode = 1;
});
