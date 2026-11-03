
export default function EventCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm">
      {/* Image placeholder */}
      <div className="h-52 animate-pulse bg-gray-200" />

      <div className="p-6">
        {/* Category placeholder */}
        <div className="h-6 w-32 animate-pulse rounded-full bg-gray-200" />

        {/* Title placeholder */}
        <div className="mt-4 h-6 w-3/4 animate-pulse rounded bg-gray-200" />

        {/* Description placeholder */}
        <div className="mt-3 space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Date and location placeholders */}
        <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
          <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Button placeholder */}
        <div className="mt-6 h-12 w-full animate-pulse rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}
