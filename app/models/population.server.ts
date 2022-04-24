import { RESASClient } from "~/apiUtiles";
import type { Prefecture } from "./types";

type GetData = {
  message: string;
  result: Prefecture[];
};

export async function getPrefectureItems() {
  const res = await RESASClient.get<GetData>("/api/v1/prefectures");

  return res.data.result;
}
