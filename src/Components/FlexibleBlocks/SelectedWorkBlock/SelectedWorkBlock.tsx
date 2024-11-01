import ISelectedWorkBlock from './ISelectedWorkBlock'; // Updated import
  import IFlexibleBlock from '../IFlexibleBlock';
  
  

  const SelectedWorkBlock = ({ data }: IFlexibleBlock<ISelectedWorkBlock>) => {
      
    const { sideLeftText, text, topTextLeft, topTextRight, heading, link, selectedWorkCards } = data.selectedWorkFields || {};
    
      return (
          <div>
              <p>block name: SelectedWorkBlock</p>
          </div>
      );
  };

  export default SelectedWorkBlock;