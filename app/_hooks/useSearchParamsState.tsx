// External dependencies
import { useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export function useSearchParamsState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setSearchParams = useCallback(
    (update: (params: URLSearchParams) => void) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      update(newSearchParams);

      const currentUrl = `${pathname}?${searchParams.toString()}`;
      const newUrl = `${pathname}?${newSearchParams.toString()}`;

      if (newUrl !== currentUrl) {
        router.replace(newUrl, { scroll: false });
      }
    },
    [searchParams, pathname, router],
  );

  const setSearchParam = useCallback(
    (key: string, value: string) => {
      setSearchParams((params) => params.set(key, value));
    },
    [setSearchParams],
  );

  const getSearchParam = useCallback(
    (key: string, fallback?: string) => {
      return searchParams.get(key) ?? fallback ?? null;
    },
    [searchParams],
  );

  const deleteSearchParam = useCallback(
    (key: string) => {
      setSearchParams((params) => params.delete(key));
    },
    [setSearchParams],
  );

  return {
    searchParams,
    getSearchParam,
    setSearchParam,
    setSearchParams,
    deleteSearchParam,
  };
}
