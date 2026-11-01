
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
    <article className="group overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
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
            <CalendarDays size={17} className="shrink-0 text-green-600" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={17} className="shrink-0 text-green-600" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        <Link
          href={`/upcoming-events/${event._id}`}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
        >
          View Details
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}
