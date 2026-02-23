import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function isOverTemperature(temp: number, limit = 200) {
  return temp > limit;
}

export function percentage(current: number, target: number) {
  if (!target) return 0;
  return Math.round((current / target) * 100);
}
