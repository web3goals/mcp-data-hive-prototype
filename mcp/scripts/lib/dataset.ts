import { logger } from "./logger";
import { loadJsonData } from "./recall";

/**
 * TODO: Implement:
 * 1. Find datasets in the database by symbol and source
 * 2. Find a dataset that can be accessed by access token
 * 3. Load a dataset from Recall using the dataset key
 * 4. Return dataset
 */
export async function getCandles(
  accessToken: string,
  symbol: string,
  source: string
): Promise<Object | undefined> {
  logger.info(
    `Getting candles for '${accessToken}', '${symbol}', '${source}'...`
  );
  if (
    symbol.toLowerCase() === "trump" &&
    source.toLowerCase() === "meteora" &&
    accessToken === "42"
  ) {
    const datasetKey = "f743c0d2-5f42-4b57-96ca-cc79c7b833b8";
    const dataset = await loadJsonData(datasetKey);
    return dataset;
  }
  return undefined;
}

// TODO: Implement
export async function getSentiment(
  accessToken: string,
  symbol: string,
  source: string
): Promise<Object | undefined> {
  logger.info(
    `Getting sentiment for '${accessToken}', '${symbol}', '${source}'...`
  );
  if (
    symbol.toLowerCase() === "trump" &&
    source.toLowerCase() === "x" &&
    accessToken === "42"
  ) {
    const datasetKey = "cbc67f9a-9dbe-4aba-b8d0-ce8a804e4c67";
    const dataset = await loadJsonData(datasetKey);
    return dataset;
  }
  return undefined;
}
