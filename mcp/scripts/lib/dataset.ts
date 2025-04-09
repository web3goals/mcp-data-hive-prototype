import { Hex } from "viem";
import { findDatasets } from "../mongodb/services/dataset-service";
import { logger } from "./logger";
import { loadJsonData } from "./recall";
import { Dataset } from "../mongodb/models/dataset";

export async function getDatasets(accessToken: string): Promise<Dataset[]> {
  logger.info(`Getting datasets for '${accessToken}'...`);
  const buyerId = accessToken;
  return await findDatasets({
    buyerId: buyerId,
  });
}

export async function getCandles(
  accessToken: string,
  symbol: string,
  source: string
): Promise<object | undefined> {
  logger.info(
    `Getting candles for '${accessToken}', '${symbol}', '${source}'...`
  );
  const buyerId = accessToken;
  const datasets = await findDatasets({
    type: "CANDLES",
    attributes: { symbol, source },
    buyerId: buyerId,
  });
  const dataset = datasets[0];
  if (!dataset) {
    return undefined;
  }
  const datasetData = await loadJsonData(
    dataset.data.bucket as Hex,
    dataset.data.key
  );
  return datasetData;
}

export async function getSentiment(
  accessToken: string,
  symbol: string,
  source: string
): Promise<object | undefined> {
  logger.info(
    `Getting sentiment for '${accessToken}', '${symbol}', '${source}'...`
  );
  const buyerId = accessToken;
  const datasets = await findDatasets({
    type: "SENTIMENT",
    attributes: { symbol, source },
    buyerId: buyerId,
  });
  const dataset = datasets[0];
  if (!dataset) {
    return undefined;
  }
  const datasetData = await loadJsonData(
    dataset.data.bucket as Hex,
    dataset.data.key
  );
  return datasetData;
}
