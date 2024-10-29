import INewsSliderBlock from './INewsSliderBlock'; // Updated import
  import IFlexibleBlock from '../IFlexibleBlock';
  
  

  const NewsSliderBlock = ({ data }: IFlexibleBlock<INewsSliderBlock>) => {
      
    const { title, link } = data.newsFields || {};
    
      return (
          <div>
              <p>block name: NewsSliderBlock</p>
          </div>
      );
  };

  export default NewsSliderBlock;