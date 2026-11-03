import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

type SpinnerProps = React.ComponentProps<"svg">;

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-5 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };