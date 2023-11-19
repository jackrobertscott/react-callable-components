import { CSSInterpolation, css } from "@emotion/css"
import { ComponentCb } from "./component"
import { createElement } from "./element"

export type StyledProxy = {
  [K in keyof HTMLElementTagNameMap]: (
    ...cssList: CSSInterpolation[]
  ) => ComponentCb<K>
}

export const styled = new Proxy<StyledProxy>({} as any, {
  get<T extends keyof HTMLElementTagNameMap>(_: any, property: T) {
    const cb: StyledProxy[T] = (...cssList: CSSInterpolation[]) => {
      const elementClass = css(cssList)
      return (props: any) => {
        let cn = props.className
        cn = Array.isArray(cn) ? cn : [cn]
        props.className = [...cn, elementClass]
        return createElement(property, props)
      }
    }
    return cb
  },
})
