import IValueEvolutionBlock from "./IValueEvolutionBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicText from "@/Common/DynamicText/DynamicText";
import Link from "next/link";

const ValueEvolutionBlock = ({ data }: IFlexibleBlock<IValueEvolutionBlock>) => {
    const { top_title, title, text, first_card_title, first_card_text, second_card_top_title, second_card_title, second_card_text, second_card_cta_link } =
        data.value_evolution_fields || {};

    return (
        <section className="relative w-full overflow-hidden bg-white border-t border-black/5">
            <div className="flex flex-col lg:flex-row min-h-[700px]">
                <div className="w-full lg:w-5/12 bg-cream px-40 py-80 lg:px-80 lg:py-120 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-black/5">
                    <div className="max-w-500 mx-auto lg:mx-0 lg:ml-auto lg:pr-40">
                        {top_title && <p className="mb-32 text-12 font-semibold uppercase tracking-[0.3em] text-black/40 font-articulat">{top_title}</p>}
                        {title && (
                            <h2 className="font-articulat text-40 lg:text-55 font-semibold leading-110 tracking-tight text-black-light mb-32">{title}</h2>
                        )}
                        {text && (
                            <div className="mb-48">
                                <DynamicText data={text} pClassName="text-18 leading-160 text-black/60 font-articulat" />
                            </div>
                        )}

                        <hr className="w-40 border-black/20 mb-48" />

                        <div className="animate-in fade-in slide-in-from-left-4 duration-1000">
                            {first_card_title && <h3 className="text-24 lg:text-28 font-bold text-black-light font-articulat mb-16">{first_card_title}</h3>}
                            {first_card_text && <DynamicText data={first_card_text} pClassName="text-16 leading-160 text-black/60 font-articulat mb-32" />}

                            <div className="flex items-center gap-16 opacity-30 mt-16">
                                <span className="text-10 font-bold uppercase tracking-widest font-articulat">Mill</span>
                                <div className="h-1 w-32 bg-black"></div>
                                <span className="text-10 font-bold uppercase tracking-widest font-articulat">FloorStreet</span>
                                <div className="h-1 w-32 bg-black"></div>
                                <span className="text-10 font-bold uppercase tracking-widest font-articulat">You</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-7/12 bg-black-light px-40 py-80 lg:px-100 lg:py-120 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute -right-40 -bottom-40 text-[350px] lg:text-[500px] font-bold text-white/3 leading-none select-none pointer-events-none font-articulat">
                        £
                    </div>

                    <div className="max-w-650 relative z-10 animate-in fade-in slide-in-from-right-4 duration-1000">
                        {second_card_top_title && (
                            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-24 py-8 text-10 font-bold uppercase tracking-[0.2em] mb-40 font-articulat text-white/80">
                                {second_card_top_title}
                            </span>
                        )}

                        {second_card_title && (
                            <h2 className="font-articulat text-50 lg:text-[85px] font-semibold leading-[0.95] tracking-tighter text-white mb-40">
                                {second_card_title}
                            </h2>
                        )}

                        {second_card_text && (
                            <div className="max-w-450 mb-56">
                                <DynamicText data={second_card_text} pClassName="text-20 lg:text-22 leading-160 text-white/60 font-articulat" />
                            </div>
                        )}

                        {second_card_cta_link && (
                            <Link
                                href={second_card_cta_link.url}
                                target={second_card_cta_link.target || "_self"}
                                className="group inline-flex items-center justify-center rounded-2xl bg-white px-48 py-24 text-14 font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-[#F8F6F2] hover:scale-105 active:scale-95 font-articulat"
                            >
                                <span>{second_card_cta_link.title}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="ml-12 transition-transform duration-300 group-hover:translate-x-6"
                                >
                                    <path d="M5 12h14m-7-7 7 7-7 7" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ValueEvolutionBlock;
