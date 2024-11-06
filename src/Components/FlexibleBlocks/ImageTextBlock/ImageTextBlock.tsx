import IImageTextBlock from './IImageTextBlock';
import IFlexibleBlock from '../IFlexibleBlock';
import { VariationsOptions } from './ImageTextBlockOptionsEnum';

const ImageTextBlock = ({ data }: IFlexibleBlock<IImageTextBlock>) => {
  const { textFirst, textSecond, bigImage, layoutOptions, smallImage } = data.imageTextFields || {};
  const { variationsOptions } = layoutOptions || {};

  // variationsOptions is now of type VariationsOptions | undefined

  // You can now safely use variationsOptions in a switch or if statement
  switch (variationsOptions) {
    case VariationsOptions.VARIATION1:
      // Handle Variation1
      break;
    case VariationsOptions.VARIATION2:
      // Handle Variation2
      break;
    case VariationsOptions.VARIATION3:
      // Handle Variation3
      break;
    default:
      // Handle default case
      break;
  }

  return <section>{/* Your component JSX */}</section>;
};

export default ImageTextBlock;