type BindThis<T, U> = T extends (this: any, ...args: infer A) => infer R ? (this: U, ...args: A) => R : never

type PartiallyBound<T, P extends any[]> = T extends (...args: [...P, ...infer Rest]) => infer R
  ? (...args: Rest) => R
  : never

export function bind<T extends (this: any, ...args: any[]) => any, U, P extends any[]>(fn: T, thisArg: U, ...args: P) {
  function boundFn(...args2: any[]) {
    const isInstnace = this instanceof boundFn

    if (isInstnace) {
      return fn.call(this, ...args, ...args2)
    }

    return fn.call(thisArg, ...args, ...args2) as PartiallyBound<BindThis<T, U>, P>
  }

  boundFn.prototype = Object.create(fn.prototype)

  return boundFn
}
