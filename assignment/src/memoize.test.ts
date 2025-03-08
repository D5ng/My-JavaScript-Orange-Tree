import { memoize } from "./memoize"

let callCount = 0

const times10 = (n: number) => {
  callCount++
  return n * 10
}

describe("memoize 함수 테스트", () => {
  test("Basic Caching", () => {
    callCount = 0
    const memoized = memoize(times10)

    expect(memoized(5)).toBe(50)
    expect(memoized(5)).toBe(50)
    expect(callCount).toBe(1)
  })

  test("Different arguments", () => {
    callCount = 0
    const memoized = memoize(times10)

    expect(memoized(5)).toBe(50)
    expect(memoized(6)).toBe(60)
    expect(callCount).toBe(2)
  })
})
