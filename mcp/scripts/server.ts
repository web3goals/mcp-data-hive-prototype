import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express, { Request, Response } from "express";
import { z } from "zod";
import { logger } from "./lib/logger";
import { getCandles } from "./lib/dataset";

async function main() {
  logger.info("Starting MCP server...");

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

  const app = express();

  // To support multiple simultaneous connections we have a lookup object from sessionId to transport
  const transports: { [sessionId: string]: SSEServerTransport } = {};

  app.get("/sse", async (_: Request, res: Response) => {
    const transport = new SSEServerTransport("/messages", res);
    transports[transport.sessionId] = transport;
    res.on("close", () => {
      delete transports[transport.sessionId];
    });
    await server.connect(transport);
  });

  app.post("/messages", async (req: Request, res: Response) => {
    const sessionId = req.query.sessionId as string;
    const transport = transports[sessionId];
    if (transport) {
      await transport.handlePostMessage(req, res);
    } else {
      res.status(400).send("No transport found for sessionId");
    }
  });

  app.listen(3001);
}

main().catch((error) => {
  logger.error(error);
  process.exitCode = 1;
});
