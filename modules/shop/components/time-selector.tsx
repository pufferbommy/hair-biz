import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  addMinutes,
  format,
  getHours,
  getMinutes,
  isAfter,
  isBefore,
  set,
} from "date-fns";
import { th } from "date-fns/locale/th";
import { useMemo } from "react";

export default function TimeSelector(props: {
  openTime: Date;
  closeTime: Date;
  timeInterval: number;
  date: Date;
  selectedTime: Date | undefined;
  onTimeSelect: (time: Date) => void;
}) {
  const availableTimes: Date[] = useMemo(() => {
    const times: Date[] = [];
    const now = new Date();

    let time = set(new Date(), {
      hours: getHours(props.openTime),
      minutes: getMinutes(props.openTime),
    });

    const closingTime = set(new Date(), {
      hours: getHours(props.closeTime),
      minutes: getMinutes(props.closeTime),
    });

    while (isBefore(time, closingTime)) {
      if (isAfter(time, now)) {
        times.push(time);
      }
      time = addMinutes(time, props.timeInterval);
    }

    return times;
  }, [props.closeTime, props.openTime, props.timeInterval]);

  return (
    <div className="flex flex-col py-4 gap-4 w-[calc(512px/2)] h-[533.2px]">
      <div className="text-sm px-4 h-8 leading-8 shrink-0">
        <span className="font-bold">
          {format(props.date, "วันEEEE", {
            locale: th,
          })}
        </span>{" "}
        {format(props.date, "d", {
          locale: th,
        })}
      </div>
      <ScrollArea className="h-full px-4">
        <div className="space-y-2">
          {availableTimes.length > 0 ? (
            availableTimes.map((time) => (
              <Button
                key={time.toString()}
                variant="outline"
                onClick={() => props.onTimeSelect(time)}
                className="w-full"
              >
                {format(time, "HH:mm")}
              </Button>
            ))
          ) : (
            <div className="text-center text-sm text-muted-foreground">
              ไม่มีเวลาที่ว่าง
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
