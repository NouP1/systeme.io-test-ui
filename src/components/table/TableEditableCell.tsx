import React from "react";
import { DatePickerWithRange } from "../filter/DatePicker";
import { Input } from "../ui/input";
import { Dropdown } from "../dropdown/Dropdown";
import type { DateRange } from "react-day-picker";
import type { FieldType } from "@/lib/types/filter";
import { useGetTypedValue } from "@/hooks/useGetTypedValue";

export type FieldValueMap = {
  string: string;
  number: number;
  date: Date | undefined;
  daterange: DateRange | undefined;
  boolean: boolean;
  unknow: unknown;
};

interface TableEditableCellProps<K extends keyof FieldValueMap = FieldType> {
  value: unknown;
  rowIndex: number;
  header: string;
  fieldType: K;
  disableCell?: string;
  onDataChange: (
    rowIndex: number,
    key: string,
    value: FieldValueMap[K]
  ) => void;
}

export const TableEditableCell = React.memo(function TableEditableCell<
  K extends keyof FieldValueMap
>({
  value,
  rowIndex,
  header,
  fieldType,
  disableCell,
  onDataChange,
}: TableEditableCellProps<K>) {
  const typedValue = useGetTypedValue(fieldType, value);

  switch (fieldType) {
    case "string":
      return (
        <Input
          type="text"
          defaultValue={typedValue}
          disabled={disableCell === header}
          onChange={(e) =>
            onDataChange(rowIndex, header, e.target.value as FieldValueMap[K])
          }
        />
      );

    case "number":
      return (
        <Input
          type="number"
          defaultValue={typedValue}
          disabled={disableCell === header}
          onChange={(e) =>
            onDataChange(
              rowIndex,
              header,
              Number(e.target.value) as FieldValueMap[K]
            )
          }
        />
      );

    case "date":
      return (
        <DatePickerWithRange
          mode="single"
          value={typedValue as Date | undefined}
          disabled={disableCell === header}
          onChange={(newValue) => {
            const singleDate = newValue instanceof Date ? newValue : undefined;
            onDataChange(rowIndex, header, singleDate?.toISOString() as FieldValueMap[K]
            ); console.log(newValue)
          }}
        />
      );
    case "boolean":
      return (
        <Dropdown
          value={[typedValue]}
          options={[
            { label: "true", value: true },
            { label: "false", value: false },
          ]}
          disabled={disableCell === header}
          onChange={(val) =>
            onDataChange(rowIndex, header, val[0] as FieldValueMap[K])
          }
        />
      );

    default:
      return null;
  }
});
