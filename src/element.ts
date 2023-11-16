import React, {
  Attributes,
  ComponentClass,
  FC,
  HTMLProps,
  LegacyRef,
  ReactElement,
  ReactNode,
  SVGProps,
} from "react"

export type PropsClassName = string | (string | undefined | null)[]

/**
 * Represents CSS properties for a React component, with custom handling for `class` and `className` properties.
 * @template T The type of the properties.
 */
export type CssProps<T extends {}> = Omit<T, "class" | "className"> & {
  class?: PropsClassName
  className?: PropsClassName
  ref?: LegacyRef<any>
}

/**
 * Represents the properties for a React component, with additional handling for HTML and SVG elements, functional components, and class components.
 * @template T The type of the component or element.
 */
export type ComponentProps<T> = T extends keyof HTMLElementTagNameMap
  ? CssProps<HTMLProps<HTMLElementTagNameMap[T]>>
  : T extends keyof SVGElementTagNameMap
  ? CssProps<SVGProps<SVGElementTagNameMap[T]>>
  : T extends FC<infer P>
  ? P & Attributes
  : T extends ComponentClass<infer P>
  ? P & Attributes
  : {}

/**
 * Creates a React element with the provided tag, properties, and children.
 * Handles the merging of `class` and `className` properties for HTML elements.
 * @template T The type of the tag, which can be a string, functional component, or class component.
 * @param tag The tag or component to create.
 * @param props The properties to pass to the component.
 * @param children The children of the component.
 * @returns A React element.
 */
export function createElement<
  T extends string | FC<any> | ComponentClass<any, any>
>(
  tag: T,
  props?: ComponentProps<T> | null,
  ...children: ReactNode[]
): ReactElement<ComponentProps<T>> {
  if (props) {
    if (typeof tag === "string") {
      props.className = []
        .concat(props.className ?? [])
        .concat(props.class ?? [])
        .join(" ")
        .split(" ")
        .filter(Boolean)
        .join(" ")
      delete props.class
    }
  }
  children = children.concat(props?.children)
  return React.createElement(tag, props, ...children)
}
