# @sirajju/svg-mod

A lightweight React library for dynamically loading and customizing SVGs.

## Installation

```bash
npm install @sirajju/svg-mod
# or
yarn add @sirajju/svg-mod
```

## Features

- 🎨 Dynamic SVG customization
- 🎯 Selector-based modifications
- 💪 TypeScript support
- 🛡️ Protected elements preservation
- 🔄 Custom loading states

## Usage

```tsx
import SVG from 'svg-sculptor';

function App() {
  return (
    <SVG
      url="/path/to/your.svg"
      selector="#specific-element"
      style={{
        "#specific-element": {
          fill: "blue",
          stroke: "red",
          text: "New Text"
        }
      }}
      svgStyle={{
        width: "100px",
        height: "100px"
      }}
      protectedSelectors={["defs", "#gradients"]}
      loader={<div>Custom loader...</div>}
    />
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `url` | `string` | URL of the SVG file |
| `selector` | `string?` | Optional CSS selector to target specific element |
| `style` | `object?` | Styles to apply to selected elements |
| `svgStyle` | `object?` | Styles to apply to the root SVG |
| `protectedSelectors` | `string[]?` | Elements to preserve when using selector |
| `loader` | `ReactElement?` | Custom loading component |

## License

MIT
