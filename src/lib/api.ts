// src/lib/api.ts
const REST_ROOT = process.env.NEXT_PUBLIC_WORDPRESS_REST_ROOT;

if (!REST_ROOT) {
    throw new Error("NEXT_PUBLIC_WORDPRESS_REST_ROOT is not set");
}

type ApiGetOptions = {
    params?: Record<string, string | number | boolean>;
    revalidate?: number;
};

/**
 * Minimal REST client for the WordPress `/wp-json` root.
 *
 * Usage:
 *  api.get("options/theme-options")
 *  api.get("menus/main_menu")
 *  api.get("wp/v2/posts", { per_page: 3 })
 */
export const api = {
    async get<T = unknown>(endpoint: string, options: ApiGetOptions = {}): Promise<T> {
        const { params, revalidate } = options;

        // Normalise leading slash
        const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;

        const url = new URL(cleanEndpoint, REST_ROOT.endsWith("/") ? REST_ROOT : REST_ROOT + "/");

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.set(key, String(value));
            });
        }

        const res = await fetch(url.toString(), {
            headers: {
                Accept: "application/json",
            },
            next: revalidate !== undefined ? { revalidate } : undefined,
        });

        if (!res.ok) {
            const text = await res.text().catch(() => "");
            throw new Error(`WordPress REST error (${res.status}): ${text || res.statusText}`);
        }

        return res.json() as Promise<T>;
    },
};
