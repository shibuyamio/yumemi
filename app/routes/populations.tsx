import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData, useSubmit } from "@remix-run/react";
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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  console.log(formData);
  return null;
};

export default function Populations() {
  const data = useLoaderData() as LoaderData;
  const submit = useSubmit();

  function handleChange(event: React.ChangeEvent<HTMLFormElement>) {
    submit(event.currentTarget, { replace: true });
  }

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
            <Form method="post" onChange={handleChange}>
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
                          aria-describedby="prefectures-description"
                          name={`${prefecture.prefCode}`}
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
                  );
                })}
              </fieldset>
              <button type="submit">submit</button>
            </Form>
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
