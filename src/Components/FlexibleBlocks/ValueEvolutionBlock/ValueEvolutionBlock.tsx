import IValueEvolutionBlock from "./IValueEvolutionBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicText from "@/Common/DynamicText/DynamicText";
import Link from "next/link";

const ValueEvolutionBlock = ({ data }: IFlexibleBlock<IValueEvolutionBlock>) => {
    const { top_title, title, text, first_card_title, first_card_text, second_card_top_title, second_card_title, second_card_text, second_card_cta_link } =
        data.value_evolution_fields || {};

    return (
        <section className="relative w-full overflow-hidden bg-white pt-60 pb-40 lg:pt-75 lg:pb-50">
            {/* Header: Title starts at Col 3 */}
            <div className="relative z-10 mx-auto w-full px-40 grid grid-cols-1 lg:grid-cols-12 mb-80">
                <div className="lg:col-start-3 lg:col-span-8">
                    {top_title && <p className="mb-32 text-12 font-semibold uppercase text-black/50 font-articulat tracking-widest">{top_title}</p>}
                    {title && <h2 className="font-articulat text-40 md:text-50 font-semibold leading-100 tracking-tight text-black-light">{title}</h2>}
                    {text && (
                        <div className="mt-32 max-w-600">
                            <DynamicText data={text} pClassName="text-18 leading-160 text-black/60 font-articulat" />
                        </div>
                    )}
                </div>
            </div>

            {/* Evolution Grid: Cards start at Col 2 */}
            <div className="relative z-10 mx-auto w-full px-40 grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-start-2 lg:col-span-10 grid grid-cols-1 lg:grid-cols-5 gap-24">
                    {/* First Card: The Model (2/5 Width) */}
                    <div className="lg:col-span-2 flex flex-col justify-center rounded-2xl border border-black/5 bg-white/50 p-48 backdrop-blur-sm">
                        {first_card_title && <h3 className="text-28 font-bold text-black-light font-articulat">{first_card_title}</h3>}
                        {first_card_text && (
                            <div className="mt-24">
                                <DynamicText data={first_card_text} pClassName="text-16 leading-160 text-black/60 font-articulat" />
                            </div>
                        )}
                    </div>
                    {/* Second Card: The Price Match Hero (3/5 Width) */}
                    <div className="lg:col-span-3 flex flex-col justify-center rounded-2xl bg-black-light p-48 lg:p-64 text-white shadow-2xl relative overflow-hidden">
                        {/* Aesthetic Branding Element */}
                        <div className="absolute -right-20 -bottom-20 text-[240px] font-bold text-white/3 font-articulat select-none pointer-events-none">
                            £
                        </div>

                        <div className="relative z-10">
                            {second_card_top_title && (
                                <span className="inline-block rounded-full border border-white/20 bg-white/10 px-16 py-6 text-10 font-bold uppercase tracking-widest mb-24 font-articulat">
                                    {second_card_top_title}
                                </span>
                            )}
                            {second_card_title && <h3 className="text-32 lg:text-42 font-bold leading-110 font-articulat">{second_card_title}</h3>}
                            {second_card_text && (
                                <div className="mt-24 max-w-400">
                                    <DynamicText data={second_card_text} pClassName="text-18 text-white/70 font-articulat" />
                                </div>
                            )}

                            {second_card_cta_link && (
                                <Link
                                    href={second_card_cta_link.url}
                                    target={second_card_cta_link.target || "_self"}
                                    className="mt-40 inline-block rounded-xl bg-white px-32 py-16 text-12 font-bold uppercase tracking-widest text-black hover:bg-gray-100 transition-colors font-articulat"
                                >
                                    {second_card_cta_link.title}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ValueEvolutionBlock;
