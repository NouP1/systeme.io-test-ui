import { Layout } from "@/components/layout/Layout";
import { Table } from "@/components/table/Table";
import { TableHeaderBar } from "@/components/table/TableHeaderBar";
import { useFilterData } from "@/hooks/useFilterData";
import { useSortedData, type RowData } from "@/hooks/useSortedData";
import { useTableDataUi } from "@/hooks/useTableDataUi";
import { pagesData } from "@/lib/data/mockData";
import type { SortType } from "@/lib/types/data";
import { useCallback, useEffect, useState } from "react";

export function Pages() {
  const savedData = JSON.parse(
    localStorage.getItem("pages_tableData") || "null"
  );
  const { headers } = useTableDataUi(pagesData);
  const initialData = savedData ?? pagesData;
  const [filter, setFilter] = useState<RowData>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableData, setEditableData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState<{
    column: string;
    type: SortType;
  } | null>(null);

  useEffect(() => {
    if (!isEditMode) {
      const saved = localStorage.getItem("pages_tableData");
      if (saved) {
        setEditableData(JSON.parse(saved));
      } else {
        setEditableData(pagesData);
      }
    }
  }, [isEditMode]);

  const handleDataChange = useCallback(
    (rowIndex: number, key: string, value: any) => {
      setEditableData((prev: any) => {
        const newData = [...prev];
        const oldValue = newData[rowIndex][key];

        if (oldValue === value) return prev;

        newData[rowIndex] = { ...newData[rowIndex], [key]: value };
        console.log("Saving to localStorage:", newData[rowIndex][key]);
        localStorage.setItem("pages_tableData", JSON.stringify(newData));
        return newData;
      });
    },
    []
  );

  const disableCell = "id";
  const filteredData = useFilterData(editableData, filter);
  const sortedData = useSortedData(filteredData, sortConfig) ?? filteredData;

  return (
    <Layout
      tabs={{
        items: [
          { label: "Products", href: "/products" },
          { label: "Price Plans", href: "/price-plans" },
          { label: "Pages", href: "/pages" },
        ],
      }}
    >
      <div className="flex flex-col border rounded-lg p-4 shadow w-1/2">
        <TableHeaderBar
          disableCell={disableCell}
          headers={headers}
          rowData={useTableDataUi(sortedData).rowData}
          data={editableData}
          onFilterChange={(newFilter) => setFilter(newFilter)}
          onDataChange={handleDataChange}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />

        <div className="max-h-[500px] overflow-y-auto">
          <Table
            disableCell={disableCell}
            headers={headers}
            rowData={useTableDataUi(sortedData).rowData}
            data={editableData}
            onSortChange={(column, type) => setSortConfig({ column, type })}
            onDataChange={handleDataChange}
          />
        </div>
      </div>
    </Layout>
  );
}
