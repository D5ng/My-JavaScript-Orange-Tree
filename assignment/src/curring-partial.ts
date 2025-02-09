/*
  const join = (a, b, c) => {
    return `${a}_${b}_${c}`
  }
  const curriedJoin = curry(join)
  curriedJoin(1, 2, 3) // '1_2_3'
  curriedJoin(1)(2, 3) // '1_2_3'
  curriedJoin(1, 2)(3) // '1_2_3'
*/

type CurryFunction<T> = (...args: any[]) => T

const curry = <T>(fn: CurryFunction<T>) => {
  const curried = (...args: any[]) => {
    if (fn.length === args.length) {
      return fn(...args) as ReturnType<CurryFunction<T>>
    }

    return (...args2: any[]) => curried.apply(null, [...args, ...args2]) as T
  }

  return curried as CurryFunction<any>
}

type JoinFunction = (...args: any[]) => string

const join: JoinFunction = (a, b, c) => {
  return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)
console.log(curriedJoin(1, 2, 3))
console.log(curriedJoin(1)(2, 3))
console.log(curriedJoin(1, 2)(3))
