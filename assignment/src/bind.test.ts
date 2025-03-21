import { bind } from "./bind"

describe("bind 함수 테스트", () => {
  test("bind Basic", () => {
    const users = { name: "d5ng" }

    function getName(this: { name: string }) {
      return `내 이름은 ${this.name}이에요!`
    }

    const bindingUser = bind(getName, users)
    expect(bindingUser()).toBe("내 이름은 d5ng이에요!")
  })

  test("bind Partial", () => {
    function greet(this: { name: string }, greeting: string, punctuation: string) {
      return `${greeting}, ${this.name}${punctuation}`
    }

    const person = { name: "Alice" }
    const greetAlice = bind(greet, person, "Hello")

    expect(greetAlice("!")).toBe("Hello, Alice!")
  })

  test("생성자 함수 테스트", () => {
    function Person(this: Record<string, any>, name: string) {
      this.name = name
    }

    const BoundPerson = bind(Person, { name: "notUsed" })
    const p = new BoundPerson("Tom")

    expect(p.name).toBe("Tom")
    expect(p instanceof Person).true
  })
})
