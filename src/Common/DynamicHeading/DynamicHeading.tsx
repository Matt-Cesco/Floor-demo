import { IDynamicHeadingProps } from "./IDynamicHeading";
import { DynamicHeadingEnum } from "./DynamicHeadingEnum";

const DynamicHeading = ({ data, className }: IDynamicHeadingProps) => {
  const headingTag = data?.headingTag || [DynamicHeadingEnum.H2];
  const headingText = data?.headingText || "";
  const tag = headingTag?.[0] || DynamicHeadingEnum.H2;
  const HeadingTagComponent = tag as keyof JSX.IntrinsicElements;

  if (!headingText) {
    return null;
  }

  return (
    <HeadingTagComponent className={className}>
      {headingText}
    </HeadingTagComponent>
  );
};

export default DynamicHeading;
