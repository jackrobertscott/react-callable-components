import { FC, ReactElement, ReactNode, isValidElement } from "react"
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

export type ComponentCb<T> = (props?: PropsOrChildrenType<T>) => ReactElement

/**
 * Creates a React component with specified props.
 * @template P The props type.
 * @param tag The React functional component.
 * @returns A function that takes optional props and returns a React element.
 */
export function createComponent<T extends string>(tag: T): ComponentCb<T>
export function createComponent<P extends {}>(tag: FC<P>): ComponentCb<FC<P>>
export function createComponent(tag: any): ComponentCb<any> {
  return function (props) {
    return createElement(tag, convertChildrenProps(props))
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
