import IFaqsBlock from './IFaqsBlock'; // Updated import
  import IFlexibleBlock from '../IFlexibleBlock';
  
  

  const FaqsBlock = ({ data }: IFlexibleBlock<IFaqsBlock>) => {
      
    const { text, title, cta, faqs } = data.faqFields || {};
    
      return (
          <div>
              <p>block name: FaqsBlock</p>
          </div>
      );
  };

  export default FaqsBlock;