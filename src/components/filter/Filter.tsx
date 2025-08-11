import { useMemo, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import type { FilterConfig } from "@/lib/types/filter";
import { FilterIcon } from "lucide-react";
import { DatePickerWithRange } from "./DatePicker";
import type { RowData } from "@/hooks/useSortedData";
import { Dropdown, type Item } from "../dropdown/Dropdown";
import { Label } from "../ui/label";

interface TableFilterProps {
  filters: FilterConfig[];
  onChange: (activeFilters: RowData) => void;
  data?: RowData[];
  rowData: (string[] | undefined)[];
}

export function TableFilter({
  filters,
  onChange,
  data,
  rowData,
}: TableFilterProps) {
  const [values, setValues] = useState<RowData>({});
  const [open, setOpen] = useState(false);

  const updateFilter = (field: string, value: any) => {
    const updated = { ...values, [field]: value };
    setValues(updated);
    onChange(updated);
  };

  const optionsByFilter = useMemo(() => {
    const map: Record<string, Item[]> = {};

    filters.forEach((filter) => {
      const uniqueValues = Array.from(
        new Set(
          (data ?? [])
            .map((row) => row[filter.field])
            .filter(
              (v): v is string | number =>
                (typeof v === "string" && v.trim() !== "") ||
                typeof v === "number" ||
                typeof v === "boolean"
            )
        )
      ).sort((a, b) =>
        String(a).localeCompare(String(b), undefined, { numeric: true })
      );

      map[filter.field] = uniqueValues.map((val) => ({
        label: String(val),
        value: val,
      }));
    });

    return map;
  }, [filters, data]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <FilterIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-4 space-y-4">
        {filters.map((filter) => {
          switch (filter.type) {
            case "date":
              return (
                <div key={filter.field} className="flex flex-col gap-1">
                   <Label className="text-sm text-muted-foreground">
                    {filter.label}
                  </Label>
                  <DatePickerWithRange
                    mode={'range'}
                    key={filter.field}
                    label={filter.label}
                    value={values[filter.field] || {}}
                    onChange={(value) => updateFilter(filter.field, value)}
                  />
                </div>
              );

            default:
              return (
                <div key={filter.field} className="flex flex-col gap-1">
                  <Label className="text-sm text-muted-foreground">
                    {filter.label}
                  </Label>
                  <Dropdown
                    value={values[filter.field] || []}
                    allowMultipleSelection={true}
                    options={optionsByFilter[filter.field] ?? []}
                    placeholder={`Select ${filter.label.toLowerCase()}`}
                    setSelectedChoice={(choice) =>
                      updateFilter(filter.field, choice)
                    }
                    onChange={(value) => updateFilter(filter.field, value)}
                  />
                </div>
              );
          }
        })}

        <div className="flex justify-end pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setValues({});
              onChange({});
              setOpen(false);
            }}
          >
            Clear filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
