"use server";

import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { errorToString } from "@/lib/converters";
import { addDatasetSale } from "@/mongodb/services/dataset-service";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import { Address, Hash } from "viem";
import { z } from "zod";

const requestBodySchema = z.object({
  id: z.string().min(1),
  buyerId: z.string().min(1),
  buyerAddress: z.string().min(1),
  txHash: z.string().min(1),
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

    // Add sale to dataset
    await addDatasetSale(new ObjectId(bodyParseResult.data.id), {
      date: new Date().toISOString(),
      buyerId: bodyParseResult.data.buyerId,
      buyerAddress: bodyParseResult.data.buyerAddress as Address,
      txHash: bodyParseResult.data.txHash as Hash,
    });

    // Return success response
    return createSuccessApiResponse("Purchased");
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
