import { useSearchParams } from "react-router-dom"

type QueryParams = Record<string, string | number | boolean | null | undefined>;

export function useSetSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = (params: QueryParams) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });

    setSearchParams(newParams);
  };

  return updateSearchParams;
}
