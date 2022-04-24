import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import PrefectureForm from "~/components/molcurus/PrefectureForm";
import { getPrefectureItems } from "~/models/population.server";
import type { Prefecture } from "~/models/types";

type LoaderData = {
  prefectureItems: Awaited<Prefecture[]>;
};

export const loader: LoaderFunction = async () => {
  const prefectureItems = await getPrefectureItems();

  return json<LoaderData>({ prefectureItems });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  console.log(formData);
  return null;
};

export default function Populations() {
  const data = useLoaderData() as LoaderData;

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-center bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Population</Link>
        </h1>
      </header>

      <main className="h-full bg-white px-4 py-5 sm:px-6">
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            都道府県
          </h2>
          <PrefectureForm prefectureItems={data.prefectureItems} />
        </div>
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            グラフ
          </h2>
        </div>
      </main>
    </div>
  );
}
