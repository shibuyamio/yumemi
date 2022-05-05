import { useActionData, useLoaderData } from "@remix-run/react";
import type { Prefecture } from "../../../models/types";
import type { LoaderData } from "../../../routes/populations";
import type { LowData } from "./type";

export default function useChartData() {
  const prefectureData = useLoaderData() as LoaderData;
  const fetchData = useActionData<LowData>();

  const getPrefectureName = (prefCode: string) => {
    return (
      prefectureData.prefectureItems.find(
        (prefecture: Prefecture) => prefecture.prefCode.toString() === prefCode
      )?.prefName || "test"
    );
  };

  const getChartData = () => {
    if (!fetchData) return [];

    return fetchData.map((data) => ({
      label: getPrefectureName(data.prefCode),
      data:
        data.apiData.data.find((detum) => detum.label === "総人口")?.data || [],
    }));
  };

  return getChartData();
}
