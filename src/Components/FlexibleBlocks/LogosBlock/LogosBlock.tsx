import ILogosBlock from './ILogosBlock'; // Updated import
  import IFlexibleBlock from '../IFlexibleBlock';
  
  

  const LogosBlock = ({ data }: IFlexibleBlock<ILogosBlock>) => {
      
    const { text, title, logos } = data.logoFields || {};
    
      return (
          <div>
              <p>block name: LogosBlock</p>
          </div>
      );
  };

  export default LogosBlock;