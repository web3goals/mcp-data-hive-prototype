import { Address } from "viem";

export const CONTRACTS: {
  [key: string]: {
    marketplace: Address | undefined;
  };
} = {
  sepolia: {
    marketplace: "0xfd5298030e11af7fa90b868c82be164cac12213f",
  },
};
