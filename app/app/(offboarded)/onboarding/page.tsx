"use client";

import { createShop } from "@/actions/shop";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { defineStepper } from "@stepperize/react";
import { Calendar, Store } from "lucide-react";
import React, { useMemo } from "react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Constants
const DAYS_OF_WEEK = [
  "วันจันทร์",
  "วันอังคาร",
  "วันพุธ",
  "วันพฤหัสบดี",
  "วันศุกร์",
  "วันเสาร์",
  "วันอาทิตย์",
];

const DEFAULT_START_TIME = "09:00";
const DEFAULT_END_TIME = "18:00";

// Function to generate time options
const generateTimeOptions = () => {
  const timeOptions = [];
  for (let hour = 0; hour <= 23; hour++) {
    for (let minute = 0; minute <= 45; minute += 15) {
      const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      timeOptions.push({ label: formattedTime, value: formattedTime });
    }
  }
  timeOptions.push({ label: "23:59", value: "23:59" });
  return timeOptions;
};

// Zod Schemas
export const shopSettingsSchema = z.object({
  logo: z.string(),
  name: z.string().min(1, "กรุณากรอกชื่อร้าน"),
  description: z.string(),
  images: z.array(z.string()),
  phoneNumber: z.string(),
  lineLink: z.string().url().or(z.literal("")),
  googleMapLink: z.string().url().or(z.literal("")),
});

export const availabilitySettingsSchema = z.object({
  availability: z.array(
    z.object({
      isAvailable: z.boolean(),
      day: z.string(),
      startTime: z.string(),
      endTime: z.string(),
    }),
  ),
});

// Types
export type ShopSettingsFormValues = z.infer<typeof shopSettingsSchema>;
export type AvailabilitySettingsFormValues = z.infer<
  typeof availabilitySettingsSchema
>;

export interface ShopFormValues
  extends ShopSettingsFormValues,
    AvailabilitySettingsFormValues {}

// Stepper Definition
const { useStepper, steps, utils } = defineStepper(
  {
    id: "shop-settings",
    title: "ข้อมูลร้านตัดผม",
    label: "ข้อมูลร้าน",
    schema: shopSettingsSchema,
    icon: <Store size={20} />,
    description:
      "กรุณากรอกข้อมูลร้านของคุณ เช่น ชื่อ, ที่อยู่, และช่องทางการติดต่อ เพื่อให้ลูกค้าสามารถติดต่อได้ง่ายขึ้น.",
  },
  {
    id: "availability-settings",
    title: "การตั้งค่าเวลาทำการ",
    label: "เวลาทำการ",
    schema: availabilitySettingsSchema,
    icon: <Calendar size={20} />,
    description:
      "กำหนดวันและเวลาที่ร้านเปิดให้บริการ เพื่อให้ลูกค้าสามารถจองคิวได้สะดวกและตรงตามเวลาที่ต้องการ.",
  },
);

