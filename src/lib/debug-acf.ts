// src/lib/debug-acf.ts
import { WP_ROOT } from "./wp-api";

export async function debugFetchAcfOptions() {
    const url = `${WP_ROOT}/wp-json/acf/v3/options/options`;

    const res = await fetch(url, {
        headers: { Accept: "application/json" },
        next: { revalidate: 0 }, // no cache while debugging
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error(`ACF options error (${res.status}):`, text || res.statusText);
        return null;
    }

    const json = await res.json();
    console.log("ACF options raw JSON:\n", JSON.stringify(json, null, 2));
    return json;
}
