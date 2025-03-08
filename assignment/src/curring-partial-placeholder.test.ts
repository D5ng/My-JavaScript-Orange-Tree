import { curry } from "./curring-partial-placeholder"

const join = (a: string, b: string, c: string) => `${a}_${b}_${c}`
const curriedJoin = curry(join)
const _ = curry.placeholder

describe("Curring Placeholder 테스트", () => {
  const value = "1_2_3"

  test("하나의 호출로 사용한 경우", () => expect(curriedJoin(1, 2, 3)).toMatch(value))
  test("플레이스 홀더 사용예시 1번", () => expect(curriedJoin(_, 2)(1, 3)).toMatch(value))
  test("플레이스 홀더 사용예시 2번", () => expect(curriedJoin(_, _, _)(1)(_, 3)(2)).toMatch(value))
})
