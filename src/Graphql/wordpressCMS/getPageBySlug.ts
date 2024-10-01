
import { gql } from '@apollo/client';
import cmsClient from '@/Graphql/client/cmsClient';

import { CallToActionFragment } from '@/Graphql/wordpressCMS/flexibleFragments/CallToActionFragment';
import { DefaultFragment } from '@/Graphql/wordpressCMS/flexibleFragments/DefaultFragment';
import { FaqsFragment } from '@/Graphql/wordpressCMS/flexibleFragments/FaqsFragment';
import { HighlightBlockFragment } from '@/Graphql/wordpressCMS/flexibleFragments/HighlightBlockFragment';
import { HighlightMultipleBlocksFragment } from '@/Graphql/wordpressCMS/flexibleFragments/HighlightMultipleBlocksFragment';
import { InfoCardSingleFragment } from '@/Graphql/wordpressCMS/flexibleFragments/InfoCardSingleFragment';
import { LogosFragment } from '@/Graphql/wordpressCMS/flexibleFragments/LogosFragment';
import { MultipleImagesFragment } from '@/Graphql/wordpressCMS/flexibleFragments/MultipleImagesFragment';
import { NewsSliderFragment } from '@/Graphql/wordpressCMS/flexibleFragments/NewsSliderFragment';
import { SimpleFragment } from '@/Graphql/wordpressCMS/flexibleFragments/SimpleFragment';
import { WysiwygFragment } from '@/Graphql/wordpressCMS/flexibleFragments/WysiwygFragment';

export const getPageBySlug = async (slug: string) => {
    const response = await cmsClient.query({
        query: gql`
            ${CallToActionFragment}
${DefaultFragment}
${FaqsFragment}
${HighlightBlockFragment}
${HighlightMultipleBlocksFragment}
${InfoCardSingleFragment}
${LogosFragment}
${MultipleImagesFragment}
${NewsSliderFragment}
${SimpleFragment}
${WysiwygFragment}
            query GetPageBySlug($slug: ID! = "${slug}") {
                page(id: $slug, idType: URI) {
                    title
                    flexibleContent {
                        flexible {
                            ...CallToActionFragment
...DefaultFragment
...FaqsFragment
...HighlightBlockFragment
...HighlightMultipleBlocksFragment
...InfoCardSingleFragment
...LogosFragment
...MultipleImagesFragment
...NewsSliderFragment
...SimpleFragment
...WysiwygFragment
                        }
                    }
                }
            }
        `,
    });

    return response.data.page;
};
