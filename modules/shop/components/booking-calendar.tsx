import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { th } from "date-fns/locale/th";

export default function BookingCalendar(props: {
  date: Date | undefined;
  setDate: (date: Date) => void;
}) {
  return (
    <Calendar
      formatters={{
        formatCaption: (date) => {
          return (
            <>
              <span className="font-bold">
                {format(date, "MMMM", {
                  locale: th,
                })}
              </span>{" "}
              {date.getFullYear() + 543}
            </>
          );
        },
      }}
      mode="single"
      selected={props.date}
      onSelect={(date) => date && props.setDate(date)}
      required
      fromDate={new Date()}
      className="p-4 h-[533.2px]"
      captionLayout="dropdown"
      classNames={{
        caption: "flex justify-between items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-transparent p-0 !static opacity-50 hover:opacity-100",
        ),
        nav: "space-x-2 flex items-center",
        head_cell:
          "text-muted-foreground rounded-md w-16 font-normal text-[0.8rem]",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-16 w-16 p-0 font-normal aria-selected:opacity-100",
        ),
      }}
    />
  );
}
