import { useCalculateHeaders } from "@/hooks/useCalculateHeaders";
import { useFormatCell } from "@/hooks/useFormatCell";
import { useFlattenObject } from "@/hooks/useFlattenObject";
import type { RowData } from "@/lib/types/data";

export function useTableDataUi(data: RowData[] | string[][]) {
  if (Array.isArray(data[0])) {
    return { headers: null, rowData: data as string[][] };
  }

  const headers = useCalculateHeaders({ data: data as RowData[] });
  const rowData = (data as RowData[]).map((row) => {
    const flatRow = useFlattenObject(row);
    return headers?.map((header) => useFormatCell(flatRow[header]));
  });

  return { headers, rowData };
}