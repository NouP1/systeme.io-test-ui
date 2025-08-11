import type { RowData } from "@/lib/types/data";
import type { FilterConfig } from "@/lib/types/filter";
import { useMemo } from "react";
import { useGetFieldType } from "./useGetFieldType";

export function useGenerateFilters(
  headers: string[] | null,
  data?: RowData[] | undefined
): FilterConfig[] {
  return useMemo(() => {
    if (!headers) return [];
    return headers.map((header) => ({
      field: header,
      label: header,
      type: useGetFieldType(header, data),
    }));
  }, [headers, data]);
}
