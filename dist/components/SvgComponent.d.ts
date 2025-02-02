import React, { ReactElement } from "react";
interface SVGProps {
    url: string;
    selector?: string;
    style?: Record<string, Record<string, any>>;
    svgStyle?: Record<string, string>;
    protectedSelectors?: string[];
    loader?: ReactElement;
}
declare function SVG({ url, selector, style, svgStyle, protectedSelectors, loader, }: SVGProps): React.JSX.Element | null;
export default SVG;
