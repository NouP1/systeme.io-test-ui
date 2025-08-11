export type FieldType = "string" | "number" | "boolean" | "date" | "daterange" | "unknow"; 

interface BaseFilter {
  field: string;
  label: string;
  type: FieldType;
}

export type FilterConfig = BaseFilter
