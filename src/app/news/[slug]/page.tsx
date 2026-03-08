import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsBySlug } from "@/lib/wp-news";
import { buildMetadataFromYoast } from "@/lib/seoHelpers";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: itemSlug } = await params;
  const item = await getNewsBySlug(itemSlug);

  // Full path for fallback URL (e.g. "news/my-post")
  const pathSlug = "news/" + itemSlug;

  if (!item) {
    return buildMetadataFromYoast({
      yoast: undefined,
      slug: pathSlug,
      fallbackTitle: "News",
      fallbackDescription: "",
    });
  }

  const fallbackTitle = item.title?.rendered ?? "News";

  return buildMetadataFromYoast({
    yoast: item.yoast_head_json,
    slug: pathSlug,
    fallbackTitle,
    fallbackDescription: "",
  });
}

export default async function Page({ params }: PageProps) {
  const { slug: itemSlug } = await params;
  const item = await getNewsBySlug(itemSlug);

  if (!item) notFound();

  return (
    <main>
      <h1>{item.title?.rendered ?? "News"}</h1>
      {/* TODO: render your news detail layout here using item.acf etc. */}
    </main>
  );
}
