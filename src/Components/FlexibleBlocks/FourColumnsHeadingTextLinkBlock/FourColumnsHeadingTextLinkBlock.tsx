
import IFourColumnsHeadingTextLinkBlock from "./IFourColumnsHeadingTextLinkBlock";
import IFlexibleBlock from "../IFlexibleBlock";

const FourColumnsHeadingTextLinkBlock = ({ data }: IFlexibleBlock<IFourColumnsHeadingTextLinkBlock>) => {
  const { title, columns } = data.four_columns_heading_text_link_fields || {};

  return (
    <section>
      <p>Block: FourColumnsHeadingTextLinkBlock</p>
    </section>
  );
};

export default FourColumnsHeadingTextLinkBlock;
