
import ISubheadingsCtaBlock from "./ISubheadingsCtaBlock";
import IFlexibleBlock from "../IFlexibleBlock";

const SubheadingsCtaBlock = ({ data }: IFlexibleBlock<ISubheadingsCtaBlock>) => {
  const { text, link } = data.subheadings_cta_fields || {};

  return (
    <section>
      <p>Block: SubheadingsCtaBlock</p>
    </section>
  );
};

export default SubheadingsCtaBlock;
