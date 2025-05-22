import { gql } from '@apollo/client';

export const TestimonialHeadingIndentFragment = gql`
  fragment TestimonialHeadingIndentFragment on FlexibleContentFlexibleContentBlockTestimonialHeadingIndentLayout {
    __typename
    testimonialHeadingIndentFields {
        content
      testimonialCompany
      testimonialJobRole
      testimonialNameSurname
      }
  }
`;
  