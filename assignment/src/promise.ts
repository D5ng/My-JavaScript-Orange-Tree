type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void
type Resolve<T extends unknown> = (value: T) => void
type Reject = (reason?: any) => void

class MyPromise<T> {
  private promiseState: "pending" | "fulfilled" | "rejected" = "pending"
  private promiseResult: T | null | undefined = null
  private resolveQueue: any[] = []
  private rejectQueue: any[] = []

  constructor(executor: Executor<T>) {
    const bindingResolve = this._resolve.bind(this)
    const bindingReject = this._reject.bind(this)

    executor(bindingResolve, bindingReject)
  }

  private _resolve(value: any) {
    if (this.promiseState !== "pending") {
      return
    }

    this.promiseState = "fulfilled"
    this.promiseResult = value

    this.resolveQueue.forEach((fn) => fn(this.promiseResult))
    this.resolveQueue = []
  }

  private _reject(reason?: any) {
    if (this.promiseState !== "pending") {
      return
    }

    this.promiseState = "rejected"
    this.promiseResult = reason
    this.rejectQueue.forEach((fn) => fn(this.promiseResult))
    this.rejectQueue = []
  }

  then(onFulfilled: Resolve<T>, onRejected?: Reject) {
    return new MyPromise((resolve, reject) => {
      if (this.promiseState === "pending") {
        this.resolveQueue.push((value: any) => {
          queueMicrotask(() => {
            try {
              const fulfilledValue = onFulfilled(value)
              resolve(fulfilledValue)
            } catch (error) {
              reject(error)
            }
          })
        })

        this.rejectQueue.push((reason: any) => {
          queueMicrotask(() => {
            if (onRejected) {
              try {
                const rejectedValue = onRejected(reason)
                resolve(rejectedValue)
              } catch (error) {
                reject(error)
              }
            } else {
              reject(reason)
            }
          })
        })
      }
    })
  }
}

const p = new MyPromise<number>((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 300)
})

console.log("start")
p.then((value) => value + 1).then(console.log)
console.log("end")
