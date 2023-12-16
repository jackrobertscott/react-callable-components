import { FC, ReactElement, ReactNode, isValidElement } from "react"
import { ComponentProps, createElement } from "./element"

/**
 * Defines a type that can be either the props of a component or its children.
 * @template T The component type.
 */
export type PropsOfComponent<T extends string | FC<any>> =
  ComponentProps<T> extends infer R
    ? R extends { children?: ReactNode }
      ? R | ReactNode
      : R
    : never

/**
 * Defines a type that can be either the props of a component or its children.
 */
export type RemappedComponent<T extends string | FC<any>> = (
  props?: PropsOfComponent<T>
) => ReactElement

/**
 * Creates a React component with specified props.
 * @template P The props type.
 * @param tag The React functional component.
 * @returns A function that takes optional props and returns a React element.
 */
export function createComponent<T extends string>(tag: T): RemappedComponent<T>
export function createComponent<P extends {}>(
  tag: FC<P>
): RemappedComponent<FC<P>>
export function createComponent(tag: any): RemappedComponent<any> {
  return function (props) {
    const _props = convertChildrenProps(props)
    return createElement(tag, _props)
  }
}

/**
 * Converts children props into a proper object format if they are not already.
 * @param props The props to convert.
 * @returns An object with children props.
 */
export function convertChildrenProps(props: any): any {
  return typeof props === "object" &&
    props !== null &&
    !Array.isArray(props) &&
    !isValidElement(props)
    ? props
    : { children: props }
}
