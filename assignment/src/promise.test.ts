import MyPromise from "./promise"

type Callback<T> = (resolve: (value: T) => void, reject: (reason?: any) => void) => void

function testPromise<T>(callback: Callback<T>) {
  return new MyPromise<T>((resolve, reject) => {
    setTimeout(() => {
      callback(resolve, reject)
    }, 300)
  })
}

describe("프로미스 테스트", () => {
  test("then 메서드 테스트", () => {
    return testPromise<number>((resolve) => resolve(1)).then((value) => expect(value).toEqual(1))
  })

  test("then 메서드 체이닝", () => {
    return testPromise<number>((resolve) => resolve(1))
      .then((value) => value + 1)
      .then((value) => value + 1)
      .then((value) => expect(value).toEqual(3))
  })

  test("catch 메서드 테스트 베이직", () => {
    return testPromise<number>((_, reject) => reject("에러 발생")).catch((error) => {
      expect(error).toBe("에러 발생")
    })
  })

  test("catch 메서드 테스트 스탠다드", () => {
    return testPromise<number>((resolve) => resolve(1))
      .then((value) => value + 1)
      .then((value) => {
        if (value < 5) {
          throw new Error("value가 5보다 작아요")
        }

        return value
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(Error)
      })
  })

  test("finally 메서드 테스트", () => {
    const finallyMockFn = vi.fn(() => "비동기 성공, 실패 여부와 상관 없이 실행")

    return testPromise<number>((resolve) => resolve(1))
      .then((value) => value + 1)
      .then((value) => {
        expect(value).toEqual(2)
        throw new Error("에러 발생")
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(Error)
      })
      .finally(finallyMockFn)
      .then(() => {
        expect(finallyMockFn).toHaveBeenCalledTimes(1)
      })
  })
})
