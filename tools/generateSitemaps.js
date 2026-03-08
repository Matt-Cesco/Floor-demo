require("dotenv").config();
const fs = require("fs");
const path = require("path");

// --- ENV GUARD -------------------------------------------------

// Only generate in production – fix the env var name to be consistent
if (process.env.ENVIRONMENT !== "production") {
    console.log(`Skipping sitemap generation because ENVIRONMENT=${process.env.ENVIRONMENT}`);
    process.exit(0);
}

// --- ENV + CONSTANTS -------------------------------------------

const WP_BASE = process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL || process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL;
const FRONTEND_URL = process.env.NEXT_FRONTEND_URL;

if (!WP_BASE) {
    throw new Error("NEXT_PUBLIC_WORDPRESS_BASE_URL or NEXT_PUBLIC_WORDPRESS_BASE_URL must be set");
}
if (!FRONTEND_URL) {
    throw new Error("NEXT_FRONTEND_URL must be set");
}

// e.g. https://cms-new-sinfin.barques.dev/wp-json/wp/v2
const WP_API_ROOT = `${WP_BASE.replace(/\/$/, "")}/wp-json/wp/v2`;

// Map each sitemap to a REST endpoint (rest_base). Adjust endpoints as needed.
const sitemapConfigs = [
    { name: "pages", endpoint: "pages" },
    // { name: "news", endpoint: "news" },
];

// --- HELPERS ---------------------------------------------------

function toRelative(uri) {
    try {
        const u = new URL(uri);
        let p = u.pathname;
        if (u.search) p += u.search;
        if (u.hash) p += u.hash;
        return p;
    } catch (e) {
        // Already a relative path
        return uri;
    }
}

/**
 * Fetch all published items for a given REST endpoint and return
 * an array of relative URLs (e.g. "/the-site/").
 */
async function fetchPaths(endpoint) {
    const baseUrl = `${WP_API_ROOT}/${endpoint}`;
    const perPage = 100;
    let page = 1;
    const allLinks = [];

    while (true) {
        const url = `${baseUrl}?per_page=${perPage}&page=${page}&status=publish&_fields=link,slug`;
        const res = await fetch(url);

        if (!res.ok) {
            // If endpoint doesn't exist or we've gone past the last page,
            // break gracefully for 400/404 on page > 1
            if ((res.status === 400 || res.status === 404) && page > 1) {
                break;
            }
            throw new Error(`Failed fetching ${endpoint} from WP REST: ${res.status} ${res.statusText}`);
        }

        const items = await res.json();
        if (!Array.isArray(items) || items.length === 0) {
            break;
        }

        // Prefer WP's "link", fallback to a simple "/slug/"
        for (const item of items) {
            const raw = item.link || `/${item.slug || ""}/`;
            allLinks.push(raw);
        }

        const totalPagesHeader = res.headers.get("x-wp-totalpages");
        const totalPages = totalPagesHeader ? Number(totalPagesHeader) : 1;

        if (!totalPages || page >= totalPages) {
            break;
        }

        page += 1;
    }

    return allLinks;
}

function writeSitemapXML(fileName, paths) {
    const urlsXML = paths
        .map((uri) => {
            const r = toRelative(uri);
            const loc = `${FRONTEND_URL.replace(/\/$/, "")}${r}`;
            return `<url><loc>${loc}</loc></url>`;
        })
        .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>
  ${urlsXML}
</urlset>`;

    const filePath = path.join("public", fileName);
    fs.writeFileSync(filePath, xml, "utf8");
    console.log(`Created ${filePath} with ${paths.length} entries`);
}

function writeSitemapIndex(fileName, sitemapFiles) {
    const sitemapsXML = sitemapFiles
        .map((file) => {
            const loc = `${FRONTEND_URL.replace(/\/$/, "")}/${file}`;
            return `<sitemap><loc>${loc}</loc></sitemap>`;
        })
        .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${sitemapsXML}
</sitemapindex>`;

    const filePath = path.join("public", fileName);
    fs.writeFileSync(filePath, xml, "utf8");
    console.log(`Created sitemap index: ${filePath}`);
}

function writeRobotsTxt(fileName, sitemapFiles) {
    let content = `User-agent: *\nDisallow: /wp-admin/\n\n`;

    const indexUrl = `${FRONTEND_URL.replace(/\/$/, "")}/sitemap-index.xml`;
    content += `Sitemap: ${indexUrl}\n`;

    sitemapFiles.forEach((file) => {
        content += `Sitemap: ${FRONTEND_URL.replace(/\/$/, "")}/${file}\n`;
    });

    const filePath = path.join("public", fileName);
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Created ${filePath}`);
}

// --- MAIN ------------------------------------------------------

(async function generateAllSitemaps() {
    try {
        const sitemapFiles = [];

        for (const { name, endpoint } of sitemapConfigs) {
            console.log(`Fetching paths for endpoint: ${endpoint}`);
            const paths = await fetchPaths(endpoint);
            const fileName = `${name}-sitemap.xml`;
            writeSitemapXML(fileName, paths);
            sitemapFiles.push(fileName);
        }

        const indexFileName = "sitemap-index.xml";
        writeSitemapIndex(indexFileName, sitemapFiles);
        writeRobotsTxt("robots.txt", sitemapFiles);

        console.log("All sitemaps + robots.txt generated successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Error generating sitemaps:", err);
        process.exit(1);
    }
})();
