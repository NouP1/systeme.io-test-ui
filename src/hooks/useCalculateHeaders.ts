import { useFlattenObject } from "./useFlattenObject";
import type { TableData } from "@/lib/types/data";

export function useCalculateHeaders({ data }: TableData) {
  if (!data || data.length === 0) return null;

  const headers = Array.from(
    new Set(data.flatMap((row) => Object.keys(useFlattenObject(row))))
  );
  return headers;
}
