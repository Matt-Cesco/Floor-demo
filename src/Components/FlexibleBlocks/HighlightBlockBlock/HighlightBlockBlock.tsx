import IHighlightBlockBlock from './IHighlightBlockBlock'; // Updated import
  import IFlexibleBlock from '../IFlexibleBlock';
  import { BackgroundColorOptions, ImageOptions } from './HighlightBlockBlockOptionsEnum';
  

  const HighlightBlockBlock = ({ data }: IFlexibleBlock<IHighlightBlockBlock>) => {
      
    const { text, title, image, layoutOptions, link } = data.highlightFields || {};
    
    const { backgroundColorOptions, imageOptions } = layoutOptions || {};
    
      return (
          <div>
              <p>block name: HighlightBlockBlock</p>
          </div>
      );
  };

  export default HighlightBlockBlock;