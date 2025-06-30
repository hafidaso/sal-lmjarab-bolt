import React from "react";
import { motion } from "framer-motion";
import { IconCheck, IconStar, IconUser, IconHeart } from "@tabler/icons-react";
import { cn } from "../../lib/utils";

export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export function AnimatedTimeline({
  events,
  className = "",
}: {
  events: TimelineEvent[];
  className?: string;
}) {
  return (
    <div className={cn("relative pl-6 border-l-2 border-primary-200 dark:border-primary-800", className)}>
      {events.map((event, idx) => (
        <motion.div
          key={event.year + event.title}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="mb-12 last:mb-0 relative"
        >
          <div className="absolute -left-7 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 border-2 border-primary-400 dark:border-primary-700 shadow">
            {event.icon || <IconStar className="w-6 h-6 text-primary-600 dark:text-primary-400" />}
          </div>
          <div className="ml-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">{event.year}</span>
              <span className="text-gray-400 dark:text-gray-500 text-xs">•</span>
              <span className="font-semibold text-gray-900 dark:text-white text-base">{event.title}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{event.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Example icons for timeline events
export const TimelineIcons = {
  check: <IconCheck className="w-6 h-6 text-green-500" />,
  star: <IconStar className="w-6 h-6 text-yellow-400" />,
  user: <IconUser className="w-6 h-6 text-blue-500" />,
  heart: <IconHeart className="w-6 h-6 text-pink-500" />,
}; 