// Main Component
export default function OnboardingPage() {
  const stepper = useStepper();
  const form = useForm<z.infer<typeof stepper.current.schema>>({
    resolver: zodResolver(stepper.current.schema),
    defaultValues: {
      logo: "",
      name: "",
      description: "",
      images: [],
      phoneNumber: "",
      lineLink: "",
      googleMapLink: "",
      availability: DAYS_OF_WEEK.map((day, index) => ({
        isAvailable: index < 5,
        day,
        startTime: index < 5 ? DEFAULT_START_TIME : "",
        endTime: index < 5 ? DEFAULT_END_TIME : "",
      })),
    },
  });

  const currentIndex = utils.getIndex(stepper.current.id);

  const handleSubmit = async (
    values: z.infer<typeof stepper.current.schema>,
  ) => {
    if (stepper.isLast) {
      const shop = await createShop(form.getValues() as ShopFormValues);
      await authClient.updateUser({
        isOnboarded: true,
      });
    } else {
      stepper.next();
    }
  };

  return (
    <div className="px-4">
      <div className="max-w-4xl mx-auto py-40">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-10"
          >
            <div className="flex justify-between items-end">
              <div className="space-y-4">
                <h2 className="font-bold text-4xl">{stepper.current.title}</h2>
                <p>{stepper.current.description}</p>
              </div>
              <nav className="group">
                <ol
                  className="flex items-center justify-between gap-2"
                  aria-orientation="horizontal"
                >
                  {stepper.all.map((step, index) => (
                    <button
                      type="button"
                      key={step.id}
                      className={cn(
                        "flex items-center border gap-2 rounded-xl p-3",
                        currentIndex === index && "border-primary",
                      )}
                      onClick={async () => {
                        const isValid = await form.trigger();
                        if (!isValid) {
                          toast("กรุณากรอกข้อมูลให้ครบถ้วน");
                          return;
                        }
                        if (index - currentIndex > 1) return;
                        stepper.goTo(step.id);
                      }}
                    >
                      <div className="bg-muted p-1.5 rounded-md">
                        {step.icon}
                      </div>
                      {currentIndex === index && (
                        <div className="flex flex-col items-start">
                          <span className="text-muted-foreground text-xs">
                            ขั้นที่ {index + 1}/{steps.length}
                          </span>
                          <span className="text-sm font-medium">
                            {step.label}
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </ol>
              </nav>
            </div>
            {stepper.switch({
              "shop-settings": () => <ShopSettingsStep />,
              "availability-settings": () => <AvailabilitySettingsStep />,
            })}
            <div className="flex justify-between items-center">
              <div className="text-sm">
                <span className="font-bold">{currentIndex + 1}</span> /{" "}
                {steps.length}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={stepper.prev}
                  disabled={stepper.isFirst}
                >
                  ย้อนกลับ
                </Button>
                <Button type="submit">
                  {stepper.isLast ? "เสร็จสิ้น" : "ถัดไป"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

// Step 1 Component
function ShopSettingsStep() {
  const form = useFormContext<ShopSettingsFormValues>();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>ชื่อร้าน</FormLabel>
              <FormControl>
                <Input placeholder="A good hair cut barber shop" {...field} />
              </FormControl>
              <FormMessage />
              {}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>เบอร์โทรศัพท์ติดต่อ</FormLabel>
              <FormControl>
                <Input placeholder="080-123-4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="lineLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ลิงก์ Line</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://line.me/R/ti/p/@abc123"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="googleMapLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ลิงก์ Google Map</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://maps.app.goo.gl/abc123"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>รายละเอียดร้าน</FormLabel>
            <FormControl>
              <Textarea
                placeholder="ร้านของเราเป็นร้านตัดผมที่ให้บริการดี มุ่งเน้นคุณภาพและความสะอาด"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="images"
        render={({ field }) => (
          <FormItem>
            <FormLabel>รูปภาพร้าน</FormLabel>
            <FormControl>
              <Input type="file" multiple {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}

// Step 2 Component
function AvailabilitySettingsStep() {
  const form = useFormContext<AvailabilitySettingsFormValues>();
  const { fields, update } = useFieldArray({
    control: form.control,
    name: "availability",
  });

  // Memoize the time options to prevent unnecessary re-renders
  const memoizedTimeOptions = useMemo(() => generateTimeOptions(), []);

  return (
    <div className="grid grid-cols-[auto,1fr] gap-4">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-subgrid h-9 items-center col-span-full"
        >
          <FormField
            control={form.control}
            name={`availability.${index}.isAvailable`}
            render={({ field: isAvailableField }) => (
              <FormItem className="space-y-0 flex items-center gap-2">
                <FormControl>
                  <Switch
                    checked={isAvailableField.value}
                    onCheckedChange={isAvailableField.onChange}
                  />
                </FormControl>
                <FormLabel>{field.day}</FormLabel>
              </FormItem>
            )}
          />
          {form.getValues(`availability.${index}.isAvailable`) && (
            <FormField
              control={form.control}
              name={`availability.${index}`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-4 items-center">
                    <Combobox
                      value={field.value.startTime}
                      onChange={(value) => {
                        const isEndTimeOver = (start: string, end: string) => {
                          const [startHours, startMinutes] = start.split(":");
                          const [endHours, endMinutes] = end.split(":");
                          return (
                            Number(startHours) > Number(endHours) ||
                            (Number(startHours) === Number(endHours) &&
                              Number(startMinutes) >= Number(endMinutes))
                          );
                        };

                        const getNextTimeOption = (value: string) => {
                          const currentIndex = memoizedTimeOptions.findIndex(
                            (option) => option.value === value,
                          );
                          return memoizedTimeOptions[currentIndex + 1];
                        };

                        update(index, {
                          ...field.value,
                          startTime: value,
                          endTime: isEndTimeOver(value, field.value.endTime)
                            ? getNextTimeOption(value)?.value || ""
                            : field.value.endTime,
                        });
                      }}
                      options={memoizedTimeOptions}
                    />
                    -
                    <Combobox
                      value={field.value.endTime}
                      onChange={(value) => {
                        update(index, {
                          ...field.value,
                          endTime: value,
                        });
                      }}
                      options={memoizedTimeOptions.slice(
                        memoizedTimeOptions.findIndex(
                          (option) => option.value === field.value.startTime,
                        ) + 1,
                      )}
                    />
                  </div>
                </FormItem>
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
