import { logger } from "./logger";

const fakeMeteoraTrumpCandles = [
  {
    date: "2025-03-01",
    open: 12.5,
    high: 13.2,
    low: 12.1,
    close: 12.8,
    volume: 450000000,
  },
  {
    date: "2025-03-02",
    open: 12.8,
    high: 13.5,
    low: 12.6,
    close: 13.1,
    volume: 470000000,
  },
  {
    date: "2025-03-03",
    open: 13.1,
    high: 13.8,
    low: 12.9,
    close: 13.4,
    volume: 480000000,
  },
  {
    date: "2025-03-04",
    open: 13.4,
    high: 14.0,
    low: 13.2,
    close: 13.7,
    volume: 500000000,
  },
  {
    date: "2025-03-05",
    open: 13.7,
    high: 14.5,
    low: 13.5,
    close: 14.2,
    volume: 520000000,
  },
  {
    date: "2025-03-06",
    open: 14.2,
    high: 15.0,
    low: 14.0,
    close: 14.8,
    volume: 550000000,
  },
  {
    date: "2025-03-07",
    open: 14.8,
    high: 15.6,
    low: 14.5,
    close: 15.2,
    volume: 600000000,
  },
  {
    date: "2025-03-08",
    open: 15.2,
    high: 15.9,
    low: 14.8,
    close: 15.5,
    volume: 580000000,
  },
  {
    date: "2025-03-09",
    open: 15.5,
    high: 16.2,
    low: 15.3,
    close: 15.8,
    volume: 570000000,
  },
  {
    date: "2025-03-10",
    open: 15.8,
    high: 16.5,
    low: 15.6,
    close: 16.1,
    volume: 590000000,
  },
  {
    date: "2025-03-11",
    open: 16.1,
    high: 16.8,
    low: 15.9,
    close: 16.4,
    volume: 610000000,
  },
  {
    date: "2025-03-12",
    open: 16.4,
    high: 17.0,
    low: 16.2,
    close: 16.7,
    volume: 620000000,
  },
  {
    date: "2025-03-13",
    open: 16.7,
    high: 17.3,
    low: 16.5,
    close: 17.0,
    volume: 630000000,
  },
  {
    date: "2025-03-14",
    open: 17.0,
    high: 17.5,
    low: 16.8,
    close: 16.9,
    volume: 640000000,
  },
  {
    date: "2025-03-15",
    open: 16.9,
    high: 17.2,
    low: 16.6,
    close: 16.8,
    volume: 620000000,
  },
  {
    date: "2025-03-16",
    open: 16.8,
    high: 17.0,
    low: 16.4,
    close: 16.6,
    volume: 610000000,
  },
  {
    date: "2025-03-17",
    open: 16.6,
    high: 16.9,
    low: 16.2,
    close: 16.4,
    volume: 600000000,
  },
  {
    date: "2025-03-18",
    open: 16.4,
    high: 16.7,
    low: 15.9,
    close: 16.1,
    volume: 590000000,
  },
  {
    date: "2025-03-19",
    open: 16.1,
    high: 16.5,
    low: 15.7,
    close: 15.9,
    volume: 580000000,
  },
  {
    date: "2025-03-20",
    open: 15.9,
    high: 16.2,
    low: 15.5,
    close: 15.7,
    volume: 570000000,
  },
  {
    date: "2025-03-21",
    open: 15.7,
    high: 16.0,
    low: 15.3,
    close: 15.5,
    volume: 560000000,
  },
  {
    date: "2025-03-22",
    open: 15.5,
    high: 15.8,
    low: 15.1,
    close: 15.2,
    volume: 550000000,
  },
  {
    date: "2025-03-23",
    open: 15.2,
    high: 15.5,
    low: 14.9,
    close: 15.0,
    volume: 540000000,
  },
  {
    date: "2025-03-24",
    open: 15.0,
    high: 15.3,
    low: 14.7,
    close: 14.8,
    volume: 530000000,
  },
  {
    date: "2025-03-25",
    open: 14.8,
    high: 15.1,
    low: 14.5,
    close: 14.6,
    volume: 520000000,
  },
  {
    date: "2025-03-26",
    open: 14.6,
    high: 14.9,
    low: 14.3,
    close: 14.4,
    volume: 510000000,
  },
  {
    date: "2025-03-27",
    open: 14.4,
    high: 14.7,
    low: 14.1,
    close: 14.2,
    volume: 500000000,
  },
  {
    date: "2025-03-28",
    open: 14.2,
    high: 14.5,
    low: 13.8,
    close: 13.9,
    volume: 490000000,
  },
  {
    date: "2025-03-29",
    open: 13.9,
    high: 14.2,
    low: 13.5,
    close: 13.7,
    volume: 480000000,
  },
  {
    date: "2025-03-30",
    open: 13.7,
    high: 14.0,
    low: 13.3,
    close: 13.5,
    volume: 470000000,
  },
  {
    date: "2025-03-31",
    open: 13.5,
    high: 13.8,
    low: 13.1,
    close: 13.2,
    volume: 460000000,
  },
];

