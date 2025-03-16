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

  test("배열 평탄화 10000뎁스", () => {
    expect(flat(arr, 10)).toEqual([1, 2, 3, 4])
  })
})
