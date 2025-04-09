import { ObjectId } from "mongodb";
import { Address } from "viem";
import { DatasetAttributes } from "../../types/dataset-attributes";
import { DatasetData } from "../../types/dataset-data";
import { DatasetSale } from "../../types/dataset-sale";
import { DatasetType } from "../../types/dataset-type";

export class Dataset {
  constructor(
    public sellerId: string,
    public sellerAddress: Address,
    public createdDate: Date,
    public type: DatasetType,
    public name: string,
    public description: string,
    public attributes: DatasetAttributes,
    public price: string,
    public data: DatasetData,
    public sales: DatasetSale[],
    public _id?: ObjectId
  ) {}
}
