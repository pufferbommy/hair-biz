import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import type { Barber } from "../types";

export const columns: ColumnDef<Barber>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="เลือกทั้งหมด"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="เลือกแถว"
      />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "รูป",
    enableGlobalFilter: false,
    cell: ({ row }) => (
      <img
        className="w-10 h-10 object-cover rounded"
        src={row.getValue("image")}
        alt={row.getValue("nickname")}
      />
    ),
  },
  {
    accessorKey: "nickname",
    header: "ชื่อเล่น",
    cell: ({ row }) => row.getValue("nickname"),
  },
  {
    id: "actions",
    enableHiding: false,
    header: "การจัดการ",
    enableGlobalFilter: false,
    cell: ({ row }) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      return (
        <div className="flex gap-2">
          <Button onClick={() => setIsDialogOpen(true)} variant="outline">
            แก้ไข
          </Button>
          {/* <AddEditServiceDialog
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
            service={row.original} // Assuming this is a service, adjust if necessary
          /> */}
          <Button variant="destructive">ลบ</Button>
        </div>
      );
    },
  },
];
