"use server";

import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { errorToString } from "@/lib/converters";
import { loadRecallJsonData } from "@/lib/recall";
import { NextRequest } from "next/server";
import { Address } from "viem";

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const url = new URL(request.url);
    const bucket = url.searchParams.get("bucket") || undefined;
    const key = url.searchParams.get("key") || undefined;
    if (!bucket || !key) {
      return createFailedApiResponse(
        { message: "Request params invalid" },
        400
      );
    }

    // Load data
    const data = await loadRecallJsonData(bucket as Address, key);

    // Return the data
    return createSuccessApiResponse(data);
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
