import IIntentGridBlock from "./IIntentGridBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import Link from "next/link";

const IntentGridBlock = ({ data }: IFlexibleBlock<IIntentGridBlock>) => {
    const { top_title, title, columns } = data.intent_grid_fields || {};

    return (
        /* Spacing: Using the Section Break scale to separate from the Hero */
        <section className="relative w-full overflow-hidden bg-white py-120 lg:py-180">
            {/* Header: Centered on Column 3 for premium guttering */}
            <div className="relative z-10 mx-auto w-full px-40 grid grid-cols-1 lg:grid-cols-12 mb-80 lg:mb-100">
                <div className="lg:col-start-3 lg:col-span-8">
                    {top_title && <p className="mb-32 text-12 font-semibold uppercase text-black/40 font-articulat tracking-[0.25em]">{top_title}</p>}
                    {title && (
                        /* Font Size: Applying the 55px scale for section headers */
                        <h2 className="font-articulat text-40 md:text-55 font-semibold leading-110 tracking-tight text-black-light">{title}</h2>
                    )}
                </div>
            </div>

            {/* Grid: Starts at Column 2 to span 10 columns */}
            <div className="relative z-10 mx-auto w-full px-40 grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-start-2 lg:col-span-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-32 gap-y-80">
                    {columns?.map((column, index) => (
                        <div key={index} className="group flex flex-col gap-32 cursor-pointer">
                            {column.image && (
                                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[2rem] bg-black/5">
                                    <DynamicImage
                                        data={column.image}
                                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                </div>
                            )}

                            <div className="flex flex-col gap-20">
                                <div>
                                    {column.top_heading && (
                                        <span className="mb-12 block text-10 font-bold uppercase tracking-[0.2em] text-black/30 font-articulat">
                                            {column.top_heading}
                                        </span>
                                    )}
                                    {column.heading && (
                                        <h3 className="text-22 lg:text-26 font-semibold leading-120 text-black-light font-articulat">{column.heading}</h3>
                                    )}
                                </div>

                                {column.pills && (
                                    <div className="flex flex-wrap gap-8">
                                        {column.pills.map((pill, pIndex) => (
                                            <span
                                                key={pIndex}
                                                className="rounded-full border border-black/5 bg-[#F8F6F2] px-16 py-6 text-11 font-medium text-black/50 font-articulat transition-colors group-hover:bg-black/5 group-hover:text-black"
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
                                        /* Link Style: Using standard Title Case for premium feel */
                                        className="group mt-8 flex items-center gap-8 text-15 font-bold text-black-light transition-all"
                                    >
                                        <span className="border-b border-transparent transition-all group-hover:border-black-light">
                                            {column.link.title || "Shop Collection"}
                                        </span>
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
                                            className="transition-transform duration-300 group-hover:translate-x-6"
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
