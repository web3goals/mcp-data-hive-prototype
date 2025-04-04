import { testnet } from "@recallnet/chains";
import * as dotenv from "dotenv";
import { createWalletClient, Hex, http } from "viem";
import {
  generatePrivateKey,
  privateKeyToAccount,
  privateKeyToAddress,
} from "viem/accounts";
import { logger } from "./lib/logger";

dotenv.config();

function createWallet() {
  logger.info("Creating a new wallet...");
  const privateKey = generatePrivateKey();
  const address = privateKeyToAddress(privateKey);
  logger.info(`New Wallet Address: ${address}`);
  logger.info(`Private Key: ${privateKey}`);
}

async function useRecall() {
  logger.info("Using Recall...");

  // Create a new wallet
  const walletClient = createWalletClient({
    account: privateKeyToAccount(process.env.RECALL_ACCOUNT_PRIVATE_KEY as Hex),
    chain: testnet,
    transport: http(),
  });

  // Create a new Recall client and bucket manager
  const { RecallClient } = await import("@recallnet/sdk/client");
  const client = new RecallClient({ walletClient });
  const bucketManager = client.bucketManager();

  // Define the bucket and object key
  const bucket = "0xff00000000000000000000000000000000036074";
  const key = "hello/world";

  // Add an object to the bucket
  const originalContent = new TextEncoder().encode("Hello world!");
  const file = new File([originalContent], "file.txt", {
    type: "text/plain",
  });
  const { meta: addMeta } = await bucketManager.add(bucket, key, file);
  logger.info(`Object added at: ${addMeta?.tx?.transactionHash}"`);

  // Get the object from the bucket
  const { result: object } = await bucketManager.get(bucket, key);
  const receivedContent = new TextDecoder().decode(object);
  logger.info(`Received content: ${receivedContent}`);
}

async function main() {
  logger.info("Starting playground...");
}

main().catch((error) => {
  logger.error(error);
  process.exitCode = 1;
});
