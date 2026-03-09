import IFinalConversionBlock from "./IFinalConversionBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicText from "@/Common/DynamicText/DynamicText";
import Link from "next/link";

const FinalConversionBlock = ({ data }: IFlexibleBlock<IFinalConversionBlock>) => {
    const {
        top_title,
        title,
        description,
        left_card_tag,
        left_card_title,
        left_card_description,
        left_card_link,
        right_card_tag,
        right_card_title,
        right_card_description,
        right_card_link,
    } = data.final_conversion_fields || {};

    return (
        <section className="relative w-full overflow-hidden bg-cream py-100 lg:py-140 border-t border-black/5">
            {/* Header: Centered on Column 3 */}
            <div className="relative z-10 mx-auto w-full px-40 grid grid-cols-1 lg:grid-cols-12 mb-80 text-center lg:text-left">
                <div className="lg:col-start-3 lg:col-span-8">
                    {top_title && <p className="mb-32 text-12 font-semibold uppercase text-black/50 font-articulat tracking-widest">{top_title}</p>}
                    {title && <h2 className="font-articulat text-40 md:text-55 font-semibold leading-110 tracking-tight text-black-light">{title}</h2>}
                    {description && (
                        <div className="mt-32 max-w-600">
                            <DynamicText data={description} pClassName="text-18 leading-160 text-black/60 font-articulat" />
                        </div>
                    )}
                </div>
            </div>

            {/* Path Grid: Cards start at Col 2 to span 10 cols */}
            <div className="relative z-10 mx-auto w-full px-40 grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-start-2 lg:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-32">
                    {/* Left Card: The Discovery Path */}
                    <div className="group flex flex-col justify-between rounded-[2.5rem] bg-white p-48 lg:p-64 transition-all duration-500 hover:shadow-2xl">
                        <div>
                            {left_card_tag && <span className="text-10 font-bold uppercase tracking-widest text-black/40 font-articulat">{left_card_tag}</span>}
                            {left_card_title && (
                                <h3 className="mt-24 text-32 lg:text-42 font-bold text-black-light font-articulat leading-110">{left_card_title}</h3>
                            )}
                            {left_card_description && (
                                <div className="mt-24">
                                    <DynamicText data={left_card_description} pClassName="text-16 leading-160 text-black/60 font-articulat" />
                                </div>
                            )}
                        </div>
                        {left_card_link && (
                            <Link
                                href={left_card_link.url}
                                target={left_card_link.target || "_self"}
                                className="mt-48 inline-flex items-center justify-center rounded-2xl bg-black-light py-24 text-14 font-bold uppercase tracking-widest text-white transition-all hover:bg-black font-articulat"
                            >
                                {left_card_link.title}
                            </Link>
                        )}
                    </div>

                    {/* Right Card: The Direct Path */}
                    <div className="group flex flex-col justify-between rounded-[2.5rem] border border-black/5 bg-white/40 p-48 lg:p-64 backdrop-blur-sm transition-all duration-500 hover:bg-white hover:shadow-2xl">
                        <div>
                            {right_card_tag && (
                                <span className="text-10 font-bold uppercase tracking-widest text-black/40 font-articulat">{right_card_tag}</span>
                            )}
                            {right_card_title && (
                                <h3 className="mt-24 text-32 lg:text-42 font-bold text-black-light font-articulat leading-110">{right_card_title}</h3>
                            )}
                            {right_card_description && (
                                <div className="mt-24">
                                    <DynamicText data={right_card_description} pClassName="text-16 leading-160 text-black/60 font-articulat" />
                                </div>
                            )}
                        </div>
                        {right_card_link && (
                            <Link
                                href={right_card_link.url}
                                target={right_card_link.target || "_self"}
                                className="mt-48 inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white py-24 text-14 font-bold uppercase tracking-widest text-black transition-all hover:border-black font-articulat"
                            >
                                {right_card_link.title}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinalConversionBlock;
