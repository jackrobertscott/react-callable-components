import { ComponentCb, createComponent } from "./component"

/**
 * Provides a object with properties which allow you to directly create html elements.
 */
export const html = new Proxy(
  {} as { [K in keyof HTMLElementTagNameMap]: ComponentCb<K> },
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
  {} as { [K in keyof SVGElementTagNameMap]: ComponentCb<K> },
  {
    get(_, prop: string) {
      return createComponent(prop)
    },
  }
)

/**
 * Provides a object which exposes properties for creating both html and svg elements.
 */
export const xml = new Proxy(
  {} as {
    [K in
      | keyof HTMLElementTagNameMap
      | keyof SVGElementTagNameMap]: ComponentCb<K>
  },
  {
    get(_, prop: string) {
      return createComponent(prop)
    },
  }
)
