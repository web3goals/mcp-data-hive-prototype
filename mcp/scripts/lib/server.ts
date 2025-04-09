import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { getCandles, getDatasets, getSentiment } from "./dataset";

const GetDatasetsSchema = z.object({});

const GetCandlesSchema = z.object({
  symbol: z
    .string()
    .describe("Symbol for getting candles, e.g. 'ethusdt', 'trumpusdt'"),
  source: z
    .string()
    .describe("Source for getting candles, e.g. 'binance', 'meteora'"),
});

const GetSentimentSchema = z.object({
  symbol: z
    .string()
    .describe("Symbol for getting sentiment, e.g. 'eth', 'trump'"),
  source: z
    .string()
    .describe("Source for getting sentiment, e.g. 'x', 'warpcast'"),
});

export function createServer(params: {
  getSessionAccessToken: (sessionId: string) => string | undefined;
}): Server {
  const server = new Server(
    {
      name: "mcp-data-hive",
      version: "0.1.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: "get_datasets",
          description:
            "Get an array of purchased datasets (type, name, description)",
          inputSchema: zodToJsonSchema(GetDatasetsSchema),
        },
        {
          name: "get_candles",
          description:
            "Get an array of trading candles data (date, open, high, low, close, volume) for the specified symbol and source",
          inputSchema: zodToJsonSchema(GetCandlesSchema),
        },
        {
          name: "get_sentiment",
          description:
            "Get an array of sentiment data (date, positive, negative, neutral, volume) for the specified symbol and source",
          inputSchema: zodToJsonSchema(GetSentimentSchema),
        },
      ],
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request, extra) => {
    try {
      if (!request.params.arguments) {
        throw new Error("Arguments are required");
      }
      if (!extra.sessionId) {
        throw new Error("Session is required");
      }

      const accessToken = params.getSessionAccessToken(extra.sessionId);
      if (!accessToken) {
        throw new Error("Access token is required");
      }

      switch (request.params.name) {
        case "get_datasets": {
          const datasets = await getDatasets(accessToken);
          return {
            content: [
              {
                type: "text",
                text:
                  datasets.length > 0
                    ? JSON.stringify(
                        datasets.map((dataset) => ({
                          type: dataset.type,
                          name: dataset.name,
                          description: dataset.description,
                        }))
                      )
                    : "Datasets not found, the user probably did not purchase any datasets yet",
              },
            ],
          };
        }

        case "get_candles": {
          const args = GetCandlesSchema.parse(request.params.arguments);
          const candles = await getCandles(
            accessToken,
            args.symbol,
            args.source
          );
          return {
            content: [
              {
                type: "text",
                text: candles
                  ? JSON.stringify(candles)
                  : "Data not found, the user probably did not purchase the dataset",
              },
            ],
          };
        }

        case "get_sentiment": {
          const args = GetSentimentSchema.parse(request.params.arguments);
          const sentiment = await getSentiment(
            accessToken,
            args.symbol,
            args.source
          );
          return {
            content: [
              {
                type: "text",
                text: sentiment
                  ? JSON.stringify(sentiment)
                  : "Data not found, the user probably did not purchase the dataset",
              },
            ],
          };
        }

        default: {
          throw new Error(`Unknown tool: ${request.params.name}`);
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Invalid input: ${JSON.stringify(error.errors)}`);
      }
      throw error;
    }
  });

  return server;
}
