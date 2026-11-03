
"use client";

import { eventCategories } from "@/lib/event-categories";

type EventsFilterProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export default function EventsFilter({
  selectedCategory,
  onCategoryChange,
}: EventsFilterProps) {
  const filters = ["All Categories", ...eventCategories];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {filters.map((category) => {
        const isActive = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "border-primary bg-primary text-primary-foreground shadow-md"
                : "border-border bg-card text-foreground hover:border-primary hover:bg-secondary hover:text-primary"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}