import IIntentGridBlock from "./IIntentGridBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import Link from "next/link";

const IntentGridBlock = ({ data }: IFlexibleBlock<IIntentGridBlock>) => {
    const { top_title, title, columns } = data.intent_grid_fields || {};

    return (
        <section className="relative w-full overflow-hidden bg-white-light pt-60 pb-40 lg:pt-75 lg:pb-50">
            <div className="relative z-10 mx-auto w-full px-40 grid grid-cols-1 lg:grid-cols-12 gap-20 mb-75">
                <div className="lg:col-start-3 lg:col-span-8">
                    {top_title && <p className="mb-32 text-12 font-semibold uppercase text-black/50 font-articulat tracking-widest">{top_title}</p>}
                    {title && <h2 className="font-articulat text-40 md:text-50 font-semibold leading-100 tracking-tight text-black-light">{title}</h2>}
                </div>
            </div>
            <div className="relative z-10 mx-auto w-full px-40 grid grid-cols-1 lg:grid-cols-12 gap-x-24">
                <div className="lg:col-start-2 lg:col-span-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-24 gap-y-60">
                    {columns?.map((column, index) => (
                        <div key={index} className="group flex flex-col gap-24 cursor-pointer">
                            {column.image && (
                                <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-black/5">
                                    <DynamicImage
                                        data={column.image}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            )}
                            <div className="flex flex-col gap-16">
                                <div>
                                    {column.top_heading && (
                                        <span className="mb-8 block text-10 font-bold uppercase tracking-[0.15em] text-black/40 font-articulat">
                                            {column.top_heading}
                                        </span>
                                    )}
                                    {column.heading && <h3 className="text-24 font-semibold leading-120 text-black-light font-articulat">{column.heading}</h3>}
                                </div>

                                {column.pills && (
                                    <div className="flex flex-wrap gap-8">
                                        {column.pills.map((pill, pIndex) => (
                                            <span
                                                key={pIndex}
                                                className="rounded-full border border-black/5 bg-black/5 px-14 py-6 text-11 font-medium text-black/60 font-articulat"
                                            >
                                                {pill.pill_text}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {column.link && (
                                    <Link
                                        href={column.link.url}
                                        target={column.link.target || "_self"}
                                        className="group mt-8 flex items-center gap-8 text-14 font-bold text-black-light transition-all"
                                    >
                                        <span className="group-hover:underline">{column.link.title || "Shop Collection"}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="transition-transform duration-300 group-hover:translate-x-4"
                                        >
                                            <path d="M5 12h14m-7-7 7 7-7 7" />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IntentGridBlock;
