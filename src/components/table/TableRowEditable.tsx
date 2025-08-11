import { useGetFieldType } from "@/hooks/useGetFieldType";
import type { RowData } from "@/hooks/useSortedData";
import { TableBody, TableRow, TableCell } from "../ui/table";
import { TableEditableCell } from "./TableEditableCell";

interface TableRowEditableProps {
  rowData: (string[] | undefined)[];
  headers: string[];
  disableCell?: string;
  data?: RowData[];
  onDataChange: (rowIndex: number, key: string, value: any) => void;
}

export function TableRowEditable({
  rowData,
  headers,
  disableCell,
  data,
  onDataChange,
}: TableRowEditableProps) {
  const fieldTypes = headers.map((header) => useGetFieldType(header, data));

  return (
    <TableBody>
      {rowData?.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {headers.map((header, cellIndex) => (
            <TableCell key={cellIndex} className="border-l">
              <TableEditableCell
                key={`${rowIndex}-${header}-${fieldTypes[cellIndex]}`}
                value={data?.[rowIndex]?.[header]}
                rowIndex={rowIndex}
                header={header}
                fieldType={fieldTypes[cellIndex]}
                disableCell={disableCell}
                onDataChange={onDataChange}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
