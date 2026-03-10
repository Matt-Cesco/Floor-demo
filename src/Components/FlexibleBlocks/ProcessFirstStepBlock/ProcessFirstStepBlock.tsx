import IProcessFirstStepBlock from "./IProcessFirstStepBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicText from "@/Common/DynamicText/DynamicText";

const ProcessFirstStepBlock = ({ data }: IFlexibleBlock<IProcessFirstStepBlock>) => {
    const { top_title, title, cards } = data.process_first_step_fields || {};

    return (
        <section className="relative w-full overflow-hidden bg-white py-100 lg:py-140">
            <div className="relative z-10 mx-auto w-full px-40 grid grid-cols-1 lg:grid-cols-12">
                {/* PROGRESS BAR: Step 1 of 4 */}
                {/* Positioned centrally to anchor the user's focus */}
                <div className="lg:col-start-4 lg:col-span-6 mb-80 flex items-center justify-between gap-12">
                    <div className="h-2 flex-1 rounded-full bg-black-light transition-all duration-700"></div>
                    <div className="h-2 flex-1 rounded-full bg-black/5"></div>
                    <div className="h-2 flex-1 rounded-full bg-black/5"></div>
                    <div className="h-2 flex-1 rounded-full bg-black/5"></div>
                </div>

                {/* Header: Title aligned to Col 3 */}
                <div className="lg:col-start-3 lg:col-span-8 mb-64 text-center lg:text-left">
                    {top_title && <p className="mb-24 text-12 font-semibold uppercase tracking-[0.2em] text-black/40 font-articulat">{top_title}</p>}
                    {title && <h2 className="font-articulat text-40 md:text-55 font-semibold leading-110 tracking-tight text-black-light">{title}</h2>}
                </div>

                {/* Cards Grid: Spanning 10 Columns */}
                <div className="lg:col-start-2 lg:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-24">
                    {cards?.map((card, index) => (
                        <button
                            key={index}
                            className="group flex flex-col justify-between rounded-[2.5rem] border border-black/5 bg-[#F8F6F2]/40 p-40 lg:p-48 text-left transition-all duration-500 hover:border-black-light hover:bg-white hover:shadow-2xl"
                        >
                            <div>
                                {card.title && <h3 className="text-24 lg:text-28 font-bold text-black-light font-articulat">{card.title}</h3>}
                                {card.description && (
                                    <div className="mt-20">
                                        <DynamicText data={card.description} pClassName="text-16 leading-160 text-black/60 font-articulat" />
                                    </div>
                                )}
                            </div>

                            <div className="mt-40 flex items-center gap-8 text-10 font-bold uppercase tracking-widest text-black/20 group-hover:text-black-light transition-colors duration-300 font-articulat">
                                Select Environment
                                <span className="transition-transform group-hover:translate-x-4">→</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessFirstStepBlock;
