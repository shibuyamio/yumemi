export type LowData = Array<{
  prefCode: string;
  apiData: {
    boudaryYear: number;
    data: Array<{
      label: string;
      data: Population[];
    }>;
  };
}>;

export type Population = {
  year: number;
  value: number;
};
