import { chainConfig } from "@/config/chain";
import { addressToShortAddress } from "@/lib/converters";
import { Dataset } from "@/mongodb/models/dataset";
import { DatasetType } from "@/types/dataset-type";
import {
  CalendarIcon,
  CaseUpperIcon,
  DatabaseIcon,
  DollarSignIcon,
  FileJsonIcon,
  TextIcon,
  UserRoundIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatEther } from "viem";

export function DatasetCard(props: {
  dataset: Dataset;
  onDatasetUpdate: () => void;
}) {
  const types: Record<DatasetType, { image: string; string: string }> = {
    CANDLES: { image: "/images/type-candles.png", string: "Candles" },
    SENTIMENT: { image: "/images/type-sentiment.png", string: "Sentiment" },
  };

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
                href={`${chainConfig.chain.blockExplorers?.default.url}/token/${props.dataset.sellerAddress}`}
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
        {/* TODO: */}
      </div>
    </div>
  );
}
