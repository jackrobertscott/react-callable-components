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
import { ComponentCb } from "./component"

export type PropsClassName = string | (string | undefined | null)[]

/**
 * Represents CSS properties for a React component, with custom handling for `class` and `className` properties.
 * @template T The type of the properties.
 */
export type CssProps<T extends {}> = Omit<
  T,
  "data" | "class" | "className" | "ref"
> & {
  data?: Record<string, undefined | null | boolean | string | number>
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
  : T extends ComponentCb<infer P>
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
      let classList: string[] = []
      if (props.className) {
        classList = classList.concat(props.className)
      }
      if (props.class) {
        classList = classList.concat(props.class)
        delete props.class
      }
      props.className = classList
        .join(" ")
        .split(" ")
        .filter((i) => i)
        .join(" ")
      if (props.data) {
        for (const dataKey in props.data) {
          const dataValue = props.data[dataKey]
          if (dataValue || typeof dataValue === "number")
            props[`data-${toKebabCase(dataKey)}`] = String(props.data[dataKey])
        }
        delete props.data
      }
    }
  }
  children = children.concat(props?.children)
  return React.createElement(tag, props, ...children)
}

function toKebabCase(value: string): string {
  return value
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/([A-Z])/g, "-$1") // Replace uppercase letters with hyphen and lowercase
    .toLowerCase() // Convert to lowercase
    .replace(/^-+|-+$/g, "") // Remove any leading or trailing hyphens
}
