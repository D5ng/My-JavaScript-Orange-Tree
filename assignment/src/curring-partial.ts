/**
 * @example
 * // Curring Partial
 * const join = (a, b, c) => {
 *  return `${a}_${b}_${c}`
 * }
 *
 * const curriedJoin = curry(join)
 * curriedJoin(1, 2, 3) // '1_2_3'
 * curriedJoin(1)(2, 3) // '1_2_3'
 * curriedJoin(1, 2)(3) // '1_2_3'
 */

type CurryFunction<T> = (...args: any[]) => T

export const curry = <T>(fn: CurryFunction<T>) => {
  const curried = (...args: any[]) => {
    if (fn.length < args.length) {
      throw new Error(`최대 ${fn.length}개수의 인수를 예상했지만, ${args.length}를 받았습니다`)
    }

    if (fn.length === args.length) {
      return fn(...args) as ReturnType<CurryFunction<T>>
    }

    return (...args2: any[]) => curried.apply(null, [...args, ...args2]) as T
  }

  return curried as CurryFunction<any>
}
