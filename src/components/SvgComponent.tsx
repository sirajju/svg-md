import React, { ReactElement, useEffect, useState } from "react";

export interface SVGProps {
  url: string;
  selector?: string;
  style?: Record<string, Record<string, any>>;
  svgStyle?: Record<string, string>;
  protectedSelectors?: string[];
  loader?: ReactElement;
}

const SVG: React.FC<SVGProps> = ({
  url,
  selector,
  style = {},
  svgStyle = {},
  protectedSelectors = ["defs"],
  loader,
}) => {
  const [state, setState] = useState<{
    svg: string | null;
    error: string | null;
    loading: boolean;
  }>({ svg: null, error: null, loading: true });

  useEffect(() => {
    const manipulateSVG = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch SVG");

        const svgText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, "image/svg+xml");
        const svg = doc.querySelector("svg");

        if (!svg) throw new Error("Invalid SVG");

        // Apply SVG-level styles
        Object.entries(svgStyle).forEach(([key, value]) =>
          svg.setAttribute(key, String(value))
        );

        if (selector) {
          const selected = svg.querySelector(selector);
          if (!selected) throw new Error(`Selector ${selector} not found`);

          const selectedStyle = style[selector];
          if (selectedStyle) {
            Object.entries(selectedStyle).forEach(([key, value]) => {
              if (key === "text") {
                const target = selected.firstElementChild || selected;
                target.textContent = String(value);
              } else {
                selected.setAttribute(key, String(value));
              }
            });
          }

          const protectedElements = protectedSelectors
            .map((sel) => svg.querySelector(sel))
            .filter(Boolean);

          svg.innerHTML = selected.outerHTML;
          protectedElements.forEach((el) => el && svg.appendChild(el));
        } else {
          Object.entries(style).forEach(([sel, attrs]) => {
            const el = svg.querySelector(sel);
            if (el) {
              Object.entries(attrs as Record<string, any>).forEach(
                ([key, value]) => {
                  if (key === "text") {
                    const target = el.firstElementChild || el;
                    target.textContent = String(value);
                  } else {
                    el.setAttribute(key, String(value));
                  }
                }
              );
            }
          });
        }

        setState({ svg: svg.outerHTML, error: null, loading: false });
      } catch (err) {
        setState({
          svg: null,
          error: err instanceof Error ? err.message : "Unknown error",
          loading: false,
        });
      }
    };

    manipulateSVG();
  }, [url, selector, JSON.stringify(style), JSON.stringify(svgStyle)]);

  if (state.loading) return loader || <div className="spinner"></div>;
  if (state.error) return <div className="svg-error">{state.error}</div>;
  if (!state.svg) return null;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: state.svg }}
      className="injected-svg"
    />
  );
};

export default SVG;
