export type DatasetData =
  | { protocol: "RECALL"; bucket: string; key: string }
  | { protocol: "AKAVE"; bucket: string; name: string };
