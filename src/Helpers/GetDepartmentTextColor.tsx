export const getDepartmentTextColor = (department: string): string => {
    switch (department) {
        case "managing Director":
            return "text-blue-light";
        case "director":
            return "text-blue-light";
        case "operations":
            return "text-blue-light";
        case "communications":
            return "text-purple";
        case "creative":
            return "text-green";
        case "digital":
            return "text-pink";
        case "discovery":
            return "text-orange";
        default:
            return "text-orange";
    }
};
