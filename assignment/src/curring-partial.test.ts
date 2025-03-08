import { curry } from "./curring-partial"

const join: (...args: any[]) => string = (a, b, c) => {
  return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)

test("커링 함수 테스트", () => {
  const value = "1_2_3"
  expect(curriedJoin(1, 2, 3)).toMatch(value)
  expect(curriedJoin(1)(2, 3)).toMatch(value)
  expect(curriedJoin(1, 2)(3)).toMatch(value)
})
