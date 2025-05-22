import IHeadingTwoImgTwoTextBlock from "./IHeadingTwoImgTwoTextBlock";
import IFlexibleBlock from "../IFlexibleBlock";

const HeadingTwoImgTwoTextBlock = ({ data }: IFlexibleBlock<IHeadingTwoImgTwoTextBlock>) => {
    const { firstTextCol, secondTextCol, title, topText, firstImage, secondImage } = data.headingTwoImgTwoTextFields || {};

    return (
        <div>
            <p>block name: HeadingTwoImgTwoTextBlock</p>
        </div>
    );
};

export default HeadingTwoImgTwoTextBlock;
