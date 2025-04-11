"use server";

import { loadAkaveJsonData } from "@/lib/akave";
import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { errorToString } from "@/lib/converters";
import { loadRecallJsonData } from "@/lib/recall";
import { findDatasets } from "@/mongodb/services/dataset-service";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import { Address } from "viem";

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const url = new URL(request.url);
    const id = url.searchParams.get("id") || undefined;
    if (!id) {
      return createFailedApiResponse(
        { message: "Request params invalid" },
        400
      );
    }

    // Find dataset
    const datasets = await findDatasets({
      id: new ObjectId(id),
    });
    const dataset = datasets[0];
    if (!dataset) {
      return createFailedApiResponse({ message: "Dataset not found" }, 404);
    }

    // Load dataset data
    let data: object | undefined;
    if (dataset.data.protocol === "RECALL") {
      data = await loadRecallJsonData(
        dataset.data.bucket as Address,
        dataset.data.key
      );
    }
    if (dataset.data.protocol === "AKAVE") {
      data = await loadAkaveJsonData(
        dataset.data.bucket as Address,
        dataset.data.name
      );
    }
    if (!data) {
      return createFailedApiResponse(
        { message: "Dataset data not found" },
        404
      );
    }

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
