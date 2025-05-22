// ******************************
// **** AUTO-GENERATED FILE ****
// DO NOT MODIFY DIRECTLY
// ******************************

import { gql } from "@apollo/client";
import cmsClient from "@/Graphql/client/cmsClient";
import { mediaItem } from '@/Graphql/wordpressCMS/fragments/mediaItem';
import { CallToActionFragment } from '@/Graphql/wordpressCMS/flexibleFragments/CallToActionFragment';
import { CenteredImageFragment } from '@/Graphql/wordpressCMS/flexibleFragments/CenteredImageFragment';
import { CenteredTextFragment } from '@/Graphql/wordpressCMS/flexibleFragments/CenteredTextFragment';
import { ContactFragment } from '@/Graphql/wordpressCMS/flexibleFragments/ContactFragment';
import { FourAsymetricProjectCardsFragment } from '@/Graphql/wordpressCMS/flexibleFragments/FourAsymetricProjectCardsFragment';
import { FourCardsHeadingTextFragment } from '@/Graphql/wordpressCMS/flexibleFragments/FourCardsHeadingTextFragment';
import { HeadingIndent2ColTextFragment } from '@/Graphql/wordpressCMS/flexibleFragments/HeadingIndent2ColTextFragment';
import { HeadingIndentFragment } from '@/Graphql/wordpressCMS/flexibleFragments/HeadingIndentFragment';
import { HeadingSubheadingImageTextFragment } from '@/Graphql/wordpressCMS/flexibleFragments/HeadingSubheadingImageTextFragment';
import { HeadingSubheadingTwoColTextFragment } from '@/Graphql/wordpressCMS/flexibleFragments/HeadingSubheadingTwoColTextFragment';
import { ImageOnHorizontalButtonHoverFragment } from '@/Graphql/wordpressCMS/flexibleFragments/ImageOnHorizontalButtonHoverFragment';
import { ImageOnTextHoverFragment } from '@/Graphql/wordpressCMS/flexibleFragments/ImageOnTextHoverFragment';
import { ImageOnVerticalButtonHoverFragment } from '@/Graphql/wordpressCMS/flexibleFragments/ImageOnVerticalButtonHoverFragment';
import { ImageOrVideoFragment } from '@/Graphql/wordpressCMS/flexibleFragments/ImageOrVideoFragment';
import { ImageRgbaHeadingButtonFragment } from '@/Graphql/wordpressCMS/flexibleFragments/ImageRgbaHeadingButtonFragment';
import { ImageTextButtonFragment } from '@/Graphql/wordpressCMS/flexibleFragments/ImageTextButtonFragment';
import { InfiniteLogosFragment } from '@/Graphql/wordpressCMS/flexibleFragments/InfiniteLogosFragment';
import { LatestNewsFragment } from '@/Graphql/wordpressCMS/flexibleFragments/LatestNewsFragment';
import { NextPageFragment } from '@/Graphql/wordpressCMS/flexibleFragments/NextPageFragment';
import { RgbaBgTextOverImageFragment } from '@/Graphql/wordpressCMS/flexibleFragments/RgbaBgTextOverImageFragment';
import { RightSubheadingTwoColTextFragment } from '@/Graphql/wordpressCMS/flexibleFragments/RightSubheadingTwoColTextFragment';
import { StastsRgbaFragment } from '@/Graphql/wordpressCMS/flexibleFragments/StastsRgbaFragment';
import { SubheadingIndent1ColsFragment } from '@/Graphql/wordpressCMS/flexibleFragments/SubheadingIndent1ColsFragment';
import { SubheadingIndent2ColsFragment } from '@/Graphql/wordpressCMS/flexibleFragments/SubheadingIndent2ColsFragment';
import { SubheadingOneColTextFragment } from '@/Graphql/wordpressCMS/flexibleFragments/SubheadingOneColTextFragment';
import { SubheadingRowsFragment } from '@/Graphql/wordpressCMS/flexibleFragments/SubheadingRowsFragment';
import { SubheadingTwoColTextFragment } from '@/Graphql/wordpressCMS/flexibleFragments/SubheadingTwoColTextFragment';
import { TestimonialHeadingIndentFragment } from '@/Graphql/wordpressCMS/flexibleFragments/TestimonialHeadingIndentFragment';

