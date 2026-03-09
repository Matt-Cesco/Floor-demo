import IReassuranceBlock from "./IReassuranceBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import Link from "next/link";

const ReassuranceBlock = ({ data }: IFlexibleBlock<IReassuranceBlock>) => {
    const { text_number_customer, text_happy_customer, link_reviews, item } = data.reassurance_fields || {};

    return (
        <section className="relative w-full overflow-hidden bg-black-light pt-60 pb-40 lg:pt-75 lg:pb-50 text-white">
            <div className="relative z-10 mx-auto w-full px-40 grid grid-cols-1 lg:grid-cols-12 gap-y-60">
                {/* Header: Large Number & Reviews Link */}
                <div className="lg:col-start-2 lg:col-span-10 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-40 gap-24">
                    <div className="flex items-baseline gap-16">
                        {text_number_customer && (
                            <h2 className="font-articulat text-50 lg:text-64 font-bold tracking-tight leading-none">{text_number_customer}</h2>
                        )}
                        {text_happy_customer && (
                            <p className="text-11 font-bold uppercase tracking-[0.2em] text-white/40 font-articulat">{text_happy_customer}</p>
                        )}
                    </div>

                    {link_reviews && (
                        <Link
                            href={link_reviews.url}
                            target={link_reviews.target || "_self"}
                            className="text-11 font-bold uppercase tracking-widest border-b border-white/20 pb-4 hover:text-white/60 hover:border-white/60 transition-all font-articulat"
                        >
                            {link_reviews.title || "Read our reviews"}
                        </Link>
                    )}
                </div>

                {/* Reassurance Items: 6-Column Grid */}
                <div className="lg:col-start-2 lg:col-span-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-32 gap-y-48">
                    {item?.map((reassurance, index) => (
                        <div key={index} className="flex flex-col gap-16">
                            {reassurance.icon && (
                                <div className="w-32 h-32 brightness-0 invert opacity-80">
                                    <DynamicImage data={reassurance.icon} className="w-full h-full object-contain" />
                                </div>
                            )}
                            <div className="flex flex-col gap-4">
                                {reassurance.title && (
                                    <h3 className="text-12 font-bold uppercase tracking-widest font-articulat text-white">{reassurance.title}</h3>
                                )}
                                {reassurance.text && <p className="text-13 leading-150 text-white/40 font-articulat">{reassurance.text}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReassuranceBlock;
