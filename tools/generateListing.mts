// tools/generateListings.mts
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from project root
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Resolve NEXT_PUBLIC_WORDPRESS_BASE_URL safely
const rawBase = process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL;
if (!rawBase) {
    throw new Error("NEXT_PUBLIC_WORDPRESS_BASE_URL is not set in .env");
}
const WP_BASE: string = rawBase.replace(/\/$/, ""); // strip trailing slash

console.log("Using NEXT_PUBLIC_WORDPRESS_BASE_URL:", WP_BASE);

// Paths
const appDir = path.resolve(__dirname, "../src/app");
const libDir = path.resolve(__dirname, "../src/lib");

// Types we do NOT want to generate listings for
const EXCLUDED_TYPES = new Set<string>([
    // Core WP types
    "post",
    "page",
    "attachment",
    "revision",
    "nav_menu_item",
    "wp_block",
    "wp_template",
    "wp_template_part",
    "wp_global_styles",
    "wp_font_family",
    "wp_font_face",
    "wp_area",
    "wp_navigation",
    "wp_pattern",

    // Extra slugs you explicitly don't want
    "navigation",
    "font-families",
]);

function ensureDir(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log("Created directory:", dir);
    }
}

function toPascalCase(str: string): string {
    return str
        .split(/[\s_-]+/)
        .filter(Boolean)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join("");
}

type WpType = {
    slug: string;
    rest_base?: string;
    viewable?: boolean;
    name?: string; // human label
};

async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Fetch failed ${res.status} ${res.statusText} for ${url}: ${text}`);
    }
    return (await res.json()) as T;
}

async function generateForType(slug: string, type: WpType) {
    const pascal = toPascalCase(slug); // e.g. "news" -> "News"
    const restBase = type.rest_base || slug; // usually same as slug
    const listingClientName = `${pascal}ListingClient`;
    const listItemTypeName = `${pascal}ListItem`;
    const entityTypeName = `Wp${pascal}Item`;

    console.log(`\nGenerating listing for CPT "${slug}" (rest_base: "${restBase}")`);

    // -------------------------------------------------------------------------
    // 1) lib: src/lib/wp-<slug>.ts
    // -------------------------------------------------------------------------
    ensureDir(libDir);
    const libFilePath = path.join(libDir, `wp-${slug}.ts`);

    const libFileContent = `import { wpFetch } from "./wp-api";
import type { YoastHeadJson } from "@/lib/seoHelpers";

export interface ${entityTypeName} {
  id: number;
  slug: string;
  title: { rendered: string };
  yoast_head_json?: YoastHeadJson;
  acf?: Record<string, unknown>;
}

/**
 * Fetch list of ${slug} items (for listing page)
 */
