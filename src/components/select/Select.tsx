import {
  SelectRoot,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import type { SortType } from "@/lib/types/data";
import type { FieldType } from "@/lib/types/filter";
import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownAZ,
  ArrowUp10,
  ArrowUpAZ,
  ArrowUpDown,
  ArrowUpZA,
  ClockArrowDown,
  ClockArrowUp,
  MoveDown,
  MoveUp,
} from "lucide-react";
import { useState, type JSX } from "react";

interface SelectProps {
  fieldType: FieldType;
  onSortChange: (type: SortType) => void;
}
export function Select({ fieldType, onSortChange }: SelectProps) {
  const [sortType, setSortType] = useState<SortType>("");

  const sortIcons: Record<SortType, JSX.Element> = {
    asc: <ArrowDown01 className="w-4 h-4 text-green-500" />,
    desc: <ArrowUp10 className="w-4 h-4 text-red-500" />,
    "time-asc": <ClockArrowDown className="w-4 h-4 text-green-500" />,
    "time-desc": <ClockArrowUp className="w-4 h-4 text-red-500" />,
    "asc-alpha": <ArrowDownAZ className="w-4 h-4 text-green-500" />,
    "desc-alpha": <ArrowUpZA className="w-4 h-4 text-red-500" />,
    "true-first": <MoveDown className="w-4 h-4 text-green-500" />,
    "false-first": <MoveUp className="w-4 h-4 text-red-500" />,
    "": <></>,
  };

  const handleChange = (value: string) => {
    setSortType(value as SortType);
    onSortChange?.(value as SortType);
  };

  let sortOptions: { value: SortType; label: string }[] = [];

  if (fieldType === "string") {
    sortOptions = [
      { value: "asc-alpha", label: "A → Z" },
      { value: "desc-alpha", label: "Z → A" },
    ];
  } else if (fieldType === "number") {
    sortOptions = [
      { value: "asc", label: "По возрастанию" },
      { value: "desc", label: "По убыванию" },
    ];
  } else if (fieldType === "date") {
    sortOptions = [
      { value: "time-asc", label: "Сначала более ранние" },
      { value: "time-desc", label: "Сначала более поздние" },
    ];
  } else if (fieldType === "boolean") {
    sortOptions = [
      { value: "true-first", label: "Сначала true" },
      { value: "false-first", label: "Сначала false" },
    ];
  }

  return (
    <SelectRoot value={sortType} onValueChange={handleChange}>
      <SelectTrigger
        className="p-1 border rounded-sm hover:bg-gray-200 ring-none outline-none data-[size=sm]:h-6 focus-visible:ring-none focus-visible:border-border focus-visible:ring-ring/0"
        size="sm"
      >
        {sortType ? (
          sortIcons[sortType as Exclude<SortType, "">]
        ) : (
          <ArrowUpDown className="text-muted-foreground" />
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              title={option.label}
            >
              <div className="flex items-center gap-2">
                {sortIcons[option.value as Exclude<SortType, "">]}
                <span>{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  );
}
