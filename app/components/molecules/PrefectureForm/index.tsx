import { Form, useLoaderData, useSubmit } from "@remix-run/react";

import type { LoaderData } from "~/routes/populations";

import PrefectureInput from "./PrefectureInput";

const PrefectureForm: React.FC = () => {
  const submit = useSubmit();
  const data = useLoaderData() as LoaderData;
  function handleChange(event: React.ChangeEvent<HTMLFormElement>) {
    submit(event.currentTarget, { replace: true });
  }

  return (
    <div className="h-64 overflow-auto">
      <Form method="post" onChange={handleChange}>
        <fieldset className="grid grid-cols-3 gap-4 border-t border-b border-gray-200 sm:grid-cols-4">
          {data.prefectureItems.map((prefecture) => {
            return (
              <PrefectureInput
                key={prefecture.prefCode}
                prefecture={prefecture}
              />
            );
          })}
        </fieldset>
      </Form>
    </div>
  );
};

export default PrefectureForm;
