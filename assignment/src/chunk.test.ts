import { chunk } from "./chunk"

describe("청크 함수 테스트", () => {
  test("Basic Array", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
  })

  test("Chunk size of 1", () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]])
  })

  test("exact division", () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ])
  })

  test("Empty Array", () => {
    expect(chunk([], 5)).toEqual([])
  })
})
