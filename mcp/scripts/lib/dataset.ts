import { Hex } from "viem";
import { Dataset } from "../mongodb/models/dataset";
import { findDatasets } from "../mongodb/services/dataset-service";
import { logger } from "./logger";
import { loadRecallJsonData } from "./recall";
import { loadAkaveJsonData } from "./akave";

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
  let datasetData: object | undefined = undefined;
  if (dataset.data.protocol === "RECALL") {
    datasetData = await loadRecallJsonData(
      dataset.data.bucket as Hex,
      dataset.data.key
    );
  }
  if (dataset.data.protocol === "AKAVE") {
    datasetData = await loadAkaveJsonData(
      dataset.data.bucket as Hex,
      dataset.data.name
    );
  }
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
  let datasetData: object | undefined = undefined;
  if (dataset.data.protocol === "RECALL") {
    datasetData = await loadRecallJsonData(
      dataset.data.bucket as Hex,
      dataset.data.key
    );
  }
  if (dataset.data.protocol === "AKAVE") {
    datasetData = await loadAkaveJsonData(
      dataset.data.bucket as Hex,
      dataset.data.name
    );
  }
  return datasetData;
}
