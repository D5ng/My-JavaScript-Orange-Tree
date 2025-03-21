import { flat } from "./flat"

const arr = [1, [2], [3, [4]]]

describe("flat 함수 테스트", () => {
  test("size 매개변수가 없을 때", () => {
    expect(flat(arr)).toEqual([1, 2, 3, [4]])
  })

  test("size 매개변수 값이 0보다 작을 때", () => {
    expect(() => flat(arr, -1)).toThrow(Error)
  })

  test("배열 평탄화 1뎁스", () => {
    expect(flat(arr, 1)).toEqual([1, 2, 3, [4]])
  })

  test("배열 평탄화 2뎁스", () => {
    expect(flat(arr, 2)).toEqual([1, 2, 3, 4])
  })

  test("배열 뎁스에 무한대일 때", () => {
    const arr = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]
    expect(flat(arr, Infinity)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  test("배열에 empty slot이 있을 때", () => {
    const arr: any[] = [1, 2]

    arr[4] = undefined
    arr[5] = [3, 4]
    arr[5][4] = [5, 6, [7, 8, [9, 10]]]

    expect(flat(arr, Infinity)).toEqual([1, 2, undefined, 3, 4, 5, 6, 7, 8, 9, 10])
  })
})
