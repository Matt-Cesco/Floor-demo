import { MediaItem } from "@/Graphql/generated";

export default interface IFooter {
    logo: { node: MediaItem };
    logoWhite: { node: MediaItem };
    phone: string;
    email: string;
    address: string;
    building: string;
    cityPostcode: string;
    socialIcons?: Array<{
        iconImage: { node: MediaItem };
        link: string;
        socialName: string;
    }>;
    footerLinksFirstCol?: Array<{
        linkFirstCol: {
            target: string;
            title: string;
            url: string;
        };
    }>;
    footerLinksSecondCol?: Array<{
        linkSecondCol: {
            target: string;
            title: string;
            url: string;
        };
    }>;
    footerLinksThirdCol?: Array<{
        linkThirdCol: {
            target: string;
            title: string;
            url: string;
        };
    }>;
}
