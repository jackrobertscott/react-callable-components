import { RemappedComponent, createComponent } from "./component"

/**
 * Provides a object with properties which allow you to directly create html elements.
 */
export const html = new Proxy(
  {} as { [K in keyof HTMLElementTagNameMap]: RemappedComponent<K> },
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
  {} as { [K in keyof SVGElementTagNameMap]: RemappedComponent<K> },
  {
    get(_, prop: string) {
      return createComponent(prop)
    },
  }
)
