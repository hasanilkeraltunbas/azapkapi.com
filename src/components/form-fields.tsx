import { cn } from "@/lib/cn";
import type { ComponentProps } from "react";

export function Field({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "w-full rounded-none border-0 border-b border-olive/25 bg-transparent px-0 py-3 text-sm text-charcoal outline-none transition-colors placeholder:text-charcoal/35 focus:border-olive",
        className,
      )}
      {...props}
    />
  );
}

export function SelectField({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "w-full appearance-none border-0 border-b border-olive/25 bg-transparent px-0 py-3 text-sm text-charcoal outline-none focus:border-olive",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <label className={cn("text-sm text-olive", className)} {...props} />
  );
}

export function SubmitButton({
  children,
  pending,
}: {
  children: string;
  pending?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-olive px-8 text-sm text-cream transition-colors hover:bg-charcoal disabled:opacity-50"
    >
      {pending ? "Bir saniye…" : children}
    </button>
  );
}
