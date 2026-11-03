
import { Suspense } from "react";
import EventsList from "@/components/Events/EventsList";
import EventCardSkeleton from "@/components/Events/EventCardSkeleton";
import { CalendarDays } from "lucide-react";

export default function UpcomingEventsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">
            <CalendarDays size={16} />
            Community Events
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Upcoming{" "}
            <span className="text-primary">Events</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Discover meaningful opportunities, connect with your
            community, and take part in activities that create
            positive change.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <EventCardSkeleton key={index} />
              ))}
            </div>
          }
        >
          <EventsList />
        </Suspense>
      </div>
    </main>
  );
}
