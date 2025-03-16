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

export function flat<T>(arr: T[], depth: number = 1) {
  // Todo: arr 값이 배열이 아니라면~
  if (!Array.isArray(arr)) {
    throw new Error(`arr의 값은 배열이여야만 합니다.`)
  }

  // Todo: depth가 0보다 작다면~
  if (depth < 0) {
    throw new Error(`depth의 값은 1이상이어야 해요.`)
  }

  // Todo: depth의 값이 0이라면
  if (depth === 0) {
    return arr
  }

  let flatten: any[] = []
  // Todo: 배열의 Empty 슬롯이 있다면 없애버리기
  const notEmptyArray = arr.filter(() => true)

  // Todo: 더 이상 배열을 평탄화할 수 없을 때
  const isFlattened = notEmptyArray.every((value) => !Array.isArray(value)) && depth > 0
  if (isFlattened) {
    return notEmptyArray
  }

  // Todo: 각 요소를 순회하면서 배열을 평탄화 작업해야함.
  for (const value of notEmptyArray) {
    flatten = flatten.concat(value)
  }

  // Todo: depth가 없어도 기본 값으로 1로 진행하도록 되어야함.
  flatten = flat(flatten, depth - 1)

  return flatten
}
