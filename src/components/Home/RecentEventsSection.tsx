
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import EventCardSkeleton from "@/components/Events/EventCardSkeleton";

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

        setEvents(result.data);
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
    <section className="bg-card px-6 py-20 sm:py-24 dark:bg-secondary">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Make a Difference
            </p>

            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Upcoming <span className="text-primary">Events</span>
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
              Discover upcoming opportunities and join hands to create positive
              changes in your community.
            </p>
          </div>

          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary/80"
          >
            View All Events
            <ArrowRight size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-secondary/50 px-6 py-16 text-center dark:bg-background/40">
            <CalendarDays className="mx-auto mb-4 text-primary" size={40} />

            <h3 className="text-xl font-semibold text-foreground">
              No Upcoming Events
            </h3>

            <p className="mt-2 text-muted-foreground">
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
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl"
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
                  <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                    {event.eventType}
                  </span>

                  <h3 className="mt-4 line-clamp-1 text-xl font-bold text-foreground">
                    {event.title}
                  </h3>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-border pt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={17} className="text-primary" />
                      {new Date(
                        `${event.eventDate}T00:00:00`,
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin size={17} className="text-primary" />
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
