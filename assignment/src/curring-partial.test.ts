import { curry } from "./curring-partial"

const join: (...args: any[]) => string = (a, b, c) => {
  return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)

describe("커링 함수 테스트", () => {
  const value = "1_2_3"

  test("하나의 호출로 사용한 경우", () => expect(curriedJoin(1, 2, 3)).toMatch(value))
  test("두개의 호출로 사용한 경우", () => {
    expect(curriedJoin(1)(2, 3)).toMatch(value)
    expect(curriedJoin(1, 2)(3)).toMatch(value)
  })
  test("세개의 호출로 사용한 경우", () => expect(curriedJoin(1)(2)(3)).toMatch(value))
  test("매개변수 개수 초과시 에러 발생", () => expect(() => curriedJoin(1)(2)(3)(4)).toThrow(TypeError))
})
