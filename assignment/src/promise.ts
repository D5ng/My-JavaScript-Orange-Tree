/**
 * Todo: Executor 함수 구현 (Resolve, Rejected)
 * Todo: then 메서드는 체이닝이 가능해야함. 즉 Promise를 리턴할 수 있도록 해주어야함.
 * Todo: then 메서드의 onFulfilled는 비동기적으로 동작해야함, promise는 MicroTaskQueue로 동작함
 */

type Executor = (resolve: Resolve, rejected: Rejected) => void

type Status = "pending" | "fulfilled" | "rejected"

type Resolve = (value: unknown) => void
type Rejected = (reason?: any) => void

class MyPromise {
  status: Status = "pending"
  value: any = null
  queue: any[] = []

  constructor(executor: Executor) {
    executor(this.resolve.bind(this), this.rejected.bind(this))
  }

  resolve(value: unknown) {
    if (this.status !== "pending") {
      return
    }

    this.status = "fulfilled"
    this.value = value

    this.queue.forEach((fn) => queueMicrotask(() => fn(value)))
    this.queue = []
  }

  rejected(reason?: any) {
    this.status = "rejected"
  }

  then(onFulfilled: (...args: any[]) => void) {
    return new MyPromise((resolve, rejected) => {
      if (this.status === "pending") {
        this.queue.push((value: any) => {
          const nextThenValue = onFulfilled(value)
          resolve(nextThenValue)
        })
      }
    })
  }
}

console.log("First")

const p = new MyPromise((resolve) => {
  setTimeout(() => resolve("success"), 300)
})

p.then((value) => {
  console.log("첫번째 then 성공", value)
  return 1
})
  .then((value) => value + 1)
  .then((value) => console.log(value))

console.log("Second")
