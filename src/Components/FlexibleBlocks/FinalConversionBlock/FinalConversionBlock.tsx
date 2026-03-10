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
        <section className="relative w-full overflow-hidden bg-cream py-120 lg:py-160 border-t border-black/5">
            <div className="relative z-10 mx-auto w-full px-40 grid grid-cols-1 lg:grid-cols-12 mb-100 text-center lg:text-left">
                <div className="lg:col-start-3 lg:col-span-8">
                    {top_title && <p className="mb-32 text-12 font-semibold uppercase text-black/40 font-articulat tracking-[0.25em]">{top_title}</p>}
                    {title && <h2 className="font-articulat text-40 md:text-55 font-semibold leading-110 tracking-tight text-black-light">{title}</h2>}
                    {description && (
                        <div className="mt-40 max-w-600">
                            <DynamicText data={description} pClassName="text-18 leading-160 text-black/60 font-articulat" />
                        </div>
                    )}
                </div>
            </div>

            <div className="relative z-10 mx-auto w-full px-40 grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-start-2 lg:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-32 lg:gap-48">
                    <div className="group flex flex-col justify-between rounded-[3rem] bg-white p-48 lg:p-72 transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)]">
                        <div>
                            {left_card_tag && (
                                <span className="text-10 font-bold uppercase tracking-[0.2em] text-black/30 font-articulat">{left_card_tag}</span>
                            )}
                            {left_card_title && (
                                <h3 className="mt-32 text-32 lg:text-48 font-bold text-black-light font-articulat leading-110">{left_card_title}</h3>
                            )}
                            {left_card_description && (
                                <div className="mt-24">
                                    <DynamicText data={left_card_description} pClassName="text-16 lg:text-17 leading-160 text-black/60 font-articulat" />
                                </div>
                            )}
                        </div>
                        {left_card_link && (
                            <Link
                                href={left_card_link.url}
                                target={left_card_link.target || "_self"}
                                className="mt-56 inline-flex items-center justify-center rounded-2xl bg-black-light py-24 text-14 font-bold uppercase tracking-widest text-white transition-all hover:bg-black hover:scale-[1.02] active:scale-[0.98] font-articulat"
                            >
                                {left_card_link.title}
                            </Link>
                        )}
                    </div>

                    <div className="group flex flex-col justify-between rounded-[3rem] border border-black/5 bg-white/40 p-48 lg:p-72 backdrop-blur-md transition-all duration-700 hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)]">
                        <div>
                            {right_card_tag && (
                                <span className="text-10 font-bold uppercase tracking-[0.2em] text-black/30 font-articulat">{right_card_tag}</span>
                            )}
                            {right_card_title && (
                                <h3 className="mt-32 text-32 lg:text-48 font-bold text-black-light font-articulat leading-110">{right_card_title}</h3>
                            )}
                            {right_card_description && (
                                <div className="mt-24">
                                    <DynamicText data={right_card_description} pClassName="text-16 lg:text-17 leading-160 text-black/60 font-articulat" />
                                </div>
                            )}
                        </div>
                        {right_card_link && (
                            <Link
                                href={right_card_link.url}
                                target={right_card_link.target || "_self"}
                                className="mt-56 inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white py-24 text-14 font-bold uppercase tracking-widest text-black transition-all hover:border-black-light hover:scale-[1.02] active:scale-[0.98] font-articulat"
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
