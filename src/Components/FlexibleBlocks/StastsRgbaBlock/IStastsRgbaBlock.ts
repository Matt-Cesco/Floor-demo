export default interface IStastsRgbaBlock {
    __typename: "FlexibleContentFlexibleContentBlockStastsRgbaLayout";
    statsRgbaFields: {
        __typename: "FlexibleContentFlexibleStatsRgbaFields";
        statsList: Array<{
            __typename: "FlexibleContentFlexibleStatsRgbaFieldsStatsList";
            statNumberRgba: string;
            statText: string;
        }>;
    };
}
