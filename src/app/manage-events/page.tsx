"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  CalendarDays,
  MapPin,
  Pencil,
  Trash2,
  Plus,
  Leaf,
  ArrowRight,
  CalendarCheck,
  ImageIcon,
} from "lucide-react";
import { motion } from "motion/react";

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

export default function ManageEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const userEmail = "admin@example.com";

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

        const response = await fetch(
          `${apiUrl}/my-events?email=${encodeURIComponent(userEmail)}`,
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch events");
        }

        setEvents(result.data);
      } catch (error) {
        console.error("Fetch my events error:", error);

        toast.error(
          error instanceof Error ? error.message : "Something went wrong",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7faf7] px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 h-10 w-64 animate-pulse rounded-lg bg-gray-200" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                <div className="aspect-video animate-pulse bg-gray-200" />
                <div className="space-y-4 p-5">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                  <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7faf7] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-green-700">
                <Leaf size={17} />
                KINDORA COMMUNITY
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Manage My Events
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
                Keep track of your community events and make a positive
                difference together.
              </p>
            </div>

            <Link
              href="/create-event"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-green-700 hover:shadow-green-600/30"
            >
              <Plus size={19} />
              Create New Event
            </Link>
          </div>
        </motion.div>

        {/* Statistics */}
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <CalendarCheck size={24} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Created Events</p>
              <h2 className="mt-1 text-2xl font-bold text-gray-900">
                {events.length}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Leaf size={24} />
            </div>

            <div>
              <p className="text-sm text-gray-500">Community Impact</p>
              <h2 className="mt-1 text-lg font-bold text-gray-900">
                Making a Difference
              </h2>
            </div>
          </div>
        </div>

        {/* Events Section Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Your Events</h2>
            <p className="mt-1 text-sm text-gray-500">
              All the events you have created.
            </p>
          </div>

          <span className="rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
            {events.length} Events
          </span>
        </div>

        {/* Empty State */}
        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-dashed border-green-200 bg-white px-5 py-16 text-center"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600">
              <ImageIcon size={36} />
            </div>

            <h2 className="mt-6 text-xl font-bold text-gray-900">
              No Events Yet!
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              You have not created any events yet. Start something meaningful
              and bring your community together.
            </p>

            <Link
              href="/create-event"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              <Plus size={18} />
              Create Your First Event
            </Link>
          </motion.div>
        ) : (
          /* Event Cards */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <motion.article
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-900/10"
              >
                {/* Event Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-green-50">
                  <Image
                    src={event.thumbnailUrl}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  <div className="absolute left-4 top-4">
                    <span className="rounded-full border border-white/50 bg-white/90 px-3 py-1.5 text-xs font-semibold text-green-700 shadow-sm backdrop-blur">
                      {event.eventType}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-5">
                  <h3 className="line-clamp-1 text-lg font-bold text-gray-900 transition-colors group-hover:text-green-700">
                    {event.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-600">
                        <CalendarDays size={16} />
                      </div>
                      <span>{event.eventDate}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-600">
                        <MapPin size={16} />
                      </div>
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
                    <Link
                      href={`/manage-events/${event._id}/edit`}
                      className="flex items-center justify-center gap-2 rounded-xl bg-blue-50 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    <button
                      type="button"
                      disabled
                      className="flex items-center justify-center gap-2 rounded-xl bg-red-50 py-2.5 text-sm font-semibold text-red-600 opacity-60"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>

                  <Link
                    href={`/upcoming-events/${event._id}`}
                    className="mt-3 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-green-700 transition hover:text-green-800"
                  >
                    View Event Details
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
