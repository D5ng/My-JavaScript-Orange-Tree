/**
 * @example
 * const arr = [1, [2], [3, [4]]];
 * flat(arr)
 * // [1, 2, 3, [4]]
 * flat(arr, 1)
 * // [1, 2, 3, [4]]
 * flat(arr, 2)
 * // [1, 2, 3, 4]
 */

export function flat<T>(arr: T[], size: number = 1) {
  let flatten: any[] = []

  // Todo: size가 0보다 작다면~
  if (size < 0) {
    throw new Error(`size의 값은 1이상이어야 해요.`)
  }

  // Todo: size의 값이 0이라면
  if (size === 0) {
    return arr
  }

  // Todo: 더 이상 배열을 평탄화할 수 없을 때
  const isFlattened = arr.every((value) => !Array.isArray(value)) && size > 0
  if (isFlattened) {
    return arr
  }

  // Todo: 각 요소를 순회하면서 배열을 평탄화 작업해야함.
  for (const value of arr) {
    flatten = flatten.concat(value)
  }

  // Todo: size가 없어도 기본 값으로 1로 진행하도록 되어야함.
  flatten = flat(flatten, size - 1)

  return flatten
}

const arr = [1, [2], [3, [4]]]
flat(arr, 10)
