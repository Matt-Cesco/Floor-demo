
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!API_URL) {
    throw new Error("NEXT_PUBLIC_WORDPRESS_API_URL is not set");
}

type WpFetchOptions = {
    /** Revalidation in seconds (Next.js data cache). Omit for default. */
    revalidate?: number;
} & RequestInit;

/**
 * Base fetch helper for WordPress REST.
 * Handles JSON, errors, and Next.js caching options.
 */
export async function wpFetch<T>(endpoint: string, options: WpFetchOptions = {}): Promise<T> {
    const { revalidate, ...fetchOptions } = options;

    const url = `${API_URL}${endpoint}`;

    const res = await fetch(url, {
        ...fetchOptions,
        headers: {
            Accept: "application/json",
            ...(fetchOptions.headers || {}),
        },
        // Next.js caching / ISR options (only effective in server components / route handlers)
        next: revalidate !== undefined ? { revalidate } : undefined,
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`WordPress API error (${res.status}): ${text || res.statusText}`);
    }

    return res.json() as Promise<T>;
}
