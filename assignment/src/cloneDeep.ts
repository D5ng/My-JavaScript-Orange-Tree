// Todo: 깊은 복사 구현하기
// Todo: ✅ 1단계 객체만 복사하기. (깊은 복사X)
// Todo: ✅ 2단계 객체만 복사하기. (깊은 복사)
function cloneDeep<T extends Record<string, any>>(target: T): T
function cloneDeep<T>(target: T) {
  // 원시타입이 아니라면 => target이 객체가 아니거나, 널이라면
  // null === object
  if (target === null) {
    return null
  }

  // null과 object가 아니라면!
  if (typeof target !== "object") {
    return target
  }

  const clonedValue: Record<string, any> = {}

  for (const [key, value] of Object.entries(target as Record<string, any>)) {
    clonedValue[key] = cloneDeep(value)
  }

  return clonedValue as T
}

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
}

const cloneUser = cloneDeep(user)

console.log(cloneUser === user)
console.log(cloneUser.address === user.address)
