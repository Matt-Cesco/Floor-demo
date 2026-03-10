import IBestSellersBlock from "./IBestSellersBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import DynamicText from "@/Common/DynamicText/DynamicText";
import Link from "next/link";

const BestSellersBlock = ({ data }: IFlexibleBlock<IBestSellersBlock>) => {
    const { top_title, title, description, view_all_link, best_selling_cards } = data.best_sellers_fields || {};

    return (
        <section className="relative w-full overflow-hidden bg-white py-120 lg:py-160">
            <div className="relative z-10 mx-auto w-full px-40 grid grid-cols-1 lg:grid-cols-12 gap-y-40 mb-100">
                <div className="lg:col-start-3 lg:col-span-9 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-48">
                    <div className="max-w-750">
                        {top_title && <p className="mb-32 text-12 font-semibold uppercase text-black/40 font-articulat tracking-[0.25em]">{top_title}</p>}
                        {title && <h2 className="font-articulat text-40 md:text-55 font-semibold leading-110 tracking-tight text-black-light">{title}</h2>}
                        {description && (
                            <div className="mt-32">
                                <DynamicText data={description} pClassName="text-18 leading-160 text-black/60 font-articulat" />
                            </div>
                        )}
                    </div>

                    {view_all_link && (
                        <div className="lg:mb-12">
                            <Link
                                href={view_all_link.url}
                                target={view_all_link.target || "_self"}
                                className="inline-flex h-56 items-center justify-center rounded-2xl border border-black/10 bg-white px-40 text-12 font-bold uppercase tracking-widest text-black-light transition-all hover:bg-black hover:text-white hover:shadow-xl"
                            >
                                {view_all_link.title || "View All"}
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <div className="relative z-10 mx-auto w-full px-40 grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-start-2 lg:col-span-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-32">
                    {best_selling_cards?.map((card, index) => (
                        <div
                            key={index}
                            className={`group flex flex-col rounded-[2.5rem] border border-black/5 bg-cream/30 p-32 transition-all duration-700 hover:bg-white hover:shadow-2xl ${
                                index % 2 === 1 ? "lg:mt-60" : ""
                            }`}
                        >
                            {card.image && (
                                <div className="mb-24 overflow-hidden rounded-2xl bg-black/5">
                                    <div className="relative aspect-4/5 w-full">
                                        <DynamicImage
                                            data={card.image}
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-8">
                                <h3 className="text-22 font-bold text-black-light font-articulat leading-tight">{card.title}</h3>
                                {card.sub_title && <p className="text-14 text-black/40 font-medium font-articulat tracking-wide">{card.sub_title}</p>}
                            </div>

                            <div className="mt-32 rounded-2xl bg-white p-24 shadow-sm border border-black/3">
                                <p className="text-10 font-bold uppercase tracking-[0.2em] text-black/30 font-articulat">Direct price</p>
                                <div className="mt-12 flex items-baseline justify-between">
                                    <p className="text-26 font-bold text-black-light font-articulat">
                                        {card.price}
                                        <span className="text-12 ml-4 text-black/30 uppercase font-medium">/ m²</span>
                                    </p>
                                    {card.deleted_price && (
                                        <p className="text-14 text-black/20 line-through font-medium font-articulat">{card.deleted_price}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-32 grid grid-cols-1 gap-12">
                                {card.sample_link && (
                                    <Link
                                        href={card.sample_link.url}
                                        target={card.sample_link.target || "_self"}
                                        className="inline-flex h-56 items-center justify-center rounded-2xl bg-black-light text-12 font-bold uppercase tracking-widest text-white transition-all hover:bg-black hover:shadow-lg"
                                    >
                                        Order Free Sample
                                    </Link>
                                )}
                                {card.view_link && (
                                    <Link
                                        href={card.view_link.url}
                                        target={card.view_link.target || "_self"}
                                        className="inline-flex h-40 items-center justify-center text-12 font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
                                    >
                                        View Details →
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

export default BestSellersBlock;
