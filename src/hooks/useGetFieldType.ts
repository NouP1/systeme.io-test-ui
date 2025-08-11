import type { RowData } from "@/lib/types/data";
import type { FieldType } from "@/lib/types/filter";

export function useGetFieldType(header: string, data?: RowData[]): FieldType {
  if (!data || data.length === 0) return "unknow";

  const value = header.includes(".")
    ? header
        .split(".")
        .reduce<unknown>(
          (obj, key) =>
            obj !== null && typeof obj === "object"
              ? (obj as RowData)[key]
              : undefined,
          data[0] as RowData
        )
    : (data[0] as RowData)[header];

  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  if (typeof value === "string") {
    if (!isNaN(Date.parse(value))) return "date";
    return "string";
  }
  return "unknow";
}
