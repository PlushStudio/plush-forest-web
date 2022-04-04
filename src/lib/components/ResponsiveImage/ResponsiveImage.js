import { jsx as _jsx } from "react/jsx-runtime";
export const ResponsiveImage = ({ x1, x2, x3, alt, className }) => {
    return (_jsx("img", { className: className, src: x1, srcSet: `${x2} 2x, ${x3} 3x`, alt: alt }));
};
