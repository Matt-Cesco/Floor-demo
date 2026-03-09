import ISampleProcessBlock from "./ISampleProcessBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import Link from "next/link";

const SampleProcessBlock = ({ data }: IFlexibleBlock<ISampleProcessBlock>) => {
    const { top_title, title, cta_link, steps } = data.sample_process_fields || {};

    return (
        <section className="relative w-full overflow-hidden bg-white-light pt-60 pb-40 lg:pt-75 lg:pb-50">
            <div className="relative z-10 mx-auto w-full px-40 grid grid-cols-1 lg:grid-cols-12 gap-y-80">
                <div className="lg:col-start-3 lg:col-span-8 flex flex-col items-center text-center">
                    {top_title && <p className="mb-32 text-12 font-semibold uppercase text-black/50 font-articulat tracking-widest">{top_title}</p>}
                    {title && <h2 className="font-articulat text-40 md:text-50 font-semibold leading-100 tracking-tight text-black-light">{title}</h2>}
                </div>

                <div className="lg:col-start-2 lg:col-span-10 grid grid-cols-1 md:grid-cols-3 gap-24">
                    {steps?.map((step, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-48 rounded-[2.5rem] bg-white/40 p-40 border border-black/5 transition-all hover:bg-white hover:shadow-xl"
                        >
                            <span className="text-11 font-bold uppercase tracking-widest text-black/30 font-articulat">
                                Step <span className="text-black-light">{step.number}</span>
                            </span>
                            <div className="flex flex-col gap-16">
                                {step.title && <h3 className="text-26 font-extrabold leading-120 text-black-light font-articulat">{step.title}</h3>}
                                {step.description && <p className="text-16 leading-160 text-black/60 font-articulat">{step.description}</p>}
                            </div>
                        </div>
                    ))}
                </div>

                {cta_link && (
                    <div className="lg:col-start-3 lg:col-span-8 flex flex-col items-center mt-20">
                        <Link
                            href={cta_link.url}
                            target={cta_link.target || "_self"}
                            className="inline-flex items-center justify-center rounded-2xl bg-black-light px-60 py-24 text-14 font-bold uppercase tracking-widest text-white transition-all hover:bg-black hover:shadow-2xl"
                        >
                            {cta_link.title}
                        </Link>
                        <p className="mt-24 text-13 font-medium text-black/40 font-articulat">Delivered to your door within 24 hours.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SampleProcessBlock;
