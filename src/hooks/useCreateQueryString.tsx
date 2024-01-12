import { useCallback } from "react";

// Define the generic custom hook
const useCreateQueryString = <T extends Record<string, string | number | null>>(
  searchParams: URLSearchParams | null,
) => {
  // Create query string
  const createQueryString = useCallback(
    (params: T) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  return createQueryString;
};

export { useCreateQueryString };
