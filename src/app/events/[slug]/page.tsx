import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEventsBySlug } from "@/lib/wp-events";
import { buildMetadataFromYoast } from "@/lib/seoHelpers";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: itemSlug } = await params;
  const item = await getEventsBySlug(itemSlug);

  // Full path for fallback URL (e.g. "news/my-post")
  const pathSlug = "events/" + itemSlug;

  if (!item) {
    return buildMetadataFromYoast({
      yoast: undefined,
      slug: pathSlug,
      fallbackTitle: "Events",
      fallbackDescription: "",
    });
  }

  const fallbackTitle = item.title?.rendered ?? "Events";

  return buildMetadataFromYoast({
    yoast: item.yoast_head_json,
    slug: pathSlug,
    fallbackTitle,
    fallbackDescription: "",
  });
}

export default async function Page({ params }: PageProps) {
  const { slug: itemSlug } = await params;
  const item = await getEventsBySlug(itemSlug);

  if (!item) notFound();

  return (
    <main>
      <h1>{item.title?.rendered ?? "Events"}</h1>
      {/* TODO: render your events detail layout here using item.acf etc. */}
    </main>
  );
}
