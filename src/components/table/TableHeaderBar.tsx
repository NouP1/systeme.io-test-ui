import type { RowData } from "@/lib/types/data";
import { TableFilter } from "../filter/Filter";
import { Modal } from "../modal/Modal";
import type { FilterConfig } from "@/lib/types/filter";
import { useGenerateFilters } from "@/hooks/useGenerateFilters";

interface TableHeaderBarProps {
  disableCell?: string;
  headers: string[] | null;
  rowData: (string[] | undefined)[];
  data?: RowData[];
  filters?: FilterConfig[];
  onFilterChange: (activeFilters: RowData) => void;
  onDataChange: (rowIndex: number, key: string, value: any) => void;
  isEditMode:boolean;
  setIsEditMode:React.Dispatch<React.SetStateAction<boolean>>
}
export function TableHeaderBar({
  isEditMode,
  setIsEditMode,
  disableCell,
  headers,
  rowData,
  data,
  onFilterChange,
  onDataChange,
}: TableHeaderBarProps) {

  const filters = useGenerateFilters(headers, data);

  return (
    <div className="flex justify-end border items-center gap-2 bg-muted p-2 rounded-t-lg">
      <Modal headers={headers} rowData={rowData} data={data} disableCell={disableCell} onDataChange={onDataChange} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
      <TableFilter filters={filters} data={data} rowData={rowData} onChange={onFilterChange}  />
    </div>
  );
}
