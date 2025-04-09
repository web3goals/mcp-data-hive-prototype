import { testnet } from "@recallnet/chains";
import { Address, createWalletClient, Hex, http } from "viem";
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

export async function saveJsonData(data: object, bucket: Address, key: string) {
  const content = new TextEncoder().encode(JSON.stringify(data, null, 2));
  const file = new File([content], "data.json", {
    type: "application/json",
  });
  const bucketManager = await getBucketManager();
  await bucketManager.add(bucket, key, file);
}

export async function loadJsonData(
  bucket: Address,
  key: string
): Promise<object> {
  const bucketManager = await getBucketManager();
  const { result } = await bucketManager.get(bucket, key);
  const content = new TextDecoder().decode(result);
  return JSON.parse(content);
}
