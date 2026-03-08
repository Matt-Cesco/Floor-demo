// src/lib/wp-api.ts

const BASE = process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL;

if (!BASE) {
    throw new Error("NEXT_PUBLIC_WORDPRESS_BASE_URL is not set");
}

// e.g. https://cms-new-sinfin.barques.dev
export const WP_ROOT = BASE.replace(/\/$/, "");

// e.g. https://cms-new-sinfin.barques.dev/wp-json/wp/v2
export const WP_V2_ROOT = `${WP_ROOT}/wp-json/wp/v2`;

// e.g. https://cms-new-sinfin.barques.dev/wp-json/headless/v1
export const WP_HEADLESS_ROOT = `${WP_ROOT}/wp-json/headless/v1`;

type QueryParams = Record<string, string | number | boolean>;

export type WpFetchOptions = {
    params?: QueryParams;
    /** Revalidation in seconds (Next.js data cache). Omit to use route default. */
    revalidate?: number;
} & RequestInit;

function buildUrl(base: string, endpoint: string, params?: QueryParams) {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
    const url = new URL(cleanEndpoint, base.endsWith("/") ? base : base + "/");

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, String(value));
        });
    }

    return url.toString();
}

/**
 * Generic helper for /wp-json/wp/v2 (pages, posts, CPTs, etc.)
 *
 * Examples:
 *   wpFetch<WpPage[]>(`/pages?slug=${encodeURIComponent("home")}&per_page=1`, { revalidate: 60 })
 *   wpFetch<WpPage[]>("pages", { params: { slug: "home", per_page: 1 }, revalidate: 60 })
 */
export async function wpFetch<T>(endpoint: string, options: WpFetchOptions = {}): Promise<T> {
    const { params, revalidate, ...fetchOptions } = options;

    const hasQuery = endpoint.includes("?");
    const [pathPart, queryPart] = hasQuery ? endpoint.split("?", 2) : [endpoint, ""];

    const baseUrl = `${WP_V2_ROOT}${pathPart.startsWith("/") ? pathPart : `/${pathPart}`}`;

    const url = hasQuery ? `${baseUrl}${queryPart ? `?${queryPart}` : ""}` : buildUrl(WP_V2_ROOT, endpoint, params);

    const res = await fetch(url, {
        ...fetchOptions,
        headers: {
            Accept: "application/json",
            ...(fetchOptions.headers || {}),
        },
        next: revalidate !== undefined ? { revalidate } : undefined,
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`WordPress API error (${res.status}): ${text || res.statusText}`);
    }

    return res.json() as Promise<T>;
}

/**
 * Generic helper for /wp-json/headless/v1 (your custom headless plugin endpoints).
 *
 * Example:
 *   headlessFetch("acf-groups")
 *   headlessFetch("theme-options")
 */
export async function headlessFetch<T>(endpoint: string, options: WpFetchOptions = {}): Promise<T> {
    const { params, revalidate, ...fetchOptions } = options;

    const url = buildUrl(WP_HEADLESS_ROOT, endpoint, params);

    const res = await fetch(url, {
        ...fetchOptions,
        headers: {
            Accept: "application/json",
            ...(fetchOptions.headers || {}),
        },
        next: revalidate !== undefined ? { revalidate } : undefined,
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Headless API error (${res.status}): ${text || res.statusText}`);
    }

    return res.json() as Promise<T>;
}
