import {
  TableRoot,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select } from "../select/Select";
import type { RowData, SortType } from "@/lib/types/data";
import { cn } from "@/lib/utils";
import { useGetFieldType } from "@/hooks/useGetFieldType";
import { TableRowEditable } from "./TableRowEditable";

interface TableProps {
  disableCell?: string;
  headers: string[] | null;
  rowData: (string[] | undefined)[];
  isEditMode?: boolean;
  data?: RowData[];
  onSortChange?: (column: string, type: SortType) => void;
  onDataChange: (rowIndex: number, key: string, value: any) => void;
}

export function Table({
  disableCell,
  headers,
  rowData,
  isEditMode = false,
  data,
  onSortChange,
  onDataChange,
}: TableProps) {
  if (!headers) return null;

  return (
    <TableRoot className="border-l border-r p-4 ">
      <TableHeader className="sticky top-0 bg-white z-10">
        <TableRow>
          {headers.map((header) => {
            const fieldType = useGetFieldType(header, data);
            return (
              <TableHead
                key={header}
                className={cn(
                  "capitalize border-r",
                  isEditMode && data && data.length > 0 && headers && "border-t"
                )}
              >
                <div className="flex gap-2 items-center">
                  {header}
                  {!isEditMode && (
                    <Select
                      fieldType={fieldType}
                      onSortChange={(type) => onSortChange?.(header, type)}
                    />
                  )}
                </div>
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      {!isEditMode ? (
        <TableBody>
          {rowData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={headers.length} className="text-center py-4">
                <p className="italic text-muted-foreground text-lg">
                  Not found ...
                </p>
              </TableCell>
            </TableRow>
          ) : (
            rowData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row?.map((cell, cellIndex) => (
                  <TableCell key={cellIndex} className="border-l">
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      ) : data && data.length === 0 ? (
        <TableBody>
          <TableRow>
            <TableCell colSpan={headers.length} className="text-center py-4">
              No data
            </TableCell>
          </TableRow>
        </TableBody>
      ) : (
        isEditMode &&
        rowData &&
        rowData.length > 0 &&
        headers && (
          <TableRowEditable
            rowData={rowData}
            headers={headers}
            disableCell={disableCell}
            data={data}
            onDataChange={onDataChange}
          />
        )
      )}
    </TableRoot>
  );
}
