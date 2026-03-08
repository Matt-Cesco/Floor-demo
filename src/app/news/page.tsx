import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsList } from "@/lib/wp-news";
import NewsListingClient from "./NewsListingClient";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  // Basic static metadata for the listing page.
  // If you add Yoast archive endpoints later, you can wire them up here.
  const title = "news";
  return {
    title,
    description: `${title} listing`,
  };
}

export default async function Page() {
  const items = await getNewsList();

  if (!items || items.length === 0) {
    notFound();
  }

  return <NewsListingClient items={items} />;
}
