import { FC, isValidElement } from "react"
import { createElement } from "./element"

/**
 * Creates a React component with specified props.
 * @template P The props type.
 * @param tag The React functional component.
 * @returns A function that takes optional props and returns a React element.
 */
export function createComponent<T extends string>(tag: T): FC<T>
export function createComponent<P extends {}>(tag: FC<P>): FC<P>
export function createComponent(tag: any): FC<any> {
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
