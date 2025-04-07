import { DatasetAttributes } from "./dataset-attributes";
import { DatasetType } from "./dataset-type";

export type ListDatasetRequestData = {
  sellerId?: string;
  sellerAddress?: string;
  type?: DatasetType;
  name?: string;
  description?: string;
  attributes?: DatasetAttributes;
  price?: string;
  data?: string;
};
