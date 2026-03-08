// tools/acf.mts
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from project root
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const BASE = process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL;
if (!BASE) {
    throw new Error("NEXT_PUBLIC_WORDPRESS_BASE_URL is not set");
}

// e.g. https://cms-new-sinfin.barques.dev
const WP_ROOT = BASE.replace(/\/$/, "");

// e.g. https://cms-new-sinfin.barques.dev/wp-json/headless/v1
// This is only used to fetch ACF group definitions from the headless plugin.
const HEADLESS_BASE = `${WP_ROOT}/wp-json/headless/v1`;

// OUTPUT PATHS
const acfTypesDir = path.resolve(__dirname, "../src/Types/Acf");
const acfLibDir = path.resolve(__dirname, "../src/lib/acf");

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

// --- ACF → TS type mapping (with MediaItem support) ---

function acfTypeToTsType(field: any): string {
    const type = field.type as string | undefined;
    const choices = field.choices ? Object.keys(field.choices) : null;

    // Ignore ACF "tab" fields (no data, just UI)
    if (type === "tab") return "never";

    // Literal unions for selects/radios/button groups with choices
    if (["select", "radio", "button_group"].includes(type ?? "") && choices?.length) {
        const literals = choices.map((c) => `'${c}'`).join(" | ");
        return literals;
    }

    // Helper: build object from sub_fields
    const buildObjectFromSubFields = (subFields: any[]): string => {
        const meaningful = (subFields || []).filter((sf) => sf.name);

        if (!meaningful.length) return "Record<string, any>";

        const lines = meaningful
            .map((sf) => {
                const tsType = acfTypeToTsType(sf);
                if (tsType === "never") return null;

                const optional = sf.required ? "" : "?";
                return `  ${sf.name}${optional}: ${tsType}; // ${sf.label} (${sf.type})`;
            })
            .filter(Boolean);

        if (!lines.length) return "Record<string, any>";

        return `{\n${lines.join("\n")}\n}`;
    };

    // GROUP → nested object
    if (type === "group") {
        const subFields: any[] = Array.isArray(field.sub_fields) ? field.sub_fields : [];
        return buildObjectFromSubFields(subFields);
    }

    // REPEATER → array of nested object
    if (type === "repeater") {
        const subFields: any[] = Array.isArray(field.sub_fields) ? field.sub_fields : [];
        const itemType = buildObjectFromSubFields(subFields);
        return `${itemType}[]`;
    }

    // FLEXIBLE CONTENT (inside groups if ever) → any[]
    if (type === "flexible_content") return "any[]";

    // Scalars / simple types
    switch (type) {
        case "text":
        case "textarea":
        case "wysiwyg":
        case "url":
        case "email":
        case "post_object":
        case "page_link":
        case "relationship":
        case "taxonomy":
            return "string";

        case "number":
        case "range":
            return "number";

        case "true_false":
            return "boolean";

        case "link":
            // ACF link field structure
            return "{ title: string; url: string; target: string }";

        case "image":
            // Single media
            return "MediaItem";

        case "gallery":
            // Multiple media items
            return "MediaItem[]";

        case "file":
            // Could be refined later if needed
            return "Record<string, any>";

        default:
            return "any";
    }
}

// --- Fetch ACF groups schema from WordPress headless plugin ---

async function fetchAcfGroups() {
    const url = `${HEADLESS_BASE}/acf-groups`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`acf-groups error (${res.status}): ${text || res.statusText}`);
    }

    const json = await res.json();
    if (!Array.isArray(json)) {
        throw new Error("acf-groups payload is not an array");
    }

    return json as any[];
}

