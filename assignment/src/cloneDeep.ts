// Todo: 깊은 복사 구현하기
// Todo: ✅ 1단계 객체만 복사하기. (깊은 복사X)
// Todo: ✅ 2단계 객체만 복사하기. (깊은 복사)
// Todo: ✅ 3단계 배열 복사하기.
function cloneDeep<T extends Record<string, any>>(target: T): T
function cloneDeep<T>(target: T[]): T[]
function cloneDeep<T>(target: T) {
  if (target === null) {
    return null
  }

  if (typeof target !== "object") {
    return target
  }

  if (Array.isArray(target)) {
    return target.map((element) => cloneDeep(element))
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
  hobbies: ["축구", "독서", "사진 촬영"],
  dream: null,
}

const cloneUser = cloneDeep(user)

console.log(cloneUser === user)
console.log(cloneUser.address === user.address)
console.log(cloneUser.hobbies === user.hobbies)

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

const cloneUsers = cloneDeep(users)

console.log(cloneUsers === users)
console.log(cloneUsers[0].address === users[0].address)
console.log(cloneUsers[0].hobbies === users[0].hobbies)
