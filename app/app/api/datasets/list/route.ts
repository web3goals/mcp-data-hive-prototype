"use server";

import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { errorToString } from "@/lib/converters";
import { saveJsonData } from "@/lib/recall";
import { Dataset } from "@/mongodb/models/dataset";
import { insertDataset } from "@/mongodb/services/dataset-service";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { Address } from "viem";
import { z } from "zod";

const requestBodySchema = z.object({
  sellerId: z.string().min(1),
  sellerAddress: z.string().min(1),
  type: z.enum(["CANDLES", "SENTIMENT"]),
  name: z.string().min(1),
  description: z.string().min(1),
  attributes: z.object({
    symbol: z.string().min(1),
    source: z.string().min(1),
  }),
  price: z.string().min(1),
  data: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    // Get and parse request data
    const body = await request.json();
    const bodyParseResult = requestBodySchema.safeParse(body);
    if (!bodyParseResult.success) {
      return createFailedApiResponse(
        {
          message: `Request body invalid: ${JSON.stringify(bodyParseResult)}`,
        },
        400
      );
    }

    // Upload data to Recall
    const bucket = process.env.RECALL_BUCKET as Address;
    const key = uuidv4();
    const dataJson = JSON.parse(bodyParseResult.data.data);
    await saveJsonData(dataJson, bucket, key);

    // Create a dataset
    const dataset: Dataset = {
      sellerId: bodyParseResult.data.sellerId,
      sellerAddress: bodyParseResult.data.sellerAddress as Address,
      createdDate: new Date(),
      type: bodyParseResult.data.type,
      name: bodyParseResult.data.name,
      description: bodyParseResult.data.description,
      attributes: {
        symbol: bodyParseResult.data.attributes.symbol.toLowerCase(),
        source: bodyParseResult.data.attributes.source.toLowerCase(),
      },
      price: bodyParseResult.data.price,
      data: {
        provider: "RECALL",
        bucket: bucket,
        key: key,
      },
      sales: [],
    };

    // Insert the dataset into the database
    const datasetId = await insertDataset(dataset);
    dataset._id = datasetId;

    // List the dataset using the contract
    // TODO: Implement

    // Return the dataset
    return createSuccessApiResponse(dataset);
  } catch (error) {
    console.error(
      `Failed to process ${request.method} request for "${
        new URL(request.url).pathname
      }":`,
      errorToString(error)
    );
    return createFailedApiResponse(
      { message: "Internal server error, try again later" },
      500
    );
  }
}
