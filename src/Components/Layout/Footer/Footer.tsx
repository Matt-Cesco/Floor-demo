import DynamicImage from "@/Common/DynamicImage/DynamicImage";
import IFooter from "./IFooter";
import Link from "next/link";

const Footer = ({
    logo,
    logoWhite,
    phone,
    email,
    address,
    building,
    cityPostcode,
    footerLinksFirstCol,
    footerLinksSecondCol,
    footerLinksThirdCol,
    socialIcons,
}: IFooter) => {
    return (
        <footer className="bg-blue-dark text-white tracking-tight pt-60 pb-100">
            <div className="px-30 mb-58">{logoWhite && <DynamicImage data={logoWhite} className="h-full" />}</div>
            <div className="grid grid-cols-12 gap-0 lg:gap-20 px-30 mt-8">
                <div className="col-span-12 lg:col-span-3 lg:col-start-1">
                    <Link href={`tel:${phone}`} className="group flex items-center text-white uppercase text-21 leading-95 font-black tracking-tight mb-16">
                        {phone}
                        <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M1.29231 12L0 10.7077L8.86154 1.84615H0.923077V0H12V11.0769H10.1538V3.13846L1.29231 12Z" fill="#009BDF" />
                            </svg>
                        </span>
                    </Link>
                    <Link href={`mailto:${email}`} className="group flex items-center text-white uppercase text-21 leading-95 font-black tracking-tight">
                        {email}
                        <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M1.29231 12L0 10.7077L8.86154 1.84615H0.923077V0H12V11.0769H10.1538V3.13846L1.29231 12Z" fill="#009BDF" />
                            </svg>
                        </span>
                    </Link>

                    <div className="my-24">
                        <p className="text-white text-16 font-medium tracking-tight">{address}</p>
                        <p className="text-white text-16 font-medium tracking-tight">{building}</p>
                        <p className="text-white text-16 font-medium tracking-tight">{cityPostcode}</p>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-1 lg:col-start-7">
                    {footerLinksFirstCol?.map((item, index) => (
                        <Link
                            key={index}
                            href={item.linkFirstCol.url}
                            target={item.linkFirstCol.target}
                            className="group flex items-center text-white text-16 font-medium tracking-tight"
                        >
                            {item.linkFirstCol.title}
                            <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="#009BDF" />
                                </svg>
                            </span>
                        </Link>
                    ))}
                </div>
                <div className="col-span-12 lg:col-span-1 lg:col-start-8">
                    {footerLinksSecondCol?.map((item, index) => (
                        <Link
                            key={index}
                            href={item.linkSecondCol.url}
                            target={item.linkSecondCol.target}
                            className="group flex items-center text-white text-16 font-medium tracking-tight"
                        >
                            {item.linkSecondCol.title}
                            <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="#009BDF" />
                                </svg>
                            </span>
                        </Link>
                    ))}
                </div>
                <div className="col-span-12 lg:col-span-1 lg:col-start-9">
                    {footerLinksThirdCol?.map((item, index) => (
                        <Link
                            key={index}
                            href={item.linkThirdCol.url}
                            target={item.linkThirdCol.target}
                            className="group flex items-center text-white text-16 font-medium tracking-tight"
                        >
                            {item.linkThirdCol.title}
                            <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                    <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="#009BDF" />
                                </svg>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-12 gap-20 px-30 mt-8">
                <div className="col-span-12 lg:col-span-1 lg:col-start-1">
                    <Link
                        href="https://g.page/barques-design-pr"
                        target="_blank"
                        className="group flex items-center text-white text-16 font-medium tracking-tight"
                    >
                        Find us
                        <span className="ml-4 group-hover:rotate-45 group-hover:ml-6 duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z" fill="#009BDF" />
                            </svg>
                        </span>
                    </Link>
                </div>
                <div className="col-span-12 lg:col-span-1 lg:col-start-7">
                    {socialIcons && socialIcons.length > 0 && (
                        <div className="flex gap-12">
                            {socialIcons.map((social, index) => (
                                <Link key={index} href={social.link} target="_blank">
                                    <DynamicImage data={social.iconImage} className="h-22 w-auto" />
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
