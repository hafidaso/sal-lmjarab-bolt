import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Time and Date Utilities
export const getCurrentUniversalTime = (): Date => {
  return new Date();
};

export const getCurrentDateString = (): string => {
  return getCurrentUniversalTime().toISOString().split('T')[0];
};

export const getCurrentDateTimeString = (): string => {
  return getCurrentUniversalTime().toISOString();
};

export const formatDateForDisplay = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateTimeForDisplay = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getRelativeTimeString = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = getCurrentUniversalTime();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
};

export const generateRecentDate = (daysAgo: number = 0): string => {
  const date = getCurrentUniversalTime();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

export const generateRecentDateTime = (daysAgo: number = 0): string => {
  const date = getCurrentUniversalTime();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}; 