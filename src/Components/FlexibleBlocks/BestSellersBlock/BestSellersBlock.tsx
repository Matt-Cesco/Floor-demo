import IBestSellersBlock from "./IBestSellersBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import DynamicText from "@/Common/DynamicText/DynamicText";
import Link from "next/link";

const BestSellersBlock = ({ data }: IFlexibleBlock<IBestSellersBlock>) => {
    const { top_title, title, description, view_all_link, best_selling_cards } = data.best_sellers_fields || {};

    return (
        <section className="relative w-full overflow-hidden bg-white-light pt-60 pb-40 lg:pt-75 lg:pb-50">
            <div className="relative z-10 mx-auto w-full px-40 grid grid-cols-1 lg:grid-cols-12 gap-y-40 mb-80">
                <div className="lg:col-start-3 lg:col-span-9 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-32">
                    <div className="max-w-750">
                        {top_title && <p className="mb-32 text-12 font-semibold uppercase text-black/50 font-articulat tracking-widest">{top_title}</p>}
                        {title && <h2 className="font-articulat text-40 md:text-50 font-semibold leading-100 tracking-tight text-black-light">{title}</h2>}
                        {description && (
                            <div className="mt-24">
                                <DynamicText data={description} pClassName="text-18 leading-160 text-black/60 font-articulat" />
                            </div>
                        )}
                    </div>

                    {view_all_link && (
                        <div className="lg:mb-8">
                            <Link
                                href={view_all_link.url}
                                target={view_all_link.target || "_self"}
                                className="inline-flex h-48 items-center justify-center rounded-2xl border border-black/10 bg-white/70 px-32 text-11 font-bold uppercase tracking-widest text-black-light backdrop-blur-md transition-all hover:-translate-y-2 hover:bg-white hover:shadow-lg"
                            >
                                {view_all_link.title || "View All"}
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <div className="relative z-10 mx-auto w-full px-40 grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-start-2 lg:col-span-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-24">
                    {best_selling_cards?.map((card, index) => (
                        <div
                            key={index}
                            className={`group flex flex-col rounded-[2.5rem] border border-black/5 bg-white/70 p-24 backdrop-blur-xl transition-all duration-500 hover:-translate-y-4 hover:bg-white hover:shadow-2xl ${
                                index % 2 === 1 ? "lg:mt-40" : ""
                            }`}
                        >
                            {card.image && (
                                <div className="mb-20 overflow-hidden rounded-2xl border border-black/5 bg-white/60">
                                    <div className="relative aspect-4/3 w-full">
                                        <DynamicImage
                                            data={card.image}
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-4">
                                <h3 className="text-20 font-black text-black-light font-articulat">{card.title}</h3>
                                {card.sub_title && <p className="text-14 text-black/50 font-medium font-articulat">{card.sub_title}</p>}
                            </div>

                            <div className="mt-24 rounded-2xl border border-black/8 bg-white/60 p-20">
                                <p className="text-9 font-bold uppercase tracking-[0.2em] text-black/40 font-articulat">Direct price</p>
                                <div className="mt-8 flex items-end justify-between gap-12">
                                    <p className="text-24 font-bold text-black-light font-articulat">
                                        {card.price}
                                        <span className="text-12 ml-4 text-amber-700 uppercase">m²</span>
                                    </p>
                                    {card.deleted_price && (
                                        <p className="text-14 text-black/30 line-through font-semibold font-articulat">{card.deleted_price}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-24 grid grid-cols-2 gap-12">
                                {card.view_link && (
                                    <Link
                                        href={card.view_link.url}
                                        target={card.view_link.target || "_self"}
                                        className="inline-flex h-48 items-center justify-center rounded-2xl bg-black-light text-11 font-bold uppercase tracking-widest text-white transition-all hover:bg-black hover:shadow-lg"
                                    >
                                        {card.view_link.title || "View"}
                                    </Link>
                                )}
                                {card.sample_link && (
                                    <Link
                                        href={card.sample_link.url}
                                        target={card.sample_link.target || "_self"}
                                        className="inline-flex h-48 items-center justify-center rounded-2xl border border-black/10 bg-white/70 text-11 font-bold uppercase tracking-widest text-black-light backdrop-blur-md transition-all hover:bg-white"
                                    >
                                        {card.sample_link.title || "Samples"}
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
