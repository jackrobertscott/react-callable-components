import { FC } from "react"
import { createComponent } from "./component"

/**
 * Provides a object with properties which allow you to directly create html elements.
 */
export const html = new Proxy(
  {} as { [K in keyof HTMLElementTagNameMap]: FC<K> },
  {
    get(_, prop: string) {
      return createComponent(prop)
    },
  }
)

/**
 * Provides a object with properties which allow you to directly create svg elements.
 */
export const svg = new Proxy(
  {} as { [K in keyof SVGElementTagNameMap]: FC<K> },
  {
    get(_, prop: string) {
      return createComponent(prop)
    },
  }
)
