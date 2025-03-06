// Todo: 깊은 복사 구현하기
// Todo: ✅ 1단계 객체만 복사하기. (깊은 복사X)
function cloneDeep<T extends Record<string, any>>(target: T): T
function cloneDeep<T>(target: T) {
  const clonedValue: Record<string, any> = {}

  for (const [key, value] of Object.entries(target as Record<string, any>)) {
    clonedValue[key] = value
  }

  return clonedValue as T
}

const user = {
  name: "김철수",
  age: 32,
  address: "서울특별시 강남구 테헤란로 123",
  gender: "Male",
}

const cloneUser = cloneDeep(user)

console.log(cloneUser === user)
