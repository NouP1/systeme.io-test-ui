import type { SortType } from "@/lib/types/data";
import { useMemo } from "react";

export type RowData = Record<string, unknown>;

function getNestedValue(obj: RowData, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") {
      return (acc as RowData)[key];
    }
    return undefined;
  }, obj);
}

export function useSortedData(
  data: RowData[] | undefined,
  sortConfig: { column: string; type: SortType } | null
): RowData[] | undefined {
  return useMemo(() => {
    if (!sortConfig || !data) return data;

    return [...data].sort((a, b) => {
      const valA = getNestedValue(a, sortConfig.column);
      const valB = getNestedValue(b, sortConfig.column);

      switch (sortConfig.type) {
        case "asc":
          return Number(valA) - Number(valB);
        case "desc":
          return Number(valB) - Number(valA);
        case "asc-alpha":
          return String(valA ?? "").localeCompare(String(valB ?? ""));
        case "desc-alpha":
          return String(valB ?? "").localeCompare(String(valA ?? ""));
        case "time-asc":
          return new Date(valA as any).getTime() - new Date(valB as any).getTime();
        case "time-desc":
          return new Date(valB as any).getTime() - new Date(valA as any).getTime();
        case "true-first":
          return (valA === true ? -1 : 1) - (valB === true ? -1 : 1);
        case "false-first":
          return (valA === false ? -1 : 1) - (valB === false ? -1 : 1);
        default:
          return 0;
      }
    });
  }, [data, sortConfig]);
}
