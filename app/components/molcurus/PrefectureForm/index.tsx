import { Form, useSubmit } from "@remix-run/react";
import type { Prefecture } from "~/models/types";

import PrefectureInput from "./PrefectureInput";

type Props = {
  prefectureItems: Prefecture[];
};

const PrefectureForm: React.FC<Props> = ({ prefectureItems }) => {
  const submit = useSubmit();

  function handleChange(event: React.ChangeEvent<HTMLFormElement>) {
    submit(event.currentTarget, { replace: true });
  }

  return (
    <div className="h-64 overflow-auto">
      <Form method="post" onChange={handleChange}>
        <fieldset className="grid grid-cols-3 gap-4 border-t border-b border-gray-200 sm:grid-cols-4">
          {prefectureItems.map((prefecture) => {
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
