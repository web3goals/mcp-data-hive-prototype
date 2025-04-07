import { Address } from "viem";

export type DatasetSale = {
  date: string;
  buyerId: string;
  buyerAddress: Address;
  txHash: string;
};
