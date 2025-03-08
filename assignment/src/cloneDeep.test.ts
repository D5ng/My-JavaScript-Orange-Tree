import { describe, expect, test } from "vitest"
import { cloneDeep } from "./cloneDeep"

describe("깊은 복사 테스트", () => {
  test("한 뎁스의 객체를 복사했을 때 참조가 같은지 테스트", () => {
    const user = {
      name: "김철수",
      age: 32,
      gender: "Male",
    }

    const clonedUser = cloneDeep(user)
    expect(user).not.toBe(clonedUser)
  })

  test("중첩된 객체 참조 값이 같은지 테스트", () => {
    const user = {
      name: "김철수",
      age: 32,
      gender: "Male",
      address: {
        street: "서울특별시 강남구 테헤란로 123",
        city: "서울",
        state: "강남구",
        country: "대한민국",
        zipCode: "06164",
      },
      dream: null,
    }

    const clonedUser = cloneDeep(user)

    expect(user).not.toBe(clonedUser)
    expect(user.address).not.toBe(clonedUser.address)
  })

  test("값이 배열일 때", () => {
    const users = [
      {
        name: "김철수",
        age: 32,
        address: {
          street: "테헤란로 123",
          city: "서울",
          district: "강남구",
          country: "대한민국",
        },
        gender: "Male",
        hobbies: ["축구", "독서", "사진 촬영"],
      },
      {
        name: "이영희",
        age: 28,
        address: {
          street: "센텀중앙로 45",
          city: "부산",
          district: "해운대구",
          country: "대한민국",
        },
        gender: "Female",
        hobbies: ["요가", "베이킹", "여행"],
      },
      {
        name: "박민준",
        age: 35,
        address: {
          street: "동대구로 77",
          city: "대구",
          district: "수성구",
          country: "대한민국",
        },
        gender: "Male",
        hobbies: ["등산", "게임", "영화 감상"],
      },
    ]

    const clonedUsers = cloneDeep(users)

    expect(users).not.toBe(clonedUsers)
    expect(users[0].address).not.toBe(clonedUsers[0].address)
    expect(users[0].hobbies).not.toBe(clonedUsers[0].hobbies)
  })
})
