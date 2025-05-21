require("dotenv").config();
const fs = require("fs");
const path = require("path");

if (process.env.ENVIRONMENT !== "production") {
    console.log(`Skipping sitemap generation because ENVIRONMENT=${process.env.ENVIRONMENT}`);
    process.exit(0);
}

const CMS_API_URL = process.env.NEXT_PUBLIC_CMS_API_URL;
const FRONTEND_URL = process.env.NEXT_FRONTEND_URL;

const sitemapConfigs = [
    { name: "pages", queryName: "pages" },
    { name: "insights", queryName: "insights" },
];

function toRelative(uri) {
    try {
        const u = new URL(uri);
        let p = u.pathname;
        if (u.search) p += u.search;
        if (u.hash) p += u.hash;
        return p;
    } catch (e) {
        return uri;
    }
}

async function fetchPaths(queryName) {
    const rawQuery = `{ ${queryName}(first:1000) { edges { node { uri } } } }`;
    const encodedQuery = encodeURIComponent(rawQuery);
    const url = `${CMS_API_URL}?query=${encodedQuery}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed fetching ${queryName} from CMS: ${res.status} ${res.statusText}`);
    }
    const json = await res.json();
    const edges = json?.data?.[queryName]?.edges || [];
    return edges.map((edge) => edge.node.uri);
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
            const loc = `${FRONTEND_URL}/${file}`;
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
    const indexUrl = `${FRONTEND_URL}/sitemap-index.xml`;
    content += `Sitemap: ${indexUrl}\n`;
    sitemapFiles.forEach((file) => {
        content += `Sitemap: ${FRONTEND_URL}/${file}\n`;
    });
    const filePath = path.join("public", fileName);
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Created ${filePath}`);
}

(async function generateAllSitemaps() {
    try {
        const sitemapFiles = [];
        for (const { name, queryName } of sitemapConfigs) {
            const paths = await fetchPaths(queryName);
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
