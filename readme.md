# react-callable-components

> Create callable React components with emotion styling.

## Install

```sh
npm install react-callable-components
```

## Usage

```ts
import { useState } from "react"
import { createComponent, ComponentProps } from "react-callable-components"
import { NavOption } from "./NavOption"

export const Div = createComponent("div")

export const Input = createComponent("input")

export const Nav = createComponent<{
  options: ComponentProps<typeof NavOption>[]
}>(({ options }) => {
  const [text, setText] = useState("")
  return Div({
    children: [
      Input({
        value: text,
        onChange: setText,
      })
    ]
  })
})
```

## API

### `createComponent<P>(tag: FC<P>)`

Creates a React component with specified props.

- `P`: The props type.
- `tag`: The React functional component or the HTML tag.
- Returns: A function that takes optional props and returns a React element.

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

## Contributing

Contributions are always welcome!

## License

This project is licensed under the MIT License.

## Support

If you have any questions or issues, feel free to open an issue on the [GitHub repository](https://github.com/jackrobertscott/react-callable-components).
