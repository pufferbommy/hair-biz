import { format } from "date-fns";
import { th } from "date-fns/locale";

export function formatDate(date: Date): string {
  return format(date, "EEEEที่ d MMMM พ.ศ. yyyy", {
    locale: th,
  }).replace(/\d{4}$/, (year) => (Number.parseInt(year) + 543).toString());
}

export function formatTimeRange(startDate: Date, endDate: Date): string {
  const formatStr = "HH:mm";
  return `เวลา ${format(startDate, formatStr)} - ${format(endDate, formatStr)} น.`;
}

export function convertMinutesToHourMinute(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours > 0 ? `${hours} ชั่วโมง` : ""} ${
    remainingMinutes > 0 ? `${remainingMinutes} นาที` : ""
  }`;
}
