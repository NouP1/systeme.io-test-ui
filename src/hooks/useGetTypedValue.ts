import type { FieldValueMap } from "@/components/table/TableEditableCell";
import { useMemo } from "react";
import type { DateRange } from "react-day-picker";

export function useGetTypedValue<K extends keyof FieldValueMap>(
  fieldType: K,
  value: unknown
): FieldValueMap[K] {
  return useMemo(() => {
    switch (fieldType) {
      case "string":
        return (
          typeof value === "string" ? value : String(value ?? "")
        ) as FieldValueMap[K];
      case "number":
        return (
          typeof value === "number" ? value : Number(value) || 0
        ) as FieldValueMap[K];

      case "boolean":
        return (
          typeof value === "boolean" ? value : value === "true"
        ) as FieldValueMap[K];
      case "date":
        if (value instanceof Date) return value as FieldValueMap[K];
        if (typeof value === "string" && !isNaN(Date.parse(value))) {
          return new Date(value) as FieldValueMap[K];
        }
        return undefined as FieldValueMap[K];
      case "daterange":
        return (isDateRange(value) ? value : undefined) as FieldValueMap[K];
      default:
        return value as FieldValueMap[K];
    }
  }, [fieldType, value]);
}

function isDateRange(value: unknown): value is DateRange {
  return (
    typeof value === "object" &&
    value !== null &&
    ("from" in value
      ? value.from === undefined || value.from instanceof Date
      : true) &&
    ("to" in value ? value.to === undefined || value.to instanceof Date : true)
  );
}
