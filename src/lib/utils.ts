import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTimeTogether(startDate: Date) {
  const now = new Date();
  const diff = now.getTime() - startDate.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44);
  const years = Math.floor(days / 365.25);

  return {
    years,
    months: months % 12,
    days: days % 30,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
    totalDays: days,
    totalHours: hours,
  };
}

export function getRelationshipStats(startDate: Date) {
  const { totalDays, totalHours } = calculateTimeTogether(startDate);
  return {
    days: totalDays,
    hours: totalHours,
    memories: Math.floor(totalDays * 3.2),
    adventures: Math.floor(totalDays / 7),
    smiles: totalDays * 24 * 6,
    loveLevel: 100,
  };
}
