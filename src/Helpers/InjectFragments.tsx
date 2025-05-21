import { gql } from "@apollo/client";
import cmsClient from "@/Graphql/client/cmsClient";
import { mediaItem } from "@/Graphql/wordpressCMS/fragments/mediaItem";

export function InjectFragments(query: string) {
    const fragments = (query.match(/\.\.\.(.*)/g) ?? []) as string[];

    if (fragments.length === 0) {
        return "";
    }

    let fragmentString = "";

    if (fragments.includes("...mediaItem")) {
        fragmentString += mediaItem;
    }

    return fragmentString;
}
