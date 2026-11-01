
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { toast } from "sonner";

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

export default function RecentEventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

        const response = await fetch(`${apiUrl}/events`);

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const result: EventsResponse = await response.json();

        if (!result.success) {
          throw new Error(result.message);
        }

        const upcomingEvents = result.data
          .filter((event) => {
            const eventDate = new Date(`${event.eventDate}T00:00:00`);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            return eventDate >= today;
          })
          .sort(
            (a, b) =>
              new Date(a.eventDate).getTime() -
              new Date(b.eventDate).getTime()
          )
          .slice(0, 6);

        setEvents(upcomingEvents);
      } catch (error) {
        console.error("Fetch events error:", error);
        toast.error("Failed to load upcoming events.");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <section className="bg-white px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
              Make a Difference
            </p>

            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Upcoming <span className="text-green-600">Events</span>
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-gray-600">
              Discover upcoming opportunities and join hands to create
              positive changes in your community.
            </p>
          </div>

          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 font-semibold text-green-700 transition-colors hover:text-green-900"
          >
            View All Events
            <ArrowRight size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-2xl bg-gray-100"
              />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-green-200 bg-green-50/50 px-6 py-16 text-center">
            <CalendarDays className="mx-auto mb-4 text-green-600" size={40} />
            <h3 className="text-xl font-semibold text-gray-900">
              No Upcoming Events
            </h3>
            <p className="mt-2 text-gray-600">
              Check back later for new community events.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <motion.article
                key={event._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
              >
                <div
                  className="h-52 bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${event.thumbnailUrl}")`,
                  }}
                  role="img"
                  aria-label={event.title}
                />

                <div className="p-6">
                  <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {event.eventType}
                  </span>

                  <h3 className="mt-4 line-clamp-1 text-xl font-bold text-gray-900">
                    {event.title}
                  </h3>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={17} className="text-green-600" />
                      {new Date(
                        `${event.eventDate}T00:00:00`
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin size={17} className="text-green-600" />
                      {event.location}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
