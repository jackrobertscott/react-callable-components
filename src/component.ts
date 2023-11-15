import { CSSInterpolation, css } from "@emotion/css"
import { FC, ReactNode, isValidElement } from "react"
import { ComponentProps, createElement } from "./element"

/**
 * Defines a type that can be either the props of a component or its children.
 * @template T The component type.
 */
export type PropsOrChildrenType<T> = ComponentProps<T> extends infer R
  ? R extends { children?: ReactNode }
    ? R | ReactNode
    : R
  : never

/**
 * Represents a value for the CSS property, which can be a function returning CSSInterpolation or a direct CSSInterpolation.
 */
export type CssPropValue = (() => CSSInterpolation) | CSSInterpolation

/**
 * Creates a CSS-enhanced React component based on a given tag and CSS properties.
 * @template T The type of the tag (string representing an HTML tag).
 * @param tag The HTML tag to be used for the component.
 * @param cssValue The CSS properties or a function returning CSS properties.
 * @returns A React component with the given tag and styles.
 */
export function createCssComponent<T extends string>(
  tag: T,
  cssValue: CssPropValue = {}
) {
  const cssRaw = typeof cssValue === "function" ? cssValue() : cssValue
  const staticClass = css(cssRaw)
  const component = function (props?: PropsOrChildrenType<typeof tag>) {
    const newProps = convertChildrenProps(props)
    newProps.class = mergeClassNames(newProps.class, staticClass)
    return createElement(tag, newProps)
  }
  component.extend = function (extendValue: CssPropValue) {
    const extendCssRaw =
      typeof extendValue === "function" ? extendValue() : extendValue
    return createCssComponent(tag, [cssRaw, extendCssRaw])
  }
  return component
}

/**
 * Creates a React component with specified props.
 * @template P The props type.
 * @param tag The React functional component.
 * @returns A function that takes optional props and returns a React element.
 */
export function createComponent<P extends {}>(tag: FC<P>) {
  return function (props?: PropsOrChildrenType<typeof tag>) {
    return createElement(tag, convertChildrenProps(props))
  }
}

/**
 * Converts children props into a proper object format if they are not already.
 * @param props The props to convert.
 * @returns An object with children props.
 */
function convertChildrenProps(props: any): any {
  return typeof props === "object" &&
    props !== null &&
    !Array.isArray(props) &&
    !isValidElement(props)
    ? props
    : { children: props }
}

/**
 * Merges the class names passed in props with a static class name.
 * @param propsClass The class names from props.
 * @param staticClass The static class name.
 * @returns A merged class name string.
 */
function mergeClassNames(
  propsClass: undefined | string | (string | undefined | null)[],
  staticClass: string
) {
  return propsClass
    ? Array.isArray(propsClass)
      ? [staticClass, ...propsClass]
      : [staticClass, propsClass]
    : staticClass
}
