import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertDate(dateStr: Date | null | string) {
  if (dateStr) {
    const dateObj = new Date(dateStr);

    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getUTCDate()).padStart(2, "0");

    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }
}
