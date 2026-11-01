
import EventsList from "@/components/Events/EventsList";
import { CalendarDays } from "lucide-react";

export default function UpcomingEventsPage() {
  return (
    <main className="min-h-screen bg-green-50/30 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            <CalendarDays size={16} />
            Community Events
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Upcoming{" "}
            <span className="text-green-600">Events</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Discover meaningful opportunities, connect with your
            community, and take part in activities that create
            positive change.
          </p>
        </div>

        <EventsList />
      </div>
    </main>
  );
}
