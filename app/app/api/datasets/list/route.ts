"use server";

import { chainConfig } from "@/config/chain";
import { marketplaceAbi } from "@/contracts/abi/marketplace";
import { saveAkaveJsonData } from "@/lib/akave";
import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { errorToString } from "@/lib/converters";
import { saveRecallJsonData } from "@/lib/recall";
import { Dataset } from "@/mongodb/models/dataset";
import { insertDataset } from "@/mongodb/services/dataset-service";
import { DatasetData } from "@/types/dataset-data";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import {
  Address,
  createPublicClient,
  createWalletClient,
  Hex,
  http,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
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
  dataProtocol: z.enum(["RECALL", "AKAVE"]),
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

    // Upload data to data protocol
    let datasetData: DatasetData | undefined;
    if (bodyParseResult.data.dataProtocol === "RECALL") {
      const bucket = process.env.RECALL_BUCKET as Address;
      const key = uuidv4();
      const dataJson = JSON.parse(bodyParseResult.data.data);
      await saveRecallJsonData(dataJson, bucket, key);
      datasetData = { protocol: "RECALL", bucket: bucket, key: key };
    }
    if (bodyParseResult.data.dataProtocol === "AKAVE") {
      const bucket = process.env.AKAVE_BUCKET as string;
      const name = uuidv4();
      const dataJson = JSON.parse(bodyParseResult.data.data);
      await saveAkaveJsonData(dataJson, bucket, name);
      datasetData = { protocol: "AKAVE", bucket: bucket, name: name };
    }
    if (!datasetData) {
      throw new Error("Dataset data is undefined");
    }

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
      data: datasetData,
      sales: [],
    };

    // Insert the dataset into the database
    const datasetId = await insertDataset(dataset);
    dataset._id = datasetId;

    // List the dataset using the marketplace contract
    const account = privateKeyToAccount(
      process.env.MARKETPLACE_ACCOUNT_PRIVATE_KEY as Hex
    );
    const publicClient = createPublicClient({
      chain: chainConfig.chain,
      transport: http(),
    });
    const walletClient = createWalletClient({
      account: account,
      chain: chainConfig.chain,
      transport: http(),
    });
    const { request: listRequest } = await publicClient.simulateContract({
      account: account,
      address: chainConfig.contracts.marketplace,
      abi: marketplaceAbi,
      functionName: "list",
      args: [
        dataset._id.toString(),
        dataset.sellerAddress,
        BigInt(dataset.price),
      ],
    });
    const hash = await walletClient.writeContract(listRequest);
    await publicClient.waitForTransactionReceipt({ hash });

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
