import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEventsList } from "@/lib/wp-events";
import EventsListingClient from "./EventsListingClient";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  // Basic static metadata for the listing page.
  // If you add Yoast archive endpoints later, you can wire them up here.
  const title = "events";
  return {
    title,
    description: `${title} listing`,
  };
}

export default async function Page() {
  const items = await getEventsList();

  if (!items || items.length === 0) {
    notFound();
  }

  return <EventsListingClient items={items} />;
}
