"use server";

import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { errorToString } from "@/lib/converters";
import { Dataset } from "@/mongodb/models/dataset";
import { insertDataset } from "@/mongodb/services/dataset-service";
import { NextRequest } from "next/server";
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

    // TODO: Upload data to Recall

    // Create a dataset
    const dataset: Dataset = {
      sellerId: bodyParseResult.data.sellerId,
      sellerAddress: bodyParseResult.data.sellerAddress as Address,
      createdDate: new Date(),
      type: bodyParseResult.data.type,
      name: bodyParseResult.data.name,
      description: bodyParseResult.data.description,
      attributes: bodyParseResult.data.attributes,
      price: bodyParseResult.data.price,
      data: {
        provider: "RECALL",
        bucket: "",
        key: "",
      },
      sales: [],
    };

    const datasetId = await insertDataset(dataset);
    dataset._id = datasetId;

    // TODO: List the dataset using contract

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
