
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import {
  CalendarDays,
  MapPin,
  Image as ImageIcon,
  FileText,
  ArrowLeft,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";

import { eventCategories } from "@/lib/event-categories";
import { getAccessToken } from "@/lib/get-access-token";

const eventSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Event title must be at least 5 characters.")
    .max(100, "Event title cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters.")
    .max(2000, "Description cannot exceed 2000 characters."),

  eventType: z.string().min(1, "Please select an event category."),

  thumbnailUrl: z.string().trim().url("Please enter a valid image URL."),

  location: z
    .string()
    .trim()
    .min(3, "Location must be at least 3 characters.")
    .max(150, "Location cannot exceed 150 characters."),

  eventDate: z
    .string()
    .min(1, "Please select an event date.")
    .refine(
      (date) =>
        date >
        new Date().toLocaleDateString("en-CA", {
          timeZone: "Asia/Dhaka",
        }),
      "Event date must be in the future.",
    ),
});

type EventFormData = z.infer<typeof eventSchema>;

type FormErrors = Partial<Record<keyof EventFormData, string>>;

export default function CreateEventPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    eventType: "",
    thumbnailUrl: "",
    location: "",
    eventDate: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof EventFormData, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = eventSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors: FormErrors = {};

      validation.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof EventFormData;

        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });

      setErrors(fieldErrors);
      toast.error("Please check the form fields.");
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      const eventData = validation.data;

      const token = await getAccessToken();

      const response = await fetch(`${apiUrl}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to create event");
      }

      toast.success("Event created successfully!");

      router.push("/upcoming-events");
    } catch (error) {
      console.error("Create event error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Dhaka",
  });

  return (
    <main className="min-h-screen bg-green-50/30 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-green-700 transition-colors hover:text-green-900"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            <PlusCircle size={17} />
            Create an Event
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Make a Difference in Your{" "}
            <span className="text-green-600">Community</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
            Create an event, bring people together, and inspire positive change
            in your community.
          </p>
        </div>

        <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm sm:p-10">
          <div className="mb-8 border-b border-gray-100 pb-5">
            <h2 className="text-xl font-bold text-gray-900">
              Event Information
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Fill in the details below to create your community event.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Event Title <span className="text-red-500">*</span>
              </label>

              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter your event title"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />

              {errors.title && (
                <p className="mt-2 text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <FileText size={17} className="text-green-600" />
                Event Description <span className="text-red-500">*</span>
              </label>

              <textarea
                id="description"
                rows={5}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe your event and its purpose..."
                className="w-full resize-y rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />

              <p className="mt-1 text-right text-xs text-gray-400">
                {formData.description.length}/2000
              </p>

              {errors.description && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="eventType"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Event Category <span className="text-red-500">*</span>
              </label>

              <select
                id="eventType"
                value={formData.eventType}
                onChange={(e) => handleChange("eventType", e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              >
                <option value="">Select an event category</option>

                {eventCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {errors.eventType && (
                <p className="mt-2 text-sm text-red-500">{errors.eventType}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="thumbnailUrl"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <ImageIcon size={17} className="text-green-600" />
                Thumbnail Image URL <span className="text-red-500">*</span>
              </label>

              <input
                id="thumbnailUrl"
                type="url"
                value={formData.thumbnailUrl}
                onChange={(e) => handleChange("thumbnailUrl", e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />

              {errors.thumbnailUrl && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.thumbnailUrl}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="location"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <MapPin size={17} className="text-green-600" />
                  Location <span className="text-red-500">*</span>
                </label>

                <input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="Enter event location"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

                {errors.location && (
                  <p className="mt-2 text-sm text-red-500">{errors.location}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="eventDate"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
                >
                  <CalendarDays size={17} className="text-green-600" />
                  Event Date <span className="text-red-500">*</span>
                </label>

                <input
                  id="eventDate"
                  type="date"
                  min={today}
                  value={formData.eventDate}
                  onChange={(e) => handleChange("eventDate", e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

                {errors.eventDate && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.eventDate}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <PlusCircle size={19} />
                {submitting ? "Validating..." : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
