
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { CalendarDays } from "lucide-react";

import EventCard from "@/components/Events/EventCard";
import EventCardSkeleton from "@/components/Events/EventCardSkeleton";
import EventsFilter from "@/components/Events/EventsFilter";
import { getAccessToken } from "@/lib/get-access-token";

type Event = {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnailUrl: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
};

type EventsResponse = {
  success: boolean;
  message: string;
  data: Event[];
};

type EventsListProps = {
  endpoint?: string;
};

const allowedCategories = [
  "Tree Plantation",
  "Community Cleanup",
  "Food Donation",
  "Education Support",
  "Blood Donation",
  "Clothes Distribution",
  "Community Support",
  "Health Awareness",
];

export default function EventsList({
  endpoint = "/upcoming-events",
}: EventsListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryFromUrl = searchParams.get("category");

  const initialCategory =
    categoryFromUrl &&
    allowedCategories.includes(categoryFromUrl)
      ? categoryFromUrl
      : "All Categories";

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState(initialCategory);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function fetchEvents() {
      setLoading(true);

      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

        const headers: HeadersInit = {};

        if (endpoint === "/my-joined-events") {
          const token = await getAccessToken();

          if (!token) {
            throw new Error("Authentication required");
          }

          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${apiUrl}${endpoint}`, {
          headers,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const result: EventsResponse = await response.json();

        if (!result.success) {
          throw new Error(result.message);
        }

        if (isActive) {
          setEvents(result.data);
        }
      } catch (error) {
        console.error("Fetch events error:", error);

        if (isActive) {
          toast.error("Failed to load events.");
          setEvents([]);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    fetchEvents();

    return () => {
      isActive = false;
    };
  }, [endpoint]);

  useEffect(() => {
    const nextCategory =
      categoryFromUrl &&
      allowedCategories.includes(categoryFromUrl)
        ? categoryFromUrl
        : "All Categories";

    setSelectedCategory(nextCategory);
  }, [categoryFromUrl]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    if (endpoint !== "/upcoming-events") {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (category === "All Categories") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    const queryString = params.toString();

    router.push(
      queryString ? `${pathname}?${queryString}` : pathname,
      { scroll: false }
    );
  };

  const filteredEvents =
    selectedCategory === "All Categories"
      ? events
      : events.filter(
          (event) => event.eventType === selectedCategory
        );

  return (
    <div>
      <EventsFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <div className="mt-10">
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-secondary/50 px-6 py-16 text-center">
            <CalendarDays
              className="mx-auto mb-4 text-primary"
              size={40}
            />

            <h3 className="text-xl font-semibold text-foreground">
              {endpoint === "/my-joined-events"
                ? "No Joined Events"
                : "No Events Found"}
            </h3>

            <p className="mt-2 text-muted-foreground">
              {events.length === 0
                ? endpoint === "/my-joined-events"
                  ? "You have not joined any events yet. Explore upcoming events and join one!"
                  : "There are no upcoming events at the moment."
                : "No events found in this category."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
