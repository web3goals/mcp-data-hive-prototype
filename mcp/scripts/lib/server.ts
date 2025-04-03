import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getCandles } from "./dataset";

export function createServer(): McpServer {
  const server = new McpServer({
    name: "mcp-data-hive",
    version: "0.1.0",
  });

  server.tool(
    "get_candles",
    "Get an array of trading candles (date, open, high, low, close, volume) for a specified token",
    { symbol: z.string() },
    async ({ symbol }) => {
      // TODO: Check if dataset exists
      // TODO: Check if agent has access to dataset
      const candles = getCandles(symbol);
      return {
        content: [
          { type: "text", text: candles ? JSON.stringify(candles) : "No data" },
        ],
      };
    }
  );

  return server;
}
