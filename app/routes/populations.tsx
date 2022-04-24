import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPrefectureItems } from "~/models/population.server";

export type Prefecture = {
  prefCode: number;
  prefName: string;
};

type LoaderData = {
  prefectureItems: Awaited<Prefecture[]>;
};

export const loader: LoaderFunction = async () => {
  const prefectureItems = await getPrefectureItems();

  return json<LoaderData>({ prefectureItems });
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
          <div className="h-64 overflow-auto">
            <fieldset className="grid grid-cols-3 gap-4 border-t border-b border-gray-200 sm:grid-cols-4">
              {data.prefectureItems.map((prefecture) => {
                const inputId = `pref_${prefecture.prefCode}`;
                return (
                  <div
                    key={prefecture.prefCode}
                    className="relative flex items-start py-2"
                  >
                    <div className="mr-3 flex h-5 items-center">
                      <input
                        id={inputId}
                        aria-describedby="candidates-description"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="min-w-0 flex-1 text-sm">
                      <label
                        htmlFor={inputId}
                        className="font-medium text-gray-700"
                      >
                        {prefecture.prefName}
                      </label>
                      {/*                     <p id="candidates-description" className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p> */}
                    </div>
                  </div>
                  /*                 <div
                  key={prefecture.prefCode}
                  className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://via.placeholder.com/150/0000FF/808080"
                      alt=""
                    />
                  </div>
                  <a href="#" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">
                      {prefecture.prefName}
                    </p>
                  </a>
                </div> */
                );
              })}
            </fieldset>
          </div>
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
