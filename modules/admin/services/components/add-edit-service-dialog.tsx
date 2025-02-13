import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Service } from "@/modules/admin/services/types";
import { Trash } from "lucide-react";
import { useRef, useState } from "react";

const getImageData = (event: React.ChangeEvent<HTMLInputElement>) => {
  const dataTransfer = new DataTransfer();

  if (event.target.files === null) {
    return {
      files: dataTransfer.files,
      displayUrl: null,
    };
  }

  for (const file of event.target.files) {
    dataTransfer.items.add(file);
  }

  return {
    files: dataTransfer.files,
    displayUrl: URL.createObjectURL(event.target.files[0]),
  };
};

type AddEditServiceDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  service?: Service;
};

export default function AddEditServiceDialog(props: AddEditServiceDialogProps) {
  const { isOpen, setIsOpen, service } = props;

  const [preview, setPreview] = useState<string | null>(service?.image || null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{service ? "แก้ไขบริการ" : "เพิ่มบริการใหม่"}</DialogTitle>
          <DialogDescription>
            {service
              ? "กรุณาแก้ไขรายละเอียดของบริการ"
              : "กรุณากรอกรายละเอียดของบริการใหม่"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <div className="space-y-2">
            <Label htmlFor="image">รูป</Label>
            <Input
              ref={imageInputRef}
              type="file"
              id="image"
              accept="image/*"
              onChange={(event) => {
                const { files, displayUrl } = getImageData(event);
                setPreview(displayUrl);
                if (imageInputRef.current !== null) {
                  imageInputRef.current.value = "";
                }
              }}
            />
          </div>
          {preview && (
            <div className="relative">
              <img
                className="rounded-md w-full shadow-sm border border-input"
                src={preview}
                alt=""
              />
              <Button
                size="icon"
                variant="destructive"
                className="absolute left-2 bottom-2"
                onClick={() => setPreview(null)}
              >
                <Trash />
              </Button>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="name">ชื่อบริการ</Label>
            <Input id="name" placeholder="ตัดผม" defaultValue={service?.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">ราคา</Label>
            <Input id="price" placeholder="250" defaultValue={service?.price} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration" defaultValue={service?.duration}>
              ระยะเวลา
            </Label>
            <Select defaultValue={service?.duration.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="เลือกระยะเวลา" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 นาที</SelectItem>
                <SelectItem value="15">15 นาที</SelectItem>
                <SelectItem value="20">20 นาที</SelectItem>
                <SelectItem value="30">30 นาที</SelectItem>
                <SelectItem value="45">45 นาที</SelectItem>
                <SelectItem value="60">60 นาที</SelectItem>
                <SelectItem value="90">90 นาที</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              ยกเลิก
            </Button>
          </DialogClose>
          <Button>บันทึก</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