/**
 * Build a GraphQL query dynamically using postType and optional customFields.
 * This query will pull in all flexible block fragments, so any post type with 
 * flexibleContent can be queried with the same function.
 */
function buildGetACFQuery(postType: string, customFields?: string) {
  return gql`
    ${mediaItem}
${CallToActionFragment}
${CenteredImageFragment}
${CenteredTextFragment}
${ContactFragment}
${FourAsymetricProjectCardsFragment}
${FourCardsHeadingTextFragment}
${HeadingIndent2ColTextFragment}
${HeadingIndentFragment}
${HeadingSubheadingImageTextFragment}
${HeadingSubheadingTwoColTextFragment}
${ImageOnHorizontalButtonHoverFragment}
${ImageOnTextHoverFragment}
${ImageOnVerticalButtonHoverFragment}
${ImageOrVideoFragment}
${ImageRgbaHeadingButtonFragment}
${ImageTextButtonFragment}
${InfiniteLogosFragment}
${LatestNewsFragment}
${NextPageFragment}
${RgbaBgTextOverImageFragment}
${RightSubheadingTwoColTextFragment}
${StastsRgbaFragment}
${SubheadingIndent1ColsFragment}
${SubheadingIndent2ColsFragment}
${SubheadingOneColTextFragment}
${SubheadingRowsFragment}
${SubheadingTwoColTextFragment}
${TestimonialHeadingIndentFragment}
    query GetACFBySlug($slug: ID!) {
      ${postType}(id: $slug, idType: URI) {
        id
        title
        flexibleContent {
          flexible {
            __typename
            ...CallToActionFragment
...CenteredImageFragment
...CenteredTextFragment
...ContactFragment
...FourAsymetricProjectCardsFragment
...FourCardsHeadingTextFragment
...HeadingIndent2ColTextFragment
...HeadingIndentFragment
...HeadingSubheadingImageTextFragment
...HeadingSubheadingTwoColTextFragment
...ImageOnHorizontalButtonHoverFragment
...ImageOnTextHoverFragment
...ImageOnVerticalButtonHoverFragment
...ImageOrVideoFragment
...ImageRgbaHeadingButtonFragment
...ImageTextButtonFragment
...InfiniteLogosFragment
...LatestNewsFragment
...NextPageFragment
...RgbaBgTextOverImageFragment
...RightSubheadingTwoColTextFragment
...StastsRgbaFragment
...SubheadingIndent1ColsFragment
...SubheadingIndent2ColsFragment
...SubheadingOneColTextFragment
...SubheadingRowsFragment
...SubheadingTwoColTextFragment
...TestimonialHeadingIndentFragment
          }
        }
        ${customFields || ""}
      }
    }
  `;
}

/**
 * A universal fetcher for WordPress post types that share flexibleContent.
 * @param slug - e.g. "/my-page/", "my-page", etc.
 * @param postType - e.g. "page", "service", "banner", "post", "product", etc.
 * @param customFields - extra fields unique to this query, inline in the GraphQL.
 */
export async function getACFBySlug(
  slug: string,
  postType: string = "page",
  customFields?: string
) {
  try {
    const QUERY = buildGetACFQuery(postType, customFields);
    const response = await cmsClient.query({
      query: QUERY,
      variables: { slug },
    });

    if (response.errors && response.errors.length > 0) {
      console.error("GraphQL Errors:", response.errors);
      console.error(`GraphQL error: ${response.errors[0].message}`);
    }

    // Check if the postType data exists
    if (!response.data || !response.data[postType]) {
      console.error(`No data returned for postType "${postType}" with slug "${slug}".`);
      return null;
    }
    return response.data[postType];
  } catch (error: unknown) {
    console.error("Error fetching data by slug:", { slug, postType, error });
    return null;
  }
}