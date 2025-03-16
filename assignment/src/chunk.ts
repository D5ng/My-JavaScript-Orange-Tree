/**
 * @example
 * // chunk
 * chunk([1, 2, 3, 4, 5], 2) => [[1, 2],[3, 4],[5]]
 * chunk([1, 2, 3], 1) => [[1],[2],[3]]
 * chunk([], 5) => []
 */

export function chunk<T>(arr: T[], size: number = 1) {
  if (size < 1) {
    throw Error(`두번째 매개변수(size)에는 1이상의 값을 넣어주어야 합니다.`)
  }

  if (arr.length === 0) {
    return []
  }

  const chunks = []

  for (let i = 0; i < arr.length; i += size) {
    const chunkData = arr.slice(i, i + size)
    chunks.push(chunkData)
  }

  return chunks
}
