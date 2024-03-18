"use client";

import { type PaginationState } from "@tanstack/react-table";
import { revalidatePath } from "next/cache";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { siteConfig } from "~/config/site";
import { useCreateQueryString } from "~/hooks/useCreateQueryString";

const usePagination = ({ dataCount = 0 }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Search params
  const page = searchParams?.get("page") || 1;

  const pageCount = Math.ceil(dataCount / siteConfig.pageListLimit);
  // Create query string
  const createQueryString = useCreateQueryString(searchParams);

  // Handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: Number(page) - 1,
      pageSize: Number(siteConfig.pageListLimit),
    });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  React.useEffect(() => {
    if (pageIndex !== 0 || searchParams?.get("page")) {
      router.push(
        `${pathname}?${createQueryString({
          page: pageIndex + 1,
        })}`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex]);

  return { pageCount, pagination, setPagination };
};

export { usePagination };
