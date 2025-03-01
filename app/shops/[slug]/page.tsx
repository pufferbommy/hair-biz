"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { Service } from "@/modules/app/services/types";
import BookingCalendar from "@/modules/shop/components/booking-calendar";
import TimeSelector from "@/modules/shop/components/time-selector";
import {
  convertMinutesToHourMinute,
  formatDate,
  formatTimeRange,
} from "@/utils/date";
import { InputMask } from "@react-input/mask";
import { addMinutes, set } from "date-fns";
import { Calendar, Clock, Scissors } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const mockData = {
  categories: [
    {
      id: "1",
      name: "ผม",
      services: [
        {
          id: "1",
          name: "ตัดผมชาย",
          image:
            "https://images.unsplash.com/photo-1606333259737-6da197890fa2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpcmN1dHxlbnwwfHwwfHx8MA%3D%3D",
          price: 300,
          description: "ตัดได้ทุกทรง",
          duration: 30,
        },
        {
          id: "2",
          name: "ตัดผมหญิง",
          image:
            "https://images.unsplash.com/photo-1519413840894-85ce923d2b9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpcmN1dHxlbnwwfHwwfHx8MA%3D%3D",
          price: 500,
          description: "",
          duration: 45,
        },
        {
          id: "4",
          name: "สระผม",
          image:
            "https://images.unsplash.com/photo-1519413840894-85ce923d2b9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpcmN1dHxlbnwwfHwwfHx8MA%3D%3D",
          price: 100,
          description: "สระผม 100 บาท",
          duration: 15,
        },
        {
          id: "5",
          name: "ดัดผม",
          image:
            "https://images.unsplash.com/photo-1519413840894-85ce923d2b9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpcmN1dHxlbnwwfHwwfHx8MA%3D%3D",
          price: 2000,
          description: "ดัดผม 2000 บาท",
          duration: 60,
        },
        {
          id: "6",
          name: "ทำสีผม",
          image:
            "https://images.unsplash.com/photo-1519413840894-85ce923d2b9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpcmN1dHxlbnwwfHwwfHx8MA%3D%3D",
          price: 2000,
          description: "ทำสีผม 2000 บาท",
          duration: 60,
        },
      ],
    },
    {
      id: "2",
      name: "เล็บ",
      services: [
        {
          id: "7",
          name: "ทำเล็บ",
          image:
            "https://images.unsplash.com/photo-1519413840894-85ce923d2b9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpcmN1dHxlbnwwfHwwfHx8MA%3D%3D",
          price: 500,
          description: "ทำเล็บ 500 บาท",
          duration: 60,
        },
        {
          id: "8",
          name: "ทำเล็บ",
          image:
            "https://images.unsplash.com/photo-1519413840894-85ce923d2b9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpcmN1dHxlbnwwfHwwfHx8MA%3D%3D",
          price: 500,
          description: "ทำเล็บ 500 บาท",
          duration: 60,
        },
        {
          id: "9",
          name: "ทำเล็บ",
          image:
            "https://images.unsplash.com/photo-1519413840894-85ce923d2b9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpcmN1dHxlbnwwfHwwfHx8MA%3D%3D",
          price: 500,
          description: "ทำเล็บ 500 บาท",
          duration: 60,
        },
        {
          id: "10",
          name: "ทำเล็บ",
          image:
            "https://images.unsplash.com/photo-1519413840894-85ce923d2b9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpcmN1dHxlbnwwfHwwfHx8MA%3D%3D",
          price: 500,
          description: "ทำเล็บ 500 บาท",
          duration: 60,
        },
        {
          id: "11",
          name: "ทำเล็บ",
          image:
            "https://images.unsplash.com/photo-1519413840894-85ce923d2b9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpcmN1dHxlbnwwfHwwfHx8MA%3D%3D",
          price: 500,
          description: "ทำเล็บ 500 บาท",
          duration: 60,
        },
        {
          id: "12",
          name: "ทำเล็บ",
          image:
            "https://images.unsplash.com/photo-1519413840894-85ce923d2b9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpcmN1dHxlbnwwfHwwfHx8MA%3D%3D",
          price: 500,
          description: "ทำเล็บ 500 บาท",
          duration: 60,
        },
        {
          id: "13",
          name: "ทำเล็บ",
          image:
            "https://images.unsplash.com/photo-1519413840894-85ce923d2b9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpcmN1dHxlbnwwfHwwfHx8MA%3D%3D",
          price: 500,
          description: "ทำเล็บ 500 บาท",
          duration: 60,
        },
        {
          id: "14",
          name: "ทำเล็บ",
          image:
            "https://images.unsplash.com/photo-1519413840894-85ce923d2b9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpcmN1dHxlbnwwfHwwfHx8MA%3D%3D",
          price: 500,
          description: "ทำเล็บ 500 บาท",
          duration: 60,
        },
        {
          id: "15",
          name: "ทำเล็บ",
          image:
            "https://images.unsplash.com/photo-1519413840894-85ce923d2b9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpcmN1dHxlbnwwfHwwfHx8MA%3D%3D",
          price: 500,
          description: "ทำเล็บ 500 บาท",
          duration: 60,
        },
      ],
    },
    {
      id: "3",
      name: "นวด",
      services: [
        {
          id: "16",
          name: "นวดศีรษะ",
          image:
            "https://images.unsplash.com/photo-1519413840894-85ce923d2b9d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpcmN1dHxlbnwwfHwwfHx8MA%3D%3D",
          price: 300,
          description: "นวดศีรษะ 300 บาท",
          duration: 30,
        },
      ],
    },
  ],
};

