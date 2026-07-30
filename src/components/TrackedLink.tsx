"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import type { AnalyticsEventName } from "@/lib/analytics";
import { track } from "@/lib/analytics";

export function TrackedLink({
  eventName,
  eventData,
  ...props
}: ComponentProps<typeof Link> & {
  eventName: AnalyticsEventName;
  eventData?: Record<string, string | number | boolean>;
}) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        track(eventName, eventData);
      }}
    />
  );
}

export function TrackedExternalLink({
  eventName,
  eventData,
  ...props
}: ComponentProps<"a"> & {
  eventName: AnalyticsEventName;
  eventData?: Record<string, string | number | boolean>;
}) {
  return (
    <a
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        track(eventName, eventData);
      }}
    />
  );
}
