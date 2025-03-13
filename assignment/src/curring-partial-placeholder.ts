/**
 * @example
 * // Curring Partial Placeholder
 * const  join = (a, b, c) => {
 *  return `${a}_${b}_${c}`
 * }
 * const curriedJoin = curry(join)
 * const _ = curry.placeholder
 * curriedJoin(1, 2, 3) // '1_2_3'
 * curriedJoin(_, 2)(1, 3) // '1_2_3'
 * curriedJoin(_, _, _)(1)(_, 3)(2) // '1_2_3'
 */

type Func = (...args: any[]) => any

export const curry = (function () {
  const curryInternal = (func: Func) => {
    const curried = (...args: any[]) => {
      if (func.length < args.length) {
        throw new Error(`최대 ${func.length}개수의 인수를 예상했지만, ${args.length}를 받았습니다`)
      }

      const hasPlaceholder = args.includes(curryInternal.placeholder)

      if (func.length === args.length && !hasPlaceholder) {
        return func(...args)
      }

      return (...nextArgs: any[]) => {
        const mergeArgs = args.map((arg) => (arg === curry.placeholder && nextArgs.length ? nextArgs.shift() : arg))
        return curried.call(null, ...mergeArgs, ...nextArgs)
      }
    }

    return curried
  }

  curryInternal.placeholder = "placeholder"

  return curryInternal
})()
