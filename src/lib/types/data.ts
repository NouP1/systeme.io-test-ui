export type RowData = Record<string, unknown>;

export interface TableData {
  data: RowData[];
}

export type SortType =
  | "asc"
  | "time-asc"
  | "time-desc"
  | "desc"
  | "asc-alpha"
  | "desc-alpha"
  | "true-first"
  | "false-first"
  | "";
