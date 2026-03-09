import type IHomepageBanner from "@/Types/Acf/HomepageBanner";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import Link from "next/link";
import DynamicText from "@/Common/DynamicText/DynamicText";

type HomepageBannerProps = {
    data: IHomepageBanner;
};

const HomepageBanner = ({ data }: HomepageBannerProps) => {
    const {
        top_title,
        title_first_line,
        title_highlighted_word,
        title_third_line,
        strapline,
        first_cta_link,
        second_cta_link,
        background_image,
        bottom_badge_top_title,
        bottom_badge_title,
        bottom_badge_price,
        bottom_badge_deleted_price,
    } = data;

    return (
        <section className="relative w-full flex items-center overflow-hidden bg-black-light">
            {background_image && (
                <div className="absolute inset-0 z-0">
                    <DynamicImage data={background_image} className="h-full w-full object-cover object-center" priority={true} />
                    <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
                </div>
            )}

            <div className="relative z-10 mx-auto w-full px-40 pt-160 pb-75 grid grid-cols-1 lg:grid-cols-12 gap-20">
                <div className="lg:col-start-3 lg:col-span-8 max-w-750">
                    {top_title && (
                        <div className="mb-48 flex items-center gap-12">
                            <div className="flex text-amber-400 text-16 tracking-widest">★★★★★</div>
                            <p className="text-12 font-semibold uppercase text-white/70 font-articulat tracking-widest">{top_title}</p>
                        </div>
                    )}

                    <h1 className="font-articulat text-60 md:text-75 font-semibold leading-100 tracking-tight text-white mb-40">
                        {title_first_line} <br />
                        <span className="font-serif italic text-white/50 font-normal">{title_highlighted_word}</span> {title_third_line}
                    </h1>

                    {strapline && <DynamicText data={strapline} pClassName="mb-48 max-w-650 text-18 font-400 leading-160 text-white/80 font-articulat" />}

                    <div className="mb-48 flex flex-col gap-16 sm:flex-row">
                        {first_cta_link && (
                            <Link
                                href={first_cta_link.url}
                                target={first_cta_link.target}
                                className="group inline-flex items-center justify-center rounded-2xl bg-white px-40 py-20 text-16 font-semibold text-black transition-all hover:bg-gray-light"
                            >
                                <span>{first_cta_link.title}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="ml-8 transition-transform duration-300 group-hover:translate-x-4"
                                >
                                    <path d="M5 12h14m-7-7 7 7-7 7" />
                                </svg>
                            </Link>
                        )}
                        {second_cta_link && (
                            <Link
                                href={second_cta_link.url}
                                target={second_cta_link.target}
                                className="inline-flex items-center justify-center rounded-2xl px-40 py-20 border border-white/20 bg-white/10 text-16 font-700 text-white backdrop-blur-md transition-all hover:bg-white/20"
                            >
                                {second_cta_link.title}
                            </Link>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-x-40 gap-y-16">
                        <div className="flex items-center gap-8 text-10 font-bold uppercase tracking-15 text-white/50">
                            <span className="text-green-600">✓</span> Next day Samples
                        </div>
                        <div className="flex items-center gap-8 text-10 font-bold uppercase tracking-15 text-white/50">
                            <span className="text-green-600">✓</span> Price Match Promise
                        </div>
                        <div className="flex items-center gap-8 text-10 font-bold uppercase tracking-15 text-white/50">
                            <span className="text-green-600">✓</span> Klarna
                        </div>
                    </div>
                </div>
            </div>

            {(bottom_badge_title || bottom_badge_price) && (
                <div className="absolute bottom-80 right-80 z-20 hidden xl:block">
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-40 shadow-2xl backdrop-blur-xl text-white">
                        <p className="mb-2 text-9 font-bold uppercase tracking-widest text-white/40 font-articulat">
                            {bottom_badge_top_title || "Direct Value"}
                        </p>
                        <p className="text-22 font-bold mb-16 font-articulat">{bottom_badge_title}</p>
                        <div className="flex items-baseline gap-12">
                            <p className="text-18 font-bold leading-100">{bottom_badge_price}</p>
                            {bottom_badge_deleted_price && <p className="text-15 text-white/30 font-semibold line-through">{bottom_badge_deleted_price}</p>}
                        </div>
                        <button className="mt-24 w-full rounded-2xl bg-white py-16 text-11 font-bold uppercase tracking-20 text-black hover:bg-gray-light transition-all">
                            Order Free Sample
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default HomepageBanner;
