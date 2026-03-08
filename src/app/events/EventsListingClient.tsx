"use client";

import Link from "next/link";

export type EventsListItem = {
  id: number;
  slug: string;
  title: { rendered: string };
};

interface EventsListingClientProps {
  items: EventsListItem[];
}

const EventsListingClient = ({ items }: EventsListingClientProps) => {
  if (!items || items.length === 0) {
    return (
      <section>
        <p>No events items found.</p>
      </section>
    );
  }

  return (
    <section>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`/events/${item.slug}`}>
              {item.title?.rendered ?? "(Untitled)"}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default EventsListingClient;
