type Executor<T> = (resolve: Resolve<T>, reject: Reject) => void
type Resolve<T extends unknown> = (value: T) => void | T
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

  private _resolve(value: T) {
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

  catch(onRejected: Reject) {
    return this.then(undefined, onRejected)
  }

  then(onFulfilled: Resolve<T> | undefined, onRejected?: Reject) {
    return new MyPromise<T>((resolve, reject) => {
      if (this.promiseState === "pending") {
        this.resolveQueue.push((value: T) => {
          queueMicrotask(() => {
            if (onFulfilled) {
              try {
                const fulfilledValue = onFulfilled(value)
                resolve(fulfilledValue as T)
              } catch (error) {
                reject(error)
              }
            } else {
              resolve(value)
            }
          })
        })

        this.rejectQueue.push((reason: any) => {
          queueMicrotask(() => {
            if (onRejected) {
              try {
                const rejectedValue = onRejected(reason)
                resolve(rejectedValue as T)
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

// const p = new Promise<number>((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1)
//   }, 300)
// })

console.log("start")
p.then((value) => value + 1)
  .then((value) => {
    if (value < 10) {
      throw new Error("value가 10보다 작아요")
    }

    return value
  })
  .catch(console.log)

console.log("end")
