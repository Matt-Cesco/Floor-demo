import IInfiniteServicesCarouselBlock from './IInfiniteServicesCarouselBlock'; // Updated import
  import IFlexibleBlock from '../IFlexibleBlock';
  
  

  const InfiniteServicesCarouselBlock = ({ data }: IFlexibleBlock<IInfiniteServicesCarouselBlock>) => {
      
    const { serviceTitleAndImage } = data.infiniteServicesCarouselFields || {};
    
      return (
          <div>
              <p>block name: InfiniteServicesCarouselBlock</p>
          </div>
      );
  };

  export default InfiniteServicesCarouselBlock;