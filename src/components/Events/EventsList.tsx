
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CalendarDays } from "lucide-react";

import EventCard from "@/components/Events/EventCard";
import EventsFilter from "@/components/Events/EventsFilter";

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

export default function EventsList({
  endpoint = "/upcoming-events",
}: EventsListProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);

      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

        const response = await fetch(`${apiUrl}${endpoint}`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const result: EventsResponse = await response.json();

        if (!result.success) {
          throw new Error(result.message);
        }

        setEvents(result.data);
      } catch (error) {
        console.error("Fetch events error:", error);
        toast.error("Failed to load events.");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [endpoint]);

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
        onCategoryChange={setSelectedCategory}
      />

      <div className="mt-10">
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-2xl bg-gray-100"
              />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-green-200 bg-green-50/50 px-6 py-16 text-center">
            <CalendarDays
              className="mx-auto mb-4 text-green-600"
              size={40}
            />

            <h3 className="text-xl font-semibold text-gray-900">
              {endpoint === "/my-joined-events"
                ? "No Joined Events"
                : "No Events Found"}
            </h3>

            <p className="mt-2 text-gray-600">
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
