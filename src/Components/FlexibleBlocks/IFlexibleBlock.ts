export default interface IFlexibleBlock<T extends { __typename: string }> {
    data: T;
    // You can add more fields here if needed, like layout or options
}