async function main() {
    ensureDir(acfTypesDir);
    ensureDir(acfLibDir);

    const groups = await fetchAcfGroups();

    // Aggregated export barrel for fetchers
    const fetchExports: string[] = [];

    for (const group of groups) {
        const title: string = group.group_title;

        // Skip the Flexible Content meta-group; flexible content is handled elsewhere
        if (title === "Flexible Content") continue;

        const fields: any[] = group.fields ?? [];
        const pascal = toPascalCase(title); // e.g. "Theme Options" → "ThemeOptions"
        const interfaceName = `I${pascal}`;
        const typeFileName = `${pascal}.ts`; // src/Types/Acf/ThemeOptions.ts
        const fetchFileName = `get${pascal}.ts`; // src/lib/acf/getThemeOptions.ts

        // --- Interface generation ---

        const fieldLines = fields
            .filter((f) => f.name) // skip tabs, etc. with no name
            .map((field) => {
                const tsType = acfTypeToTsType(field);
                if (tsType === "never") return null;

                const optional = field.required ? "" : "?";
                return `  ${field.name}${optional}: ${tsType}; // ${field.label} (${field.type})`;
            })
            .filter(Boolean)
            .join("\n");

        const needsMediaItem = fieldLines.includes("MediaItem");

        const interfaceContent = `// Auto-generated from ACF group "${title}"
${needsMediaItem ? 'import MediaItem from "../MediaItem";\n\n' : ""}export default interface ${interfaceName} {
${fieldLines ? fieldLines + "\n" : ""}
}
`;

        const typeFilePath = path.join(acfTypesDir, typeFileName);
        fs.writeFileSync(typeFilePath, interfaceContent, "utf8");
        console.log(`✔ Wrote interface ${typeFilePath}`);

        // --- Fetcher generation ---

        // Determine if this group is attached to an options page (Theme Options, etc.)
        const isOptionsGroup = Array.isArray(group.location) && group.location.some((rules: any[]) => rules.some((rule: any) => rule.param === "options_page"));

        let fetcherContent: string;

        if (isOptionsGroup) {
            // Options page groups: use core ACF options endpoint
            fetcherContent = `// Auto-generated fetcher for ACF group "${title}"
import type ${interfaceName} from "@/Types/Acf/${pascal}";
import { WP_ROOT } from "@/lib/wp-api";

/**
 * Fetches Theme Options from /wp-json/wp/v2/options/theme-options
 * and casts them directly to ${interfaceName}.
 *
 * The endpoint returns the ACF fields at the top level, e.g.:
 * {
 *   "agents": [...],
 *   "footer_bottom_link": {...},
 *   ...
 * }
 */
export async function get${pascal}(): Promise<${interfaceName} | null> {
  try {
    const res = await fetch(\`\${WP_ROOT}/wp-json/wp/v2/options/theme-options\`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("get${pascal} failed:", res.status, text || res.statusText);
      return null;
    }

    const json = (await res.json()) as ${interfaceName};
    return json ?? null;
  } catch (error) {
    console.error("get${pascal} failed:", error);
    return null;
  }
}
`;
        } else {
            // Page-level group: fetch ACF for a page by slug
            fetcherContent = `// Auto-generated fetcher for ACF group "${title}"
import type ${interfaceName} from "@/Types/Acf/${pascal}";
import { wpFetch } from "@/lib/wp-api";

interface WpPage {
  id: number;
  slug: string;
  title: { rendered: string };
  acf?: Record<string, unknown>;
}

/**
 * Fetch ACF for group "${title}" attached to a page by slug.
 * This assumes the group fields live directly under page.acf.
 * Adjust mapping if you wrap them in a group field.
 */
export async function get${pascal}BySlug(slug: string): Promise<${interfaceName} | null> {
  const pages = await wpFetch<WpPage[]>(
    \`/pages?slug=\${encodeURIComponent(slug)}&per_page=1&acf_format=standard&_fields=acf\`,
    { revalidate: 60 },
  );

  const page = pages[0];
  if (!page || !page.acf) return null;

  // Cast entire ACF object to ${interfaceName}.
  // If you only want a subset, refine this mapping.
  return page.acf as ${interfaceName};
}
`;
        }

        const fetchFilePath = path.join(acfLibDir, fetchFileName);
        fs.writeFileSync(fetchFilePath, fetcherContent, "utf8");
        console.log(`✔ Wrote fetcher ${fetchFilePath}`);

        fetchExports.push(`export * from "./${fetchFileName}";`);
    }

    // Barrel for all ACF fetchers: src/lib/acf/index.ts
    if (fetchExports.length) {
        const indexPath = path.join(acfLibDir, "index.ts");
        fs.writeFileSync(indexPath, fetchExports.join("\n") + "\n", "utf8");
        console.log(`✔ Wrote barrel ${indexPath}`);
    }
}

main().catch((err) => {
    console.error("acf generator failed:", err);
    process.exit(1);
});
