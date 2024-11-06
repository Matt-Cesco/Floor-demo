import IServicesRowsBlock from './IServicesRowsBlock'; // Updated import
  import IFlexibleBlock from '../IFlexibleBlock';
  
  

  const ServicesRowsBlock = ({ data }: IFlexibleBlock<IServicesRowsBlock>) => {
      
    const { sideLeftText, text, heading, servicesRowsCards } = data.servicesRowsFields || {};
    
      return (
          <div>
              <p>block name: ServicesRowsBlock</p>
          </div>
      );
  };

  export default ServicesRowsBlock;