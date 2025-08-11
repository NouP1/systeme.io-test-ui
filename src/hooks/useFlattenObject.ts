import type { RowData } from "@/lib/types/data";

export function useFlattenObject(obj: RowData): RowData {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      !(value instanceof Date)
    ) {
      Object.assign(acc, useFlattenObject(value as RowData));
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as RowData);
}
