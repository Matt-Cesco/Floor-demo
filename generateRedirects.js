const fs = require("fs");
const path = require("path");
const getRedirects = require("./src/Graphql/wordpressCMS/queries/getRedirects.js");

(async function generate() {
    const redirects = await getRedirects();
    const out = path.resolve(process.cwd(), "redirects.json");
    fs.writeFileSync(out, JSON.stringify(redirects, null, 2), "utf-8");
    console.log(`✅ Written ${redirects.length} redirects to ${out}`);
})();
