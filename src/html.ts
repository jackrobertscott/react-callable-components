import { ComponentCb, createComponent } from "./component"
import { ElementTags } from "./element"

export type ElementProxy = { [K in ElementTags]: ComponentCb<K> }

/**
 * Provides a object with properties which allow you to directly create html elements.
 */
export const html = new Proxy({} as ElementProxy, {
  get(_, prop: string) {
    return createComponent(prop)
  },
})
