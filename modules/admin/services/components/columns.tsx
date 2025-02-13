import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import AddEditServiceDialog from "@/modules/admin/services/components/add-edit-service-dialog";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import type { Service } from "../types";

export const columns: ColumnDef<Service>[] = [
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
        className="size-10 object-cover rounded"
        src={row.getValue("image")}
        alt=""
      />
    ),
  },
  {
    accessorKey: "name",
    header: "ชื่อบริการ",
    cell: ({ row }) => row.getValue("name"),
  },
  {
    accessorKey: "price",
    header: "ราคา",
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
      }).format(row.getValue("price"));
      return formatted;
    },
  },
  {
    accessorKey: "duration",
    header: "ระยะเวลา",
    cell: ({ row }) => `${row.getValue("duration")} นาที`,
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
          <AddEditServiceDialog
            isOpen={isDialogOpen}
            setIsOpen={setIsDialogOpen}
            service={row.original}
          />
          <Button variant="destructive">ลบ</Button>
        </div>
      );
    },
  },
];