const fakeXTrumpSentiment = [
  { date: "2025-03-01", positive: 60, negative: 20, neutral: 20, volume: 5000 },
  { date: "2025-03-02", positive: 62, negative: 18, neutral: 20, volume: 5200 },
  { date: "2025-03-03", positive: 65, negative: 15, neutral: 20, volume: 5400 },
  { date: "2025-03-04", positive: 68, negative: 14, neutral: 18, volume: 5600 },
  { date: "2025-03-05", positive: 70, negative: 12, neutral: 18, volume: 5800 },
  { date: "2025-03-06", positive: 72, negative: 10, neutral: 18, volume: 6000 },
  { date: "2025-03-07", positive: 75, negative: 10, neutral: 15, volume: 6200 },
  { date: "2025-03-08", positive: 73, negative: 12, neutral: 15, volume: 6100 },
  { date: "2025-03-09", positive: 70, negative: 15, neutral: 15, volume: 5900 },
  { date: "2025-03-10", positive: 68, negative: 17, neutral: 15, volume: 6000 },
  { date: "2025-03-11", positive: 65, negative: 20, neutral: 15, volume: 6100 },
  { date: "2025-03-12", positive: 63, negative: 22, neutral: 15, volume: 6200 },
  { date: "2025-03-13", positive: 60, negative: 25, neutral: 15, volume: 6300 },
  { date: "2025-03-14", positive: 58, negative: 27, neutral: 15, volume: 6400 },
  { date: "2025-03-15", positive: 55, negative: 30, neutral: 15, volume: 6300 },
  { date: "2025-03-16", positive: 52, negative: 33, neutral: 15, volume: 6200 },
  { date: "2025-03-17", positive: 50, negative: 35, neutral: 15, volume: 6100 },
  { date: "2025-03-18", positive: 48, negative: 37, neutral: 15, volume: 6000 },
  { date: "2025-03-19", positive: 45, negative: 40, neutral: 15, volume: 5900 },
  { date: "2025-03-20", positive: 43, negative: 42, neutral: 15, volume: 5800 },
  { date: "2025-03-21", positive: 40, negative: 45, neutral: 15, volume: 5700 },
  { date: "2025-03-22", positive: 38, negative: 47, neutral: 15, volume: 5600 },
  { date: "2025-03-23", positive: 35, negative: 50, neutral: 15, volume: 5500 },
  { date: "2025-03-24", positive: 33, negative: 52, neutral: 15, volume: 5400 },
  { date: "2025-03-25", positive: 30, negative: 55, neutral: 15, volume: 5300 },
  { date: "2025-03-26", positive: 28, negative: 57, neutral: 15, volume: 5200 },
  { date: "2025-03-27", positive: 25, negative: 60, neutral: 15, volume: 5100 },
  { date: "2025-03-28", positive: 23, negative: 62, neutral: 15, volume: 5000 },
  { date: "2025-03-29", positive: 20, negative: 65, neutral: 15, volume: 4900 },
  { date: "2025-03-30", positive: 18, negative: 67, neutral: 15, volume: 4800 },
  { date: "2025-03-31", positive: 15, negative: 70, neutral: 15, volume: 4700 },
];

/**
 * TODO: Implement:
 * 1. Find a dataset ID in the database by access token, symbol, and source
 * 3. Load a dataset from Recall using the dataset ID
 * 4. Return dataset
 */
export function getCandles(
  accessToken: string,
  symbol: string,
  source: string
): Object | undefined {
  logger.info(
    `Getting candles for '${accessToken}', '${symbol}', '${source}'...`
  );
  if (symbol.toLowerCase() === "trump" && source.toLowerCase() === "meteora") {
    return fakeMeteoraTrumpCandles;
  }
  return undefined;
}

// TODO: Implement
export function getSentiment(
  accessToken: string,
  symbol: string,
  source: string
): Object | undefined {
  logger.info(
    `Getting sentiment for '${accessToken}', '${symbol}', '${source}'...`
  );
  if (symbol.toLowerCase() === "trump" && source.toLowerCase() === "x") {
    return fakeXTrumpSentiment;
  }
  return undefined;
}
