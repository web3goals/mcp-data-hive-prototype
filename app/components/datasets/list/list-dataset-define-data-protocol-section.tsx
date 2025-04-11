import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useError from "@/hooks/use-error";
import { ListDatasetRequestData } from "@/types/list-dataset-request-data";
import {
  DollarSignIcon,
  MoveRightIcon,
  NetworkIcon,
  TextIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function ListDatasetDefineDataProtocolSection(props: {
  requestData: ListDatasetRequestData;
  onRequestDataUpdate: (requestData: ListDatasetRequestData) => void;
}) {
  const { handleError } = useError();
  const [isProsessing, setIsProsessing] = useState(false);

  const protocols: {
    id: "RECALL" | "AKAVE";
    image: string;
    title: string;
    description: string;
    price: string;
  }[] = [
    {
      id: "RECALL",
      image: "/images/protocol-recall.png",
      title: "Recall",
      description:
        "Recall is the first unstoppable intelligence network empowering agents to store, share and trade knowledge onchain.",
      price: "Free",
    },
    {
      id: "AKAVE",
      image: "/images/protocol-akave.png",
      title: "Akave",
      description:
        "Akave is a decentralized protocol that empowers businesses and individuals with a robust storage layer and advanced data management tools for managing on-chain data lakes",
      price: "Free",
    },
  ];

  async function handleSubmit(dataProtocol: "RECALL" | "AKAVE") {
    try {
      setIsProsessing(true);
      props.onRequestDataUpdate({
        ...props.requestData,
        dataProtocol: dataProtocol,
      });
    } catch (error) {
      handleError(error, "Failed to submit the form, try again later");
    } finally {
      setIsProsessing(false);
    }
  }

  return (
    <main className="container mx-auto px-4 lg:px-80 py-16">
      <div className="flex items-center justify-center size-24 rounded-full bg-primary">
        <NetworkIcon className="size-12 text-primary-foreground" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mt-2">
        Data protocol
      </h1>
      <p className="text-muted-foreground mt-1">
        What way do you want to store the data?
      </p>
      <Separator className="my-8" />
      <div className="flex flex-col gap-4">
        {protocols.map((protocol, index) => (
          <div
            key={index}
            className="w-full flex flex-row gap-6 border rounded px-6 py-6"
          >
            <div className="w-36">
              <Image
                src={protocol.image}
                alt="Protocol"
                priority={false}
                width="100"
                height="100"
                sizes="100vw"
                className="w-full rounded-xl"
              />
            </div>
            <div className="flex-1">
              <p className="text-xl font-extrabold">{protocol.title}</p>
              <div className="flex flex-row gap-3 mt-2">
                <div className="flex items-center justify-center size-10 rounded-full bg-primary">
                  <TextIcon className="size-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-sm">{protocol.description}</p>
                </div>
              </div>
              <div className="flex flex-row gap-3 mt-2">
                <div className="flex items-center justify-center size-10 rounded-full bg-primary">
                  <DollarSignIcon className="size-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-sm">{protocol.price}</p>
                </div>
              </div>
              <Separator className="my-4" />
              <Button
                // className="mt-4"
                disabled={isProsessing}
                onClick={() => handleSubmit(protocol.id)}
              >
                <MoveRightIcon /> Select
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
