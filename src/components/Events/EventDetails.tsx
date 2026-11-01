
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  ArrowLeft,
  Users,
  Globe,
} from "lucide-react";
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

type EventResponse = {
  success: boolean;
  message: string;
  data: Event;
};

type EventDetailsProps = {
  eventId: string;
};

export default function EventDetails({ eventId }: EventDetailsProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

        const response = await fetch(`${apiUrl}/events/${eventId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }

        const result: EventResponse = await response.json();

        if (!result.success) {
          throw new Error(result.message);
        }

        setEvent(result.data);
      } catch (error) {
        console.error("Fetch event details error:", error);
        setError(true);
        toast.error("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [eventId]);

  // Loading State
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="h-80 rounded-xl bg-gray-200" />

            <div>
              <div className="h-8 w-2/3 rounded bg-gray-200" />
              <div className="mt-6 h-32 rounded bg-gray-200" />
              <div className="mt-6 h-40 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error State
  if (error || !event) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Event Not Found
        </h2>

        <p className="mt-3 text-gray-600">
          We could not find this event. It may have been deleted.
        </p>

        <Link
          href="/upcoming-events"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-green-700"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>
      </main>
    );
  }

  // Format Event Date
  const formattedDate = new Date(
    `${event.eventDate}T00:00:00`
  ).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-7xl">

        {/* Back to Events */}
        <Link
          href="/upcoming-events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-green-700 transition-colors hover:text-green-900"
        >
          <ArrowLeft size={18} />
          Back to Events
        </Link>

        {/* Main Two Column Layout */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-8">

          {/* Left Column: Image and Registration */}
          <aside className="w-full space-y-5">

            {/* Event Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <Image
                src={event.thumbnailUrl}
                alt={event.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Registration Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-center text-sm font-medium text-gray-800">
                To join the event, please register below.
              </p>

              <button
                type="button"
                disabled
                title="Authentication will be implemented next."
                className="mt-4 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white opacity-70"
              >
                <Users size={18} />
                Register Now
              </button>

              <p className="mt-2 text-center text-xs text-gray-500">
                Registration will be available soon.
              </p>
            </div>
          </aside>

          {/* Right Column: Event Information */}
          <section className="w-full min-w-0">

            {/* Event Title */}
            <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
              {event.title}
            </h1>

            <div className="mt-6 space-y-5">

              {/* Event Date */}
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-gray-100 p-2">
                  <CalendarDays
                    size={18}
                    className="text-gray-700"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {formattedDate}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Event Date
                  </p>
                </div>
              </div>

              {/* Event Location */}
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-gray-100 p-2">
                  <MapPin
                    size={18}
                    className="text-gray-700"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Location
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {event.location}
                  </p>
                </div>
              </div>

              {/* Event Visibility */}
              <div className="flex items-start gap-3">
                <div className="rounded-md bg-gray-100 p-2">
                  <Globe
                    size={18}
                    className="text-gray-700"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Public
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Anyone can see this event
                  </p>
                </div>
              </div>

              {/* Event Description */}
              <div className="border-t border-gray-200 pt-5">
                <h2 className="text-lg font-bold text-gray-900">
                  About This Event
                </h2>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
                  {event.description}
                </p>
              </div>

              {/* Event Categories */}
              <div className="border-t border-gray-200 pt-5">
                <h2 className="text-lg font-bold text-gray-900">
                  Categories
                </h2>

                <span className="mt-3 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                  {event.eventType}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
