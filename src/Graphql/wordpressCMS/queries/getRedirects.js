require("dotenv").config();

const { ENVIRONMENT, NEXT_PUBLIC_CMS_API_URL, CMS_DOMAIN, SITE_DOMAIN } = process.env;

if (!NEXT_PUBLIC_CMS_API_URL) {
    throw new Error("Missing NEXT_PUBLIC_CMS_API_URL in your environment");
}
if (!CMS_DOMAIN) {
    throw new Error("Missing CMS_DOMAIN in your environment");
}
if (!SITE_DOMAIN) {
    throw new Error("Missing SITE_DOMAIN in your environment");
}

async function getRedirects() {
    if (ENVIRONMENT !== "production") {
        console.log(`Skipping redirects: ENVIRONMENT="${ENVIRONMENT}"`);
        return [];
    }

    const query = `
    query {
      redirects {
        redirectsFields {
          redirectList {
            from
            to
          }
        }
      }
    }
  `;

    try {
        const res = await fetch(NEXT_PUBLIC_CMS_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch redirects: ${res.status} ${res.statusText}`);
        }

        const { data } = await res.json();
        const list = data?.redirects?.redirectsFields?.redirectList;
        if (!Array.isArray(list)) {
            console.warn("No redirects found in GraphQL response");
            return [];
        }

        return list.map(({ from, to }) => {
            const source = /^https?:\/\//i.test(from) ? new URL(from).pathname : from.startsWith("/") ? from : `/${from}`;

            let destination = to.replace(/^(https?:)\/\/\//, "$1//").replace(CMS_DOMAIN, SITE_DOMAIN);

            if (!/^https?:\/\//i.test(destination)) {
                destination = destination.startsWith("/") ? `${SITE_DOMAIN}${destination}` : `${SITE_DOMAIN}/${destination}`;
            }

            return {
                source,
                destination,
                permanent: true,
            };
        });
    } catch (err) {
        console.error("Error fetching/processing redirects:", err);
        return [];
    }
}

module.exports = getRedirects;
