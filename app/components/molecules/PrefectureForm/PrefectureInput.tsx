import type { Prefecture } from "~/models/types";

type Props = {
  prefecture: Prefecture;
};

const PrefectureInput: React.FC<Props> = ({
  prefecture: { prefCode, prefName },
}) => {
  const inputId = `pref_${prefCode}`;

  return (
    <div key={prefCode} className="relative flex items-start py-2">
      <div className="mr-3 flex h-5 items-center">
        <input
          id={inputId}
          aria-describedby="prefectures-description"
          name={`${prefCode}`}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>
      <div className="min-w-0 flex-1 text-sm">
        <label htmlFor={inputId} className="font-medium text-gray-700">
          {prefName}
        </label>
        {/*                     <p id="candidates-description" className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p> */}
      </div>
    </div>
  );
};

export default PrefectureInput;
