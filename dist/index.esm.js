import React, { useState, useEffect } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var SVG = function (_a) {
    var url = _a.url, selector = _a.selector, _b = _a.style, style = _b === void 0 ? {} : _b, _c = _a.svgStyle, svgStyle = _c === void 0 ? {} : _c, _d = _a.protectedSelectors, protectedSelectors = _d === void 0 ? ["defs"] : _d, loader = _a.loader;
    var _e = useState({ svg: null, error: null, loading: true }), state = _e[0], setState = _e[1];
    useEffect(function () {
        var manipulateSVG = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, svgText, parser, doc, svg_1, selected_1, selectedStyle, protectedElements, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok)
                            throw new Error("Failed to fetch SVG");
                        return [4 /*yield*/, response.text()];
                    case 2:
                        svgText = _a.sent();
                        parser = new DOMParser();
                        doc = parser.parseFromString(svgText, "image/svg+xml");
                        svg_1 = doc.querySelector("svg");
                        if (!svg_1)
                            throw new Error("Invalid SVG");
                        // Apply SVG-level styles
                        Object.entries(svgStyle).forEach(function (_a) {
                            var key = _a[0], value = _a[1];
                            return svg_1.setAttribute(key, String(value));
                        });
                        if (selector) {
                            selected_1 = svg_1.querySelector(selector);
                            if (!selected_1)
                                throw new Error("Selector ".concat(selector, " not found"));
                            selectedStyle = style[selector];
                            if (selectedStyle) {
                                Object.entries(selectedStyle).forEach(function (_a) {
                                    var key = _a[0], value = _a[1];
                                    if (key === "text") {
                                        var target = selected_1.firstElementChild || selected_1;
                                        target.textContent = String(value);
                                    }
                                    else {
                                        selected_1.setAttribute(key, String(value));
                                    }
                                });
                            }
                            protectedElements = protectedSelectors
                                .map(function (sel) { return svg_1.querySelector(sel); })
                                .filter(Boolean);
                            svg_1.innerHTML = selected_1.outerHTML;
                            protectedElements.forEach(function (el) { return el && svg_1.appendChild(el); });
                        }
                        else {
                            Object.entries(style).forEach(function (_a) {
                                var sel = _a[0], attrs = _a[1];
                                var el = svg_1.querySelector(sel);
                                if (el) {
                                    Object.entries(attrs).forEach(function (_a) {
                                        var key = _a[0], value = _a[1];
                                        if (key === "text") {
                                            var target = el.firstElementChild || el;
                                            target.textContent = String(value);
                                        }
                                        else {
                                            el.setAttribute(key, String(value));
                                        }
                                    });
                                }
                            });
                        }
                        setState({ svg: svg_1.outerHTML, error: null, loading: false });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        setState({
                            svg: null,
                            error: err_1 instanceof Error ? err_1.message : "Unknown error",
                            loading: false,
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        manipulateSVG();
    }, [url, selector, JSON.stringify(style), JSON.stringify(svgStyle)]);
    if (state.loading)
        return loader || React.createElement("div", { className: "spinner" });
    if (state.error)
        return React.createElement("div", { className: "svg-error" }, state.error);
    if (!state.svg)
        return null;
    return (React.createElement("div", { dangerouslySetInnerHTML: { __html: state.svg }, className: "injected-svg" }));
};

export { SVG };
