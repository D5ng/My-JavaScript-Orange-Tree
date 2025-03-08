/**
 * Memoize 함수 구현
 *
 * @example
 * // Basic Caching
 * let callCount = 0;
 * const times10 = (n: number) => {
 *  callCount++
 *  return n * 10
 * }
 *
 * const memoized = memoize(times10)
 * memoized(5);     //  => 50   (computed)
 * memoized(5);     //  => 50   (cached)
 * callCount;       //  => 1    (function called only once)
 *
 * // Different arguments
 * callCount = 0;
 * memoized(5);     //  => 50   (cached)
 * memoized(6);     //  => 60   (computed)
 * callCount;       //  => 1
 */

let callCount = 0

const times10 = (n: number) => {
  callCount++
  return n * 10
}

function memoize<T extends (...args: any[]) => any>(func: T) {
  const cachedData = new Map<string, number>()

  return (...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args)
    const hasCachedData = cachedData.has(key)

    if (hasCachedData) {
      return cachedData.get(key) as ReturnType<T>
    }

    const value = func(...args)
    cachedData.set(key, value)
    return value
  }
}

const memoized = memoize(times10)

// Basic Caching
console.log(memoized(5))
console.log(memoized(5))
console.log(callCount)

// Different arguments
console.log(memoized(5))
console.log(memoized(6))
console.log(callCount)
