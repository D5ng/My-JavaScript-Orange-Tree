import { bind } from "./bind"

describe("bind 함수 테스트", () => {
  test("bind Partial", () => {
    function greet(this: { name: string }, greeting: string, punctuation: string) {
      return `${greeting}, ${this.name}${punctuation}`
    }

    const person = { name: "Alice" }
    const greetAlice = bind(greet, person, "Hello")

    expect(greetAlice("!")).toBe("Hello, Alice!")
  })

  test("생성자 함수 테스트", () => {
    // 즉 생성자 함수를 사용할 때에도 this binding이 되야함
    // 어떻게?
    function Person(this: Record<string, any>, name: string) {
      this.name = name
    }

    const BoundPerson = bind(Person, { name: "notUsed" })
    const p = new BoundPerson("Tom")

    expect(p.name).toBe("Tom")
    expect(p instanceof Person).true
  })
})
