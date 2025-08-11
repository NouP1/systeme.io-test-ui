import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Table } from "../table/Table";
import type { RowData } from "@/lib/types/data";
import { Pencil } from "lucide-react";

interface ModalProps {
  disableCell?: string;
  headers: string[] | null;
  rowData: (string[] | undefined)[];
  data?: RowData[];
  onDataChange: (rowIndex: number, key: string, value: any) => void;
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Modal({
  isEditMode,
  setIsEditMode,
  headers,
  rowData,
  data,
  disableCell,
  onDataChange,
}: ModalProps) {
  return (
    <Dialog open={isEditMode} onOpenChange={setIsEditMode}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-1/2 max-h-[500px] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle>Editing Table</DialogTitle>
        </DialogHeader>
        <Table
          disableCell={disableCell}
          headers={headers}
          rowData={rowData}
          isEditMode={true}
          data={data}
          onDataChange={onDataChange}
        />
      </DialogContent>
    </Dialog>
  );
}
