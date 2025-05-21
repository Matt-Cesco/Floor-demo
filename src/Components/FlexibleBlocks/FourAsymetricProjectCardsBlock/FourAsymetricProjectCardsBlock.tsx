import IFourAsymetricProjectCardsBlock from "./IFourAsymetricProjectCardsBlock";
import IFlexibleBlock from "../IFlexibleBlock";
import DynamicHeading from "@/Common/DynamicHeading/DynamicHeading";
import getImageOrVideo from "@/Helpers/GetImageorVideo";
import Link from "next/link";

const FourAsymetricProjectCardsBlock = ({ data }: IFlexibleBlock<IFourAsymetricProjectCardsBlock>) => {
    const { showTitleBlock, headingBlock, linkBlock, project } = data.fourAsymetricProjectCardsFields || {};

    return (
        <>
            {showTitleBlock === true && (
                <div className="grid grid-cols-12 gap-20 px-30 my-60 lg:my-120  ">
                    {headingBlock && (
                        <div className="col-span-6 col-start-1 lg:col-span-2 lg:col-start-1">
                            <DynamicHeading data={headingBlock} className="text-21 font-black leading-114 uppercase text-blue-dark dark:text-white" />
                        </div>
                    )}
                    {linkBlock && (
                        <div className="col-span-6 col-start-7 lg:col-span-1 lg:col-start-8 flex justify-end">
                            <Link
                                href={linkBlock.url}
                                className="group flex items-center text-blue-dark dark:text-white text-21 leading-95 font-black tracking-tight uppercase"
                            >
                                {linkBlock.title}
                                <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="#009BDF" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    )}
                </div>
            )}

            {project.map((proj, index) => {
                const cycleIndex = index % 6;
                let imageClasses = "";
                let textClasses = "";
                let imageAspect = "";
                let order: "imageFirst" | "textFirst" = "imageFirst";

                switch (cycleIndex) {
                    case 0:
                        order = "imageFirst";
                        imageClasses = "col-start-1 col-span-12 lg:col-span-7 lg:col-start-2 overflow-hidden";
                        imageAspect = "aspect-[836/600] w-full object-cover transition duration-1000 ease-in-out hover:scale-110";
                        textClasses = "col-start-1 col-span-12 lg:col-span-5 lg:col-start-9 flex flex-col justify-end";
                        break;
                    case 1:
                        order = "textFirst";
                        textClasses =
                            "col-start-1 col-span-12 lg:col-span-3 lg:col-start-4 flex flex-col justify-end order-2 lg:order-1 lg:text-right";
                        imageClasses = "col-start-1 col-span-12 lg:col-span-5 lg:col-start-7 overflow-hidden order-1 lg:order-2";
                        imageAspect = "aspect-[836/600] lg:aspect-[592/600] w-full object-cover transition duration-1000 ease-in-out hover:scale-110";
                        break;
                    case 2:
                        order = "imageFirst";
                        imageClasses = "col-start-1 col-span-12 lg:col-span-6 lg:col-start-2 overflow-hidden";
                        imageAspect = "aspect-[836/600] lg:aspect-[717/600] w-full object-cover transition duration-1000 ease-in-out hover:scale-110";
                        textClasses = "col-start-1 col-span-12 lg:col-span-5 lg:col-start-8 flex flex-col justify-end";
                        break;
                    case 3:
                        order = "textFirst";
                        textClasses = "col-start-1 col-span-12 lg:col-span-3 lg:col-start-2 flex flex-col justify-end order-2 lg:order-1 lg:text-right";
                        imageClasses = "col-start-1 col-span-12 lg:col-span-7 lg:col-start-5 overflow-hidden order-1 lg:order-2";
                        imageAspect = "aspect-[836/600] lg:aspect-[838/600] w-full object-cover transition duration-1000 ease-in-out hover:scale-110";
                        break;
                    case 4:
                        order = "imageFirst";
                        imageClasses = "col-start-1 col-span-12 lg:col-span-5 lg:col-start-2 overflow-hidden";
                        imageAspect = "aspect-[836/600] lg:aspect-[592/600] w-full object-cover transition duration-1000 ease-in-out hover:scale-110";
                        textClasses = "col-start-1 col-span-12 lg:col-span-5 lg:col-start-7 flex flex-col justify-end";
                        break;
                    case 5:
                        order = "textFirst";
                        textClasses = "col-start-1 col-span-12 lg:col-span-3 lg:col-start-3 flex flex-col justify-end order-2 lg:order-1 lg:text-right";
                        imageClasses = "col-start-1 col-span-12 lg:col-span-6 lg:col-start-6 overflow-hidden order-1 lg:order-2";
                        imageAspect = "aspect-[836/600] lg:aspect-[717/600] w-full object-cover transition duration-1000 ease-in-out hover:scale-110";
                        break;
                    default:
                        break;
                }

                return (
                    <div key={index} className="grid grid-cols-12 gap-20 px-30 my-60 lg:my-120">
                        {order === "imageFirst" ? (
                            <>
                                <div className={imageClasses}>
                                    <Link href={proj.projectLink.url}>
                                        {getImageOrVideo({
                                            videoOrImageOptions: proj.imageOrVideoOptions,
                                            image: proj.image,
                                            video: proj.video,
                                            className: imageAspect,
                                        })}
                                    </Link>
                                </div>
                                <div className={textClasses}>
                                    <Link
                                        href={proj.projectLink.url || "#"}
                                        target={proj.projectLink.target || "_self"}
                                        className="text-blue-dark dark:text-white hover:text-blue-light transition-all ease-in-out duration-300 text-40 lg:text-80 font-black tracking-tighter leading-76 text-wrap"
                                    >
                                        {proj.projectLink.title || "No Title"}
                                    </Link>
                                    <div className="flex flex-wrap mt-16">
                                        {proj.brandStrategy && (
                                            <Link
                                                href="/brand"
                                                className="group flex items-center text-blue-dark dark:text-white hover:text-orange text-16 leading-137 mr-10 font-medium tracking-tight uppercase"
                                            >
                                                Brand Strategy
                                                <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                        <path
                                                            d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                                            fill="#009BDF"
                                                        />
                                                    </svg>
                                                </span>
                                            </Link>
                                        )}
                                        {proj.brandDesign && (
                                            <Link
                                                href="/brand"
                                                className="group flex items-center text-blue-dark dark:text-white hover:text-orange text-16 leading-137 mr-10 font-medium tracking-tight uppercase"
                                            >
                                                Brand Design
                                                <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                        <path
                                                            d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                                            fill="#009BDF"
                                                        />
                                                    </svg>
                                                </span>
                                            </Link>
                                        )}
                                        {proj.webDesign && (
                                            <Link
                                                href="/design"
                                                className="group flex items-center text-blue-dark dark:text-white hover:text-green text-16 leading-137 mr-10 font-medium tracking-tight uppercase"
                                            >
                                                Web Design
                                                <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                        <path
                                                            d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                                            fill="#009BDF"
                                                        />
                                                    </svg>
                                                </span>
                                            </Link>
                                        )}
                                        {proj.pr && (
                                            <Link
                                                href="/communications"
                                                className="group flex items-center text-blue-dark dark:text-white hover:text-purple text-16 leading-137 mr-10 font-medium tracking-tight uppercase"
                                            >
                                                PR
                                                <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                        <path
                                                            d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                                            fill="#009BDF"
                                                        />
                                                    </svg>
                                                </span>
                                            </Link>
                                        )}
                                        {proj.comms && (
                                            <Link
                                                href="/communications"
                                                className="group flex items-center text-blue-dark dark:text-white hover:text-purple text-16 leading-137 mr-10 font-medium tracking-tight uppercase"
                                            >
                                                Comms
                                                <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                        <path
                                                            d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                                            fill="#009BDF"
                                                        />
                                                    </svg>
                                                </span>
                                            </Link>
                                        )}
                                        {proj.webDevelopment && (
                                            <Link
                                                href="/digital"
                                                className="group flex items-center text-blue-dark dark:text-white hover:text-pink text-16 leading-137 mr-10 font-medium tracking-tight uppercase"
                                            >
                                                Web Development
                                                <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                        <path
                                                            d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                                            fill="#009BDF"
                                                        />
                                                    </svg>
                                                </span>
                                            </Link>
                                        )}
                                        {proj.seo && (
                                            <Link
                                                href="/digital"
                                                className="group flex items-center text-blue-dark dark:text-white hover:text-pink text-16 leading-137 mr-10 font-medium tracking-tight uppercase"
                                            >
                                                SEO
                                                <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                        <path
                                                            d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                                            fill="#009BDF"
                                                        />
                                                    </svg>
                                                </span>
                                            </Link>
                                        )}
                                        {proj.socialMediaManagement && (
                                            <Link
                                                href="/communications"
                                                className="group flex items-center text-blue-dark dark:text-white hover:text-purple text-16 leading-137 mr-10 font-medium tracking-tight uppercase"
                                            >
                                                Social Media Management
                                                <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                        <path
                                                            d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                                            fill="#009BDF"
                                                        />
                                                    </svg>
                                                </span>
                                            </Link>
                                        )}
                                        {proj.emailMarketing && (
                                            <Link
                                                href="/communications"
                                                className="group flex items-center text-blue-dark dark:text-white hover:text-purple text-16 leading-137 mr-10 font-medium tracking-tight uppercase"
                                            >
                                                Email marketing
                                                <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                        <path
                                                            d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                                            fill="#009BDF"
                                                        />
                                                    </svg>
                                                </span>
                                            </Link>
                                        )}
                                        {proj.copywriting && (
                                            <Link
                                                href="/communications"
                                                className="group flex items-center text-blue-dark dark:text-white hover:text-purple text-16 leading-137 mr-10 font-medium tracking-tight uppercase"
                                            >
                                                Copywriting
                                                <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                        <path
                                                            d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                                            fill="#009BDF"
                                                        />
                                                    </svg>
                                                </span>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={textClasses}>
                                    <div className="flex flex-col lg:items-end">
                                        <Link
                                            href={proj.projectLink.url || "#"}
                                            target={proj.projectLink.target || "_self"}
                                            className="text-blue-dark dark:text-white hover:text-blue-light transition-all ease-in-out duration-300 text-40 lg:text-80 font-black tracking-tighter leading-76 text-wrap"
                                        >
                                            {proj.projectLink.title || "No Title"}
                                        </Link>
                                        <div className="flex flex-wrap justify-start lg:justify-end mt-16 text-right">
                                            {proj.brandStrategy && (
                                                <Link
                                                    href="/brand"
                                                    className="group flex items-center text-blue-dark dark:text-white hover:text-orange text-16 leading-137 mr-10 font-medium tracking-tight uppercase"
                                                >
                                                    Brand Strategy
                                                    <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                            <path
                                                                d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                                                fill="#009BDF"
                                                            />
                                                        </svg>
                                                    </span>
                                                </Link>
                                            )}
                                            {proj.brandDesign && (
                                                <Link
                                                    href="/brand"
                                                    className="group flex items-center text-blue-dark dark:text-white hover:text-orange text-16 leading-137 mr-10 font-medium tracking-tight uppercase"
                                                >
                                                    Brand Design
                                                    <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                            <path
                                                                d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                                                fill="#009BDF"
                                                            />
                                                        </svg>
                                                    </span>
                                                </Link>
                                            )}
                                            {proj.webDesign && (
                                                <Link
                                                    href="/design"
                                                    className="group flex items-center text-blue-dark dark:text-white hover:text-green text-16 leading-137 mr-10 font-medium tracking-tight uppercase"
                                                >
                                                    Web Design
                                                    <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                            <path
                                                                d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                                                fill="#009BDF"
                                                            />
                                                        </svg>
                                                    </span>
                                                </Link>
                                            )}
                                            {proj.pr && (
                                                <Link
                                                    href="/communications"
                                                    className="group flex items-center text-blue-dark dark:text-white hover:text-purple text-16 leading-137 mr-10 font-medium tracking-tight uppercase"
                                                >
                                                    PR
                                                    <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                            <path
                                                                d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                                                fill="#009BDF"
                                                            />
                                                        </svg>
                                                    </span>
                                                </Link>
                                            )}
                                            {proj.comms && (
                                                <Link
                                                    href="/communications"
                                                    className="group flex items-center text-blue-dark dark:text-white hover:text-purple text-16 leading-137 mr-10 font-medium tracking-tight uppercase"
                                                >
                                                    Comms
                                                    <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                            <path
                                                                d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                                                fill="#009BDF"
                                                            />
                                                        </svg>
                                                    </span>
                                                </Link>
                                            )}
                                            {proj.webDevelopment && (
                                                <Link
                                                    href="/digital"
                                                    className="group flex items-center text-blue-dark dark:text-white hover:text-pink text-16 leading-137 mr-10 font-medium tracking-tight uppercase"
                                                >
                                                    Web Development
                                                    <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                            <path
                                                                d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                                                fill="#009BDF"
                                                            />
                                                        </svg>
                                                    </span>
                                                </Link>
                                            )}
                                            {proj.seo && (
                                                <Link
                                                    href="/digital"
                                                    className="group flex items-center text-blue-dark dark:text-white hover:text-pink text-16 leading-137 mr-10 font-medium tracking-tight uppercase"
                                                >
                                                    SEO
                                                    <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                            <path
                                                                d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                                                fill="#009BDF"
                                                            />
                                                        </svg>
                                                    </span>
                                                </Link>
                                            )}
                                            {proj.socialMediaManagement && (
                                                <Link
                                                    href="/communications"
                                                    className="group flex items-center text-blue-dark dark:text-white hover:text-purple text-16 leading-137 mr-10 font-medium tracking-tight uppercase"
                                                >
                                                    Social Media Management
                                                    <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                            <path
                                                                d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                                                fill="#009BDF"
                                                            />
                                                        </svg>
                                                    </span>
                                                </Link>
                                            )}
                                            {proj.emailMarketing && (
                                                <Link
                                                    href="/communications"
                                                    className="group flex items-center text-blue-dark dark:text-white hover:text-purple text-16 leading-137 mr-10 font-medium tracking-tight uppercase"
                                                >
                                                    Email marketing
                                                    <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                            <path
                                                                d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                                                fill="#009BDF"
                                                            />
                                                        </svg>
                                                    </span>
                                                </Link>
                                            )}
                                            {proj.copywriting && (
                                                <Link
                                                    href="/communications"
                                                    className="group flex items-center text-blue-dark dark:text-white hover:text-purple text-16 leading-137 mr-10 font-medium tracking-tight uppercase"
                                                >
                                                    Copywriting
                                                    <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                            <path
                                                                d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                                                fill="#009BDF"
                                                            />
                                                        </svg>
                                                    </span>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className={imageClasses}>
                                    <Link href={proj.projectLink.url}>
                                        {getImageOrVideo({
                                            videoOrImageOptions: proj.imageOrVideoOptions,
                                            image: proj.image,
                                            video: proj.video,
                                            className: imageAspect,
                                        })}
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default FourAsymetricProjectCardsBlock;
