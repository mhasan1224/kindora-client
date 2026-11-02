
import EventsList from "@/components/Events/EventsList";
import { CalendarCheck } from "lucide-react";

export default function MyJoinedEventsPage() {
  return (
    <main className="min-h-screen bg-green-50/30 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            <CalendarCheck size={16} />
            Your Activities
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            My Joined{" "}
            <span className="text-green-600">Events</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Explore the events you have joined and keep track
            of your upcoming community activities.
          </p>
        </div>

        <EventsList endpoint="/my-joined-events" />
      </div>
    </main>
  );
}