enum Step {
  DateTime = 0,
  Service = 1,
  Confirm = 2,
}

export default function ShopPage() {
  const shop = {
    name: "Barber Shop",
    description: "Our shop is the best in cutting hair.",
    openTime: set(new Date(), {
      hours: 10,
      minutes: 10,
    }),
    closeTime: set(new Date(), {
      hours: 23,
      minutes: 59,
    }),
    timeInterval: 60,
  };

  const [date, setDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | undefined>();
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [step, setStep] = useState(Step.DateTime);

  const handleTimeSelect = useCallback((time: Date) => {
    setSelectedTime(time);
    setStep(Step.Service);
  }, []);

  const handleConfirmClick = () => {
    toast.success("จองสำเร็จ");
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <Card className="divide-x flex">
        <div className="p-4 w-[calc(512px/2)] space-y-4">
          <div className="space-y-2">
            <Avatar className="size-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-bold truncate">{shop.name}</h1>
            <p className="text-sm truncate">{shop.description}</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock size={14} />
            {convertMinutesToHourMinute(shop.timeInterval)}
          </div>
          {selectedTime && (
            <div className="flex items-center text-sm gap-2">
              <Calendar size={14} />
              <div className="flex flex-col gap-1">
                {formatDate(date)}
                <span>
                  {formatTimeRange(
                    selectedTime,
                    addMinutes(selectedTime, shop.timeInterval),
                  )}
                </span>
              </div>
            </div>
          )}
          {step === Step.Confirm && (
            <div className="flex items-center text-sm gap-2">
              <Scissors size={14} className="shrink-0" />
              <div className="flex gap-1 flex-wrap">
                {selectedServices.map((service) => (
                  <Badge variant="secondary" key={service.id}>
                    {service.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          {step === Step.DateTime ? (
            <div className="flex divide-x">
              <BookingCalendar date={date} setDate={setDate} />
              <TimeSelector
                date={date}
                openTime={shop.openTime}
                closeTime={shop.closeTime}
                timeInterval={shop.timeInterval}
                onTimeSelect={handleTimeSelect}
                selectedTime={selectedTime}
              />
            </div>
          ) : step === Step.Service ? (
            <div className="h-[533.2px] flex flex-col">
              <div className="p-4">
                <h2 className="font-bold inline">เลือกบริการ</h2>{" "}
                <span className="text-sm">
                  (
                  {selectedServices.length <= 0
                    ? "อย่างน้อย 1 รายการ"
                    : `${selectedServices.length} รายการ`}
                  )
                </span>
              </div>
              <ScrollArea className="w-[512px] h-full">
                <div className="px-4 space-y-8">
                  {mockData.categories.map((category) => (
                    <div key={category.id} className="space-y-4">
                      <div className="flex items-center gap-4 sticky top-0 bg-card">
                        <span className="shrink-0 text-sm">
                          {category.name}
                        </span>
                        <Separator className="flex-1" />
                      </div>
                      {category.services.map((service) => (
                        <Button
                          variant="ghost"
                          key={service.id}
                          onClick={() =>
                            setSelectedServices((prev) => {
                              if (prev.some((s) => s.id === service.id)) {
                                return prev.filter((s) => s.id !== service.id);
                              }
                              return [...prev, service];
                            })
                          }
                          className="gap-4 text-start w-full h-auto"
                        >
                          <Checkbox
                            className="size-6 rounded-full"
                            checked={selectedServices.some(
                              (s) => s.id === service.id,
                            )}
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{service.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {`${service.duration} นาที`}
                              {service.description &&
                                ` - ${service.description}`}
                            </p>
                          </div>
                          <p className="shrink-0 font-semibold">
                            {service.price.toLocaleString("th-TH", {
                              style: "currency",
                              currency: "THB",
                            })}
                          </p>
                        </Button>
                      ))}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex gap-2 justify-end p-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSelectedTime(undefined);
                    setStep(Step.DateTime);
                  }}
                >
                  ย้อนกลับ
                </Button>
                <Button
                  onClick={() => setStep(Step.Confirm)}
                  disabled={selectedServices.length === 0}
                >
                  ถัดไป
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-[512px]">
              <h2 className="font-bold p-4">ยืนยันการจอง</h2>
              <div className="px-4 space-y-4">
                <div className="space-y-2">
                  <Label>ชื่อ</Label>
                  <Input placeholder="johndoe" />
                </div>
                <div className="space-y-2">
                  <Label>เบอร์โทรศัพท์ติดต่อ</Label>
                  <InputMask
                    type="tel"
                    mask="___-___-____"
                    replacement={{ _: /\d/ }}
                    placeholder="080-123-4567"
                    component={Input}
                  />
                </div>
                <div className="space-y-2 ">
                  <Label>หมายเหตุ</Label>
                  <Textarea placeholder="ข้อความ" />
                </div>
              </div>
              <div className="flex gap-2 p-4 justify-end">
                <Button variant="ghost" onClick={() => setStep(Step.Service)}>
                  ย้อนกลับ
                </Button>
                <Button onClick={handleConfirmClick}>ยืนยัน</Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </main>
  );
}
