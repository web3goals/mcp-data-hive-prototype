import { Address, Hash } from "viem";

export type DatasetSale = {
  date: string;
  buyerId: string;
  buyerAddress: Address;
  txHash: Hash;
};
