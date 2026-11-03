
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";

type EventCardProps = {
  event: {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    thumbnailUrl: string;
    location: string;
    eventDate: string;
  };
};

export default function EventCard({ event }: EventCardProps) {
  const formattedDate = new Date(
    `${event.eventDate}T00:00:00`
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={event.thumbnailUrl}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

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
            <CalendarDays size={17} className="shrink-0 text-primary" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={17} className="shrink-0 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        <Link
          href={`/upcoming-events/${event._id}`}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View Details
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}
