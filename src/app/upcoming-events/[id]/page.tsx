
import EventDetails from "@/components/Events/EventDetails";

type EventDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;

  return <EventDetails eventId={id} />;
}
