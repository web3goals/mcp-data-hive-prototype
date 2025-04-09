import { Collection } from "mongodb";
import { mongoDBConfig } from "../../config/mongodb";
import { DatasetAttributes } from "../../types/dataset-attributes";
import clientPromise from "../client";
import { Dataset } from "../models/dataset";
import { DatasetType } from "../../types/dataset-type";

export async function findDatasets(params: {
  type?: DatasetType;
  attributes?: DatasetAttributes;
  buyerId?: string;
}): Promise<Dataset[]> {
  const collection = await getCollectionDatasets();
  const datasets = await collection
    .find({
      ...(params.type && { type: params.type }),
      ...(params.attributes && { attributes: params.attributes }),
      ...(params.buyerId && {
        sales: {
          $elemMatch: {
            buyerId: params.buyerId,
          },
        },
      }),
    })
    .sort({ createdDate: -1 })
    .toArray();
  return datasets;
}

async function getCollectionDatasets(): Promise<Collection<Dataset>> {
  const client = await clientPromise;
  const db = client.db(mongoDBConfig.database);
  return db.collection<Dataset>(mongoDBConfig.collectionDatasets);
}
