import axios from "axios";
import { akaveConfig } from "../config/akave";

export async function createAkaveBucket(bucket: string) {
  const { data } = await axios.post(`${akaveConfig.apiBaseUrl}/buckets`, {
    bucketName: bucket,
  });
  if (data.success === "false") {
    throw new Error(`Failed to create Akave bucket: ${data.error}`);
  }
}

export async function getAkaveBuckets(): Promise<unknown[]> {
  const { data } = await axios.get(`${akaveConfig.apiBaseUrl}/buckets`);
  if (data.success === "false") {
    throw new Error(`Failed to get Akave buckets: ${data.error}`);
  }
  return data.data;
}

export async function saveAkaveJsonData(
  data: object,
  bucket: string,
  name: string
) {
  // Convert data to JSON string and create a Blob
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });

  // Add the file to the FormData
  const form = new FormData();
  form.append("file", blob, `${name}.json`);

  // Send request to the Akave
  const { data: responseData } = await axios.post(
    `${akaveConfig.apiBaseUrl}/buckets/${bucket}/files`,
    form
  );
  if (responseData.success === "false") {
    throw new Error(`Failed to save Akave JSON data: ${responseData.error}`);
  }
}

export async function loadAkaveJsonData(
  bucket: string,
  name: string
): Promise<object> {
  const { data } = await axios.get(
    `${akaveConfig.apiBaseUrl}/buckets/${bucket}/files/${name}.json/download`,
    {
      responseType: "blob",
    }
  );
  if (data.success === "false") {
    throw new Error(`Failed to load Akave JSON data: ${data.error}`);
  }
  return JSON.parse(data);
}
