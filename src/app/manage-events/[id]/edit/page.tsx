
"use client";

import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";

const eventCategories = [
  "Tree Plantation",
  "Community Cleanup",
  "Food Donation",
  "Education Support",
  "Blood Donation",
  "Clothes Distribution",
  "Community Support",
  "Health Awareness",
];

type EventFormData = {
  title: string;
  description: string;
  eventType: string;
  thumbnailUrl: string;
  location: string;
  eventDate: string;
};

const initialFormData: EventFormData = {
  title: "",
  description: "",
  eventType: "",
  thumbnailUrl: "",
  location: "",
  eventDate: "",
};

export default function EditEventPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const eventId = params.id;

  const [formData, setFormData] =
    useState<EventFormData>(initialFormData);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

        const response = await fetch(`${apiUrl}/events/${eventId}`, {
          method: "GET",
          credentials: "include",
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch event");
        }

        const event = result.data;

        if (!event) {
          throw new Error("Event not found");
        }

        setFormData({
          title: event.title,
          description: event.description,
          eventType: event.eventType,
          thumbnailUrl: event.thumbnailUrl,
          location: event.location,
          eventDate: event.eventDate,
        });
      } catch (error) {
        console.error("Fetch event error:", error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );

        router.push("/manage-events");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId, router]);

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formData.title.trim().length < 5 ||
      formData.title.trim().length > 100
    ) {
      toast.error("Title must be between 5 and 100 characters");
      return;
    }

    if (
      formData.description.trim().length < 20 ||
      formData.description.trim().length > 2000
    ) {
      toast.error("Description must be between 20 and 2000 characters");
      return;
    }

    if (
      !formData.eventType ||
      !formData.thumbnailUrl.trim() ||
      !formData.location.trim() ||
      !formData.eventDate
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Dhaka",
    });

    if (formData.eventDate <= today) {
      toast.error("Please select a future event date");
      return;
    }

    try {
      const imageUrl = new URL(formData.thumbnailUrl);

      if (imageUrl.protocol !== "https:") {
        throw new Error("Image URL must use HTTPS");
      }
    } catch {
      toast.error("Please provide a valid HTTPS image URL");
      return;
    }

    setSubmitting(true);

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      const response = await fetch(`${apiUrl}/events/${eventId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update event");
      }

      toast.success("Event updated successfully!");

      router.push("/manage-events");
      router.refresh();
    } catch (error) {
      console.error("Update event error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="animate-pulse text-gray-500">
          Loading event details...
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7faf7] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/manage-events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800"
        >
          <ArrowLeft size={17} />
          Back to Manage Events
        </Link>

        <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm sm:p-9">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
              Manage Your Event
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Edit Event
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Update your event information below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Event Title
              </label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                minLength={5}
                maxLength={100}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                minLength={20}
                maxLength={2000}
                rows={5}
                className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="eventType"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Event Category
              </label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              >
                <option value="">Select a category</option>
                {eventCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="thumbnailUrl"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Thumbnail Image URL
              </label>
              <input
                id="thumbnailUrl"
                name="thumbnailUrl"
                type="url"
                value={formData.thumbnailUrl}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                minLength={3}
                maxLength={150}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="eventDate"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Event Date
              </label>
              <input
                id="eventDate"
                name="eventDate"
                type="date"
                value={formData.eventDate}
                onChange={handleChange}
                min={new Date().toLocaleDateString("en-CA", {
                  timeZone: "Asia/Dhaka",
                })}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/manage-events"
                className="rounded-xl border border-gray-200 px-6 py-3 text-center text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={17} />
                {submitting ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
