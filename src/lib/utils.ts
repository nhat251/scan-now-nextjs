import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

export const uuid = (): string => {
  return uuidv4();
};
