import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { getCandles } from "./dataset";

const GetCandlesSchema = z.object({ symbol: z.string() });

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
          name: "get_candles",
          description:
            "Get an array of trading candles (date, open, high, low, close, volume) for a specified token",
          inputSchema: zodToJsonSchema(GetCandlesSchema),
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
        case "get_candles": {
          const args = GetCandlesSchema.parse(request.params.arguments);
          const candles = getCandles(args.symbol);
          return {
            content: [
              {
                type: "text",
                text: candles ? JSON.stringify(candles) : "No data",
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
