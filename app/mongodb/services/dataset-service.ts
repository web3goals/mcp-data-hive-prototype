import { mongoDBConfig } from "@/config/mongodb";
import { Collection, ObjectId } from "mongodb";
import clientPromise from "../client";
import { Dataset } from "../models/dataset";

// TODO: Implement finding by buyerId
export async function findDatasets(params: {
  sellerId?: string;
  buyerId?: string;
}): Promise<Dataset[]> {
  const collection = await getCollectionDatasets();
  const datasets = await collection
    .find({
      ...(params.sellerId && { creatorUserId: params.sellerId }),
    })
    .toArray();
  return datasets;
}

export async function insertDataset(dataset: Dataset): Promise<ObjectId> {
  const collection = await getCollectionDatasets();
  const insertOneResult = await collection.insertOne(dataset);
  return insertOneResult.insertedId;
}

async function getCollectionDatasets(): Promise<Collection<Dataset>> {
  const client = await clientPromise;
  const db = client.db(mongoDBConfig.database);
  return db.collection<Dataset>(mongoDBConfig.collectionDatasets);
}
