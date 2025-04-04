import { testnet } from "@recallnet/chains";
import { createWalletClient, Hex, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";

async function getBucketManager() {
  const walletClient = createWalletClient({
    account: privateKeyToAccount(process.env.RECALL_ACCOUNT_PRIVATE_KEY as Hex),
    chain: testnet,
    transport: http(),
  });

  const { RecallClient } = await import("@recallnet/sdk/client");
  const client = new RecallClient({ walletClient });

  return client.bucketManager();
}

export async function saveJsonData(data: Object, key: string) {
  const content = new TextEncoder().encode(JSON.stringify(data, null, 2));
  const file = new File([content], "data.json", {
    type: "application/json",
  });
  const bucketManager = await getBucketManager();
  await bucketManager.add(process.env.RECALL_BUCKET as Hex, key, file);
}

export async function loadJsonData(key: string): Promise<Object> {
  const bucketManager = await getBucketManager();
  const { result } = await bucketManager.get(
    process.env.RECALL_BUCKET as Hex,
    key
  );
  const content = new TextDecoder().decode(result);
  return JSON.parse(content);
}
