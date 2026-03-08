"use client";

import Link from "next/link";

export type NewsListItem = {
    id: number;
    slug: string;
    title: { rendered: string };
};

interface NewsListingClientProps {
    items: NewsListItem[];
}

const NewsListingClient = ({ items }: NewsListingClientProps) => {
    if (!items || items.length === 0) {
        return (
            <section>
                <p>No news items found.</p>
            </section>
        );
    }

    return (
        <section>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <Link href={`/news/${item.slug}`}>{item.title?.rendered ?? "(Untitled)"}</Link>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default NewsListingClient;
