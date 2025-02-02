import React, { ReactElement } from "react";
export interface SVGProps {
    url: string;
    selector?: string;
    style?: Record<string, Record<string, any>>;
    svgStyle?: Record<string, string>;
    protectedSelectors?: string[];
    loader?: ReactElement;
}
declare const SVG: React.FC<SVGProps>;
export default SVG;
