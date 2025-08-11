import { useMemo } from "react";
import type { RowData } from "@/lib/types/data";
import type { DateRange } from "react-day-picker";

export function useFilterData(
  data: RowData[],
  filter: Record<string, unknown>
) {
  return useMemo(() => {
    return data.filter((row) => {
      return Object.entries(filter).every(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return true;

        const cellValue = row[key];

        if (isDateRange(value)) {
          const date = toDate(cellValue);
          if (!date) return false;

          const from = value.from ? startOfDay(value.from) : undefined;
          const to = value.to ? endOfDay(value.to) : undefined;

          return (!from || date >= from) && (!to || date <= to);
        }

        if (Array.isArray(value)) {
          return value.some((v) =>
            String(cellValue ?? "")
              .toLowerCase()
              .includes(String(v).toLowerCase())
          );
        }

        return String(cellValue ?? "")
          .toLowerCase()
          .includes(String(value).toLowerCase());
      });
    });
  }, [data, filter]);
}

function isDateRange(val: unknown): val is DateRange {
  return typeof val === "object" && val !== null && "from" in val;
}

function toDate(val: unknown): Date | undefined {
  if (val instanceof Date) return val;
  if (typeof val === "string" && !isNaN(Date.parse(val))) return new Date(val);
  return undefined;
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function endOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}
