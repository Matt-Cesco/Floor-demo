import { IDynamicHeadingProps } from './IDynamicHeading';
import { DynamicHeadingEnum } from './DynamicHeadingEnum';

const DynamicHeading: React.FC<IDynamicHeadingProps> = ({ data, className }) => {
  const { headingTag, headingText } = data || {};
  const tag = headingTag && headingTag.length > 0 ? headingTag[0] : DynamicHeadingEnum.H2;

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
