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

export async function getPopulationStructures(formData: FormData) {
  const responses = [];
  for (let key of formData.keys()) {
    if (key) {
      const res = await RESASClient.get<GetData>(
        "/api/v1/population/composition/perYear",
        { params: { prefCode: key, cityCode: "-" } }
      );
      responses.push({ prefCode: key, apiData: res.data.result });
    }
  }

  return responses;
}
