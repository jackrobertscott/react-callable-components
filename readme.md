# react-callable-components

> Create callable React components with emotion styling.

## Install

```sh
npm install react-callable-components
```

## Usage

```ts
import { mdiBriefcase, mdiLogout } from "@mdi/js"
import {
  createComponent,
  createCssComponent,
  ComponentProps
} from "react-callable-components"
import { Fragment } from "./Fragment"
import { NavOption } from "./NavOption"

export const Nav = createComponent<{
  options: ComponentProps<typeof NavOption>[]
}>(({ options }) => {
  return NavWrap([
    Fragment({
      children: options.map((option) => {
        return NavOption({
          ...option,
        })
      }),
    }),
    NavSpacer(),
    NavOption({
      icon: mdiBriefcase,
    }),
    NavOption({
      icon: mdiLogout,
    }),
  ])
})

const NavWrap = createCssComponent("div", () => {
  return {
    gap: 10,
    width: 500,
    flexGrow: 1,
    borderRadius: 10,
    overflow: "hidden",
    border: "1px solid hsl(0, 0%, 50%)",
    backgroundColor: "hsl(0, 0%, 80%)",
  }
})

const NavSpacer = createCssComponent("div", () => {
  return {
    flexGrow: 1,
    backgroundColor: "hsl(0, 0%, 80%)",
  }
})
```

## API

### `ComponentProps<T>`

Represents the properties for a React component, with additional handling for HTML and SVG elements, functional components, and class components.

- `T`: The type of the component or element.

### `createElement<T>(tag: T, props?: ComponentProps<T> | null, ...children: ReactNode[]): ReactElement<ComponentProps<T>>`

Creates a React element with the provided tag, properties, and children. Handles the merging of `class` and `className` properties for HTML elements.

- `T`: The type of the tag, which can be a string, functional component, or class component.
- `tag`: The tag or component to create.
- `props`: The properties to pass to the component.
- `children`: The children of the component.
- Returns: A React element.

### `PropsOrChildrenType<T>`

A type that can be either the props of a component or its children.

- `T`: The component type.

### `CssPropValue`

Represents a value for the CSS property, which can be a function returning `CSSInterpolation` or a direct `CSSInterpolation`.

### `createCssComponent<T>(tag: T, cssValue: CssPropValue = {})`

Creates a CSS-enhanced React component based on a given tag and CSS properties.

- `T`: The type of the tag (string representing an HTML tag).
- `tag`: The HTML tag to be used for the component.
- `cssValue`: The CSS properties or a function returning CSS properties.
- Returns: A React component with the given tag and styles.

### `createComponent<P>(tag: FC<P>)`

Creates a React component with specified props.

- `P`: The props type.
- `tag`: The React functional component.
- Returns: A function that takes optional props and returns a React element.

## Contributing

Contributions are always welcome!

## License

This project is licensed under the MIT License.

## Support

If you have any questions or issues, feel free to open an issue on the [GitHub repository](https://github.com/jackrobertscott/react-callable-components).
