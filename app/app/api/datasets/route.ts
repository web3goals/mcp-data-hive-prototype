"use server";

import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { errorToString } from "@/lib/converters";
import { findDatasets } from "@/mongodb/services/dataset-service";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const url = new URL(request.url);
    const sellerId = url.searchParams.get("sellerId") || undefined;
    const buyerId = url.searchParams.get("buyerId") || undefined;

    // Find dataset
    const datasets = await findDatasets({
      sellerId: sellerId,
      buyerId: buyerId,
    });

    // Return the datasets
    return createSuccessApiResponse(datasets);
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