export async function get${pascal}List(): Promise<${entityTypeName}[]> {
  return wpFetch<${entityTypeName}[]>(
    \`/${restBase}?per_page=100&_fields=id,slug,title,yoast_head_json\`,
    { revalidate: 60 }
  );
}

/**
 * Fetch a single ${slug} item by slug, with ACF & Yoast
 */
export async function get${pascal}BySlug(slug: string): Promise<${entityTypeName} | null> {
  const items = await wpFetch<${entityTypeName}[]>(
    \`/${restBase}?slug=\${encodeURIComponent(slug)}&per_page=1&_fields=id,slug,title,yoast_head_json,acf\`,
    { revalidate: 60 }
  );
  return items[0] ?? null;
}
`;

    fs.writeFileSync(libFilePath, libFileContent, "utf8");
    console.log(`✔ Wrote ${libFilePath}`);

    // -------------------------------------------------------------------------
    // 2) app/<slug>/<Pascal>ListingClient.tsx (client component)
    // -------------------------------------------------------------------------
    const appTypeDir = path.join(appDir, slug);
    ensureDir(appTypeDir);

    const listingClientPath = path.join(appTypeDir, `${listingClientName}.tsx`);

    const listingClientContent = `"use client";

import Link from "next/link";

export type ${listItemTypeName} = {
  id: number;
  slug: string;
  title: { rendered: string };
};

interface ${listingClientName}Props {
  items: ${listItemTypeName}[];
}

const ${listingClientName} = ({ items }: ${listingClientName}Props) => {
  if (!items || items.length === 0) {
    return (
      <section>
        <p>No ${slug} items found.</p>
      </section>
    );
  }

  return (
    <section>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={\`/${slug}/\${item.slug}\`}>
              {item.title?.rendered ?? "(Untitled)"}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ${listingClientName};
`;

    fs.writeFileSync(listingClientPath, listingClientContent, "utf8");
    console.log(`✔ Wrote ${listingClientPath}`);

    // -------------------------------------------------------------------------
    // 3) app/<slug>/page.tsx (listing page)
    // -------------------------------------------------------------------------
    const listingPagePath = path.join(appTypeDir, "page.tsx");

    const listingPageContent = `import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { get${pascal}List } from "@/lib/wp-${slug}";
import ${listingClientName} from "./${listingClientName}";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  // Basic static metadata for the listing page.
  // If you add Yoast archive endpoints later, you can wire them up here.
  const title = "${type.name || pascal}";
  return {
    title,
    description: \`\${title} listing\`,
  };
}

export default async function Page() {
  const items = await get${pascal}List();

  if (!items || items.length === 0) {
    notFound();
  }

  return <${listingClientName} items={items} />;
}
`;

    fs.writeFileSync(listingPagePath, listingPageContent, "utf8");
    console.log(`✔ Wrote ${listingPagePath}`);

    // -------------------------------------------------------------------------
    // 4) app/<slug>/[slug]/page.tsx (detail page)
    // -------------------------------------------------------------------------
    const detailDir = path.join(appTypeDir, "[slug]");
    ensureDir(detailDir);

    const detailPagePath = path.join(detailDir, "page.tsx");

    const detailPageContent = `import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { get${pascal}BySlug } from "@/lib/wp-${slug}";
import { buildMetadataFromYoast } from "@/lib/seoHelpers";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: itemSlug } = await params;
  const item = await get${pascal}BySlug(itemSlug);

  // Full path for fallback URL (e.g. "news/my-post")
  const pathSlug = "${slug}/" + itemSlug;

  if (!item) {
    return buildMetadataFromYoast({
      yoast: undefined,
      slug: pathSlug,
      fallbackTitle: "${pascal}",
      fallbackDescription: "",
    });
  }

  const fallbackTitle = item.title?.rendered ?? "${pascal}";

  return buildMetadataFromYoast({
    yoast: item.yoast_head_json,
    slug: pathSlug,
    fallbackTitle,
    fallbackDescription: "",
  });
}

export default async function Page({ params }: PageProps) {
  const { slug: itemSlug } = await params;
  const item = await get${pascal}BySlug(itemSlug);

  if (!item) notFound();

  return (
    <main>
      <h1>{item.title?.rendered ?? "${pascal}"}</h1>
      {/* TODO: render your ${slug} detail layout here using item.acf etc. */}
    </main>
  );
}
`;

    fs.writeFileSync(detailPagePath, detailPageContent, "utf8");
    console.log(`✔ Wrote ${detailPagePath}`);
}

async function main() {
    console.log("Fetching WP types…");
    const typesJson = await fetchJson<Record<string, WpType>>(`${WP_BASE}/wp-json/wp/v2/types`);

    const entries = Object.entries(typesJson);

    if (!entries.length) {
        console.warn("No types found from /wp-json/wp/v2/types");
        return;
    }

    for (const [slug, type] of entries) {
        // Skip excluded / internal types
        if (EXCLUDED_TYPES.has(slug)) {
            console.log(`Skipping type "${slug}" (excluded).`);
            continue;
        }

        // Only generate for viewable public post types
        if (type.viewable === false) {
            console.log(`Skipping type "${slug}" (not viewable).`);
            continue;
        }

        // Must have a rest_base to be queryable via /wp-json/wp/v2/<rest_base>
        if (!type.rest_base) {
            console.log(`Skipping type "${slug}" (no rest_base).`);
            continue;
        }

        await generateForType(slug, type);
    }

    console.log("\nAll listing files generated.");
}

main().catch((err) => {
    console.error("generateListings script failed:", err);
    process.exit(1);
});
