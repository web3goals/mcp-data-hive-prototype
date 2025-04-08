import { chainConfig } from "@/config/chain";
import useError from "@/hooks/use-error";
import { addressToShortAddress } from "@/lib/converters";
import { Dataset } from "@/mongodb/models/dataset";
import { DatasetType } from "@/types/dataset-type";
import { usePrivy } from "@privy-io/react-auth";
import axios from "axios";
import {
  BracesIcon,
  CalendarIcon,
  CaseUpperIcon,
  DatabaseIcon,
  DollarSignIcon,
  FileJsonIcon,
  Loader2Icon,
  ShoppingBagIcon,
  TextIcon,
  UserRoundIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { formatEther } from "viem";
import { Button } from "../ui/button";

export function DatasetCard(props: {
  dataset: Dataset;
  onDatasetUpdate: () => void;
}) {
  const { user } = usePrivy();
  const { handleError } = useError();
  const [isProsessing, setIsProsessing] = useState(false);

  const isUserSeller = props.dataset.sellerId === user?.id;
  const isUserPurchased = props.dataset.sales.find(
    (sale) => sale.buyerId === user?.id
  );

  const types: Record<DatasetType, { image: string; string: string }> = {
    CANDLES: { image: "/images/type-candles.png", string: "Candles" },
    SENTIMENT: { image: "/images/type-sentiment.png", string: "Sentiment" },
  };

  async function handleBuy() {
    try {
      setIsProsessing(true);

      // Check if user is logged in
      if (!user) {
        toast.warning(`Please login`);
        return;
      }

      // Use contract
      // TODO: Implement contract call
      const txHash = "0x0";

      // Send request to API
      await axios.post("/api/datasets/buy", {
        id: props.dataset._id,
        buyerId: user?.id,
        buyerAddress: user?.wallet?.address,
        txHash: txHash,
      });

      // Update dataset in the state
      props.onDatasetUpdate();

      // Show success message
      toast("Dataset purchased 🎉");
    } catch (error) {
      handleError(error, "Failed to buy the dataset, try again later");
    } finally {
      setIsProsessing(false);
    }
  }

  return (
    <div className="w-full flex flex-row gap-6 border rounded px-6 py-6">
      {/* Left part */}
      <div className="w-36">
        {/* Image */}
        <Image
          src={types[props.dataset.type].image}
          alt="Type"
          priority={false}
          width="100"
          height="100"
          sizes="100vw"
          className="w-full rounded-xl"
        />
      </div>
      {/* Right part */}
      <div className="flex-1">
        {/* Name */}
        <p className="text-xl font-extrabold">{props.dataset.name}</p>
        {/* Params */}
        <div className="flex flex-col gap-4 mt-4">
          {/* Description */}
          <div className="flex flex-row gap-3">
            <div className="flex items-center justify-center size-8 rounded-full bg-primary">
              <TextIcon className="size-4 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="text-sm">{props.dataset.description}</p>
            </div>
          </div>
          {/* Created date */}
          <div className="flex flex-row gap-3">
            <div className="flex items-center justify-center size-8 rounded-full bg-primary">
              <CalendarIcon className="size-4 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Created</p>
              <p className="text-sm">
                {new Date(props.dataset.createdDate).toLocaleString()}
              </p>
            </div>
          </div>
          {/* Type */}
          <div className="flex flex-row gap-3">
            <div className="flex items-center justify-center size-8 rounded-full bg-primary">
              <FileJsonIcon className="size-4 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="text-sm">{types[props.dataset.type].string}</p>
            </div>
          </div>
          {/* Symbol */}
          <div className="flex flex-row gap-3">
            <div className="flex items-center justify-center size-8 rounded-full bg-primary">
              <CaseUpperIcon className="size-4 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Symbol</p>
              <p className="text-sm">{props.dataset.attributes.symbol}</p>
            </div>
          </div>
          {/* Source */}
          <div className="flex flex-row gap-3">
            <div className="flex items-center justify-center size-8 rounded-full bg-primary">
              <DatabaseIcon className="size-4 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Source</p>
              <p className="text-sm">{props.dataset.attributes.source}</p>
            </div>
          </div>
          {/* Price */}
          <div className="flex flex-row gap-3">
            <div className="flex items-center justify-center size-8 rounded-full bg-primary">
              <DollarSignIcon className="size-4 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-sm">
                {formatEther(BigInt(props.dataset.price))}{" "}
                {chainConfig.chain.nativeCurrency.symbol}
              </p>
            </div>
          </div>
          {/* Seller */}
          <div className="flex flex-row gap-3">
            <div className="flex items-center justify-center size-8 rounded-full bg-primary">
              <UserRoundIcon className="size-4 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Seller</p>
              <Link
                href={`${chainConfig.chain.blockExplorers?.default.url}/address/${props.dataset.sellerAddress}`}
                target="_blank"
              >
                <p className="text-sm underline underline-offset-4">
                  {addressToShortAddress(props.dataset.sellerAddress)}
                </p>
              </Link>
            </div>
          </div>
          {/* Sales */}
          {/* TODO: */}
        </div>
        {/* Actions */}
        <div className="flex flex-row gap-2 mt-8">
          {!isUserPurchased && (
            <Button disabled={isProsessing} onClick={() => handleBuy()}>
              {isProsessing ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <ShoppingBagIcon />
              )}
              Buy
            </Button>
          )}
          {/* Open data icon */}
          {(isUserSeller || isUserPurchased) && (
            <Link href={`/datasets/data/${props.dataset._id}`}>
              <Button variant="outline">
                <BracesIcon /> Open data
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
