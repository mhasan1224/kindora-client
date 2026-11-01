
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
                ? "border-green-600 bg-green-600 text-white shadow-md"
                : "border-green-200 bg-white text-gray-700 hover:border-green-500 hover:bg-green-50 hover:text-green-700"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}