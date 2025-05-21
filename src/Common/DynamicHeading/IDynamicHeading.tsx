import { DynamicHeadingEnum } from "./DynamicHeadingEnum";

export interface IDynamicHeading {
  headingTag?: DynamicHeadingEnum[] | null;
  headingText?: string | null;
}

export interface IDynamicHeadingProps {
  data: IDynamicHeading | null | undefined;
  className?: string;
}
