import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";

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

export function formatPhoneNumber(phoneNumber: string): string {
  const digitsOnly: string = phoneNumber.replace(/\D/g, "");
  const groups: RegExpMatchArray | null = digitsOnly.match(
    /^(\d{3})(\d{3})(\d{4})$/
  );
  if (groups) {
    const formattedNumber: string = `(${groups[1]})-${groups[2]}-${groups[3]}`;
    return formattedNumber;
  } else {
    return "Invalid phone number format";
  }
}

export async function copyToClipboard(text: string): Promise<void> {
  if ("clipboard" in navigator) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Unable to copy text to clipboard", error);
    }
  } else {
    try {
      const range = document.createRange();
      const element = document.createElement("div");
      element.textContent = text;
      document.body.appendChild(element);
      range.selectNode(element);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
        document.body.removeChild(element);
        selection.removeAllRanges();
      }
    } catch (error) {
      console.error("Unable to copy text to clipboard", error);
    }
  }
}

export const excelToJson = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const result: any = {};
      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        result[sheetName] = XLSX.utils.sheet_to_json(worksheet);
      });

      resolve(result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};
