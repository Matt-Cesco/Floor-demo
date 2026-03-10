import IInstagramGalleryBlock from "./IInstagramGalleryBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicText from "@/Common/DynamicText/DynamicText";
import Link from "next/link";
import Image from "next/image";

const InstagramGalleryBlock = ({ data }: IFlexibleBlock<IInstagramGalleryBlock>) => {
    const { title, top_title, text, cta_link, gallery } = data.instagram_gallery_cta_fields || {};

    return (
        <section className="relative w-full overflow-hidden bg-white py-100 lg:py-140">
            <div className="relative z-10 mx-auto w-full px-40 grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-start-3 lg:col-span-8 mb-64 lg:mb-80 text-center lg:text-left">
                    {top_title && <p className="mb-24 text-12 font-semibold uppercase tracking-[0.3em] text-black/40 font-articulat">{top_title}</p>}
                    {title && <h2 className="font-articulat text-40 md:text-55 font-semibold leading-110 tracking-tight text-black-light">{title}</h2>}

                    <div className="mt-32 flex flex-col lg:flex-row lg:items-end justify-between gap-32">
                        {text && (
                            <div className="max-w-500">
                                <DynamicText data={text} pClassName="text-18 leading-160 text-black/60 font-articulat" />
                            </div>
                        )}

                        {cta_link && (
                            <Link
                                href={cta_link.url}
                                target={cta_link.target || "_self"}
                                className="text-12 font-bold uppercase tracking-[0.2em] border-b-2 border-black pb-8 hover:text-black/60 transition-colors inline-block w-max font-articulat"
                            >
                                {cta_link.title}
                            </Link>
                        )}
                    </div>
                </div>

                <div className="lg:col-start-2 lg:col-span-10 grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24">
                    {gallery?.map((item, index) => (
                        <div key={index} className="group relative aspect-4/5 overflow-hidden rounded-2xl bg-cream cursor-pointer">
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                                <div className="bg-white px-24 py-12 rounded-xl text-10 font-bold uppercase tracking-widest text-black transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300 font-articulat">
                                    Shop the Look
                                </div>
                            </div>

                            {item.url && (
                                <Image
                                    src={item.url}
                                    alt={item.alt || "Customer Flooring Inspiration"}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstagramGalleryBlock;
