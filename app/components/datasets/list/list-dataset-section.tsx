import { LoadingSection } from "@/components/loading-section";
import { Dataset } from "@/mongodb/models/dataset";
import { ListDatasetRequestData } from "@/types/list-dataset-request-data";
import { useState } from "react";
import { ListDatasetDefineDataProtocolSection } from "./list-dataset-define-data-protocol-section";
import { ListDatasetDefineDataSection } from "./list-dataset-define-data-section";
import { ListDatasetDefineParamsSection } from "./list-dataset-define-params-section";
import { ListDatasetDefineTypeSection } from "./list-dataset-define-type-section";
import { ListDatasetListedSection } from "./list-dataset-listed-section";

export function ListDatasetSection() {
  const [requestData, setRequestData] = useState<ListDatasetRequestData>({
    // type: "CANDLES",
    // name: "D, ETH/USDT, Binance",
    // description: "March ETH/USDT daily OHLCV candles taken from Binance",
    // attributes: {
    //   symbol: "ethusdt",
    //   source: "binance",
    // },
    // price: parseEther("0.01").toString(),
  });
  const [dataset, setDataset] = useState<Dataset | undefined>();

  if (dataset) {
    return <ListDatasetListedSection />;
  }

  if (!requestData?.type) {
    return (
      <ListDatasetDefineTypeSection
        requestData={requestData}
        onRequestDataUpdate={(listDatasetRequestData) =>
          setRequestData(listDatasetRequestData)
        }
      />
    );
  }

  if (
    !requestData?.name ||
    !requestData?.description ||
    !requestData?.attributes ||
    !requestData?.price
  ) {
    return (
      <ListDatasetDefineParamsSection
        requestData={requestData}
        onRequestDataUpdate={(listDatasetRequestData) =>
          setRequestData(listDatasetRequestData)
        }
      />
    );
  }

  if (!requestData?.dataProtocol) {
    return (
      <ListDatasetDefineDataProtocolSection
        requestData={requestData}
        onRequestDataUpdate={(listDatasetRequestData) =>
          setRequestData(listDatasetRequestData)
        }
      />
    );
  }

  if (!requestData.data) {
    return (
      <ListDatasetDefineDataSection
        requestData={requestData}
        onListed={(dataset) => setDataset(dataset)}
      />
    );
  }

  return <LoadingSection />;
}
