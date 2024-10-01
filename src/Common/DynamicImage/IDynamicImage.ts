// IDynamicImage.ts

export interface IDynamicImage {
  data: {
    altText?: string | null;
    mediaItemUrl?: string | null;
    mediaDetails: {
      width: number;
      height: number;
    };
    srcSet?: string | null;
  };
  className?: string;
}
